
const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'styles/workout.css';
document.head.appendChild(link);

export function loadWorkoutPage() {

    const appContainer = document.getElementById('app-container');
    appContainer.innerHTML = `
        <section class="workout">
            <h2>Workout Tracker</h2>
            
            <div class="tabs">
                <div class="tab active" data-tab="current">Current Workout</div>
                <div class="tab" data-tab="history">Workout History</div>
                <div class="tab" data-tab="library">Exercise Library</div>
            </div>
            
            <div class="tab-content active" id="current-workout">
                <div class="workout-header">
                    <h3>Today's Workout: Full Body</h3>
                    <button class="button button-primary" id="add-exercise">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M12 5v14M5 12h14"/>
                        </svg>
                        Add Exercise
                    </button>
                </div>
                
                <div class="card-grid">
                    <div class="card">
                        <h4>Squats</h4>
                        <div class="exercise-sets">
                            <div class="set">
                                <span>Set 1:</span>
                                <input type="number" placeholder="Weight" class="form-control" style="width: 80px;">
                                <input type="number" placeholder="Reps" class="form-control" style="width: 80px;">
                            </div>
                            <button class="button button-secondary" style="margin-top: 0.5rem;">+ Add Set</button>
                        </div>
                    </div>
                    
                    <div class="card">
                        <h4>Push Ups</h4>
                        <div class="exercise-sets">
                            <div class="set">
                                <span>Set 1:</span>
                                <input type="number" placeholder="Reps" class="form-control" style="width: 80px;">
                            </div>
                            <button class="button button-secondary" style="margin-top: 0.5rem;">+ Add Set</button>
                        </div>
                    </div>
                </div>
                
                <div class="workout-actions">
                    <button class="button button-primary">Save Workout</button>
                    <button class="button">Finish Workout</button>
                </div>
            </div>
            
            <div class="tab-content" id="workout-history">
                <div class="table-responsive">
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Workout</th>
                                <th>Duration</th>
                                <th>Exercises</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>2023-06-15</td>
                                <td>Upper Body</td>
                                <td>45 min</td>
                                <td>4 exercises</td>
                                <td>
                                    <button class="button">View</button>
                                </td>
                            </tr>
                            <tr>
                                <td>2023-06-13</td>
                                <td>Cardio</td>
                                <td>30 min</td>
                                <td>3 exercises</td>
                                <td>
                                    <button class="button">View</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            
            <div class="tab-content" id="exercise-library">
                <div class="search-bar">
                    <input type="text" placeholder="Search exercises..." class="form-control">
                    <button class="button button-primary">Search</button>
                </div>
                
                <div class="card-grid">
                    <div class="card exercise-item">
                        <img src="assets/images/squat.jpg" alt="Squat">
                        <div class="exercise-info">
                            <h4>Squat</h4>
                            <p>Legs, Glutes</p>
                            <div class="exercise-meta">
                                <span>Bodyweight</span>
                                <button class="button button-secondary">Add</button>
                            </div>
                        </div>
                    </div>
                    
                    <div class="card exercise-item">
                        <img src="assets/images/pushup.jpg" alt="Push Up">
                        <div class="exercise-info">
                            <h4>Push Up</h4>
                            <p>Chest, Arms</p>
                            <div class="exercise-meta">
                                <span>Bodyweight</span>
                                <button class="button button-secondary">Add</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
        <div class="modal" id="exercise-modal">
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <h3>Add New Exercise</h3>
                <form id="exercise-form">
                    <div class="form-group">
                        <label>Exercise Name</label>
                        <input type="text" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label>Muscle Group</label>
                        <select class="form-control">
                            <option>Chest</option>
                            <option>Back</option>
                            <option>Legs</option>
                            <option>Arms</option>
                            <option>Shoulders</option>
                            <option>Core</option>
                        </select>
                    </div>
                    <button type="submit" class="button button-primary">Add Exercise</button>
                </form>
            </div>
        </div>
    `;
    
    // Add tab functionality
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            const tabId = tab.getAttribute('data-tab');
            document.getElementById(`${tabId}-workout`).classList.add('active');
        });
    });
    
    // Add modal functionality
    const modal = document.getElementById('exercise-modal');
    const addExerciseBtn = document.getElementById('add-exercise');
    const closeModal = document.querySelector('.close-modal');
    
    addExerciseBtn.addEventListener('click', () => {
        modal.style.display = 'flex';
    });
    
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}