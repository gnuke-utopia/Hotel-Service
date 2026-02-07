// Reservation View - F2, F3, F4, F5: Reservation management
import { apiService } from '../services/ApiService.js';

export default {
    render: async () => {
        return `
            <div class="fade-in">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h2><i class="bi bi-calendar-check me-2"></i>Reservation Management</h2>
                    <button class="btn btn-primary" id="newReservationBtn">
                        <i class="bi bi-plus-circle me-2"></i>New Reservation
                    </button>
                </div>

                <div class="row mb-4">
                    <div class="col-md-12">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title"><i class="bi bi-search me-2"></i>Search Availability</h5>
                                <form id="availability-search-form">
                                    <div class="row">
                                        <div class="col-md-3">
                                            <label class="form-label">Check-in Date</label>
                                            <input type="date" class="form-control" id="checkin-date" required>
                                        </div>
                                        <div class="col-md-3">
                                            <label class="form-label">Check-out Date</label>
                                            <input type="date" class="form-control" id="checkout-date" required>
                                        </div>
                                        <div class="col-md-2">
                                            <label class="form-label">Adults</label>
                                            <select class="form-select" id="adults-count">
                                                <option value="1">1</option>
                                                <option value="2" selected>2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                            </select>
                                        </div>
                                        <div class="col-md-2">
                                            <label class="form-label">Children</label>
                                            <select class="form-select" id="children-count">
                                                <option value="0" selected>0</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                            </select>
                                        </div>
                                        <div class="col-md-2">
                                            <button type="submit" class="btn btn-success w-100 mt-2">
                                                <i class="bi bi-search me-1"></i>Search
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header">
                        <h5 class="mb-0"><i class="bi bi-list-check me-2"></i>Current Reservations</h5>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Reservation ID</th>
                                        <th>Guest Name</th>
                                        <th>Room</th>
                                        <th>Check-in</th>
                                        <th>Check-out</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody id="reservations-table">
                                    <tr>
                                        <td>#RES001</td>
                                        <td>John Doe</td>
                                        <td>Room 101</td>
                                        <td>2026-02-10</td>
                                        <td>2026-02-15</td>
                                        <td><span class="badge bg-primary">Confirmed</span></td>
                                        <td>
                                            <button class="btn btn-sm btn-outline-primary me-1">Edit</button>
                                            <button class="btn btn-sm btn-outline-danger">Cancel</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>#RES002</td>
                                        <td>Jane Smith</td>
                                        <td>Room 205</td>
                                        <td>2026-02-12</td>
                                        <td>2026-02-18</td>
                                        <td><span class="badge bg-warning">Pending</span></td>
                                        <td>
                                            <button class="btn btn-sm btn-outline-primary me-1">Edit</button>
                                            <button class="btn btn-sm btn-outline-danger">Cancel</button>
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
        // Form submission handlers
        document.getElementById('availability-search-form')?.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const searchParams = Object.fromEntries(formData);

            try {
                // Simulate API call
                console.log('Searching availability:', searchParams);
                // In production: const results = await apiService.get('/reservations/search', searchParams);
            } catch (error) {
                console.error('Search failed:', error);
            }
        });

        document.getElementById('newReservationBtn')?.addEventListener('click', () => {
            // Handle new reservation creation
            alert('New reservation form would open in production');
        });
    }
};