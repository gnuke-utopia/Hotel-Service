// Room View - Room management interface
import { apiService } from '../services/ApiService.js';

export default {
    render: async () => {
        return `
            <div class="fade-in">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h2><i class="bi bi-door-open me-2"></i>Room Management</h2>
                    <button class="btn btn-primary" id="newRoomBtn">
                        <i class="bi bi-plus-circle me-2"></i>Add Room
                    </button>
                </div>

                <div class="row mb-4">
                    <div class="col-md-3">
                        <div class="stat-card text-center">
                            <div class="stat-icon success">
                                <i class="bi bi-check-circle"></i>
                            </div>
                            <h3 class="mb-1">45</h3>
                            <p class="text-muted mb-0">Available</p>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="stat-card text-center">
                            <div class="stat-icon danger">
                                <i class="bi bi-x-circle"></i>
                            </div>
                            <h3 class="mb-1">23</h3>
                            <p class="text-muted mb-0">Occupied</p>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="stat-card text-center">
                            <div class="stat-icon warning">
                                <i class="bi bi-exclamation-triangle"></i>
                            </div>
                            <h3 class="mb-1">8</h3>
                            <p class="text-muted mb-0">Needs Cleaning</p>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="stat-card text-center">
                            <div class="stat-icon info">
                                <i class="bi bi-tools"></i>
                            </div>
                            <h3 class="mb-1">5</h3>
                            <p class="text-muted mb-0">Maintenance</p>
                        </div>
                    </div>
                </div>

                <div class="row mb-4">
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title"><i class="bi bi-plus-circle me-2"></i>Add New Room</h5>
                                <form id="add-room-form">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <label class="form-label">Room Number</label>
                                            <input type="text" class="form-control" placeholder="e.g., 101, 205A" required>
                                        </div>
                                        <div class="col-md-6">
                                            <label class="form-label">Floor</label>
                                            <input type="number" class="form-control" min="1" max="20" value="1" required>
                                        </div>
                                    </div>
                                    <div class="row mt-3">
                                        <div class="col-md-6">
                                            <label class="form-label">Room Type</label>
                                            <select class="form-select" id="room-type">
                                                <option value="single">Single</option>
                                                <option value="double" selected>Double</option>
                                                <option value="twin">Twin</option>
                                                <option value="suite">Suite</option>
                                                <option value="king">King</option>
                                                <option value="presidential">Presidential</option>
                                            </select>
                                        </div>
                                        <div class="col-md-6">
                                            <label class="form-label">Max Occupancy</label>
                                            <select class="form-select" id="max-occupancy">
                                                <option value="1">1 Person</option>
                                                <option value="2" selected>2 People</option>
                                                <option value="3">3 People</option>
                                                <option value="4">4 People</option>
                                                <option value="6">6 People</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="row mt-3">
                                        <div class="col-md-6">
                                            <label class="form-label">Rate per Night</label>
                                            <input type="number" class="form-control" placeholder="0.00" step="0.01" required>
                                        </div>
                                        <div class="col-md-6">
                                            <label class="form-label">Features</label>
                                            <select class="form-select" multiple>
                                                <option value="balcony">Balcony</option>
                                                <option value="ocean_view">Ocean View</option>
                                                <option value="mountain_view">Mountain View</option>
                                                <option value="jacuzzi">Jacuzzi</option>
                                                <option value="kitchenette">Kitchenette</option>
                                                <option value="accessible">Accessible</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="mt-3">
                                        <label class="form-label">Description</label>
                                        <textarea class="form-control" rows="2" placeholder="Room description..."></textarea>
                                    </div>
                                    <button type="submit" class="btn btn-success mt-3 w-100">
                                        <i class="bi bi-plus-circle me-2"></i>Add Room
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title"><i class="bi bi-pen me-2"></i>Room Status Update</h5>
                                <form id="status-update-form">
                                    <div class="mb-3">
                                        <label class="form-label">Select Room</label>
                                        <select class="form-select" id="room-select">
                                            <option value="">Select a room...</option>
                                            <option value="101">Room 101 - Double (Available)</option>
                                            <option value="102">Room 102 - Single (Occupied)</option>
                                            <option value="205">Room 205 - Suite (Cleaning)</option>
                                            <option value="312">Room 312 - King (Maintenance)</option>
                                        </select>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Current Status</label>
                                        <select class="form-select" id="current-status">
                                            <option value="available">Available</option>
                                            <option value="occupied">Occupied</option>
                                            <option value="cleaning">Needs Cleaning</option>
                                            <option value="maintenance">Under Maintenance</option>
                                            <option value="reserved">Reserved</option>
                                            <option value="out_of_order">Out of Order</option>
                                        </select>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Next Status</label>
                                        <select class="form-select" id="next-status">
                                            <option value="available">Available</option>
                                            <option value="occupied">Occupied</option>
                                            <option value="cleaning">Needs Cleaning</option>
                                            <option value="maintenance">Under Maintenance</option>
                                            <option value="reserved">Reserved</option>
                                            <option value="out_of_order">Out of Order</option>
                                        </select>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Notes</label>
                                        <textarea class="form-control" rows="2" placeholder="Any additional information..."></textarea>
                                    </div>
                                    <button type="submit" class="btn btn-primary w-100">
                                        <i class="bi bi-check-circle me-2"></i>Update Status
                                    </button>
                                </form>
                                
                                <div class="mt-3">
                                    <h6><i class="bi bi-image me-2"></i>Room Photos</h6>
                                    <div class="border rounded p-3">
                                        <input type="file" class="form-control" accept="image/*" multiple>
                                        <button class="btn btn-sm btn-outline-primary mt-2">
                                            <i class="bi bi-upload me-1"></i>Upload Photos
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header">
                        <h5 class="mb-0"><i class="bi bi-list-check me-2"></i>Room Inventory</h5>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Room #</th>
                                        <th>Type</th>
                                        <th>Floor</th>
                                        <th>Rate</th>
                                        <th>Status</th>
                                        <th>Occupancy</th>
                                        <th>Features</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody id="rooms-table-body">
                                    <tr>
                                        <td>101</td>
                                        <td>Double</td>
                                        <td>1st Floor</td>
                                        <td>$125/night</td>
                                        <td><span class="badge bg-success">Available</span></td>
                                        <td>2/2</td>
                                        <td>WiFi, TV, Mini-bar</td>
                                        <td>
                                            <button class="btn btn-sm btn-outline-primary me-1">View</button>
                                            <button class="btn btn-sm btn-outline-info">Edit</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>102</td>
                                        <td>Single</td>
                                        <td>1st Floor</td>
                                        <td>$95/night</td>
                                        <td><span class="badge bg-warning">Occupied</span></td>
                                        <td>1/1</td>
                                        <td>WiFi, TV</td>
                                        <td>
                                            <button class="btn btn-sm btn-outline-primary me-1">View</button>
                                            <button class="btn btn-sm btn-outline-info">Edit</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>205</td>
                                        <td>Suite</td>
                                        <td>2nd Floor</td>
                                        <td>$250/night</td>
                                        <td><span class="badge bg-info">Cleaning</span></td>
                                        <td>0/4</td>
                                        <td>WiFi, TV, Jacuzzi, Kitchen</td>
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
        document.getElementById('add-room-form')?.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const roomData = Object.fromEntries(formData);
            
            try {
                // In production: await apiService.post('/rooms', roomData);
                console.log('Adding room:', roomData);
                alert('Room added to inventory successfully in production');
            } catch (error) {
                console.error('Room addition failed:', error);
            }
        });

        document.getElementById('status-update-form')?.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const statusData = Object.fromEntries(formData);
            
            try {
                // In production: await apiService.put(`/rooms/${statusData.roomId}/status`, statusData);
                console.log('Updating room status:', statusData);
                alert('Room status updated successfully in production');
            } catch (error) {
                console.error('Room status update failed:', error);
            }
        });

        document.getElementById('newRoomBtn')?.addEventListener('click', () => {
            // Focus on add room form
            document.querySelector('#add-room-form input[type="text"]').focus();
        });
    }
};