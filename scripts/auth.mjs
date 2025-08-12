// auth.mjs
export function initializeAuth() {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const toggleAuth = document.getElementById('toggle-auth');
    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document.getElementById('register-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const authSection = document.getElementById('auth-section');
    const appContainer = document.getElementById('app-container');

    // Função melhorada para redirecionar para o dashboard
    async function redirectToDashboard() {
        try {
            authSection.style.display = 'none';
            appContainer.innerHTML = '';
            
            // Carrega o módulo do dashboard dinamicamente
            const dashboardModule = await import('./dashboard.mjs');
            
            // Verifica se a função initializeApp existe (da versão anterior)
            if (dashboardModule.initializeApp) {
                dashboardModule.initializeApp();
            } else {
                // Fallback para versão mais antiga
                dashboardModule.loadDashboard(true);
            }
        } catch (error) {
            console.error('Failed to load dashboard:', error);
            showAuthError('Erro ao carregar o dashboard. Tente recarregar a página.');
            authSection.style.display = 'block';
        }
    }

    // Mostrar mensagens de erro estilizadas
    function showAuthError(message) {
        const errorEl = document.createElement('div');
        errorEl.className = 'auth-error';
        errorEl.textContent = message;
        
        // Insere antes do primeiro formulário
        authSection.insertBefore(errorEl, authSection.firstChild);
        
        // Remove após 5 segundos
        setTimeout(() => {
            if (errorEl.parentNode) {
                errorEl.remove();
            }
        }, 5000);
    }

    // Toggle entre login e registro - versão mais robusta
    function toggleAuthForms() {
        const isLoginVisible = loginForm.style.display !== 'none';
        
        loginForm.style.display = isLoginVisible ? 'none' : 'block';
        registerForm.style.display = isLoginVisible ? 'block' : 'none';
        
        toggleAuth.innerHTML = isLoginVisible 
            ? 'Já tem uma conta? <a href="#" class="text-primary">Faça login</a>'
            : 'Não tem uma conta? <a href="#" class="text-primary">Registre-se</a>';
    }

    toggleAuth.addEventListener('click', (e) => {
        e.preventDefault();
        toggleAuthForms();
    });

    // Validação de formulário genérica
    function validateForm(form) {
        const inputs = form.querySelectorAll('input[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.classList.add('invalid');
                isValid = false;
            } else {
                input.classList.remove('invalid');
            }
        });
        
        return isValid;
    }

    // Login form submission - versão melhorada
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (!validateForm(loginForm)) {
            showAuthError('Por favor, preencha todos os campos obrigatórios!');
            return;
        }

        const email = loginForm.querySelector('input[type="email"]').value;
        const password = loginForm.querySelector('input[type="password"]').value;

        try {
            // Simulação de API - substitua por sua implementação real
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(u => u.email === email && u.password === password);

            if (user) {
                localStorage.setItem('currentUser', JSON.stringify(user));
                updateAuthState(true);
                await redirectToDashboard();
            } else {
                showAuthError('Credenciais inválidas!');
            }
        } catch (error) {
            console.error('Login error:', error);
            showAuthError('Erro durante o login. Tente novamente.');
        }
    });

    // Register form submission - versão melhorada
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (!validateForm(registerForm)) {
            showAuthError('Por favor, preencha todos os campos obrigatórios!');
            return;
        }

        const formData = {
            name: registerForm.querySelector('input[type="text"]').value,
            email: registerForm.querySelector('input[type="email"]').value,
            password: registerForm.querySelector('input[type="password"]').value,
            age: registerForm.querySelector('input[placeholder="Age"]').value,
            height: registerForm.querySelector('input[placeholder="Height (cm)"]').value,
            weight: registerForm.querySelector('input[placeholder="Weight (kg)"]').value,
            goal: document.getElementById('fitness-goal').value
        };

        try {
            const users = JSON.parse(localStorage.getItem('users')) || [];
            
            // Verifica se o email já existe
            if (users.some(u => u.email === formData.email)) {
                showAuthError('Este email já está cadastrado!');
                return;
            }

            const newUser = {
                id: Date.now().toString(),
                ...formData,
                weightHistory: [{ 
                    date: new Date().toISOString(), 
                    weight: parseFloat(formData.weight) || 0 
                }],
                createdAt: new Date().toISOString()
            };

            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('currentUser', JSON.stringify(newUser));

            updateAuthState(true);
            await redirectToDashboard();
        } catch (error) {
            console.error('Registration error:', error);
            showAuthError('Erro durante o registro. Tente novamente.');
        }
    });

    // Logout - versão melhorada
    logoutBtn.addEventListener('click', () => {
        try {
            localStorage.removeItem('currentUser');
            updateAuthState(false);
            
            // Reset forms
            loginForm.reset();
            registerForm.reset();
            
            // Mostra a seção de auth
            authSection.style.display = 'block';
            appContainer.innerHTML = '';
            appContainer.appendChild(authSection);
            
            // Garante que o formulário de login esteja visível
            loginForm.style.display = 'block';
            registerForm.style.display = 'none';
            toggleAuth.innerHTML = 'Não tem uma conta? <a href="#" class="text-primary">Registre-se</a>';
        } catch (error) {
            console.error('Logout error:', error);
        }
    });

    // Atualiza estado de autenticação - versão melhorada
    function updateAuthState(isLoggedIn) {
        loginBtn.style.display = isLoggedIn ? 'none' : 'block';
        registerBtn.style.display = isLoggedIn ? 'none' : 'block';
        logoutBtn.style.display = isLoggedIn ? 'block' : 'none';
        authSection.style.display = isLoggedIn ? 'none' : 'block';
    }

    // Verifica estado inicial - versão mais robusta
    function checkAuthState() {
        try {
            const userJson = localStorage.getItem('currentUser');
            if (userJson) {
                const user = JSON.parse(userJson);
                if (user && user.email) { // Verificação básica de usuário válido
                    updateAuthState(true);
                    redirectToDashboard();
                    return;
                }
            }
            updateAuthState(false);
        } catch (error) {
            console.error('Auth state check error:', error);
            updateAuthState(false);
        }
    }

    // Inicializa o sistema de auth
    checkAuthState();
}