// ViewLoader - Handles dynamic view loading and caching
export class ViewLoader {
    constructor() {
        this.cache = new Map(); // Cache for loaded views
        this.loadingPromises = new Map(); // Track ongoing loads to prevent duplicates
    }

    /**
     * Load a view module dynamically
     * @param {string} viewName - Name of the view to load
     * @returns {Promise<Object>} The view module object
     */
    async loadView(viewName) {
        // Check if view is already in cache
        if (this.cache.has(viewName)) {
            return this.cache.get(viewName);
        }

        // Check if load is already in progress
        if (this.loadingPromises.has(viewName)) {
            return this.loadingPromises.get(viewName);
        }

        // Define the import promise
        const importPromise = this.importView(viewName);

        // Store the promise while loading
        this.loadingPromises.set(viewName, importPromise);

        try {
            const viewModule = await importPromise;
            // Cache the loaded module
            this.cache.set(viewName, viewModule);
            // Remove the loading promise
            this.loadingPromises.delete(viewName);
            return viewModule;
        } catch (error) {
            console.error(`Failed to load view "${viewName}":`, error);
            // Remove the loading promise on error
            this.loadingPromises.delete(viewName);
            throw error;
        }
    }

    /**
     * Actually perform the dynamic import
     * @private
     */
    async importView(viewName) {
        const viewMap = {
            'dashboard': () => import('../views/DashboardView.js'),
            'reservations': () => import('../views/ReservationView.js'),
            'guests': () => import('../views/GuestView.js'),
            'housekeeping': () => import('../views/HousekeepingView.js'),
            'billing': () => import('../views/BillingView.js'),
            'reports': () => import('../views/ReportView.js'),
            'rooms': () => import('../views/RoomView.js')
        };

        const importFunction = viewMap[viewName];
        if (!importFunction) {
            throw new Error(`Unknown view: ${viewName}`);
        }

        return importFunction();
    }

    /**
     * Clear the view cache (useful for debugging or updates)
     */
    clearCache() {
        this.cache.clear();
    }

    /**
     * Get currently cached view names
     * @returns {Array<string>}
     */
    getCachedViews() {
        return Array.from(this.cache.keys());
    }
}