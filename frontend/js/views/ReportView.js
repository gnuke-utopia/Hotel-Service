// Report View - F15, F16: Reports and analytics
// Report View - F15, F16: Reports and analytics with POS Integration
import { apiService } from '../services/ApiService.js';
export default {
render: async () => {
return `
<div class="container-fluid">
    <div class="row mb-4">
        <div class="col-md-12">
            <h2 class="mb-4">Reports & Analytics <span class="text-muted">/ Point of Sale</span></h2>
        </div>
    </div>

    <!-- Key Metrics Cards -->
    <div class="row mb-4">
        <div class="col-md-3">
            <div class="stat-card">
                <div class="stat-icon success">
                    <i class="fas fa-chart-pie"></i>
                </div>
                <div class="stat-content">
                    <h3>78%</h3>
                    <p>Occupancy Rate</p>
                </div>
            </div>
        </div>
        <div class="col-md-3">
            <div class="stat-card">
                <div class="stat-icon primary">
                    <i class="fas fa-dollar-sign"></i>
                </div>
                <div class="stat-content">
                    <h3>$15,420</h3>
                    <p>Monthly Revenue</p>
                </div>
            </div>
        </div>
        <div class="col-md-3">
            <div class="stat-card">
                <div class="stat-icon info">
                    <i class="fas fa-users"></i>
                </div>
                <div class="stat-content">
                    <h3>45</h3>
                    <p>Current Guests</p>
                </div>
            </div>
        </div>
        <div class="col-md-3">
            <div class="stat-card">
                <div class="stat-icon warning">
                    <i class="fas fa-shopping-cart"></i>
                </div>
                <div class="stat-content">
                    <h3>$2,847</h3>
                    <p>POS Revenue Today</p>
                </div>
            </div>
        </div>
    </div>

    <!-- POS Section -->
    <div class="row mb-4">
        <!-- POS Transaction Panel -->
        <div class="col-md-4">
            <div class="card">
                <div class="card-header bg-primary text-white">
                    <h5 class="mb-0"><i class="fas fa-cash-register me-2"></i>POS Transactions</h5>
                </div>
                <div class="card-body">
                    <form id="pos-transaction-form">
                        <div class="mb-3">
                            <label class="form-label">Guest / Room</label>
                            <select class="form-select" id="pos-guest">
                                <option value="">Search or select guest...</option>
                                <option value="1">John Doe (Room 101)</option>
                                <option value="2">Jane Smith (Room 205)</option>
                                <option value="3">Michael Chen (Room 305)</option>
                                <option value="4">Emma Rodriguez (Room 412)</option>
                                <option value="5">Walk-in Customer</option>
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
                                        <option value="6">Caesar Salad - $12.99</option>
                                        <option value="7">Grilled Salmon - $28.99</option>
                                        <option value="8">Ribeye Steak - $42.99</option>
                                    </select>
                                    <input type="number" class="form-control w-25" name="quantity" value="1" min="1">
                                    <button type="button" class="btn btn-outline-danger btn-sm remove-item">✕</button>
                                </div>
                            </div>
                            <button type="button" class="btn btn-sm btn-outline-primary mt-2" id="add-item-btn">
                                <i class="fas fa-plus me-1"></i> Add Item
                            </button>
                        </div>
                        
                        <div class="mb-3">
                            <label class="form-label">Total Amount</label>
                            <input type="number" class="form-control" id="total-amount" readonly value="0.00">
                        </div>
                        
                        <div class="mb-3">
                            <label class="form-label">Payment Method</label>
                            <select class="form-select" id="payment-method">
                                <option value="cash">Cash</option>
                                <option value="credit_card">Credit Card</option>
                                <option value="debit_card">Debit Card</option>
                                <option value="room_charge" selected>Room Charge</option>
                            </select>
                        </div>
                        
                        <button type="submit" class="btn btn-success w-100">
                            <i class="fas fa-cash-register me-2"></i>Process Transaction
                        </button>
                    </form>
                </div>
            </div>
        </div>

        <!-- POS Quick Stats & Recent Transactions -->
        <div class="col-md-4">
            <div class="card mb-4">
                <div class="card-header bg-success text-white">
                    <h5 class="mb-0"><i class="fas fa-chart-bar me-2"></i>POS Quick Stats</h5>
                </div>
                <div class="card-body">
                    <div class="row text-center">
                        <div class="col-6 mb-3">
                            <h3 class="text-primary">47</h3>
                            <small class="text-muted">Transactions Today</small>
                        </div>
                        <div class="col-6 mb-3">
                            <h3 class="text-success">$2,847.50</h3>
                            <small class="text-muted">Revenue</small>
                        </div>
                        <div class="col-6 mb-3">
                            <h3 class="text-info">$60.59</h3>
                            <small class="text-muted">Avg. Check</small>
                        </div>
                        <div class="col-6 mb-3">
                            <h3 class="text-warning">32</h3>
                            <small class="text-muted">Room Charges</small>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card">
                <div class="card-header bg-info text-white d-flex justify-content-between align-items-center">
                    <h5 class="mb-0"><i class="fas fa-history me-2"></i>Recent Transactions</h5>
                    <a href="#" class="btn btn-sm btn-light">View All</a>
                </div>
                <div class="card-body p-0">
                    <div class="table-responsive">
                        <table class="table table-sm mb-0">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Time</th>
                                    <th>Guest</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>#TXN-2847</td>
                                    <td>3:45 PM</td>
                                    <td>Michael Chen</td>
                                    <td class="text-success">$87.45</td>
                                    <td><span class="badge bg-success">Completed</span></td>
                                </tr>
                                <tr>
                                    <td>#TXN-2846</td>
                                    <td>3:22 PM</td>
                                    <td>Walk-in</td>
                                    <td class="text-success">$45.98</td>
                                    <td><span class="badge bg-success">Completed</span></td>
                                </tr>
                                <tr>
                                    <td>#TXN-2845</td>
                                    <td>2:58 PM</td>
                                    <td>Emma Rodriguez</td>
                                    <td class="text-success">$156.75</td>
                                    <td><span class="badge bg-success">Completed</span></td>
                                </tr>
                                <tr>
                                    <td>#TXN-2844</td>
                                    <td>2:15 PM</td>
                                    <td>John Doe</td>
                                    <td class="text-success">$32.50</td>
                                    <td><span class="badge bg-success">Completed</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <!-- POS Inventory -->
        <div class="col-md-4">
            <div class="card">
                <div class="card-header bg-warning text-white d-flex justify-content-between align-items-center">
                    <h5 class="mb-0"><i class="fas fa-boxes me-2"></i>POS Inventory</h5>
                    <span class="badge bg-dark">8 Items</span>
                </div>
                <div class="card-body p-0">
                    <div class="table-responsive">
                        <table class="table table-sm mb-0">
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Price</th>
                                    <th>Stock</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Mineral Water</td>
                                    <td>$3.50</td>
                                    <td>50</td>
                                    <td><span class="badge bg-success">In Stock</span></td>
                                </tr>
                                <tr>
                                    <td>Coffee</td>
                                    <td>$4.00</td>
                                    <td>30</td>
                                    <td><span class="badge bg-success">In Stock</span></td>
                                </tr>
                                <tr>
                                    <td>Tea</td>
                                    <td>$3.75</td>
                                    <td>25</td>
                                    <td><span class="badge bg-success">In Stock</span></td>
                                </tr>
                                <tr>
                                    <td>Snack Mix</td>
                                    <td>$5.25</td>
                                    <td>40</td>
                                    <td><span class="badge bg-success">In Stock</span></td>
                                </tr>
                                <tr>
                                    <td>Chocolate Bar</td>
                                    <td>$2.50</td>
                                    <td>35</td>
                                    <td><span class="badge bg-success">In Stock</span></td>
                                </tr>
                                <tr>
                                    <td>Caesar Salad</td>
                                    <td>$12.99</td>
                                    <td>15</td>
                                    <td><span class="badge bg-success">In Stock</span></td>
                                </tr>
                                <tr>
                                    <td>Ribeye Steak</td>
                                    <td>$42.99</td>
                                    <td>5</td>
                                    <td><span class="badge bg-warning">Low Stock</span></td>
                                </tr>
                                <tr>
                                    <td>Tiramisu</td>
                                    <td>$11.99</td>
                                    <td>0</td>
                                    <td><span class="badge bg-danger">Out of Stock</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Report Generation Section -->
    <div class="row mb-4">
        <div class="col-md-6">
            <div class="card">
                <div class="card-header bg-dark text-white">
                    <h5 class="mb-0"><i class="fas fa-file-alt me-2"></i>Generate Report</h5>
                </div>
                <div class="card-body">
                    <form id="report-form">
                        <div class="mb-3">
                            <label class="form-label">Report Type</label>
                            <select class="form-select" id="report-type">
                                <option value="occupancy">Occupancy Report</option>
                                <option value="revenue">Revenue Report</option>
                                <option value="guest">Guest Statistics</option>
                                <option value="reservation">Reservation Summary</option>
                                <option value="housekeeping">Housekeeping Report</option>
                                <option value="billing">Billing Summary</option>
                                <option value="pos">POS Sales Report</option>
                                <option value="pos_inventory">POS Inventory Report</option>
                            </select>
                        </div>
                        
                        <div class="row">
                            <div class="col-md-6">
                                <label class="form-label">Start Date</label>
                                <input type="date" class="form-control" required>
                            </div>
                            <div class="col-md-6">
                                <label class="form-label">End Date</label>
                                <input type="date" class="form-control" required>
                            </div>
                        </div>
                        
                        <div class="mt-3">
                            <label class="form-label">Format</label>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="format" value="pdf" checked>
                                <label class="form-check-label">PDF</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="format" value="excel">
                                <label class="form-check-label">Excel</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="format" value="csv">
                                <label class="form-check-label">CSV</label>
                            </div>
                        </div>
                        
                        <button type="submit" class="btn btn-primary mt-3 w-100">
                            <i class="fas fa-download me-2"></i>Generate Report
                        </button>
                    </form>
                </div>
            </div>
        </div>

        <!-- Key Metrics -->
        <div class="col-md-6">
            <div class="card">
                <div class="card-header bg-dark text-white">
                    <h5 class="mb-0"><i class="fas fa-chart-line me-2"></i>Key Metrics</h5>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="metric-card p-3 mb-3 bg-light rounded">
                                <h6 class="text-muted">Avg. Stay Length</h6>
                                <h3 class="text-primary">3.2 days</h3>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="metric-card p-3 mb-3 bg-light rounded">
                                <h6 class="text-muted">RevPAR</h6>
                                <h3 class="text-success">$89.45</h3>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="metric-card p-3 mb-3 bg-light rounded">
                                <h6 class="text-muted">Guest Satisfaction</h6>
                                <h3 class="text-warning">4.7/5.0</h3>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="metric-card p-3 mb-3 bg-light rounded">
                                <h6 class="text-muted">Repeat Guests</h6>
                                <h3 class="text-info">34%</h3>
                            </div>
                        </div>
                    </div>
                    
                    <div class="mt-3">
                        <h6><i class="fas fa-bell me-2"></i>Alerts & Notifications</h6>
                        <div class="alert alert-warning">
                            <i class="fas fa-exclamation-triangle me-2"></i>
                            Occupancy below target for next week: 65%
                        </div>
                        <div class="alert alert-info">
                            <i class="fas fa-info-circle me-2"></i>
                            Revenue target 85% achieved for current month
                        </div>
                        <div class="alert alert-danger">
                            <i class="fas fa-box me-2"></i>
                            Low stock alert: Ribeye Steak (5 remaining)
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Data Tables Section -->
    <div class="row">
        <div class="col-md-6">
            <div class="card">
                <div class="card-header bg-dark text-white">
                    <h5 class="mb-0"><i class="fas fa-calendar-alt me-2"></i>Occupancy Trends</h5>
                </div>
                <div class="card-body p-0">
                    <div class="table-responsive">
                        <table class="table table-sm mb-0">
                            <thead>
                                <tr>
                                    <th>Period</th>
                                    <th>Occupancy</th>
                                    <th>Avg. Rate</th>
                                    <th>Revenue</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>This Week</td>
                                    <td>78%</td>
                                    <td>$125</td>
                                    <td>$15,420</td>
                                </tr>
                                <tr>
                                    <td>Last Week</td>
                                    <td>82%</td>
                                    <td>$120</td>
                                    <td>$18,960</td>
                                </tr>
                                <tr>
                                    <td>This Month</td>
                                    <td>75%</td>
                                    <td>$118</td>
                                    <td>$68,450</td>
                                </tr>
                                <tr>
                                    <td>Last Month</td>
                                    <td>71%</td>
                                    <td>$115</td>
                                    <td>$62,340</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-md-6">
            <div class="card">
                <div class="card-header bg-dark text-white">
                    <h5 class="mb-0"><i class="fas fa-utensils me-2"></i>POS Sales by Category</h5>
                </div>
                <div class="card-body p-0">
                    <div class="table-responsive">
                        <table class="table table-sm mb-0">
                            <thead>
                                <tr>
                                    <th>Category</th>
                                    <th>Items Sold</th>
                                    <th>Revenue</th>
                                    <th>% of Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Beverages</td>
                                    <td>124</td>
                                    <td class="text-success">$487.50</td>
                                    <td>17%</td>
                                </tr>
                                <tr>
                                    <td>Food</td>
                                    <td>87</td>
                                    <td class="text-success">$1,245.75</td>
                                    <td>44%</td>
                                </tr>
                                <tr>
                                    <td>Snacks</td>
                                    <td>56</td>
                                    <td class="text-success">$312.25</td>
                                    <td>11%</td>
                                </tr>
                                <tr>
                                    <td>Desserts</td>
                                    <td>42</td>
                                    <td class="text-success">$289.50</td>
                                    <td>10%</td>
                                </tr>
                                <tr>
                                    <td>Other</td>
                                    <td>31</td>
                                    <td class="text-success">$512.50</td>
                                    <td>18%</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
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
                <option value="6">Caesar Salad - $12.99</option>
                <option value="7">Grilled Salmon - $28.99</option>
                <option value="8">Ribeye Steak - $42.99</option>
            </select>
            <input type="number" class="form-control w-25" name="quantity" value="1" min="1">
            <button type="button" class="btn btn-outline-danger btn-sm remove-item">✕</button>
        `;
        itemList.appendChild(newRow);
    });

    // Remove item row
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-item')) {
            e.target.closest('.item-row').remove();
            calculateTotal();
        }
    });

    // Calculate total when items change
    const calculateTotal = () => {
        const items = document.querySelectorAll('.item-row');
        let total = 0;
        items.forEach(row => {
            const itemId = row.querySelector('select').value;
            const quantity = parseInt(row.querySelector('input[name="quantity"]').value) || 0;

            // Simple price mapping
            const prices = { 
                '1': 3.50, '2': 4.00, '3': 3.75, '4': 5.25, '5': 2.50,
                '6': 12.99, '7': 28.99, '8': 42.99
            };
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
            alert('Transaction processed successfully!');
            // Reset form
            e.target.reset();
            document.getElementById('total-amount').value = '0.00';
            // Keep only one item row
            const itemList = document.querySelector('.item-list');
            while (itemList.children.length > 1) {
                itemList.removeChild(itemList.lastChild);
            }
        } catch (error) {
            console.error('POS transaction failed:', error);
            alert('Transaction failed. Please try again.');
        }
    });

    // Report generation
    document.getElementById('report-form')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const reportData = Object.fromEntries(formData);

        try {
            // In production: await apiService.post('/reports/generate', reportData);
            console.log('Generating report:', reportData);
            alert('Report would be generated and downloaded in production');
        } catch (error) {
            console.error('Report generation failed:', error);
        }
    });
}
};