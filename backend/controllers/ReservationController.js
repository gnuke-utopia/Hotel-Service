// Reservation Controller
import DataStore from '../lib/DataStore.js';
import { sendJSON, sendError, sendSuccess } from '../utils/responseHelper.js';

const get = async (req, res) => {
    try {
        const reservations = await DataStore.read('reservations');
        sendJSON(res, 200, reservations);
    } catch (error) {
        console.error('Get reservations error:', error);
        sendError(res, 500, 'Failed to get reservations', error);
    }
};

const getById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const reservation = await DataStore.findById('reservations', id);

        if (!reservation) {
            return sendError(res, 404, 'Reservation not found');
        }

        sendJSON(res, 200, reservation);
    } catch (error) {
        console.error('Get reservation error:', error);
        sendError(res, 500, 'Failed to get reservation', error);
    }
};

const create = async (req, res) => {
    try {
        const { guestName, roomType, startDate, endDate, status = 'confirmed' } = req.body;

        if (!guestName || !roomType || !startDate || !endDate) {
            return sendError(res, 400, 'Missing required fields');
        }

        const newReservation = await DataStore.create('reservations', {
            guestName,
            roomType,
            startDate,
            endDate,
            status,
            createdAt: new Date().toISOString()
        });

        sendSuccess(res, newReservation, 'Reservation created successfully');
    } catch (error) {
        console.error('Create reservation error:', error);
        sendError(res, 500, 'Failed to create reservation', error);
    }
};

const update = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const updates = req.body;

        const updatedReservation = await DataStore.update('reservations', id, updates);

        if (!updatedReservation) {
            return sendError(res, 404, 'Reservation not found');
        }

        sendSuccess(res, updatedReservation, 'Reservation updated successfully');
    } catch (error) {
        console.error('Update reservation error:', error);
        sendError(res, 500, 'Failed to update reservation', error);
    }
};

const deleteReservation = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        const deleted = await DataStore.delete('reservations', id);

        if (!deleted) {
            return sendError(res, 404, 'Reservation not found');
        }

        sendSuccess(res, {}, 'Reservation deleted successfully');
    } catch (error) {
        console.error('Delete reservation error:', error);
        sendError(res, 500, 'Failed to delete reservation', error);
    }
};

const search = async (req, res) => {
    try {
        const { startDate, endDate, roomType } = req.query;

        if (!startDate || !endDate) {
            return sendError(res, 400, 'Start date and end date are required');
        }

        const reservations = await DataStore.read('reservations');
        const rooms = await DataStore.read('rooms');

        // Filter rooms that are available during the requested period
        const availableRooms = rooms.filter(room => {
            if (roomType && room.type !== roomType) {
                return false;
            }

            // Check if room is not booked during the requested dates
            const isBooked = reservations.some(res =>
                res.roomId === room.id &&
                new Date(res.startDate) < new Date(endDate) &&
                new Date(res.endDate) > new Date(startDate) &&
                res.status !== 'cancelled'
            );

            return !isBooked && room.status === 'available';
        });

        sendJSON(res, 200, availableRooms);
    } catch (error) {
        console.error('Search reservations error:', error);
        sendError(res, 500, 'Failed to search reservations', error);
    }
};

export {
    get,
    getById,
    create,
    update,
    deleteReservation,
    search
};