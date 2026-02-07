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

                <!-- Key Metrics Cards -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <!-- Occupancy Rate -->
                    <div class="card hover:shadow-lg p-6 bg-white rounded-xl shadow-sm">
                        <div class="flex items-start justify-between mb-4">
                            <div class="p-3 bg-primary/10 rounded-lg text-primary">
                                <i class="fas fa-chart-pie text-2xl"></i>
                            </div>
                            <span class="badge bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">+5.2%</span>
                        </div>
                        <h3 class="text-2xl font-bold text-gray-900 mb-1">${occupancyRate}%</h3>
                        <p class="text-sm text-gray-500">Occupancy Rate</p>
                        <div class="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div class="h-full bg-primary" style="width: ${occupancyRate}%"></div>
                        </div>
                    </div>

                    <!-- Available Rooms -->
                    <div class="card hover:shadow-lg p-6 bg-white rounded-xl shadow-sm">
                        <div class="flex items-start justify-between mb-4">
                            <div class="p-3 bg-green-100 rounded-lg text-green-600">
                                <i class="fas fa-door-open text-2xl"></i>
                            </div>
                            <span class="badge bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">Ready</span>
                        </div>
                        <h3 class="text-2xl font-bold text-gray-900 mb-1">${stats.availableRooms}</h3>
                        <p class="text-sm text-gray-500">Available Rooms</p>
                        <p class="text-xs text-gray-400 mt-2">Out of ${stats.totalRooms} total rooms</p>
                    </div>

                    <!-- Today's Arrivals -->
                    <div class="card hover:shadow-lg p-6 bg-white rounded-xl shadow-sm">
                        <div class="flex items-start justify-between mb-4">
                            <div class="p-3 bg-blue-100 rounded-lg text-blue-600">
                                <i class="fas fa-plane-arrival text-2xl"></i>
                            </div>
                            <span class="badge bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium">${stats.pendingReservations || 12} Pending</span>
                        </div>
                        <h3 class="text-2xl font-bold text-gray-900 mb-1">${stats.totalReservations || 24}</h3>
                        <p class="text-sm text-gray-500">Expected Arrivals</p>
                        <p class="text-xs text-gray-400 mt-2">12 checked in, ${stats.pendingReservations || 12} pending</p>
                    </div>

                    <!-- Pending Tasks -->
                    <div class="card hover:shadow-lg p-6 bg-white rounded-xl shadow-sm">
                        <div class="flex items-start justify-between mb-4">
                            <div class="p-3 bg-yellow-100 rounded-lg text-yellow-600">
                                <i class="fas fa-tasks text-2xl"></i>
                            </div>
                            <span class="badge bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-medium">Urgent</span>
                        </div>
                        <h3 class="text-2xl font-bold text-gray-900 mb-1">${stats.cleaningRooms}</h3>
                        <p class="text-sm text-gray-500">Housekeeping Tasks</p>
                        <p class="text-xs text-gray-400 mt-2">3 rooms need immediate attention</p>
                    </div>
                </div>

                <!-- Main Dashboard Grid -->
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <!-- Right Column: Quick Stats -->
                     <section class="card p-6 bg-white rounded-xl shadow-sm h-full">
                        <h3 class="text-lg font-bold text-gray-900 mb-6">Quick Stats</h3>
                        <div class="space-y-4">
                            <div class="flex items-center justify-between">
                                <span class="text-sm text-gray-500">Revenue Today</span>
                                <span class="text-lg font-semibold text-green-600">$${stats.todayRevenue.toLocaleString()}</span>
                            </div>
                            <div class="flex items-center justify-between">
                                <span class="text-sm text-gray-500">Avg. Daily Rate</span>
                                <span class="text-lg font-semibold text-gray-900">$185</span>
                            </div>
                            <div class="flex items-center justify-between">
                                <span class="text-sm text-gray-500">Guest Satisfaction</span>
                                <span class="text-lg font-semibold text-green-600">4.8/5.0</span>
                            </div>
                            <div class="flex items-center justify-between">
                                <span class="text-sm text-gray-500">Staff on Duty</span>
                                <span class="text-lg font-semibold text-gray-900">24</span>
                            </div>
                        </div>
                        <div class="mt-6 pt-6 border-t border-gray-100">
                             <a href="#" data-view="reports" class="block w-full text-center py-2 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                                View Analytics
                            </a>
                        </div>
                    </section>

                    <!-- Left Column: Quick Actions (Expanded) -->
                    <div class="lg:col-span-2">
                        <div class="card p-6 bg-white rounded-xl shadow-sm">
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