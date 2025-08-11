import { api } from './api.mjs';

// Funções auxiliares
function showAlert(message, type = 'success') {
    const alertEl = document.createElement('div');
    alertEl.className = `custom-alert ${type}`;
    alertEl.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            ${type === 'success' ? '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/> <polyline points="22 4 12 14.01 9 11.01"/>' : 
             type === 'warning' ? '<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/> <line x1="12" y1="9" x2="12" y2="13"/> <line x1="12" y1="17" x2="12.01" y2="17"/>' :
             '<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/> <line x1="12" y1="9" x2="12" y2="13"/> <line x1="12" y1="17" x2="12.01" y2="17"/>'}
        </svg>
        <span>${message}</span>
    `;
    
    document.body.appendChild(alertEl);
    
    setTimeout(() => {
        alertEl.remove();
    }, 3500);
}

function showConfirm(message, callback) {
    const confirmModal = document.createElement('div');
    confirmModal.className = 'confirm-modal';
    confirmModal.innerHTML = `
        <div class="confirm-content">
            <h3>Confirm</h3>
            <p>${message}</p>
            <div class="confirm-buttons">
                <button class="button button-secondary" id="confirm-cancel">Cancel</button>
                <button class="button button-primary" id="confirm-ok">OK</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(confirmModal);
    confirmModal.style.display = 'block';
    
    document.getElementById('confirm-cancel').addEventListener('click', () => {
        confirmModal.remove();
    });
    
    document.getElementById('confirm-ok').addEventListener('click', () => {
        callback();
        confirmModal.remove();
    });
    
    confirmModal.addEventListener('click', (e) => {
        if (e.target === confirmModal) {
            confirmModal.remove();
        }
    });
}

export function loadDashboard() {
    // Carrega CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'styles/dash.css';
    document.head.appendChild(link);

    // Obtém dados do usuário e do dia
    const user = api.getCurrentUser();
    const todayWorkout = api.getTodayWorkout();
    const todayMeals = api.getTodayMeals();
    const waterIntake = api.getWaterIntake();

    // Calcula totais de nutrição
    const nutritionTotals = todayMeals.reduce((acc, meal) => {
        acc.calories += meal.calories || 0;
        acc.protein += meal.protein || 0;
        return acc;
    }, { calories: 0, protein: 0 });

    // Calcula progresso do workout
    const workoutProgress = todayWorkout ? 
        Math.round((todayWorkout.exercises.reduce((sum, ex) => sum + ex.completed, 0) / 
                  (todayWorkout.exercises.length * 3) * 100)) : 0;

    // Renderiza o dashboard
    const appContainer = document.getElementById('app-container');
    appContainer.innerHTML = `
        <section class="dashboard">
            <div class="dashboard-header">
                <div class="header-text">
                    <h2>Welcome back, ${user.name}</h2>
                    <p>Today is ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
                <div class="user-stats">
                    <div class="stat-card">
                        <span>Current Weight</span>
                        <strong>${user.weight} kg</strong>
                        <button class="edit-btn" data-type="weight">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                            </svg>
                        </button>
                    </div>
                    <div class="stat-card">
                        <span>Goal</span>
                        <strong>${user.goal.replace('-', ' ')}</strong>
                        <button class="edit-btn" data-type="goal">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            
            <div class="dashboard-grid">
                <!-- Workout Card -->
                <div class="card today-card">
                    <div class="card-header">
                        <h3>Today's Workout</h3>
                        <button class="button button-primary" id="start-workout">
                            ${todayWorkout ? 'Continue' : 'Start'}
                        </button>
                    </div>
                    ${todayWorkout ? `
                    <div class="workout-preview">
                        <h4>${todayWorkout.type}</h4>
                        <ul class="exercise-list">
                            ${todayWorkout.exercises.map(ex => `
                                <li class="exercise-item ${ex.completed === ex.sets ? 'completed' : ''}">
                                    <span>${ex.name} - ${ex.sets} sets</span>
                                    <div class="exercise-actions">
                                        <span class="sets-completed">${ex.completed}/${ex.sets}</span>
                                        <button class="complete-btn" data-exercise="${ex.name}">
                                            ${ex.completed === ex.sets ? 'Undo' : 'Complete'}
                                        </button>
                                    </div>
                                </li>
                            `).join('')}
                        </ul>
                        <div class="progress-container">
                            <div class="progress-bar">
                                <div class="progress" style="width: ${workoutProgress}%"></div>
                            </div>
                            <small>${workoutProgress}% completed</small>
                        </div>
                    </div>
                    ` : `
                    <div class="empty-state">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                        </svg>
                        <h4>No Workout Planned</h4>
                        <p>You don't have any workouts scheduled for today.</p>
                        <button class="button button-secondary" id="plan-workout">
                            Plan Workout
                        </button>
                    </div>
                    `}
                </div>
                
                <!-- Nutrition Card -->
                <div class="card today-card">
                    <div class="card-header">
                        <h3>Today's Nutrition</h3>
                        <button class="button button-primary" id="log-meal">Log Meal</button>
                    </div>
                    <div class="nutrition-preview">
                        <div class="macros">
                            <div class="macro">
                                <span>Calories</span>
                                <div class="progress-bar small">
                                    <div class="progress" style="width: ${Math.min(100, (nutritionTotals.calories / 2000) * 100)}%"></div>
                                </div>
                                <span>${nutritionTotals.calories}/2000 kcal</span>
                            </div>
                            <div class="macro">
                                <span>Protein</span>
                                <div class="progress-bar small">
                                    <div class="progress" style="width: ${Math.min(100, (nutritionTotals.protein / 120) * 100)}%"></div>
                                </div>
                                <span>${nutritionTotals.protein}/120g</span>
                            </div>
                        </div>
                        ${todayMeals.length > 0 ? `
                        <div class="meals-list">
                            ${todayMeals.map(meal => `
                                <div class="meal">
                                    <div>
                                        <strong>${meal.type.charAt(0).toUpperCase() + meal.type.slice(1)}</strong>
                                        <span>${meal.name} (${meal.calories} kcal)</span>
                                    </div>
                                    <button class="delete-meal" data-meal-id="${meal.id || meal.name}">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                                        </svg>
                                    </button>
                                </div>
                            `).join('')}
                        </div>
                        ` : `
                        <div class="empty-state">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                                <line x1="3" y1="6" x2="21" y2="6"></line>
                                <path d="M16 10a4 4 0 0 1-8 0"></path>
                            </svg>
                            <h4>No Meals Logged</h4>
                            <p>You haven't logged any meals today yet.</p>
                        </div>
                        `}
                    </div>
                </div>
                
                <!-- Progress Card -->
                <div class="card progress-card">
                    <div class="card-header">
                        <h3>Weekly Progress</h3>
                        <button class="button button-text" id="view-details">View Details</button>
                    </div>
                    <div class="mini-chart">
                        <canvas id="dashboard-weight-chart"></canvas>
                    </div>
                    <div class="progress-stats">
                        <div>
                            <span>Weight Change</span>
                            <strong>-0.8 kg</strong>
                        </div>
                        <div>
                            <span>Workouts</span>
                            <strong>3/5</strong>
                        </div>
                    </div>
                </div>
                
                <!-- Quick Actions Card -->
                <div class="card quick-actions">
                    <h3>Quick Actions</h3>
                    <div class="action-buttons">
                        <button class="button button-secondary" id="quick-workout">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                            </svg>
                            Quick Workout
                        </button>
                        <button class="button button-secondary" id="log-water">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
                                <path d="M3 8h4v10a4 4 0 0 0 4 4h4"/>
                                <path d="M16 12h4"/>
                            </svg>
                            Log Water
                        </button>
                        <button class="button button-secondary" id="view-plan">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M3 3h18v18H3z"/>
                                <path d="M7 16h10M7 12h10M7 8h10"/>
                            </svg>
                            View Plan
                        </button>
                    </div>
                    <div class="motivational-quote">
                        <p>"The secret of getting ahead is getting started."</p>
                        <small>- Mark Twain</small>
                    </div>
                </div>
            </div>
            
            <!-- Recent Activity -->
            <div class="recent-activity">
                <div class="section-header">
                    <h3>Recent Activity</h3>
                    <button class="button button-text" id="view-all-activity">View All</button>
                </div>
                <div class="activity-list">
                    <div class="activity-item">
                        <div class="activity-icon workout"></div>
                        <div class="activity-info">
                            <strong>Completed: Upper Body Workout</strong>
                            <span>Yesterday at 6:30 PM</span>
                        </div>
                    </div>
                    <div class="activity-item">
                        <div class="activity-icon meal"></div>
                        <div class="activity-info">
                            <strong>Logged: Chicken Salad (420 kcal)</strong>
                            <span>Today at 12:45 PM</span>
                        </div>
                    </div>
                    <div class="activity-item">
                        <div class="activity-icon measurement"></div>
                        <div class="activity-info">
                            <strong>Updated weight: 75.2 kg (-0.4 kg)</strong>
                            <span>2 days ago</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
        <!-- Meal Modal -->
        <div id="meal-modal" class="modal">
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <h3>Log Your Meal</h3>
                <form id="meal-form">
                    <div class="form-group">
                        <label>Meal Type</label>
                        <select id="meal-type" required>
                            <option value="breakfast">Breakfast</option>
                            <option value="lunch">Lunch</option>
                            <option value="dinner">Dinner</option>
                            <option value="snack">Snack</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Meal Name</label>
                        <input type="text" id="meal-name" placeholder="e.g., Chicken Salad" required>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Calories</label>
                            <input type="number" id="meal-calories" placeholder="kcal" required>
                        </div>
                        <div class="form-group">
                            <label>Protein (g)</label>
                            <input type="number" id="meal-protein" placeholder="grams">
                        </div>
                    </div>
                    <button type="submit" class="button button-primary">Save Meal</button>
                </form>
            </div>
        </div>
        
        <!-- Edit Weight/Goal Modal -->
        <div id="edit-modal" class="modal">
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <h3 id="edit-modal-title">Edit</h3>
                <form id="edit-form">
                    <div class="form-group" id="weight-field" style="display: none;">
                        <label>Weight (kg)</label>
                        <input type="number" id="edit-weight" step="0.1" required>
                    </div>
                    <div class="form-group" id="goal-field" style="display: none;">
                        <label>Goal</label>
                        <select id="edit-goal" required>
                            <option value="lose-weight">Lose Weight</option>
                            <option value="gain-muscle">Gain Muscle</option>
                            <option value="maintain">Maintain</option>
                        </select>
                    </div>
                    <button type="submit" class="button button-primary">Save Changes</button>
                </form>
            </div>
        </div>
    `;

    // Inicializa o gráfico (simulado)
    initWeightChart();

    // Adiciona event listeners
    setupEventListeners();
}

function initWeightChart() {
    const canvas = document.getElementById('dashboard-weight-chart');
    if (canvas) {
        canvas.innerHTML = '<div class="chart-placeholder">Weight Trend: 75.5kg → 75.2kg → 74.9kg</div>';
    }
}

function setupEventListeners() {
    // Start Workout
    document.getElementById('start-workout')?.addEventListener('click', () => {
        const todayWorkout = api.getTodayWorkout();
        if (todayWorkout) {
            showAlert(`Continuing ${todayWorkout.type} workout!`, 'success');
        } else {
            showAlert('Redirecting to workout planner...', 'warning');
        }
    });

    // Plan Workout
    document.getElementById('plan-workout')?.addEventListener('click', () => {
        showAlert('Redirecting to workout planner...', 'warning');
    });

    // Log Meal
    const mealModal = document.getElementById('meal-modal');
    document.getElementById('log-meal')?.addEventListener('click', () => {
        mealModal.style.display = 'flex';
    });

    // Close Modals
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.modal').forEach(modal => {
                modal.style.display = 'none';
            });
        });
    });

    // Meal Form Submission
    document.getElementById('meal-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const meal = {
            type: document.getElementById('meal-type').value,
            name: document.getElementById('meal-name').value,
            calories: parseInt(document.getElementById('meal-calories').value),
            protein: parseInt(document.getElementById('meal-protein').value) || 0,
            id: Date.now()
        };
        
        api.addMeal(meal);
        mealModal.style.display = 'none';
        showAlert('Meal logged successfully!', 'success');
        loadDashboard();
    });

    // Delete Meal
    document.querySelectorAll('.delete-meal').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const mealId = parseInt(e.currentTarget.getAttribute('data-meal-id'));
            showConfirm('Are you sure you want to delete this meal?', () => {
                if (api.removeMeal(mealId)) {
                    showAlert('Meal deleted successfully!', 'success');
                    loadDashboard();
                } else {
                    showAlert('Failed to delete meal', 'error');
                }
            });
        });
    });

    // Complete Exercise
    document.querySelectorAll('.complete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const exerciseName = e.currentTarget.getAttribute('data-exercise');
            if (api.updateWorkoutProgress(exerciseName)) {
                showAlert(`Exercise ${exerciseName} updated!`, 'success');
                loadDashboard();
            } else {
                showAlert('Failed to update exercise', 'error');
            }
        });
    });

    // Quick Actions
    document.getElementById('quick-workout')?.addEventListener('click', () => {
        showConfirm('Start a 15-minute quick workout?', () => {
            showAlert('Quick workout started! Timer: 15:00', 'success');
        });
    });

    document.getElementById('log-water')?.addEventListener('click', () => {
        const waterInput = document.createElement('div');
        waterInput.className = 'custom-alert';
        waterInput.style.animation = 'none';
        waterInput.innerHTML = `
            <div style="display: flex; flex-direction: column; gap: 1rem;">
                <label for="water-amount" style="color: white;">How much water did you drink? (ml)</label>
                <input type="number" id="water-amount" value="250" style="padding: 0.5rem; border-radius: 4px; border: none;">
                <div style="display: flex; gap: 1rem; justify-content: center;">
                    <button id="water-cancel" style="padding: 0.5rem 1rem; background: white; border: none; border-radius: 4px;">Cancel</button>
                    <button id="water-submit" style="padding: 0.5rem 1rem; background: var(--accent); color: white; border: none; border-radius: 4px;">Submit</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(waterInput);
        
        document.getElementById('water-cancel').addEventListener('click', () => {
            waterInput.remove();
        });
        
        document.getElementById('water-submit').addEventListener('click', () => {
            const amount = parseInt(document.getElementById('water-amount').value);
            if (amount && amount > 0) {
                api.addWater(amount);
                showAlert(`Logged ${amount}ml of water! Total today: ${api.getWaterIntake()}ml`, 'success');
                waterInput.remove();
                loadDashboard();
            } else {
                showAlert('Please enter a valid amount', 'warning');
            }
        });
    });

    document.getElementById('view-plan')?.addEventListener('click', () => {
        showAlert('Redirecting to your workout and nutrition plan...', 'warning');
    });

    // Edit Buttons (Weight/Goal)
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const type = e.currentTarget.getAttribute('data-type');
            const editModal = document.getElementById('edit-modal');
            const user = api.getCurrentUser();
            
            document.getElementById('edit-modal-title').textContent = `Edit ${type === 'weight' ? 'Weight' : 'Goal'}`;
            document.getElementById(`${type}-field`).style.display = 'block';
            
            // Esconde o outro campo
            const otherField = type === 'weight' ? 'goal' : 'weight';
            document.getElementById(`${otherField}-field`).style.display = 'none';
            
            if (type === 'weight') {
                document.getElementById('edit-weight').value = user.weight;
            } else {
                document.getElementById('edit-goal').value = user.goal;
            }
            
            editModal.style.display = 'flex';
        });
    });

    // Edit Form Submission
    document.getElementById('edit-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const editModal = document.getElementById('edit-modal');
        
        if (document.getElementById('weight-field').style.display !== 'none') {
            const newWeight = parseFloat(document.getElementById('edit-weight').value);
            if (api.updateUser({ weight: newWeight })) {
                showAlert(`Weight updated to ${newWeight}kg!`, 'success');
            } else {
                showAlert('Failed to update weight', 'error');
            }
        } else {
            const newGoal = document.getElementById('edit-goal').value;
            if (api.updateGoal(newGoal)) {
                showAlert(`Goal updated to ${newGoal.replace('-', ' ')}!`, 'success');
            } else {
                showAlert('Failed to update goal', 'error');
            }
        }
        
        editModal.style.display = 'none';
        loadDashboard();
    });

    // View Details/All buttons
    document.getElementById('view-details')?.addEventListener('click', () => {
        showAlert('Redirecting to progress details...', 'warning');
    });

    document.getElementById('view-all-activity')?.addEventListener('click', () => {
        showAlert('Redirecting to activity log...', 'warning');
    });

    // Fechar modal ao clicar fora
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            document.querySelectorAll('.modal').forEach(modal => {
                modal.style.display = 'none';
            });
        }
    });
}