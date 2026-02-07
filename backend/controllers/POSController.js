// POS Controller
import DataStore from '../lib/DataStore.js';
import { sendJSON, sendError, sendSuccess } from '../utils/responseHelper.js';

const getInventory = async (req, res) => {
    try {
        // Demo inventory data
        const inventory = await DataStore.read('inventory');

        sendJSON(res, 200, inventory);
    } catch (error) {
        console.error('Get inventory error:', error);
        sendError(res, 500, 'Failed to get inventory', error);
    }
};

const createTransaction = async (req, res) => {
    try {
        const { items, reservationId, paymentMethod, totalAmount } = req.body;

        if (!items || !reservationId || !paymentMethod) {
            return sendError(res, 400, 'Items, reservation ID, and payment method are required');
        }

        if (!Array.isArray(items) || items.length === 0) {
            return sendError(res, 400, 'Items must be a non-empty array');
        }

        // Process each item and update inventory
        for (const item of items) {
            const inventory = await DataStore.read('inventory');
            const inventoryItem = inventory.find(inv => inv.id === item.itemId);

            if (!inventoryItem || inventoryItem.stock < item.quantity) {
                return sendError(res, 400, `Insufficient stock for item: ${inventoryItem?.name || item.itemId}`);
            }

            // Update inventory
            inventoryItem.stock -= item.quantity;
            await DataStore.write('inventory', inventory);
        }

        const newTransaction = await DataStore.create('pos_transactions', {
            reservationId,
            items,
            paymentMethod,
            totalAmount,
            status: 'completed',
            createdAt: new Date().toISOString()
        });

        sendSuccess(res, newTransaction, 'POS transaction completed successfully');
    } catch (error) {
        console.error('POS transaction error:', error);
        sendError(res, 500, 'Failed to process POS transaction', error);
    }
};

export {
    getInventory,
    createTransaction
};