// Authentication Service
export class AuthService {
    constructor() {
        this.storageKey = 'hotelSys_currentUser';
        this.tokenKey = 'hotelSys_authToken';
        this.apiBase = 'http://localhost:3000/api';
        this.sessionTimeout = 15 * 60 * 1000; // 15 minutes
        this.activityTimer = null;
    }

    async login(username, password) {
        try {
            const response = await fetch(`${this.apiBase}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Login failed');
            }

            const result = await response.json();

            if (result.success && result.data) {
                // Store user and token
                sessionStorage.setItem(this.storageKey, JSON.stringify(result.data.user));
                sessionStorage.setItem(this.tokenKey, result.data.token);

                // Start session timer
                this.startSessionTimer();

                return result.data.user;
            }

            return null;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    }

    logout() {
        sessionStorage.removeItem(this.storageKey);
        sessionStorage.removeItem(this.tokenKey);
        this.clearSessionTimer();
    }

    getCurrentUser() {
        const userStr = sessionStorage.getItem(this.storageKey);
        return userStr ? JSON.parse(userStr) : null;
    }

    isAuthenticated() {
        const user = this.getCurrentUser();
        if (!user) return false;

        // Check if session has timed out
        const lastActivity = sessionStorage.getItem('hotelSys_lastActivity');
        if (lastActivity) {
            const elapsed = Date.now() - parseInt(lastActivity);
            if (elapsed > this.sessionTimeout) {
                this.logout();
                return false;
            }
        }

        return true;
    }

    hasRole(requiredRole) {
        const user = this.getCurrentUser();
        return user && user.role === requiredRole;
    }

    hasAnyRole(allowedRoles) {
        const user = this.getCurrentUser();
        return user && allowedRoles.includes(user.role);
    }

    getToken() {
        return sessionStorage.getItem(this.tokenKey);
    }

    startSessionTimer() {
        this.clearSessionTimer();

        this.activityTimer = setInterval(() => {
            // Update last activity
            sessionStorage.setItem('hotelSys_lastActivity', Date.now().toString());

            // Check if session should timeout
            const lastActivity = sessionStorage.getItem('hotelSys_lastActivity');
            if (lastActivity) {
                const elapsed = Date.now() - parseInt(lastActivity);
                if (elapsed > this.sessionTimeout) {
                    this.logout();
                    alert('Session expired due to inactivity. Please log in again.');
                }
            }
        }, 60000); // Check every minute
    }

    clearSessionTimer() {
        if (this.activityTimer) {
            clearInterval(this.activityTimer);
            this.activityTimer = null;
        }
    }

    trackActivity() {
        sessionStorage.setItem('hotelSys_lastActivity', Date.now().toString());
    }
}

// Export singleton instance
export const authService = new AuthService();

// Track user activity globally
document.addEventListener('mousemove', () => authService.trackActivity());
document.addEventListener('keydown', () => authService.trackActivity());
document.addEventListener('click', () => authService.trackActivity());