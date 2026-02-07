// Report View - F15, F16: Reports and analytics
import { apiService } from '../services/ApiService.js';

export default {
    render: async () => {
        return `
            <div class="fade-in">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h2><i class="bi bi-bar-chart me-2"></i>Reports & Analytics</h2>
                    <button class="btn btn-primary" id="generateReportBtn">
                        <i class="bi bi-download me-2"></i>Generate Report
                    </button>
                </div>

                <div class="row mb-4">
                    <div class="col-md-3">
                        <div class="stat-card text-center">
                            <div class="stat-icon success">
                                <i class="bi bi-graph-up"></i>
                            </div>
                            <h3 class="mb-1">78%</h3>
                            <p class="text-muted mb-0">Occupancy Rate</p>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="stat-card text-center">
                            <div class="stat-icon primary">
                                <i class="bi bi-currency-dollar"></i>
                            </div>
                            <h3 class="mb-1">$15,420</h3>
                            <p class="text-muted mb-0">Monthly Revenue</p>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="stat-card text-center">
                            <div class="stat-icon info">
                                <i class="bi bi-people"></i>
                            </div>
                            <h3 class="mb-1">45</h3>
                            <p class="text-muted mb-0">Current Guests</p>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="stat-card text-center">
                            <div class="stat-icon warning">
                                <i class="bi bi-calendar-check"></i>
                            </div>
                            <h3 class="mb-1">23</h3>
                            <p class="text-muted mb-0">Bookings This Week</p>
                        </div>
                    </div>
                </div>

                <div class="row mb-4">
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title"><i class="bi bi-calendar-range me-2"></i>Generate Report</h5>
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
                                        <i class="bi bi-download me-2"></i>Generate Report
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title"><i class="bi bi-graph-up-arrow me-2"></i>Key Metrics</h5>
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
                                    <h6><i class="bi bi-bell me-2"></i>Alerts & Notifications</h6>
                                    <div class="alert alert-warning">
                                        <i class="bi bi-exclamation-triangle me-2"></i>
                                        Occupancy below target for next week: 65%
                                    </div>
                                    <div class="alert alert-info">
                                        <i class="bi bi-info-circle me-2"></i>
                                        Revenue target 85% achieved for current month
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-header">
                                <h5 class="mb-0"><i class="bi bi-list-check me-2"></i>Occupancy Trends</h5>
                            </div>
                            <div class="card-body">
                                <div class="table-responsive">
                                    <table class="table table-sm">
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
                            <div class="card-header">
                                <h5 class="mb-0"><i class="bi bi-list-check me-2"></i>Top Performing Rooms</h5>
                            </div>
                            <div class="card-body">
                                <div class="table-responsive">
                                    <table class="table table-sm">
                                        <thead>
                                            <tr>
                                                <th>Room</th>
                                                <th>Occupancy</th>
                                                <th>Nights Booked</th>
                                                <th>Revenue</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Room 205 - Suite</td>
                                                <td>92%</td>
                                                <td>28</td>
                                                <td>$4,200</td>
                                            </tr>
                                            <tr>
                                                <td>Room 101 - Double</td>
                                                <td>88%</td>
                                                <td>31</td>
                                                <td>$3,720</td>
                                            </tr>
                                            <tr>
                                                <td>Room 312 - King</td>
                                                <td>85%</td>
                                                <td>26</td>
                                                <td>$3,120</td>
                                            </tr>
                                            <tr>
                                                <td>Room 103 - Single</td>
                                                <td>78%</td>
                                                <td>24</td>
                                                <td>$1,920</td>
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

        document.getElementById('generateReportBtn')?.addEventListener('click', () => {
            // Scroll to report form
            document.getElementById('report-form')?.scrollIntoView({ behavior: 'smooth' });
        });
    }
};