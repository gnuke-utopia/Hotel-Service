// Guest View - F6, F7, F8: Guest profile and check-in/out
import { apiService } from '../services/ApiService.js';

export default {
    render: async () => {
        return `
            <div class="fade-in">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h2><i class="bi bi-people me-2"></i>Guest Management</h2>
                    <button class="btn btn-primary" id="newGuestBtn">
                        <i class="bi bi-person-plus me-2"></i>Add Guest
                    </button>
                </div>

                <div class="row mb-4">
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title"><i class="bi bi-person-plus me-2"></i>Add New Guest</h5>
                                <form id="add-guest-form">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <label class="form-label">First Name</label>
                                            <input type="text" class="form-control" required>
                                        </div>
                                        <div class="col-md-6">
                                            <label class="form-label">Last Name</label>
                                            <input type="text" class="form-control" required>
                                        </div>
                                    </div>
                                    <div class="row mt-3">
                                        <div class="col-md-6">
                                            <label class="form-label">Email</label>
                                            <input type="email" class="form-control">
                                        </div>
                                        <div class="col-md-6">
                                            <label class="form-label">Phone</label>
                                            <input type="tel" class="form-control">
                                        </div>
                                    </div>
                                    <div class="row mt-3">
                                        <div class="col-md-6">
                                            <label class="form-label">Nationality</label>
                                            <select class="form-select">
                                                <option value="">Select Country</option>
                                                <option value="US">United States</option>
                                                <option value="UK">United Kingdom</option>
                                                <option value="CA">Canada</option>
                                                <option value="AU">Australia</option>
                                            </select>
                                        </div>
                                        <div class="col-md-6">
                                            <label class="form-label">ID Number</label>
                                            <input type="text" class="form-control">
                                        </div>
                                    </div>
                                    <div class="mt-3">
                                        <label class="form-label">Address</label>
                                        <textarea class="form-control" rows="2"></textarea>
                                    </div>
                                    <button type="submit" class="btn btn-success mt-3 w-100">
                                        <i class="bi bi-person-plus me-2"></i>Add Guest
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title"><i class="bi bi-door-open me-2"></i>Check-in Process</h5>
                                <form id="checkin-form">
                                    <div class="mb-3">
                                        <label class="form-label">Select Guest</label>
                                        <select class="form-select" id="guest-select">
                                            <option value="">Search or select guest...</option>
                                            <option value="1">John Doe (Guest #GUEST001)</option>
                                            <option value="2">Jane Smith (Guest #GUEST002)</option>
                                        </select>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Reservation ID</label>
                                        <input type="text" class="form-control" placeholder="Enter reservation ID">
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Room Assignment</label>
                                        <select class="form-select">
                                            <option value="">Available Rooms</option>
                                            <option value="101">Room 101 - Double</option>
                                            <option value="205">Room 205 - Suite</option>
                                            <option value="312">Room 312 - Single</option>
                                        </select>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Check-in Notes</label>
                                        <textarea class="form-control" rows="2" placeholder="Any special notes..."></textarea>
                                    </div>
                                    <button type="submit" class="btn btn-primary w-100">
                                        <i class="bi bi-box-arrow-in-right me-2"></i>Complete Check-in
                                    </button>
                                </form>
                                
                                <div class="mt-3">
                                    <h6><i class="bi bi-door-closed me-2"></i>Check-out Process</h6>
                                    <button class="btn btn-warning w-100" id="checkout-btn">
                                        <i class="bi bi-box-arrow-left me-2"></i>Process Check-out
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header">
                        <h5 class="mb-0"><i class="bi bi-list-check me-2"></i>Guest Profiles</h5>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Guest ID</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Check-in</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>#GUEST001</td>
                                        <td>John Doe</td>
                                        <td>john@email.com</td>
                                        <td>+1-555-0123</td>
                                        <td>2026-02-10</td>
                                        <td><span class="badge bg-success">Checked-in</span></td>
                                        <td>
                                            <button class="btn btn-sm btn-outline-primary me-1">View</button>
                                            <button class="btn btn-sm btn-outline-info">Edit</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>#GUEST002</td>
                                        <td>Jane Smith</td>
                                        <td>jane@email.com</td>
                                        <td>+1-555-0456</td>
                                        <td>2026-02-12</td>
                                        <td><span class="badge bg-warning">Expected</span></td>
                                        <td>
                                            <button class="btn btn-sm btn-outline-primary me-1">View</button>
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
        document.getElementById('add-guest-form')?.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const guestData = Object.fromEntries(formData);

            try {
                // In production: await apiService.post('/guests', guestData);
                console.log('Adding guest:', guestData);
                alert('Guest added successfully in production');
            } catch (error) {
                console.error('Guest creation failed:', error);
            }
        });

        document.getElementById('checkin-form')?.addEventListener('submit', async (e) => {
            e.preventDefault();
            alert('Check-in would process reservation and update room status in production');
        });

        document.getElementById('checkout-btn')?.addEventListener('click', () => {
            alert('Check-out would calculate charges and update status in production');
        });

        document.getElementById('newGuestBtn')?.addEventListener('click', () => {
            // Focus on add guest form
            document.querySelector('#add-guest-form input[type="text"]').focus();
        });
    }
};