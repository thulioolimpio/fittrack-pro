export function loadProgressPage() {

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'styles/progress.css';
    document.head.appendChild(link);
    
    const appContainer = document.getElementById('app-container');
    appContainer.innerHTML = `
        <section class="progress">
            <h2>Your Progress</h2>
            
            <div class="tabs">
                <div class="tab active" data-tab="metrics">Body Metrics</div>
                <div class="tab" data-tab="workouts">Workout Progress</div>
                <div class="tab" data-tab="nutrition">Nutrition Trends</div>
            </div>
            
            <div class="tab-content active" id="metrics-progress">
                <div class="card-grid">
                    <div class="card">
                        <div class="card-header">
                            <h4>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path d="M3 3v18h18"/>
                                    <path d="M18 7V3"/>
                                    <path d="M15 15v3h3"/>
                                    <path d="M9 9v6h3"/>
                                    <path d="M3 11v4h4"/>
                                </svg>
                                Weight Tracking
                            </h4>
                            <button class="button button-secondary" id="add-weight">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path d="M12 5v14M5 12h14"/>
                                </svg>
                                Add
                            </button>
                        </div>
                        <div class="chart-container">
                            <canvas id="weight-chart"></canvas>
                        </div>
                        <div class="metric-input">
                            <input type="number" placeholder="Current weight (kg)" class="form-control">
                            <button class="button button-primary">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
                                    <path d="M17 21v-8H7v8"/>
                                    <path d="M7 3v5h8"/>
                                </svg>
                                Update
                            </button>
                        </div>
                    </div>
                    
                    <div class="card">
                        <div class="card-header">
                            <h4>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <circle cx="12" cy="5" r="2"/>
                                    <path d="M12 7v14"/>
                                    <circle cx="12" cy="19" r="2"/>
                                </svg>
                                Body Measurements
                            </h4>
                        </div>
                        <div class="measurements">
                            <div class="form-group">
                                <label>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path d="M4 4h6v6H4z"/>
                                        <path d="M14 4h6v6h-6z"/>
                                        <path d="M4 14h6v6H4z"/>
                                        <path d="M14 14h6v6h-6z"/>
                                    </svg>
                                    Chest (cm)
                                </label>
                                <input type="number" class="form-control">
                            </div>
                            <div class="form-group">
                                <label>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path d="M4 12h16"/>
                                        <path d="M12 4v16"/>
                                    </svg>
                                    Waist (cm)
                                </label>
                                <input type="number" class="form-control">
                            </div>
                            <div class="form-group">
                                <label>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <rect x="3" y="3" width="18" height="18" rx="2"/>
                                        <path d="M9 9h6v6H9z"/>
                                    </svg>
                                    Hips (cm)
                                </label>
                                <input type="number" class="form-control">
                            </div>
                            <button class="button button-primary">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
                                </svg>
                                Save Measurements
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="tab-content" id="workouts-progress">
                <div class="card-grid">
                    <div class="card">
                        <div class="card-header">
                            <h4>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                                </svg>
                                Strength Progress
                            </h4>
                            <select class="form-control" style="width: auto;">
                                <option>Squat</option>
                                <option>Bench Press</option>
                                <option>Deadlift</option>
                            </select>
                        </div>
                        <div class="chart-container">
                            <canvas id="strength-chart"></canvas>
                        </div>
                    </div>
                    
                    <div class="card">
                        <div class="card-header">
                            <h4>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
                                    <path d="M17 21v-8H7v8"/>
                                    <path d="M7 3v5h8"/>
                                </svg>
                                Workout Frequency
                            </h4>
                            <select class="form-control" style="width: auto;">
                                <option>Last 4 Weeks</option>
                                <option>Last 12 Weeks</option>
                            </select>
                        </div>
                        <div class="chart-container">
                            <canvas id="frequency-chart"></canvas>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="tab-content" id="nutrition-progress">
                <div class="card-grid">
                    <div class="card">
                        <div class="card-header">
                            <h4>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                                    <path d="M3 6h18"/>
                                    <path d="M16 10a4 4 0 0 1-8 0"/>
                                </svg>
                                Caloric Intake
                            </h4>
                            <select class="form-control" style="width: auto;">
                                <option>Last 7 Days</option>
                                <option>Last 30 Days</option>
                            </select>
                        </div>
                        <div class="chart-container">
                            <canvas id="calories-chart"></canvas>
                        </div>
                    </div>
                    
                    <div class="card">
                        <div class="card-header">
                            <h4>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <circle cx="12" cy="12" r="10"/>
                                    <path d="M12 8v4l3 3"/>
                                </svg>
                                Macronutrients
                            </h4>
                        </div>
                        <div class="chart-container">
                            <canvas id="macros-chart"></canvas>
                        </div>
                    </div>
                    
                    <div class="card">
                        <div class="card-header">
                            <h4>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
                                    <path d="M3 8h4v10a4 4 0 0 0 4 4h4"/>
                                    <path d="M16 12h4"/>
                                </svg>
                                Water Intake
                            </h4>
                        </div>
                        <div class="chart-container">
                            <canvas id="water-chart"></canvas>
                        </div>
                        <div class="water-tracker">
                            <button class="button button-secondary">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path d="M12 5v14M5 12h14"/>
                                </svg>
                                250ml
                            </button>
                            <button class="button button-secondary">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path d="M12 5v14M5 12h14"/>
                                </svg>
                                500ml
                            </button>
                            <button class="button button-primary">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
                                </svg>
                                Log Water
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
        <div class="modal" id="weight-modal">
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <h3>Add Weight Entry</h3>
                <form id="weight-form">
                    <div class="form-group">
                        <label>Weight (kg)</label>
                        <input type="number" step="0.1" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label>Date</label>
                        <input type="date" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label>Notes (optional)</label>
                        <textarea class="form-control" rows="3"></textarea>
                    </div>
                    <button type="submit" class="button button-primary">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
                        </svg>
                        Save Entry
                    </button>
                </form>
            </div>
        </div>
    `;

    // Initialize tabs
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            const tabId = tab.getAttribute('data-tab');
            document.getElementById(`${tabId}-progress`).classList.add('active');
        });
    });

    // Initialize weight modal
    const modal = document.getElementById('weight-modal');
    const addWeightBtn = document.getElementById('add-weight');
    const closeModal = document.querySelector('.close-modal');
    
    if (addWeightBtn) {
        addWeightBtn.addEventListener('click', () => {
            modal.style.display = 'flex';
        });
    }
    
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Initialize real charts with Chart.js
    initializeCharts();
}

function initializeCharts() {
    // Weight Chart
    const weightCtx = document.getElementById('weight-chart');
    if (weightCtx) {
        new Chart(weightCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Weight (kg)',
                    data: [75, 74.5, 74, 73.5, 73, 72.5],
                    borderColor: '#1976D2',
                    backgroundColor: 'rgba(25, 118, 210, 0.1)',
                    tension: 0.4,
                    fill: true,
                    borderWidth: 3,
                    pointBackgroundColor: '#1976D2',
                    pointRadius: 5,
                    pointHoverRadius: 7
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }
    
    // Strength Chart
    const strengthCtx = document.getElementById('strength-chart');
    if (strengthCtx) {
        new Chart(strengthCtx, {
            type: 'bar',
            data: {
                labels: ['Squat', 'Bench Press', 'Deadlift'],
                datasets: [{
                    label: '1RM (kg)',
                    data: [120, 90, 150],
                    backgroundColor: [
                        'rgba(76, 175, 80, 0.7)',
                        'rgba(25, 118, 210, 0.7)',
                        'rgba(255, 152, 0, 0.7)'
                    ],
                    borderColor: [
                        'rgba(76, 175, 80, 1)',
                        'rgba(25, 118, 210, 1)',
                        'rgba(255, 152, 0, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }
    
    // Frequency Chart
    const frequencyCtx = document.getElementById('frequency-chart');
    if (frequencyCtx) {
        new Chart(frequencyCtx, {
            type: 'bar',
            data: {
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                datasets: [{
                    label: 'Workouts',
                    data: [3, 4, 5, 4],
                    backgroundColor: 'rgba(25, 118, 210, 0.7)',
                    borderColor: 'rgba(25, 118, 210, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }
    
    // Calories Chart
    const caloriesCtx = document.getElementById('calories-chart');
    if (caloriesCtx) {
        new Chart(caloriesCtx, {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Calories',
                    data: [1800, 2000, 1900, 2100, 1950, 2200, 2300],
                    borderColor: '#FF5722',
                    backgroundColor: 'rgba(255, 87, 34, 0.1)',
                    tension: 0.3,
                    fill: true,
                    borderWidth: 3,
                    pointBackgroundColor: '#FF5722',
                    pointRadius: 5,
                    pointHoverRadius: 7
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }
    
    // Macros Chart
    const macrosCtx = document.getElementById('macros-chart');
    if (macrosCtx) {
        new Chart(macrosCtx, {
            type: 'doughnut',
            data: {
                labels: ['Protein', 'Carbs', 'Fat'],
                datasets: [{
                    data: [35, 45, 20],
                    backgroundColor: [
                        '#4CAF50',
                        '#2196F3',
                        '#FFC107'
                    ],
                    borderWidth: 1,
                    hoverOffset: 10
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '70%',
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            boxWidth: 12,
                            padding: 20
                        }
                    }
                }
            }
        });
    }
    
    // Water Chart
    const waterCtx = document.getElementById('water-chart');
    if (waterCtx) {
        new Chart(waterCtx, {
            type: 'bar',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Water (ml)',
                    data: [2000, 1800, 2200, 2500, 2300, 2100, 1900],
                    backgroundColor: 'rgba(33, 150, 243, 0.7)',
                    borderColor: 'rgba(33, 150, 243, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }
}