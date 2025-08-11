import { getCurrentUser } from './auth.mjs';

export function loadDashboard() {

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'styles/dash.css';
    document.head.appendChild(link);
    const user = getCurrentUser();
    const appContainer = document.getElementById('app-container');
    
    appContainer.innerHTML = `
        <section class="dashboard">
            <div class="dashboard-header">
                <div>
                    <h2>Welcome back, ${user.name}</h2>
                    <p>Today is ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
                <div class="user-stats">
                    <div class="stat-card">
                        <span>Current Weight</span>
                        <strong>${user.weight} kg</strong>
                    </div>
                    <div class="stat-card">
                        <span>Goal</span>
                        <strong>${user.goal.replace('-', ' ')}</strong>
                    </div>
                </div>
            </div>
            
            <div class="dashboard-grid">
                <div class="card today-card">
                    <div class="card-header">
                        <h3>Today's Workout</h3>
                        <button class="button button-primary">Start</button>
                    </div>
                    <div class="workout-preview">
                        <h4>Full Body Circuit</h4>
                        <ul>
                            <li>Squats - 3 sets</li>
                            <li>Push Ups - 3 sets</li>
                            <li>Rows - 3 sets</li>
                        </ul>
                        <div class="progress-bar">
                            <div class="progress" style="width: 30%"></div>
                        </div>
                        <small>30% completed</small>
                    </div>
                </div>
                
                <div class="card today-card">
                    <div class="card-header">
                        <h3>Today's Nutrition</h3>
                        <button class="button button-primary">Log Meal</button>
                    </div>
                    <div class="nutrition-preview">
                        <div class="macros">
                            <div class="macro">
                                <span>Calories</span>
                                <div class="progress-bar small">
                                    <div class="progress" style="width: 45%"></div>
                                </div>
                                <span>900/2000 kcal</span>
                            </div>
                            <div class="macro">
                                <span>Protein</span>
                                <div class="progress-bar small">
                                    <div class="progress" style="width: 60%"></div>
                                </div>
                                <span>72/120g</span>
                            </div>
                        </div>
                        <div class="meals-list">
                            <div class="meal">
                                <strong>Breakfast</strong>
                                <span>Oatmeal (350 kcal)</span>
                            </div>
                            <div class="meal">
                                <strong>Lunch</strong>
                                <span>Salmon (550 kcal)</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="card progress-card">
                    <h3>Weekly Progress</h3>
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
                
                <div class="card quick-actions">
                    <h3>Quick Actions</h3>
                    <div class="action-buttons">
                        <button class="button button-secondary">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                            </svg>
                            Quick Workout
                        </button>
                        <button class="button button-secondary">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
                                <path d="M3 8h4v10a4 4 0 0 0 4 4h4"/>
                                <path d="M16 12h4"/>
                            </svg>
                            Log Water
                        </button>
                        <button class="button button-secondary">
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
            
            <div class="recent-activity">
                <h3>Recent Activity</h3>
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
    `;
}