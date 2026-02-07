// AuditLog Controller - Implements UML AuditLog class
import DataStore from '../lib/DataStore.js';
import { sendJSON, sendError, sendSuccess } from '../utils/responseHelper.js';

/**
 * Log a system action for audit purposes
 * @param {Object} req - Request object containing user, action, entity info
 * @param {Object} res - Response object
 */
const logAction = async (req, res) => {
    try {
        const { action, entity_type, entity_id, old_values, new_values } = req.body;
        const user_id = req.user?.id; // Assuming authenticated user context

        if (!user_id || !action || !entity_type) {
            return sendError(res, 400, 'Missing required fields: user_id, action, entity_type');
        }

        const auditLog = await DataStore.create('audit_logs', {
            user_id,
            action,
            entity_type,
            entity_id,
            old_values,
            new_values,
            ip_address: req.ip,
            user_agent: req.headers['user-agent']
        });

        sendSuccess(res, auditLog, 'Audit log recorded successfully');
    } catch (error) {
        console.error('Audit log error:', error);
        sendError(res, 500, 'Failed to record audit log', error);
    }
};

/**
 * Get audit logs with filtering options
 * @param {Object} req - Request object with query parameters
 * @param {Object} res - Response object
 */
const getLogs = async (req, res) => {
    try {
        const { user_id, action, entity_type, start_date, end_date, limit = 50, offset = 0 } = req.query;

        let logs = await DataStore.read('audit_logs');

        // Apply filters
        if (user_id) logs = logs.filter(log => log.user_id == user_id);
        if (action) logs = logs.filter(log => log.action === action);
        if (entity_type) logs = logs.filter(log => log.entity_type === entity_type);
        if (start_date) logs = logs.filter(log => new Date(log.created_at) >= new Date(start_date));
        if (end_date) logs = logs.filter(log => new Date(log.created_at) <= new Date(end_date));

        // Sort by most recent first
        logs.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        // Apply pagination
        const paginatedLogs = logs.slice(offset, offset + parseInt(limit));

        sendJSON(res, 200, {
            logs: paginatedLogs,
            total: logs.length,
            limit: parseInt(limit),
            offset: parseInt(offset)
        });
    } catch (error) {
        console.error('Get audit logs error:', error);
        sendError(res, 500, 'Failed to retrieve audit logs', error);
    }
};

/**
 * Get audit log by ID
 * @param {Object} req - Request object with log ID
 * @param {Object} res - Response object
 */
const getLogById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const log = await DataStore.findById('audit_logs', id);

        if (!log) {
            return sendError(res, 404, 'Audit log not found');
        }

        sendJSON(res, 200, log);
    } catch (error) {
        console.error('Get audit log by ID error:', error);
        sendError(res, 500, 'Failed to retrieve audit log', error);
    }
};

export {
    logAction,
    getLogs,
    getLogById
};