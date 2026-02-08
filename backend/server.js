
// backend/server.js
import http from 'http';
import url from 'url';
import path from 'path';
import fs from 'fs';
import { promisify } from 'util';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import controllers : Fix cjs file extension error
import * as authController from './controllers/AuthController.js';
import * as reservationController from './controllers/ReservationController.js';
import * as guestController from './controllers/GuestController.js';
import * as housekeepingController from './controllers/HousekeepingController.js';
import * as billingController from './controllers/BillingController.js';
import * as posController from './controllers/POSController.js';
import * as analyticsController from './controllers/AnalyticsController.js';
//import * as reportController from './controllers/ReportController.js';
import * as auditLogController from './controllers/AuditLogController.js';
//import * as notificationController from './controllers/NotificationController.js';

// Import response helper
import { sendError, sendJSON, sendSuccess } from './utils/responseHelper.js';

const PORT = process.env.PORT || 3000;
const STATIC_DIR = path.join(__dirname, '..', 'frontend'); // Assuming frontend is one level up from backend

// Promisify fs functions for easier async/await usage
const readFileAsync = promisify(fs.readFile);

// In-memory data store (for demo purposes)
// const DataStore = import('./lib/DataStore.js');


// Define routes without parameter placeholders in the key string.
// Use a simple array of objects containing method, path pattern (regex), and handler.
const routes = [
    // Health Check
    { method: 'GET', path: /^\/health$/, handler: (req, res) => sendJSON(res, 200, { status: 'OK', timestamp: new Date().toISOString() }) },

    // Auth routes
    { method: 'GET', path: /^\/api\/auth\/session$/, handler: authController.getSession },
    { method: 'POST', path: /^\/api\/auth\/login$/, handler: authController.login },
    { method: 'POST', path: /^\/api\/auth\/logout$/, handler: authController.logout },

    // Reservation routes
    { method: 'GET', path: /^\/api\/reservations$/, handler: reservationController.get },
    { method: 'POST', path: /^\/api\/reservations$/, handler: reservationController.create },
    { method: 'PUT', path: /^\/api\/reservations\/(\d+)$/, handler: reservationController.update }, // Matches /api/reservations/123
    { method: 'DELETE', path: /^\/api\/reservations\/(\d+)$/, handler: reservationController.delete }, // Matches /api/reservations/123
    { method: 'GET', path: /^\/api\/reservations\/search$/, handler: reservationController.search },

    // Guest routes
    { method: 'GET', path: /^\/api\/guests$/, handler: guestController.get },
    { method: 'POST', path: /^\/api\/guests$/, handler: guestController.create },
    { method: 'PUT', path: /^\/api\/guests\/(\d+)$/, handler: guestController.update }, // Matches /api/guests/123
    { method: 'DELETE', path: /^\/api\/guests\/(\d+)$/, handler: guestController.delete }, // Matches /api/guests/123
    { method: 'POST', path: /^\/api\/guests\/(\d+)\/checkin$/, handler: guestController.checkIn }, // Matches /api/guests/123/checkin
    { method: 'POST', path: /^\/api\/guests\/(\d+)\/checkout$/, handler: guestController.checkOut }, // Matches /api/guests/123/checkout

    // Room routes
    { method: 'GET', path: /^\/api\/rooms$/, handler: housekeepingController.getRooms },
    { method: 'PUT', path: /^\/api\/rooms\/(\d+)\/status$/, handler: housekeepingController.updateRoomStatus }, // Matches /api/rooms/123/status

    // Housekeeping routes
    { method: 'GET', path: /^\/api\/housekeeping\/tasks$/, handler: housekeepingController.getTasks },
    { method: 'POST', path: /^\/api\/housekeeping\/tasks$/, handler: housekeepingController.createTask },

    // Maintenance routes
    { method: 'POST', path: /^\/api\/maintenance$/, handler: housekeepingController.createMaintenanceRequest },

    // Billing routes
    { method: 'GET', path: /^\/api\/billing$/, handler: billingController.get },
    { method: 'POST', path: /^\/api\/billing$/, handler: billingController.create },
    { method: 'GET', path: /^\/api\/billing\/(\d+)$/, handler: billingController.getById }, // Matches /api/billing/123
    { method: 'POST', path: /^\/api\/billing\/invoice$/, handler: billingController.createInvoice },

    // POS routes
    { method: 'GET', path: /^\/api\/inventory$/, handler: posController.getInventory },
    { method: 'POST', path: /^\/api\/pos\/transaction$/, handler: posController.createTransaction },

    // Analytics routes
    { method: 'GET', path: /^\/api\/analytics$/, handler: analyticsController.getAnalytics },
    { method: 'GET', path: /^\/api\/dashboard\/stats$/, handler: analyticsController.getDashboardStats },

    // Report routes
    //    { method: 'GET', path: /^\/api\/reports\/occupancy$/, handler: reportController.getOccupancyReport },
    //    { method: 'GET', path: /^\/api\/reports\/revenue$/, handler: reportController.getRevenueReport },

    // Audit Log routes
    { method: 'POST', path: /^\/api\/logs\/audit$/, handler: auditLogController.logAction },
    { method: 'GET', path: /^\/api\/logs\/audit$/, handler: auditLogController.getLogs },

    // Notification routes
    // { method: 'POST', path: /^\/api\/notifications$/, handler: notificationController.sendNotification },
    // { method: 'GET', path: /^\/api\/notifications$/, handler: notificationController.getNotifications },
    // { method: 'GET', path: /^\/api\/notifications\/unread$/, handler: notificationController.getUnreadCount }
];

const server = http.createServer(async (req, res) => {
    const parsedUrl = url.parse(req.url, true); // Use 'true' to parse query strings
    const pathname = parsedUrl.pathname;
    const method = req.method;

    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*'); // Consider restricting this in production
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Fixed typo

    // Handle preflight OPTIONS request
    if (method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    // --- API Route Handling ---
    let matchedRoute = null;
    let routeParams = {};

    for (const route of routes) {
        if (route.method === method) {
            const match = pathname.match(route.path);
            if (match) {
                matchedRoute = route;
                // Extract named parameters (capturing groups) from the regex match
                // match[0] is the full match, match[1], match[2], etc. are the groups
                // Assuming the first group is the ID for routes like /api/guests/:id
                if (match[1]) {
                    // For routes expecting an ID parameter, attach it to req.params
                    req.params = { id: match[1] };
                }
                break; // Found the route, exit loop
            }
        }
    }

    if (matchedRoute) {
        try {
            // Parse request body for POST/PUT requests
            if (method === 'POST' || method === 'PUT') {
                let body = '';
                req.on('data', chunk => {
                    body += chunk.toString();
                });
                req.on('end', async () => {
                    try {
                        // Only parse JSON if there's a body
                        // if (body) { //error stopping the login from working
                        //     req.body = JSON.parse(body);
                        // } else {
                        //     req.body = {}; // Ensure req.body exists even if empty
                        // }
                        let parsedBody = {};

                        if (body && body.trim()) {
                            try {
                                parsedBody = JSON.parse(body);
                            } catch (err) {
                                console.error('Invalid JSON received:', body);
                                return sendError(res, 400, 'Invalid JSON in request body');
                            }
                        }

                        req.body = parsedBody;


                        // Extend the original res object with Express-like helpers
                        res.json = (data) => {
                            res.writeHead(200, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify(data));
                        };
                        res.status = (statusCode) => {
                            res.statusCode = statusCode;
                            return res; // Return self for chaining
                        };
                        res.send = (data) => {
                            res.writeHead(res.statusCode || 200, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify(data));
                        };

                        // Call the matched route handler
                        await matchedRoute.handler(req, res);
                    } catch (parseError) {
                        console.error('Body parsing error:', parseError);
                        sendError(res, 400, 'Invalid JSON in request body');
                    }
                });
            } else {
                // For GET/DELETE requests, just call the handler
                // Extend the original res object with Express-like helpers
                res.json = (data) => {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(data));
                };
                res.status = (statusCode) => {
                    res.statusCode = statusCode;
                    return res;
                };
                res.send = (data) => {
                    res.writeHead(res.statusCode || 200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(data));
                };
                await matchedRoute.handler(req, res);
            }
        } catch (handlerError) {
            console.error('Route handler error:', handlerError);
            sendError(res, 500, 'Internal server error');
        }
        return; // Exit after handling API route
    }


    // Construct the full file path relative to the STATIC_DIR
    let filePath = pathname;
    if (pathname === '/') {
        filePath = '/index.html'; // Default file
    }
    // Resolve the path to prevent directory traversal attacks
    filePath = path.resolve(STATIC_DIR) + filePath;

    // Ensure the requested path is within the STATIC_DIR
    if (!filePath.startsWith(path.resolve(STATIC_DIR))) {
        res.writeHead(403);
        res.end('Forbidden');
        return;
    }

    try {
        const fileContent = await readFileAsync(filePath);
        const ext = path.extname(filePath);
        const contentType = {
            '.html': 'text/html',
            '.js': 'application/javascript',
            '.css': 'text/css',
            '.json': 'application/json',
            '.png': 'image/png',
            '.jpg': 'image/jpg',
            '.jpeg': 'image/jpeg',
            '.gif': 'image/gif',
            '.svg': 'image/svg+xml',
            '.ico': 'image/x-icon',
            '.txt': 'text/plain',
            '.woff': 'font/woff',
            '.woff2': 'font/woff2',
            '.ttf': 'font/ttf',
        }[ext] || 'application/octet-stream';

        res.writeHead(200, { 'Content-Type': contentType });
        res.end(fileContent);
    } catch (fileError) {
        // If file not found or any other error reading the file
        console.error(`Static file error for ${filePath}:`, fileError);
        res.writeHead(404);
        res.end('File Not Found');
    }
});

server.listen(PORT, () => {
    console.log(`HotelSys Pro server running on http://localhost:${PORT}`);
    console.log('Environment:', process.env.NODE_ENV || 'development');
    console.log('Serving static files from:', STATIC_DIR);
    console.log('Current Working Directory:', process.cwd());
    console.log('Press Ctrl+C to stop the server');
});

export default server;