// Billing View - F12, F13, F14: Billing and payments
import { apiService } from '../services/ApiService.js';

export default {
    render: async () => {
        return `
            <div class="fade-in">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h2><i class="bi bi-receipt me-2"></i>Billing & Payments</h2>
                    <button class="btn btn-primary" id="newInvoiceBtn">
                        <i class="bi bi-file-earmark-text me-2"></i>New Invoice
                    </button>
                </div>

                <div class="row mb-4">
                    <div class="col-md-3">
                        <div class="stat-card text-center">
                            <div class="stat-icon success">
                                <i class="bi bi-currency-dollar"></i>
                            </div>
                            <h3 class="mb-1">$2,847</h3>
                            <p class="text-muted mb-0">Today's Revenue</p>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="stat-card text-center">
                            <div class="stat-icon primary">
                                <i class="bi bi-cart-check"></i>
                            </div>
                            <h3 class="mb-1">18</h3>
                            <p class="text-muted mb-0">Invoices Generated</p>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="stat-card text-center">
                            <div class="stat-icon warning">
                                <i class="bi bi-exclamation-circle"></i>
                            </div>
                            <h3 class="mb-1">3</h3>
                            <p class="text-muted mb-0">Pending Payments</p>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="stat-card text-center">
                            <div class="stat-icon info">
                                <i class="bi bi-cash-stack"></i>
                            </div>
                            <h3 class="mb-1">$1,230</h3>
                            <p class="text-muted mb-0">Outstanding</p>
                        </div>
                    </div>
                </div>

                <div class="row mb-4">
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title"><i class="bi bi-file-earmark-text me-2"></i>Generate Invoice</h5>
                                <form id="invoice-form">
                                    <div class="mb-3">
                                        <label class="form-label">Reservation ID</label>
                                        <input type="text" class="form-control" placeholder="Enter reservation ID" required>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Guest Information</label>
                                        <select class="form-select" id="invoice-guest">
                                            <option value="">Select guest...</option>
                                            <option value="1">John Doe (Reservation #RES001)</option>
                                            <option value="2">Jane Smith (Reservation #RES002)</option>
                                        </select>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Bill Items</label>
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" id="room-charge" checked>
                                            <label class="form-check-label" for="room-charge">Room Charges</label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" id="taxes-fees" checked>
                                            <label class="form-check-label" for="taxes-fees">Taxes & Fees</label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" id="additional-services">
                                            <label class="form-check-label" for="additional-services">Additional Services</label>
                                        </div>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Discount (%)</label>
                                        <input type="number" class="form-control" value="0" min="0" max="100">
                                    </div>
                                    <button type="submit" class="btn btn-success w-100">
                                        <i class="bi bi-file-earmark-pdf me-2"></i>Generate Invoice
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title"><i class="bi bi-credit-card me-2"></i>Process Payment</h5>
                                <form id="payment-form">
                                    <div class="mb-3">
                                        <label class="form-label">Invoice ID</label>
                                        <input type="text" class="form-control" placeholder="Enter invoice ID" required>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Payment Method</label>
                                        <select class="form-select" id="payment-method">
                                            <option value="cash">Cash</option>
                                            <option value="credit_card">Credit Card</option>
                                            <option value="debit_card">Debit Card</option>
                                            <option value="bank_transfer">Bank Transfer</option>
                                            <option value="mobile_payment">Mobile Payment</option>
                                        </select>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Amount</label>
                                        <input type="number" class="form-control" placeholder="Enter amount" required step="0.01">
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Payment Reference</label>
                                        <input type="text" class="form-control" placeholder="Reference number (if applicable)">
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Notes</label>
                                        <textarea class="form-control" rows="2" placeholder="Payment notes..."></textarea>
                                    </div>
                                    <button type="submit" class="btn btn-primary w-100">
                                        <i class="bi bi-cash me-2"></i>Process Payment
                                    </button>
                                </form>
                                
                                <div class="mt-3">
                                    <h6><i class="bi bi-arrow-return-left me-2"></i>Refund Processing</h6>
                                    <form id="refund-form">
                                        <div class="mb-3">
                                            <label class="form-label">Transaction ID</label>
                                            <input type="text" class="form-control" placeholder="Enter transaction ID" required>
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label">Refund Amount</label>
                                            <input type="number" class="form-control" placeholder="Enter refund amount" required step="0.01">
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label">Reason</label>
                                            <select class="form-select" id="refund-reason">
                                                <option value="">Select reason...</option>
                                                <option value="cancel_reservation">Reservation Cancellation</option>
                                                <option value="service_issue">Service Issue</option>
                                                <option value="duplicate_charge">Duplicate Charge</option>
                                                <option value="customer_request">Customer Request</option>
                                            </select>
                                        </div>
                                        <button type="submit" class="btn btn-danger w-100">
                                            <i class="bi bi-arrow-return-left me-2"></i>Process Refund
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header">
                        <h5 class="mb-0"><i class="bi bi-list-check me-2"></i>Recent Transactions</h5>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Transaction ID</th>
                                        <th>Guest</th>
                                        <th>Amount</th>
                                        <th>Type</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>#TXN001</td>
                                        <td>John Doe</td>
                                        <td>$1,250.00</td>
                                        <td><span class="badge bg-success">Payment</span></td>
                                        <td>2026-02-05 14:30</td>
                                        <td><span class="badge bg-success">Completed</span></td>
                                        <td>
                                            <button class="btn btn-sm btn-outline-primary me-1">Receipt</button>
                                            <button class="btn btn-sm btn-outline-info">Details</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>#TXN002</td>
                                        <td>Jane Smith</td>
                                        <td>$890.50</td>
                                        <td><span class="badge bg-success">Payment</span></td>
                                        <td>2026-02-05 12:15</td>
                                        <td><span class="badge bg-success">Completed</span></td>
                                        <td>
                                            <button class="btn btn-sm btn-outline-primary me-1">Receipt</button>
                                            <button class="btn btn-sm btn-outline-info">Details</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>#INV001</td>
                                        <td>Robert Johnson</td>
                                        <td>$2,100.00</td>
                                        <td><span class="badge bg-warning">Invoice</span></td>
                                        <td>2026-02-04 16:45</td>
                                        <td><span class="badge bg-warning">Pending</span></td>
                                        <td>
                                            <button class="btn btn-sm btn-outline-primary me-1">Send</button>
                                            <button class="btn btn-sm btn-outline-info">Edit</button>
                                        </td>
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
        document.getElementById('invoice-form')?.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const invoiceData = Object.fromEntries(formData);

            try {
                // In production: await apiService.post('/billing/invoices', invoiceData);
                console.log('Creating invoice:', invoiceData);
                alert('Invoice generated successfully in production');
            } catch (error) {
                console.error('Invoice creation failed:', error);
            }
        });

        document.getElementById('payment-form')?.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const paymentData = Object.fromEntries(formData);

            try {
                // In production: await apiService.post('/payments', paymentData);
                console.log('Processing payment:', paymentData);
                alert('Payment processed successfully in production');
            } catch (error) {
                console.error('Payment processing failed:', error);
            }
        });

        document.getElementById('refund-form')?.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const refundData = Object.fromEntries(formData);

            try {
                // In production: await apiService.post('/refunds', refundData);
                console.log('Processing refund:', refundData);
                alert('Refund processed successfully in production');
            } catch (error) {
                console.error('Refund processing failed:', error);
            }
        });

        document.getElementById('newInvoiceBtn')?.addEventListener('click', () => {
            // Scroll to invoice form
            document.getElementById('invoice-form')?.scrollIntoView({ behavior: 'smooth' });
        });
    }
};