// Billing Controller
import DataStore from '../lib/DataStore.js';
import { sendJSON, sendError, sendSuccess } from '../utils/responseHelper.js';

const get = async (req, res) => {
    try {
        const transactions = await DataStore.read('transactions');
        sendJSON(res, 200, transactions);
    } catch (error) {
        console.error('Get billing error:', error);
        sendError(res, 500, 'Failed to get billing records', error);
    }
};

const getById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const transaction = await DataStore.findById('transactions', id);

        if (!transaction) {
            return sendError(res, 404, 'Transaction not found');
        }

        sendJSON(res, 200, transaction);
    } catch (error) {
        console.error('Get billing record error:', error);
        sendError(res, 500, 'Failed to get billing record', error);
    }
};

const create = async (req, res) => {
    try {
        const { reservationId, amount, method, reference, description = '' } = req.body;

        if (!reservationId || !amount || !method) {
            return sendError(res, 400, 'Reservation ID, amount, and payment method are required');
        }

        const newTransaction = await DataStore.create('transactions', {
            reservationId,
            amount,
            method,
            reference,
            description,
            status: 'completed',
            createdAt: new Date().toISOString()
        });

        sendSuccess(res, newTransaction, 'Transaction created successfully');
    } catch (error) {
        console.error('Create transaction error:', error);
        sendError(res, 500, 'Failed to create transaction', error);
    }
};

const createInvoice = async (req, res) => {
    try {
        const { reservationId, items, discount = 0, taxRate = 0.1 } = req.body;

        if (!reservationId || !items || !Array.isArray(items)) {
            return sendError(res, 400, 'Reservation ID and items array are required');
        }

        const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const tax = subtotal * taxRate;
        const total = subtotal + tax - discount;

        const invoice = await DataStore.create('invoices', {
            reservationId,
            items,
            subtotal,
            tax,
            discount,
            total,
            status: 'created',
            createdAt: new Date().toISOString()
        });

        sendSuccess(res, invoice, 'Invoice created successfully');
    } catch (error) {
        console.error('Create invoice error:', error);
        sendError(res, 500, 'Failed to create invoice', error);
    }
};

export {
    get,
    getById,
    create,
    createInvoice
};