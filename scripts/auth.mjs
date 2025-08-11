export function initializeAuth() {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const toggleAuth = document.getElementById('toggle-auth');
    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document.getElementById('register-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const authSection = document.getElementById('auth-section');
    const appContainer = document.getElementById('app-container');

    // Toggle between login and register forms
    toggleAuth.addEventListener('click', () => {
        if (loginForm.style.display === 'none') {
            loginForm.style.display = 'block';
            registerForm.style.display = 'none';
            toggleAuth.textContent = "Don't have an account? Register now";
        } else {
            loginForm.style.display = 'none';
            registerForm.style.display = 'block';
            toggleAuth.textContent = "Already have an account? Login";
        }
    });

    // Login functionality
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = loginForm.querySelector('input[type="email"]').value;
        const password = loginForm.querySelector('input[type="password"]').value;
        
        // Check if user exists
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            authSection.style.display = 'none';
            loadDashboard();
            loginBtn.style.display = 'none';
            registerBtn.style.display = 'none';
            logoutBtn.style.display = 'block';
        } else {
            alert('Invalid credentials. Please try again.');
        }
    });

    // Register functionality
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = registerForm.querySelector('input[type="text"]').value;
        const email = registerForm.querySelector('input[type="email"]').value;
        const password = registerForm.querySelector('input[type="password"]').value;
        const age = registerForm.querySelector('input[type="number"]').value;
        const height = registerForm.querySelectorAll('input[type="number"]')[1].value;
        const weight = registerForm.querySelectorAll('input[type="number"]')[2].value;
        const goal = document.getElementById('fitness-goal').value;
        
        const newUser = {
            id: Date.now().toString(),
            name,
            email,
            password,
            age,
            height,
            weight,
            goal,
            createdAt: new Date().toISOString()
        };
        
        // Save user to local storage
        const users = JSON.parse(localStorage.getItem('users')) || [];
        if (users.some(u => u.email === email)) {
            alert('Email already registered. Please login.');
            return;
        }
        
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        
        // Switch to dashboard
        authSection.style.display = 'none';
        loadDashboard();
        loginBtn.style.display = 'none';
        registerBtn.style.display = 'none';
        logoutBtn.style.display = 'block';
    });

    // Logout functionality
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('currentUser');
        authSection.style.display = 'block';
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
        toggleAuth.textContent = "Don't have an account? Register now";
        loginBtn.style.display = 'block';
        registerBtn.style.display = 'block';
        logoutBtn.style.display = 'none';
        appContainer.innerHTML = '';
    });

    // Show auth section if no user logged in
    if (!localStorage.getItem('currentUser')) {
        authSection.style.display = 'block';
    } else {
        authSection.style.display = 'none';
        loginBtn.style.display = 'none';
        registerBtn.style.display = 'none';
        logoutBtn.style.display = 'block';
    }
}

export function getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
}