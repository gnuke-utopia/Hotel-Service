// Housekeeping Controller
import DataStore from '../lib/DataStore.js';
import { sendJSON, sendError, sendSuccess } from '../utils/responseHelper.js';

const getRooms = async (req, res) => {
    try {
        const rooms = await DataStore.read('rooms');
        sendJSON(res, 200, rooms);
    } catch (error) {
        console.error('Get rooms error:', error);
        sendError(res, 500, 'Failed to get rooms', error);
    }
};

const updateRoomStatus = async (req, res) => {
    try {
        const { id, status } = req.body;

        if (!id || !status) {
            return sendError(res, 400, 'Missing id or status');
        }

        const validStatuses = ['available', 'occupied', 'cleaning', 'maintenance', 'reserved', 'out_of_order'];
        if (!validStatuses.includes(status)) {
            return sendError(res, 400, 'Invalid status');
        }

        const updatedRoom = await DataStore.update('rooms', id, { status });

        if (!updatedRoom) {
            return sendError(res, 404, 'Room not found');
        }

        sendSuccess(res, updatedRoom, 'Room status updated successfully');
    } catch (error) {
        console.error('Update room status error:', error);
        sendError(res, 500, 'Failed to update room status', error);
    }
};

const getTasks = async (req, res) => {
    try {
        // In a real system, this would come from a separate tasks collection
        // For demo, we'll create tasks based on room statuses
        const rooms = await DataStore.read('rooms');
        const tasks = rooms
            .filter(room => room.status === 'cleaning' || room.status === 'maintenance')
            .map(room => ({
                id: room.id,
                roomId: room.id,
                roomNumber: room.number,
                taskType: room.status === 'cleaning' ? 'cleaning' : 'maintenance',
                priority: 'medium',
                assignedTo: null,
                dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Tomorrow
                status: 'pending',
                createdAt: new Date().toISOString()
            }));

        sendJSON(res, 200, tasks);
    } catch (error) {
        console.error('Get tasks error:', error);
        sendError(res, 500, 'Failed to get tasks', error);
    }
};

const createTask = async (req, res) => {
    try {
        const { roomId, taskType, priority = 'medium', assignedTo, dueDate } = req.body;

        if (!roomId || !taskType) {
            return sendError(res, 400, 'Room ID and task type are required');
        }

        const room = await DataStore.findById('rooms', roomId);
        if (!room) {
            return sendError(res, 404, 'Room not found');
        }

        const newTask = await DataStore.create('housekeeping_tasks', {
            roomId,
            roomNumber: room.number,
            taskType,
            priority,
            assignedTo,
            dueDate: dueDate || new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
            status: 'pending',
            createdAt: new Date().toISOString()
        });

        sendSuccess(res, newTask, 'Task created successfully');
    } catch (error) {
        console.error('Create task error:', error);
        sendError(res, 500, 'Failed to create task', error);
    }
};

const createMaintenanceRequest = async (req, res) => {
    try {
        const { roomId, issueType, description, priority = 'medium' } = req.body;

        if (!roomId || !issueType || !description) {
            return sendError(res, 400, 'Room ID, issue type, and description are required');
        }

        const room = await DataStore.findById('rooms', roomId);
        if (!room) {
            return sendError(res, 404, 'Room not found');
        }

        const newRequest = await DataStore.create('maintenance_requests', {
            roomId,
            roomNumber: room.number,
            issueType,
            description,
            priority,
            status: 'reported',
            reportedBy: req.user?.id || 1, // Default to first user for demo
            reportedAt: new Date().toISOString(),
            createdAt: new Date().toISOString()
        });

        sendSuccess(res, newRequest, 'Maintenance request submitted successfully');
    } catch (error) {
        console.error('Create maintenance request error:', error);
        sendError(res, 500, 'Failed to submit maintenance request', error);
    }
};

export {
    getRooms,
    updateRoomStatus,
    getTasks,
    createTask,
    createMaintenanceRequest
};