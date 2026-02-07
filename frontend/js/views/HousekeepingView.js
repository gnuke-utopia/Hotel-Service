// Housekeeping View - F9, F10, F11: Room status and maintenance
import { apiService } from '../services/ApiService.js';

export default {
    render: async () => {
        return `
            <div class="fade-in">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h2><i class="bi bi-broom me-2"></i>Housekeeping Management</h2>
                    <button class="btn btn-primary" id="newTaskBtn">
                        <i class="bi bi-plus-circle me-2"></i>New Task
                    </button>
                </div>

                <div class="row mb-4">
                    <div class="col-md-3">
                        <div class="stat-card text-center">
                            <div class="stat-icon success">
                                <i class="bi bi-check-circle"></i>
                            </div>
                            <h3 class="mb-1">23</h3>
                            <p class="text-muted mb-0">Clean Rooms</p>
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
                            <div class="stat-icon danger">
                                <i class="bi bi-tools"></i>
                            </div>
                            <h3 class="mb-1">5</h3>
                            <p class="text-muted mb-0">Maintenance</p>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="stat-card text-center">
                            <div class="stat-icon info">
                                <i class="bi bi-person-check"></i>
                            </div>
                            <h3 class="mb-1">12</h3>
                            <p class="text-muted mb-0">Tasks Today</p>
                        </div>
                    </div>
                </div>

                <div class="row mb-4">
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title"><i class="bi bi-plus-circle me-2"></i>Assign Cleaning Task</h5>
                                <form id="assign-task-form">
                                    <div class="mb-3">
                                        <label class="form-label">Room Number</label>
                                        <select class="form-select" id="room-number">
                                            <option value="">Select Room</option>
                                            <option value="101">Room 101 - Double</option>
                                            <option value="102">Room 102 - Single</option>
                                            <option value="201">Room 201 - Suite</option>
                                            <option value="205">Room 205 - Double</option>
                                        </select>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Task Type</label>
                                        <select class="form-select" id="task-type">
                                            <option value="clean">Deep Clean</option>
                                            <option value="daily">Daily Maintenance</option>
                                            <option value="inspect">Quality Inspection</option>
                                            <option value="repair">Minor Repairs</option>
                                        </select>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Assigned To</label>
                                        <select class="form-select" id="assigned-staff">
                                            <option value="">Select Staff Member</option>
                                            <option value="maria">Maria Rodriguez</option>
                                            <option value="john">John Wilson</option>
                                            <option value="sarah">Sarah Chen</option>
                                        </select>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Priority</label>
                                        <select class="form-select" id="priority">
                                            <option value="low">Low</option>
                                            <option value="medium" selected>Medium</option>
                                            <option value="high">High</option>
                                            <option value="urgent">Urgent</option>
                                        </select>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Notes</label>
                                        <textarea class="form-control" rows="2" placeholder="Any special instructions..."></textarea>
                                    </div>
                                    <button type="submit" class="btn btn-primary w-100">
                                        <i class="bi bi-check-circle me-2"></i>Assign Task
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title"><i class="bi bi-wrench me-2"></i>Maintenance Request</h5>
                                <form id="maintenance-request-form">
                                    <div class="mb-3">
                                        <label class="form-label">Room Number</label>
                                        <select class="form-select" id="maintenance-room">
                                            <option value="">Select Room</option>
                                            <option value="101">Room 101 - Double</option>
                                            <option value="102">Room 102 - Single</option>
                                            <option value="201">Room 201 - Suite</option>
                                            <option value="205">Room 205 - Double</option>
                                        </select>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Issue Type</label>
                                        <select class="form-select" id="issue-type">
                                            <option value="">Select Issue</option>
                                            <option value="plumbing">Plumbing</option>
                                            <option value="electrical">Electrical</option>
                                            <option value="ac">Air Conditioning</option>
                                            <option value="furniture">Furniture Damage</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Description</label>
                                        <textarea class="form-control" rows="3" placeholder="Describe the issue..." required></textarea>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Severity</label>
                                        <select class="form-select" id="severity">
                                            <option value="low">Low</option>
                                            <option value="medium">Medium</option>
                                            <option value="high" selected>High</option>
                                            <option value="critical">Critical</option>
                                        </select>
                                    </div>
                                    <button type="submit" class="btn btn-warning w-100">
                                        <i class="bi bi-send me-2"></i>Submit Request
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header">
                        <h5 class="mb-0"><i class="bi bi-list-check me-2"></i>Cleaning Schedule</h5>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Room</th>
                                        <th>Task</th>
                                        <th>Assigned To</th>
                                        <th>Due Date</th>
                                        <th>Priority</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Room 101</td>
                                        <td>Daily Clean</td>
                                        <td>Maria Rodriguez</td>
                                        <td>Today 14:00</td>
                                        <td><span class="badge bg-info">Medium</span></td>
                                        <td><span class="badge bg-warning">In Progress</span></td>
                                        <td>
                                            <button class="btn btn-sm btn-outline-success me-1">Complete</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Room 205</td>
                                        <td>Deep Clean</td>
                                        <td>John Wilson</td>
                                        <td>Today 16:00</td>
                                        <td><span class="badge bg-warning">High</span></td>
                                        <td><span class="badge bg-secondary">Pending</span></td>
                                        <td>
                                            <button class="btn btn-sm btn-outline-info me-1">Start</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Room 312</td>
                                        <td>Inspection</td>
                                        <td>Sarah Chen</td>
                                        <td>Tomorrow 09:00</td>
                                        <td><span class="badge bg-success">Low</span></td>
                                        <td><span class="badge bg-secondary">Scheduled</span></td>
                                        <td>
                                            <button class="btn btn-sm btn-outline-info me-1">Reschedule</button>
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
        document.getElementById('assign-task-form')?.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const taskData = Object.fromEntries(formData);

            try {
                // In production: await apiService.post('/housekeeping/tasks', taskData);
                console.log('Assigning task:', taskData);
                alert('Task assigned successfully in production');
            } catch (error) {
                console.error('Task assignment failed:', error);
            }
        });

        document.getElementById('maintenance-request-form')?.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const requestData = Object.fromEntries(formData);

            try {
                // In production: await apiService.post('/maintenance', requestData);
                console.log('Submitting maintenance request:', requestData);
                alert('Maintenance request submitted in production');
            } catch (error) {
                console.error('Maintenance request failed:', error);
            }
        });

        document.getElementById('newTaskBtn')?.addEventListener('click', () => {
            // Scroll to assign task form
            document.getElementById('assign-task-form')?.scrollIntoView({ behavior: 'smooth' });
        });
    }
};