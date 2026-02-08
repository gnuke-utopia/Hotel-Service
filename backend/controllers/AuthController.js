// Auth Controller - Handles authentication
import DataStore from '../lib/DataStore.js';
import { sendJSON, sendError, sendSuccess } from '../utils/responseHelper.js';

// In-memory session store (for demo)
const sessions = new Map();

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return sendError(res, 400, 'Username and password are required');
        }

        // Find user (in production, use hashed passwords)
        const users = await DataStore.read('users');
        const user = users.find(u => u.username === username && u.password === password);

        if (!user) {
            return sendError(res, 401, 'Invalid credentials');
        }

        // Create session
        const sessionId = Math.random().toString(36).substring(2, 15);
        const sessionData = {
            userId: user.id,
            username: user.username,
            role: user.role,
            createdAt: new Date().toISOString(),
            lastActivity: new Date().toISOString()
        };

        sessions.set(sessionId, sessionData);

        sendSuccess(res, 'Login successful', {
            token: sessionId,
            user: {
                id: user.id,
                username: user.username,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        sendError(res, 500, 'Login failed', error);
    }
};

const logout = async (req, res) => {
    try {
        // Get session from headers (for demo purposes)
        const authHeader = req.headers.authorization;
        if (authHeader) {
            const token = authHeader.replace('Bearer ', '');
            sessions.delete(token);
        }

        sendSuccess(res, {}, 'Logout successful');
    } catch (error) {
        console.error('Logout error:', error);
        sendError(res, 500, 'Logout failed', error);
    }
};

const getSession = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return sendError(res, 401, 'No authorization token provided');
        }

        const token = authHeader.replace('Bearer ', '');
        const session = sessions.get(token);

        if (!session) {
            return sendError(res, 401, 'Invalid or expired session');
        }

        // Update last activity
        session.lastActivity = new Date().toISOString();
        sessions.set(token, session);

        sendJSON(res, 200, {
            user: {
                id: session.userId,
                username: session.username,
                role: session.role
            },
            session: {
                createdAt: session.createdAt,
                lastActivity: session.lastActivity
            }
        });
    } catch (error) {
        console.error('Session error:', error);
        sendError(res, 500, 'Session check failed', error);
    }
};

export {
    login,
    logout,
    getSession
};