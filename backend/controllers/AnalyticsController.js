// Analytics Controller
import DataStore from '../lib/DataStore.js';
import { sendJSON, sendError, sendSuccess } from '../utils/responseHelper.js';

const getAnalytics = async (req, res) => {
    try {
        const rooms = await DataStore.read('rooms');
        const reservations = await DataStore.read('reservations');
        const transactions = await DataStore.read('transactions');

        // Calculate analytics
        const totalRooms = rooms.length;
        const occupiedRooms = rooms.filter(room => room.status === 'occupied').length;
        const availableRooms = rooms.filter(room => room.status === 'available').length;
        const occupancyRate = totalRooms > 0 ? ((occupiedRooms / totalRooms) * 100).toFixed(1) : 0;

        const totalRevenue = transactions.reduce((sum, trans) => sum + trans.amount, 0);
        const todayRevenue = transactions
            .filter(trans => new Date(trans.createdAt).toDateString() === new Date().toDateString())
            .reduce((sum, trans) => sum + trans.amount, 0);

        const analytics = {
            occupancy: {
                total: totalRooms,
                occupied: occupiedRooms,
                available: availableRooms,
                rate: parseFloat(occupancyRate)
            },
            revenue: {
                total: totalRevenue,
                today: todayRevenue,
                monthly: totalRevenue // Simplified for demo
            },
            reservations: {
                total: reservations.length,
                active: reservations.filter(res => res.status === 'confirmed').length
            }
        };

        sendJSON(res, 200, analytics);
    } catch (error) {
        console.error('Get analytics error:', error);
        sendError(res, 500, 'Failed to get analytics', error);
    }
};

const getDashboardStats = async (req, res) => {
    try {
        const rooms = await DataStore.read('rooms');
        const reservations = await DataStore.read('reservations');
        const transactions = await DataStore.read('transactions');
        const guests = await DataStore.read('guests');

        const stats = {
            totalRooms: rooms.length,
            availableRooms: rooms.filter(room => room.status === 'available').length,
            occupiedRooms: rooms.filter(room => room.status === 'occupied').length,
            cleaningRooms: rooms.filter(room => room.status === 'cleaning').length,
            totalReservations: reservations.length,
            pendingReservations: reservations.filter(res => res.status === 'pending').length,
            totalGuests: guests.length,
            todayRevenue: transactions
                .filter(trans => new Date(trans.createdAt).toDateString() === new Date().toDateString())
                .reduce((sum, trans) => sum + trans.amount, 0),
            totalRevenue: transactions.reduce((sum, trans) => sum + trans.amount, 0)
        };

        sendJSON(res, 200, stats);
    } catch (error) {
        console.error('Get dashboard stats error:', error);
        sendError(res, 500, 'Failed to get dashboard stats', error);
    }
};

export {
    getAnalytics,
    getDashboardStats
};