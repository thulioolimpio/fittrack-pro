import { loadDashboard } from './dashboard.mjs';
import { loadWorkoutPage } from './workout.mjs';
import { loadMealsPage } from './meals.mjs';
import { loadProgressPage } from './progress.mjs';
import { loadPlannerPage } from './planner.mjs';

export function setupNavigation() {
    const navLinks = document.querySelectorAll('[data-page]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.getAttribute('data-page');
            
            if (!getCurrentUser()) {
                alert('Please login or register first.');
                return;
            }
            
            // Update active nav link
            document.querySelectorAll('[data-page]').forEach(navLink => {
                navLink.parentElement.classList.remove('active');
            });
            link.parentElement.classList.add('active');
            
            // Load the appropriate page
            switch(page) {
                case 'dashboard':
                    loadDashboard();
                    break;
                case 'workout':
                    loadWorkoutPage();
                    break;
                case 'meals':
                    loadMealsPage();
                    break;
                case 'progress':
                    loadProgressPage();
                    break;
                case 'planner':
                    loadPlannerPage();
                    break;
                default:
                    loadDashboard();
            }
        });
    });
}

export function getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
}

export function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}