// API Service - Centralized and Handle API communication (NF1: Response Time, NF8: TLS encryption)
export class ApiService {
    constructor() {
        this.baseURL = 'http://localhost:3000/api'; // Backend server URL
        this.timeout = 10000; // 10 seconds timeout
    }

    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.timeout);

        // Add authentication token if available
        const token = sessionStorage.getItem('hotelSys_authToken');
        const defaultOptions = {
            headers: {
                'Content-Type': 'application/json',
                ...(token && { 'Authorization': `Bearer ${token}` })
            }
        };

        try {
            const response = await fetch(url, {
                ...defaultOptions,
                ...options,
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            if (error.name === 'AbortError') {
                throw new Error('Request timeout - please try again');
            }
            console.error('API request failed:', error);
            throw error;
        }
    }

    async get(endpoint, params = {}) {
        const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
        return this.request(`${endpoint}${queryString}`, { method: 'GET' });
    }

    async post(endpoint, data) {
        return this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    async put(endpoint, data) {
        return this.request(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    }

    async delete(endpoint) {
        return this.request(endpoint, { method: 'DELETE' });
    }
}

// Export singleton instance
export const apiService = new ApiService();