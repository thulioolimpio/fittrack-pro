import { initializeAuth } from './auth.mjs';
import { loadDashboard } from './dashboard.mjs';
import { setupNavigation } from './uiHelpers.mjs';

document.addEventListener('DOMContentLoaded', () => {
    initializeAuth();
    setupNavigation();
    
    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user) {
        loadDashboard();
    }
});