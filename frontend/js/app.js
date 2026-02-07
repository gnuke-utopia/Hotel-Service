// Main Application Entry Point
import { AuthService } from './services/AuthService.js';
import { Router } from './core/Router.js';
import { ViewLoader } from './core/ViewLoader.js';

class HotelApp {
    constructor() {
        this.authService = new AuthService();
        this.router = new Router();
        this.viewLoader = new ViewLoader();
        this.currentUser = null;
    }

    async init() {
        console.log('Initializing HotelSys Pro...');

        // Check if user is logged in
        this.currentUser = this.authService.getCurrentUser();

        if (!this.currentUser) {
            this.showLoginModal();
        } else {
            this.setupApplication();
        }
    }

    showLoginModal() {
        const modalElement = document.getElementById('loginModal');
        const loginModal = new bootstrap.Modal(modalElement);
        loginModal.show();

        const loginForm = document.getElementById('loginForm');
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            try {
                const user = await this.authService.login(username, password);

                if (user) {
                    this.currentUser = user;
                    loginModal.hide();
                    this.setupApplication();
                } else {
                    alert('Invalid credentials. Please try again.');
                }
            } catch (error) {
                console.error('Login error:', error);
                alert('Login failed. Please try again.');
            }
        });
    }

    setupApplication() {
        console.log('Setting up application...');

        // Update user info in UI
        this.updateUserInfo();

        // Setup navigation
        this.setupNavigation();

        // Setup logout
        this.setupLogout();

        // Setup mobile menu
        this.setupMobileMenu();

        // Load initial view
        this.router.navigateTo('dashboard');

        console.log('Application ready!');
    }

    updateUserInfo() {
        document.getElementById('userName').textContent = this.currentUser.username;
        document.getElementById('userRole').textContent = this.getRoleDisplay(this.currentUser.role);
        document.getElementById('userInitials').textContent = this.currentUser.username.charAt(0).toUpperCase();
    }

    getRoleDisplay(role) {
        const roles = {
            'admin': 'Administrator',
            'front_desk': 'Front Desk',
            'housekeeping': 'Housekeeping',
            'manager': 'Manager'
        };
        return roles[role] || role;
    }

    setupNavigation() {
        const navLinks = document.querySelectorAll('[data-view]');

        console.log('Found', navLinks.length, 'navigation links');

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();

                // Update active state
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');

                // Get view name
                const viewName = link.dataset.view;
                console.log('Navigating to:', viewName);

                // Update page title
                const titleText = link.querySelector('span').textContent;
                document.getElementById('pageTitle').textContent = titleText;

                // Navigate to view
                this.router.navigateTo(viewName);
            });
        });
    }

    setupLogout() {
        document.getElementById('logoutBtn').addEventListener('click', (e) => {
            e.preventDefault();

            if (confirm('Are you sure you want to logout?')) {
                this.authService.logout();
                window.location.reload();
            }
        });
    }

    setupMobileMenu() {
        const menuToggle = document.getElementById('menuToggle');
        const sidebar = document.getElementById('sidebar');

        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('show');
        });
    }
}

// Make app globally accessible for debugging
window.app = null;

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
    try {
        console.log('DOM ready, initializing app...');
        window.app = new HotelApp();
        await window.app.init();
    } catch (err) {
        console.error('Initialization error:', err);
    }
});