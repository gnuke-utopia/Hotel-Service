// Router - Handles view navigation
export class Router {
    constructor() {
        this.views = {
            dashboard: () => import('../views/DashboardView.js'),
            reservations: () => import('../views/ReservationView.js'),
            guests: () => import('../views/GuestView.js'),
            housekeeping: () => import('../views/HousekeepingView.js'),
            billing: () => import('../views/BillingView.js'),
            reports: () => import('../views/ReportView.js'),
            rooms: () => import('../views/RoomView.js')
        };

        this.container = document.getElementById('viewContainer');
    }

    async navigateTo(viewName) {
        if (!this.views[viewName]) {
            console.error(`View "${viewName}" not found`);
            return;
        }

        try {
            // Show loading state
            this.showLoading();

            // Dynamically import the view module
            const viewModule = await this.views[viewName]();
            const view = viewModule.default;

            // Render the view
            const html = await view.render();

            if (this.container) {
                this.container.innerHTML = html;

                // Call post-render if it exists
                if (view.postRender) {
                    view.postRender();
                }

                // Add fade-in animation
                this.container.classList.add('fade-in');
                setTimeout(() => {
                    if (this.container) this.container.classList.remove('fade-in');
                }, 500);
            }

        } catch (error) {
            console.error(`Error loading view "${viewName}":`, error);
            this.showError();
        }
    }

    showLoading() {
        this.container.innerHTML = `
            <div class="spinner-container">
                <div class="spinner-border spinner-border-custom text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        `;
    }

    showError() {
        this.container.innerHTML = `
            <div class="alert alert-danger" role="alert">
                <i class="bi bi-exclamation-triangle me-2"></i>
                Failed to load view. Please try again.
            </div>
        `;
    }
}
