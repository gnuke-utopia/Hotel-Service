// backend/utils/responseHelper.js

/**
 * Send JSON response with standard format
 */
export function sendJSON(res, statusCode, data) {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
        success: true,
        data,
        timestamp: new Date().toISOString()
    }));
}

/**
 * Send success response
 */
export function sendSuccess(res, message, data = null) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
        success: true,
        message,
        data,
        timestamp: new Date().toISOString()
    }));
}

/**
 * Send error response
 */
export function sendError(res, statusCode, message, details = null) {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
        success: false,
        error: {
            message,
            details
        },
        timestamp: new Date().toISOString()
    }));
}

/**
 * Send not found response
 */
export function sendNotFound(res, message = 'Resource not found') {
    sendError(res, 404, message);
}

/**
 * Send unauthorized response
 */
export function sendUnauthorized(res, message = 'Unauthorized') {
    sendError(res, 401, message);
}

/**
 * Send forbidden response
 */
export function sendForbidden(res, message = 'Forbidden') {
    sendError(res, 403, message);
}

/**
 * Send bad request response
 */
export function sendBadRequest(res, message, details = null) {
    sendError(res, 400, message, details);
}

/**
 * Send server error response
 */
export function sendServerError(res, message = 'Internal server error', details = null) {
    console.error('Server error:', message, details);
    sendError(res, 500, message, details);
}