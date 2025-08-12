import { loadDashboard } from './dashboard.mjs';
import { loadWorkoutPage } from './workout.mjs';
import { loadMealsPage } from './meals.mjs';
import { loadProgressPage } from './progress.mjs';
import { loadPlannerPage } from './planner.mjs';

// Objeto com mapeamento de páginas para funções de carregamento
const pageLoaders = {
    dashboard: loadDashboard,
    workout: loadWorkoutPage,
    meals: loadMealsPage,
    progress: loadProgressPage,
    planner: loadPlannerPage
};

export function setupNavigation() {
    const navLinks = document.querySelectorAll('[data-page]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', async (e) => {
            e.preventDefault();
            const page = link.getAttribute('data-page');
            
            // Verifica se o usuário está logado
            if (!getCurrentUser()) {
                showToast('Please login or register first.', 'error');
                showAuthSection(); // Mostra a seção de autenticação
                return;
            }
            
            try {
                // Atualiza o link ativo na navegação
                updateActiveNavLink(link);
                
                // Mostra a seção correspondente
                showSection(page);
                
                // Carrega o conteúdo da página
                const loader = pageLoaders[page];
                if (loader) {
                    await loader(); // Usa await caso as funções sejam assíncronas
                }
                
                // Rola para o topo da página
                window.scrollTo(0, 0);
            } catch (error) {
                console.error(`Error loading ${page} page:`, error);
                showToast('Failed to load page. Please try again.', 'error');
            }
        });
    });
}

function showAuthSection() {
    // Esconde todas as seções de conteúdo
    document.querySelectorAll('.content-section').forEach(section => {
        section.style.display = 'none';
    });
    
    // Mostra a seção de autenticação
    const authSection = document.getElementById('auth-section');
    if (authSection) {
        authSection.style.display = 'block';
    }
}

function updateActiveNavLink(activeLink) {
    document.querySelectorAll('.nav-link').forEach(navLink => {
        navLink.classList.remove('active');
    });
    activeLink.classList.add('active');
}

export function getCurrentUser() {
    try {
        return JSON.parse(localStorage.getItem('currentUser'));
    } catch (error) {
        console.error('Error parsing current user:', error);
        return null;
    }
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

export function showSection(sectionId) {
    // Esconde todas as seções
    document.querySelectorAll('.content-section').forEach(section => {
        section.style.display = 'none';
    });
    
    // Mostra a seção solicitada
    const section = document.getElementById(`${sectionId}-section`);
    if (section) {
        section.style.display = 'block';
    }
}