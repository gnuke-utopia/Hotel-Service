// Dashboard View - F15: Occupancy Reporting, F16: Revenue Reporting
// Dashboard View - F15: Occupancy Reporting, F16: Revenue Reporting
import { apiService } from '../services/ApiService.js';
export default {
render: async () => {
let stats = null;
    try {
        // Fetch live dashboard statistics
        stats = await apiService.get('/dashboard/stats');
    } catch (error) {
        console.error('Failed to load dashboard stats:', error);
        // Use fallback data
        stats = {
            totalRooms: 120,
            availableRooms: 45,
            occupiedRooms: 23,
            cleaningRooms: 8,
            totalReservations: 156,
            pendingReservations: 12,
            totalGuests: 234,
            todayRevenue: 3450.75,
            totalRevenue: 15420.50
        };
    }
    // Normalize stats to avoid undefined/null 
    stats = {
        totalRooms: stats?.totalRooms ?? 0,
        availableRooms: stats?.availableRooms ?? 0,
        occupiedRooms: stats?.occupiedRooms ?? 0,
        cleaningRooms: stats?.cleaningRooms ?? 0,
        totalReservations: stats?.totalReservations ?? 0,
        pendingReservations: stats?.pendingReservations ?? 0,
        totalGuests: stats?.totalGuests ?? 0,
        todayRevenue: stats?.todayRevenue ?? 0,
        totalRevenue: stats?.totalRevenue ?? 0
    };
    // Safe calculations 
    const occupancyRate = stats.totalRooms > 0
        ? ((stats.occupiedRooms / stats.totalRooms) * 100).toFixed(1)
        : "0.0";

    return `
        <div class="fade-in max-w-[1920px] mx-auto px-6 py-8">
            <!-- Date & Quick Actions Bar -->
            <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
                <div>
                    <h2 class="text-3xl font-heading font-semibold text-text-primary mb-1">Welcome Back, User</h2>
                    <p class="text-text-secondary flex items-center gap-2">
                        <i class="fas fa-calendar w-5 h-5"></i>
                        ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                </div>
            </div>

            <!-- Key Metrics Cards - Compact horizontal layout -->
            <div class="dashboard-container-flex">
                <!-- Occupancy Rate -->
                <div class="stat-card">
                    <div class="stat-icon primary">
                        <i class="fas fa-chart-pie"></i>
                    </div>
                    <div class="stat-content">
                        <div class="flex items-center justify-between">
                            <h3>${occupancyRate}%</h3>
                            <span class="badge bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">+5.2%</span>
                        </div>
                        <p>Occupancy Rate</p>
                    </div>
                </div>

                <!-- Available Rooms -->
                <div class="stat-card">
                    <div class="stat-icon success">
                        <i class="fas fa-bed"></i>
                    </div>
                    <div class="stat-content">
                        <div class="flex items-center justify-between">
                            <h3>${stats.availableRooms}</h3>
                            <span class="badge bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">Ready</span>
                        </div>
                        <p>Available Rooms</p>
                    </div>
                </div>

                <!-- Expected Arrivals -->
                <div class="stat-card">
                    <div class="stat-icon info">
                        <i class="fas fa-plane-arrival"></i>
                    </div>
                    <div class="stat-content">
                        <div class="flex items-center justify-between">
                            <h3>${stats.totalReservations || 24}</h3>
                            <span class="badge bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium">${stats.pendingReservations || 12} Pending</span>
                        </div>
                        <p>Expected Arrivals</p>
                    </div>
                </div>

                <!-- Housekeeping Tasks -->
                <div class="stat-card">
                    <div class="stat-icon warning">
                        <i class="fas fa-tasks"></i>
                    </div>
                    <div class="stat-content">
                        <div class="flex items-center justify-between">
                            <h3>${stats.cleaningRooms}</h3>
                            <span class="badge bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-medium">Urgent</span>
                        </div>
                        <p>Housekeeping Tasks</p>
                    </div>
                </div>
            </div>

            <!-- Main Dashboard Grid -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <!-- Right Column: Quick Stats -->
                <section class="card p-4 bg-white rounded-xl shadow-sm h-full">
                    <h3 class="text-lg font-bold text-gray-900 mb-3">Quick Stats</h3>
                    
                    <div class="dashboard-container-flex">
                    
                        <!-- Revenue Today -->
                        <div class="stat-card">
                            <div class="stat-icon success">
                                <i class="fas fa-dollar-sign"></i>
                            </div>
                            <div class="stat-content">
                                <h3>$${stats.todayRevenue.toLocaleString()}</h3>
                                <p>Revenue Today</p>
                            </div>
                        </div>

                        <!-- Avg. Daily Rate -->
                        <div class="stat-card">
                            <div class="stat-icon info">
                                <i class="fas fa-tag"></i>
                            </div>
                            <div class="stat-content">
                                <h3>$185</h3>
                                <p>Avg. Daily Rate</p>
                            </div>
                        </div>

                        <!-- Guest Satisfaction -->
                        <div class="stat-card">
                            <div class="stat-icon primary">
                                <i class="fas fa-star"></i>
                            </div>
                            <div class="stat-content">
                                <h3>4.8/5.0</h3>
                                <p>Guest Satisfaction</p>
                            </div>
                        </div>

                        <!-- Staff on Duty -->
                        <div class="stat-card">
                            <div class="stat-icon warning">
                                <i class="fas fa-users"></i>
                            </div>
                            <div class="stat-content">
                                <h3>24</h3>
                                <p>Staff on Duty</p>
                            </div>
                        </div>
                    </div>

                    <div class="mt-2 pt-2 border-t border-gray-100">
                        <a href="#" data-view="reports" class="block w-full text-center py-1.5 px-3 border border-gray-300 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                            View Analytics
                        </a>
                    </div>
                </section>

                <!-- Left Column: Quick Actions (Expanded) -->
                <div class="lg:col-span-2">
                    <div class="card p-4 bg-white rounded-xl shadow-sm">
                        <div class="card-header bg-white border-0 p-0 mb-4">
                            <h5 class="mb-0 text-lg font-bold"><i class="fas fa-bolt mr-2 text-primary"></i>Quick Actions</h5>
                        </div>
                        <div class="card-body p-0">
                            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                                <div class="quick-action-card p-4 rounded-xl border border-gray-200 hover:border-primary hover:shadow-md cursor-pointer transition-all text-center" data-action="new-reservation">
                                    <i class="fas fa-calendar-plus text-primary text-3xl mb-3"></i>
                                    <h5 class="font-semibold text-gray-900">New Reservation</h5>
                                    <p class="text-xs text-gray-500">Create booking</p>
                                </div>
                                <div class="quick-action-card p-4 rounded-xl border border-gray-200 hover:border-success hover:shadow-md cursor-pointer transition-all text-center" data-action="check-in">
                                    <i class="fas fa-sign-in-alt text-success text-3xl mb-3"></i>
                                    <h5 class="font-semibold text-gray-900">Check-In Guest</h5>
                                    <p class="text-xs text-gray-500">Process arrival</p>
                                </div>
                                <div class="quick-action-card p-4 rounded-xl border border-gray-200 hover:border-warning hover:shadow-md cursor-pointer transition-all text-center" data-action="check-out">
                                    <i class="fas fa-sign-out-alt text-warning text-3xl mb-3"></i>
                                    <h5 class="font-semibold text-gray-900">Check-Out Guest</h5>
                                    <p class="text-xs text-gray-500">Process departure</p>
                                </div>
                                <div class="quick-action-card p-4 rounded-xl border border-gray-200 hover:border-blue-500 hover:shadow-md cursor-pointer transition-all text-center" data-action="new-guest">
                                    <i class="fas fa-user-plus text-blue-500 text-3xl mb-3"></i>
                                    <h5 class="font-semibold text-gray-900">Add Guest</h5>
                                    <p class="text-xs text-gray-500">Create profile</p>
                                </div>
                                <div class="quick-action-card p-4 rounded-xl border border-gray-200 hover:border-gray-500 hover:shadow-md cursor-pointer transition-all text-center" data-action="room-status">
                                    <i class="fas fa-door-closed text-gray-500 text-3xl mb-3"></i>
                                    <h5 class="font-semibold text-gray-900">Room Status</h5>
                                    <p class="text-xs text-gray-500">Update room</p>
                                </div>
                                <div class="quick-action-card p-4 rounded-xl border border-gray-200 hover:border-purple-500 hover:shadow-md cursor-pointer transition-all text-center" data-action="generate-report">
                                    <i class="fas fa-chart-bar text-purple-500 text-3xl mb-3"></i>
                                    <h5 class="font-semibold text-gray-900">Reports</h5>
                                    <p class="text-xs text-gray-500">Analytics</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
},

postRender: () => {
    // Add event listeners for quick actions
    document.querySelectorAll('.quick-action-card').forEach(card => {
        card.addEventListener('click', (e) => {
            const action = card.getAttribute('data-action');
            switch (action) {
                case 'new-reservation':
                    window.app.router.navigateTo('reservations');
                    break;
                case 'check-in':
                    window.app.router.navigateTo('guests');
                    break;
                case 'check-out':
                    window.app.router.navigateTo('guests');
                    break;
                case 'new-guest':
                    window.app.router.navigateTo('guests');
                    break;
                case 'room-status':
                    window.app.router.navigateTo('rooms');
                    break;
                case 'generate-report':
                    window.app.router.navigateTo('reports');
                    break;
            }
        });
    });
}
};