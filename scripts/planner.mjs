export function loadPlannerPage() {

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'styles/planner.css';
    document.head.appendChild(link);
    const appContainer = document.getElementById('app-container');
    appContainer.innerHTML = `
        <section class="planner">
            <h2>Weekly Planner</h2>
            
            <div class="week-selector">
                <button class="button">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M15 18l-6-6 6-6"/>
                    </svg>
                    Previous
                </button>
                <h3>June 12 - 18, 2023</h3>
                <button class="button">
                    Next
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M9 18l6-6-6-6"/>
                    </svg>
                </button>
            </div>
            
            <div class="week-view">
                <div class="day-card">
                    <div class="day-header">
                        <h4>Monday</h4>
                        <span>Jun 12</span>
                    </div>
                    <div class="workout-plan">
                        <h5>Morning Workout</h5>
                        <p>Upper Body Strength</p>
                        <button class="button button-secondary">Edit</button>
                    </div>
                    <div class="meal-plan">
                        <h5>Meal Plan</h5>
                        <ul>
                            <li>Breakfast: Oatmeal</li>
                            <li>Lunch: Chicken Salad</li>
                            <li>Dinner: Salmon</li>
                        </ul>
                        <button class="button button-secondary">Edit</button>
                    </div>
                </div>
                
                <div class="day-card">
                    <div class="day-header">
                        <h4>Tuesday</h4>
                        <span>Jun 13</span>
                    </div>
                    <div class="workout-plan">
                        <h5>Evening Workout</h5>
                        <p>Cardio + Core</p>
                        <button class="button button-secondary">Edit</button>
                    </div>
                    <div class="meal-plan">
                        <h5>Meal Plan</h5>
                        <ul>
                            <li>Breakfast: Smoothie</li>
                            <li>Lunch: Turkey Wrap</li>
                            <li>Dinner: Stir Fry</li>
                        </ul>
                        <button class="button button-secondary">Edit</button>
                    </div>
                </div>
                
                <!-- Repeat for other days of the week -->
            </div>
            
            <div class="planner-actions">
                <button class="button button-primary">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
                        <path d="M17 21v-8H7v8"/>
                        <path d="M7 3v5h8"/>
                    </svg>
                    Save Plan
                </button>
                <button class="button button-secondary">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    </svg>
                    Copy to Next Week
                </button>
            </div>
        </section>
        
        <div class="modal" id="workout-plan-modal">
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <h3>Plan Workout</h3>
                <form id="workout-plan-form">
                    <div class="form-group">
                        <label>Workout Type</label>
                        <select class="form-control">
                            <option>Strength Training</option>
                            <option>Cardio</option>
                            <option>HIIT</option>
                            <option>Yoga</option>
                            <option>Rest Day</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Time</label>
                        <input type="time" class="form-control">
                    </div>
                    <div class="form-group">
                        <label>Notes</label>
                        <textarea class="form-control" rows="3"></textarea>
                    </div>
                    <button type="submit" class="button button-primary">Save Workout</button>
                </form>
            </div>
        </div>
    `;
    
    // Initialize modal functionality
    const modal = document.getElementById('workout-plan-modal');
    const editButtons = document.querySelectorAll('.workout-plan button');
    const closeModal = document.querySelector('.close-modal');
    
    editButtons.forEach(button => {
        button.addEventListener('click', () => {
            modal.style.display = 'flex';
        });
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