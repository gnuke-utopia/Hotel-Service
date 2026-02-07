// Guest Controller
import DataStore from '../lib/DataStore.js';
import { sendJSON, sendError, sendSuccess } from '../utils/responseHelper.js';

const get = async (req, res) => {
    try {
        const guests = await DataStore.read('guests');
        sendJSON(res, 200, guests);
    } catch (error) {
        console.error('Get guests error:', error);
        sendError(res, 500, 'Failed to get guests', error);
    }
};

const getById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const guest = await DataStore.findById('guests', id);

        if (!guest) {
            return sendError(res, 404, 'Guest not found');
        }

        sendJSON(res, 200, guest);
    } catch (error) {
        console.error('Get guest error:', error);
        sendError(res, 500, 'Failed to get guest', error);
    }
};

const create = async (req, res) => {
    try {
        const { firstName, lastName, email, phone, address, nationality, idNumber } = req.body;

        if (!firstName || !lastName || !email) {
            return sendError(res, 400, 'First name, last name, and email are required');
        }

        const newGuest = await DataStore.create('guests', {
            firstName,
            lastName,
            email,
            phone,
            address,
            nationality,
            idNumber,
            createdAt: new Date().toISOString()
        });

        sendSuccess(res, newGuest, 'Guest created successfully');
    } catch (error) {
        console.error('Create guest error:', error);
        sendError(res, 500, 'Failed to create guest', error);
    }
};

const update = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const updates = req.body;

        const updatedGuest = await DataStore.update('guests', id, updates);

        if (!updatedGuest) {
            return sendError(res, 404, 'Guest not found');
        }

        sendSuccess(res, updatedGuest, 'Guest updated successfully');
    } catch (error) {
        console.error('Update guest error:', error);
        sendError(res, 500, 'Failed to update guest', error);
    }
};

const deleteGuest = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        const deleted = await DataStore.delete('guests', id);

        if (!deleted) {
            return sendError(res, 404, 'Guest not found');
        }

        sendSuccess(res, {}, 'Guest deleted successfully');
    } catch (error) {
        console.error('Delete guest error:', error);
        sendError(res, 500, 'Failed to delete guest', error);
    }
};

const checkIn = async (req, res) => {
    try {
        const guestId = parseInt(req.params.id);
        const { roomId } = req.body;

        if (!roomId) {
            return sendError(res, 400, 'Room ID is required for check-in');
        }

        const guest = await DataStore.findById('guests', guestId);
        if (!guest) {
            return sendError(res, 404, 'Guest not found');
        }

        // Update guest status and room status
        await DataStore.update('guests', guestId, { status: 'checked_in' });
        await DataStore.update('rooms', roomId, { status: 'occupied' });

        sendSuccess(res, { guest, room: { id: roomId, status: 'occupied' } }, 'Guest checked in successfully');
    } catch (error) {
        console.error('Check-in error:', error);
        sendError(res, 500, 'Failed to check in guest', error);
    }
};

const checkOut = async (req, res) => {
    try {
        const guestId = parseInt(req.params.id);
        const { roomId } = req.body;

        const guest = await DataStore.findById('guests', guestId);
        if (!guest) {
            return sendError(res, 404, 'Guest not found');
        }

        // Update guest status and room status
        await DataStore.update('guests', guestId, { status: 'checked_out' });
        await DataStore.update('rooms', roomId, { status: 'cleaning' }); // Move to cleaning after checkout

        sendSuccess(res, { guest, room: { id: roomId, status: 'cleaning' } }, 'Guest checked out successfully');
    } catch (error) {
        console.error('Check-out error:', error);
        sendError(res, 500, 'Failed to check out guest', error);
    }
};

export {
    get,
    getById,
    create,
    update,
    deleteGuest,
    checkIn,
    checkOut
};