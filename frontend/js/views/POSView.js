// POS View - Point of Sale interface
import { apiService } from '../services/ApiService.js';

export default {
    render: async () => {
        return `
            <div class="fade-in">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h2><i class="bi bi-cash-coin me-2"></i>Point of Sale</h2>
                    <button class="btn btn-primary" id="newTransactionBtn">
                        <i class="bi bi-plus-circle me-2"></i>New Transaction
                    </button>
                </div>

                <div class="row mb-4">
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title"><i class="bi bi-cart me-2"></i>Create Transaction</h5>
                                <form id="pos-transaction-form">
                                    <div class="mb-3">
                                        <label class="form-label">Reservation ID</label>
                                        <input type="text" class="form-control" placeholder="Enter reservation ID" required>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Guest</label>
                                        <select class="form-select" id="pos-guest">
                                            <option value="">Search or select guest...</option>
                                            <option value="1">John Doe (Reservation #RES001)</option>
                                            <option value="2">Jane Smith (Reservation #RES002)</option>
                                        </select>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Items</label>
                                        <div class="item-list">
                                            <div class="item-row d-flex gap-2 mb-2">
                                                <select class="form-select flex-grow-1" name="item-id">
                                                    <option value="">Select Item</option>
                                                    <option value="1">Mineral Water - $3.50</option>
                                                    <option value="2">Coffee - $4.00</option>
                                                    <option value="3">Tea - $3.75</option>
                                                    <option value="4">Snack Mix - $5.25</option>
                                                    <option value="5">Chocolate Bar - $2.50</option>
                                                </select>
                                                <input type="number" class="form-control w-25" name="quantity" value="1" min="1">
                                                <button type="button" class="btn btn-outline-danger btn-sm remove-item">X</button>
                                            </div>
                                        </div>
                                        <button type="button" class="btn btn-sm btn-outline-primary mt-2" id="add-item-btn">
                                            <i class="bi bi-plus me-1"></i> Add Item
                                        </button>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Total Amount</label>
                                        <input type="number" class="form-control" id="total-amount" readonly>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Payment Method</label>
                                        <select class="form-select" id="payment-method">
                                            <option value="cash">Cash</option>
                                            <option value="credit_card">Credit Card</option>
                                            <option value="debit_card">Debit Card</option>
                                            <option value="room_charge">Room Charge</option>
                                        </select>
                                    </div>
                                    <button type="submit" class="btn btn-success w-100">
                                        <i class="bi bi-cash-stack me-2"></i>Process Transaction
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title"><i class="bi bi-box-seam me-2"></i>Inventory</h5>
                                <div class="table-responsive">
                                    <table class="table table-sm">
                                        <thead>
                                            <tr>
                                                <th>Item</th>
                                                <th>Price</th>
                                                <th>Stock</th>
                                                <th>Category</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Mineral Water</td>
                                                <td>$3.50</td>
                                                <td>50</td>
                                                <td>Beverages</td>
                                            </tr>
                                            <tr>
                                                <td>Coffee</td>
                                                <td>$4.00</td>
                                                <td>30</td>
                                                <td>Beverages</td>
                                            </tr>
                                            <tr>
                                                <td>Tea</td>
                                                <td>$3.75</td>
                                                <td>25</td>
                                                <td>Beverages</td>
                                            </tr>
                                            <tr>
                                                <td>Snack Mix</td>
                                                <td>$5.25</td>
                                                <td>40</td>
                                                <td>Food</td>
                                            </tr>
                                            <tr>
                                                <td>Chocolate Bar</td>
                                                <td>$2.50</td>
                                                <td>35</td>
                                                <td>Food</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header">
                        <h5 class="mb-0"><i class="bi bi-receipt me-2"></i>Recent Transactions</h5>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Transaction ID</th>
                                        <th>Guest</th>
                                        <th>Items</th>
                                        <th>Total</th>
                                        <th>Method</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>#POS001</td>
                                        <td>John Doe</td>
                                        <td>2 x Coffee, 1 x Snack</td>
                                        <td>$13.25</td>
                                        <td>Cash</td>
                                        <td>2026-02-05 14:30</td>
                                        <td><span class="badge bg-success">Completed</span></td>
                                    </tr>
                                    <tr>
                                        <td>#POS002</td>
                                        <td>Jane Smith</td>
                                        <td>1 x Tea, 1 x Chocolate</td>
                                        <td>$6.25</td>
                                        <td>Room Charge</td>
                                        <td>2026-02-05 12:15</td>
                                        <td><span class="badge bg-success">Completed</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    postRender: () => {
        // Add item row functionality
        document.getElementById('add-item-btn')?.addEventListener('click', () => {
            const itemList = document.querySelector('.item-list');
            const newRow = document.createElement('div');
            newRow.className = 'item-row d-flex gap-2 mb-2';
            newRow.innerHTML = `
                <select class="form-select flex-grow-1" name="item-id">
                    <option value="">Select Item</option>
                    <option value="1">Mineral Water - $3.50</option>
                    <option value="2">Coffee - $4.00</option>
                    <option value="3">Tea - $3.75</option>
                    <option value="4">Snack Mix - $5.25</option>
                    <option value="5">Chocolate Bar - $2.50</option>
                </select>
                <input type="number" class="form-control w-25" name="quantity" value="1" min="1">
                <button type="button" class="btn btn-outline-danger btn-sm remove-item">X</button>
            `;
            itemList.appendChild(newRow);
        });

        // Remove item row
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('remove-item')) {
                e.target.closest('.item-row').remove();
            }
        });

        // Calculate total when items change
        const calculateTotal = () => {
            const items = document.querySelectorAll('.item-row');
            let total = 0;
            items.forEach(row => {
                const itemId = row.querySelector('select').value;
                const quantity = parseInt(row.querySelector('input[name="quantity"]').value) || 0;

                // Simple price mapping for demo
                const prices = { '1': 3.50, '2': 4.00, '3': 3.75, '4': 5.25, '5': 2.50 };
                if (itemId && prices[itemId]) {
                    total += prices[itemId] * quantity;
                }
            });
            document.getElementById('total-amount').value = total.toFixed(2);
        };

        // Attach event listeners to existing and future inputs
        document.addEventListener('change', (e) => {
            if (e.target.matches('select[name="item-id"], input[name="quantity"]')) {
                calculateTotal();
            }
        });

        // POS transaction form submission
        document.getElementById('pos-transaction-form')?.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const transactionData = Object.fromEntries(formData);

            // Collect items from the dynamic list
            const items = [];
            document.querySelectorAll('.item-row').forEach(row => {
                const itemId = row.querySelector('select').value;
                const quantity = parseInt(row.querySelector('input[name="quantity"]').value) || 0;
                if (itemId && quantity > 0) {
                    items.push({ itemId, quantity });
                }
            });
            transactionData.items = items;
            transactionData.totalAmount = parseFloat(document.getElementById('total-amount').value);

            try {
                // In production: await apiService.post('/pos/transaction', transactionData);
                console.log('Processing POS transaction:', transactionData);
                alert('Transaction processed successfully in production');
            } catch (error) {
                console.error('POS transaction failed:', error);
            }
        });
    }
};