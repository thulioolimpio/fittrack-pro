const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'styles/workout.css';
document.head.appendChild(link);

// Custom alert styling
function showAlert(message, type = 'info') {
    const alert = document.createElement('div');
    alert.className = `custom-alert ${type}`;
    alert.innerHTML = `
        <span>${message}</span>
        <button class="close-alert">&times;</button>
    `;
    
    document.body.appendChild(alert);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        alert.classList.add('fade-out');
        setTimeout(() => alert.remove(), 300);
    }, 5000);
    
    // Manual close
    alert.querySelector('.close-alert').addEventListener('click', () => {
        alert.classList.add('fade-out');
        setTimeout(() => alert.remove(), 300);
    });
}

// Sample data storage
let workoutData = {
    currentWorkout: {
        name: 'Full Body',
        exercises: [
            {
                name: 'Squats',
                sets: [
                    { weight: null, reps: null }
                ],
                isBodyweight: false
            },
            {
                name: 'Push Ups',
                sets: [
                    { reps: null }
                ],
                isBodyweight: true
            }
        ]
    },
    workoutHistory: [
        {
            date: '2023-06-15',
            name: 'Upper Body',
            duration: '45 min',
            exercises: [
                { name: 'Bench Press', sets: [{ weight: 135, reps: 10 }, { weight: 155, reps: 8 }] },
                { name: 'Pull Ups', sets: [{ reps: 8 }, { reps: 6 }] },
                { name: 'Shoulder Press', sets: [{ weight: 65, reps: 10 }] },
                { name: 'Bicep Curls', sets: [{ weight: 30, reps: 12 }] }
            ]
        },
        {
            date: '2023-06-13',
            name: 'Cardio',
            duration: '30 min',
            exercises: [
                { name: 'Running', sets: [{ duration: '20 min', distance: '3.2 km' }] },
                { name: 'Jump Rope', sets: [{ duration: '5 min' }] },
                { name: 'Burpees', sets: [{ reps: 15 }, { reps: 12 }] }
            ]
        }
    ],
    exerciseLibrary: [
        { name: 'Squat', muscleGroup: 'Legs, Glutes', isBodyweight: false, image: 'assets/images/squat.jpg' },
        { name: 'Push Up', muscleGroup: 'Chest, Arms', isBodyweight: true, image: 'assets/images/pushup.jpg' },
        { name: 'Bench Press', muscleGroup: 'Chest', isBodyweight: false, image: 'assets/images/benchpress.jpg' },
        { name: 'Pull Up', muscleGroup: 'Back, Arms', isBodyweight: true, image: 'assets/images/pullup.jpg' },
        { name: 'Deadlift', muscleGroup: 'Back, Legs', isBodyweight: false, image: 'assets/images/deadlift.jpg' },
        { name: 'Lunges', muscleGroup: 'Legs, Glutes', isBodyweight: true, image: 'assets/images/lunges.jpg' }
    ]
};

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
                    <h3>Today's Workout: <span id="workout-name">Full Body</span></h3>
                    <button class="button button-primary" id="add-exercise">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M12 5v14M5 12h14"/>
                        </svg>
                        Add Exercise
                    </button>
                </div>
                
                <div class="card-grid" id="current-exercises">
                    <!-- Exercises will be dynamically added here -->
                </div>
                
                <div class="workout-actions">
                    <button class="button button-primary" id="save-workout">Save Workout</button>
                    <button class="button" id="finish-workout">Finish Workout</button>
                </div>
            </div>
            
            <div class="tab-content" id="workout-history">
                <div class="table-responsive">
                    <table id="history-table">
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
                            <!-- History will be dynamically added here -->
                        </tbody>
                    </table>
                </div>
            </div>
            
            <div class="tab-content" id="exercise-library">
                <div class="search-bar">
                    <input type="text" id="exercise-search" placeholder="Search exercises..." class="form-control">
                    <button class="button button-primary" id="search-exercises">Search</button>
                </div>
                
                <div class="card-grid" id="library-exercises">
                    <!-- Exercises will be dynamically added here -->
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
                        <input type="text" id="exercise-name" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label>Muscle Group</label>
                        <select id="muscle-group" class="form-control">
                            <option value="Chest">Chest</option>
                            <option value="Back">Back</option>
                            <option value="Legs">Legs</option>
                            <option value="Arms">Arms</option>
                            <option value="Shoulders">Shoulders</option>
                            <option value="Core">Core</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>
                            <input type="checkbox" id="is-bodyweight"> Bodyweight Exercise
                        </label>
                    </div>
                    <button type="submit" class="button button-primary">Add Exercise</button>
                </form>
            </div>
        </div>
        
        <div class="modal" id="workout-details-modal">
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <h3 id="workout-details-title">Workout Details</h3>
                <div id="workout-details-content">
                    <!-- Workout details will be shown here -->
                </div>
            </div>
        </div>
        
        <style>
            .custom-alert {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 15px 20px;
                border-radius: 4px;
                color: white;
                display: flex;
                align-items: center;
                justify-content: space-between;
                min-width: 250px;
                max-width: 350px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                z-index: 1000;
                transform: translateX(0);
                opacity: 1;
                transition: all 0.3s ease;
            }
            
            .custom-alert.fade-out {
                transform: translateX(100%);
                opacity: 0;
            }
            
            .custom-alert.info {
                background-color: #3498db;
            }
            
            .custom-alert.success {
                background-color: #2ecc71;
            }
            
            .custom-alert.warning {
                background-color: #f39c12;
            }
            
            .custom-alert.error {
                background-color: #e74c3c;
            }
            
            .close-alert {
                background: none;
                border: none;
                color: white;
                font-size: 20px;
                cursor: pointer;
                margin-left: 15px;
                padding: 0;
                line-height: 1;
            }
        </style>
    `;
    
    // Initialize the page
    renderCurrentWorkout();
    renderWorkoutHistory();
    renderExerciseLibrary();
    
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
    const exerciseModal = document.getElementById('exercise-modal');
    const detailsModal = document.getElementById('workout-details-modal');
    const addExerciseBtn = document.getElementById('add-exercise');
    const closeModals = document.querySelectorAll('.close-modal');
    
    addExerciseBtn.addEventListener('click', () => {
        exerciseModal.style.display = 'flex';
    });
    
    closeModals.forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            exerciseModal.style.display = 'none';
            detailsModal.style.display = 'none';
        });
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === exerciseModal || e.target === detailsModal) {
            exerciseModal.style.display = 'none';
            detailsModal.style.display = 'none';
        }
    });
    
    // Handle exercise form submission
    document.getElementById('exercise-form').addEventListener('submit', (e) => {
        e.preventDefault();
        
        const exerciseName = document.getElementById('exercise-name').value;
        const muscleGroup = document.getElementById('muscle-group').value;
        const isBodyweight = document.getElementById('is-bodyweight').checked;
        
        if (!exerciseName.trim()) {
            showAlert('Please enter an exercise name', 'error');
            return;
        }
        
        // Add to current workout
        workoutData.currentWorkout.exercises.push({
            name: exerciseName,
            sets: [isBodyweight ? { reps: null } : { weight: null, reps: null }],
            isBodyweight: isBodyweight
        });
        
        // Also add to library if not already there
        const existsInLibrary = workoutData.exerciseLibrary.some(ex => ex.name.toLowerCase() === exerciseName.toLowerCase());
        if (!existsInLibrary) {
            workoutData.exerciseLibrary.push({
                name: exerciseName,
                muscleGroup: muscleGroup,
                isBodyweight: isBodyweight,
                image: 'assets/images/default.jpg'
            });
        }
        
        // Update UI
        renderCurrentWorkout();
        renderExerciseLibrary();
        
        // Reset and close modal
        document.getElementById('exercise-form').reset();
        exerciseModal.style.display = 'none';
        
        showAlert('Exercise added successfully!', 'success');
    });
    
    // Handle workout actions
    document.getElementById('save-workout').addEventListener('click', saveWorkout);
    document.getElementById('finish-workout').addEventListener('click', finishWorkout);
    
    // Handle exercise search
    document.getElementById('search-exercises').addEventListener('click', () => {
        const searchTerm = document.getElementById('exercise-search').value.toLowerCase();
        renderExerciseLibrary(searchTerm);
    });
    
    document.getElementById('exercise-search').addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            const searchTerm = document.getElementById('exercise-search').value.toLowerCase();
            renderExerciseLibrary(searchTerm);
        }
    });
}

// Render current workout exercises
function renderCurrentWorkout() {
    const container = document.getElementById('current-exercises');
    container.innerHTML = '';
    
    document.getElementById('workout-name').textContent = workoutData.currentWorkout.name;
    
    workoutData.currentWorkout.exercises.forEach((exercise, exIndex) => {
        const exerciseCard = document.createElement('div');
        exerciseCard.className = 'card';
        
        const exerciseHTML = `
            <div class="exercise-header">
                <h4>${exercise.name}</h4>
                <button class="button button-danger remove-exercise" data-exercise="${exIndex}">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M18 6L6 18M6 6l12 12"/>
                    </svg>
                </button>
            </div>
            <div class="exercise-sets" id="sets-${exIndex}">
                ${exercise.sets.map((set, setIndex) => `
                    <div class="set">
                        <span>Set ${setIndex + 1}:</span>
                        ${!exercise.isBodyweight ? `
                            <input type="number" placeholder="Weight" class="form-control weight-input" 
                                   value="${set.weight || ''}" data-exercise="${exIndex}" data-set="${setIndex}" style="width: 80px;">
                            kg ×
                        ` : ''}
                        <input type="number" placeholder="Reps" class="form-control reps-input" 
                               value="${set.reps || ''}" data-exercise="${exIndex}" data-set="${setIndex}" style="width: 80px;">
                        reps
                        <button class="button button-danger remove-set" data-exercise="${exIndex}" data-set="${setIndex}">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M18 6L6 18M6 6l12 12"/>
                            </svg>
                        </button>
                    </div>
                `).join('')}
                <button class="button button-secondary add-set" data-exercise="${exIndex}" style="margin-top: 0.5rem;">+ Add Set</button>
            </div>
        `;
        
        exerciseCard.innerHTML = exerciseHTML;
        container.appendChild(exerciseCard);
    });
    
    // Add event listeners for dynamic elements
    document.querySelectorAll('.add-set').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const exIndex = parseInt(e.target.getAttribute('data-exercise'));
            const exercise = workoutData.currentWorkout.exercises[exIndex];
            
            exercise.sets.push(exercise.isBodyweight ? { reps: null } : { weight: null, reps: null });
            renderCurrentWorkout();
        });
    });
    
    document.querySelectorAll('.remove-set').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const exIndex = parseInt(e.target.getAttribute('data-exercise'));
            const setIndex = parseInt(e.target.getAttribute('data-set'));
            
            if (workoutData.currentWorkout.exercises[exIndex].sets.length > 1) {
                workoutData.currentWorkout.exercises[exIndex].sets.splice(setIndex, 1);
                renderCurrentWorkout();
            } else {
                showAlert('An exercise must have at least one set!', 'warning');
            }
        });
    });
    
    document.querySelectorAll('.remove-exercise').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const exIndex = parseInt(e.target.getAttribute('data-exercise'));
            
            if (workoutData.currentWorkout.exercises.length > 1) {
                workoutData.currentWorkout.exercises.splice(exIndex, 1);
                renderCurrentWorkout();
            } else {
                showAlert('Workout must have at least one exercise!', 'warning');
            }
        });
    });
    
    // Add input change listeners
    document.querySelectorAll('.weight-input').forEach(input => {
        input.addEventListener('change', (e) => {
            const exIndex = parseInt(e.target.getAttribute('data-exercise'));
            const setIndex = parseInt(e.target.getAttribute('data-set'));
            workoutData.currentWorkout.exercises[exIndex].sets[setIndex].weight = 
                e.target.value ? parseFloat(e.target.value) : null;
        });
    });
    
    document.querySelectorAll('.reps-input').forEach(input => {
        input.addEventListener('change', (e) => {
            const exIndex = parseInt(e.target.getAttribute('data-exercise'));
            const setIndex = parseInt(e.target.getAttribute('data-set'));
            workoutData.currentWorkout.exercises[exIndex].sets[setIndex].reps = 
                e.target.value ? parseInt(e.target.value) : null;
        });
    });
}

// Render workout history
function renderWorkoutHistory() {
    const tbody = document.querySelector('#history-table tbody');
    tbody.innerHTML = '';
    
    workoutData.workoutHistory.forEach((workout, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${workout.date}</td>
            <td>${workout.name}</td>
            <td>${workout.duration}</td>
            <td>${workout.exercises.length} exercises</td>
            <td>
                <button class="button view-workout" data-index="${index}">View</button>
                <button class="button button-danger delete-workout" data-index="${index}">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
    
    // Add event listeners for view buttons
    document.querySelectorAll('.view-workout').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.target.getAttribute('data-index'));
            showWorkoutDetails(workoutData.workoutHistory[index]);
        });
    });
    
    // Add event listeners for delete buttons
    document.querySelectorAll('.delete-workout').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.target.getAttribute('data-index'));
            
            // Create confirmation dialog
            const confirmDialog = document.createElement('div');
            confirmDialog.className = 'custom-alert warning';
            confirmDialog.style.top = '80px';
            confirmDialog.innerHTML = `
                <span>Are you sure you want to delete this workout?</span>
                <div style="margin-top: 10px;">
                    <button class="button button-danger confirm-delete" style="margin-right: 5px;">Delete</button>
                    <button class="button cancel-delete">Cancel</button>
                </div>
            `;
            
            document.body.appendChild(confirmDialog);
            
            confirmDialog.querySelector('.confirm-delete').addEventListener('click', () => {
                workoutData.workoutHistory.splice(index, 1);
                renderWorkoutHistory();
                confirmDialog.remove();
                showAlert('Workout deleted successfully!', 'success');
            });
            
            confirmDialog.querySelector('.cancel-delete').addEventListener('click', () => {
                confirmDialog.remove();
            });
        });
    });
}

// Show workout details in modal
function showWorkoutDetails(workout) {
    const modal = document.getElementById('workout-details-modal');
    const title = document.getElementById('workout-details-title');
    const content = document.getElementById('workout-details-content');
    
    title.textContent = `${workout.name} - ${workout.date}`;
    
    let detailsHTML = `
        <p><strong>Duration:</strong> ${workout.duration}</p>
        <h4>Exercises:</h4>
        <div class="workout-details-exercises">
    `;
    
    workout.exercises.forEach(exercise => {
        detailsHTML += `
            <div class="exercise-detail">
                <h5>${exercise.name}</h5>
                <div class="exercise-sets">
                    ${exercise.sets.map((set, index) => `
                        <div class="set">
                            <span>Set ${index + 1}:</span>
                            ${set.weight ? `<span>${set.weight} kg ×</span>` : ''}
                            ${set.reps ? `<span>${set.reps} reps</span>` : ''}
                            ${set.duration ? `<span>${set.duration}</span>` : ''}
                            ${set.distance ? `<span>${set.distance}</span>` : ''}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    });
    
    detailsHTML += `</div>`;
    content.innerHTML = detailsHTML;
    modal.style.display = 'flex';
}

// Render exercise library
function renderExerciseLibrary(searchTerm = '') {
    const container = document.getElementById('library-exercises');
    container.innerHTML = '';
    
    let exercisesToShow = workoutData.exerciseLibrary;
    
    if (searchTerm) {
        exercisesToShow = exercisesToShow.filter(exercise => 
            exercise.name.toLowerCase().includes(searchTerm) ||
            exercise.muscleGroup.toLowerCase().includes(searchTerm)
        );
    }
    
    exercisesToShow.forEach((exercise, index) => {
        const exerciseCard = document.createElement('div');
        exerciseCard.className = 'card exercise-item';
        
        exerciseCard.innerHTML = `
            <img src="${exercise.image}" alt="${exercise.name}" onerror="this.src='assets/images/default.jpg'">
            <div class="exercise-info">
                <h4>${exercise.name}</h4>
                <p>${exercise.muscleGroup}</p>
                <div class="exercise-meta">
                    <span>${exercise.isBodyweight ? 'Bodyweight' : 'Weighted'}</span>
                    <button class="button button-secondary add-to-workout" data-index="${index}">Add</button>
                </div>
            </div>
        `;
        
        container.appendChild(exerciseCard);
    });
    
    // Add event listeners for add buttons
    document.querySelectorAll('.add-to-workout').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.target.getAttribute('data-index'));
            const exercise = workoutData.exerciseLibrary[index];
            
            // Check if exercise already exists in current workout
            const exists = workoutData.currentWorkout.exercises.some(
                ex => ex.name.toLowerCase() === exercise.name.toLowerCase()
            );
            
            if (exists) {
                showAlert('This exercise is already in your current workout!', 'warning');
                return;
            }
            
            workoutData.currentWorkout.exercises.push({
                name: exercise.name,
                sets: [exercise.isBodyweight ? { reps: null } : { weight: null, reps: null }],
                isBodyweight: exercise.isBodyweight
            });
            
            renderCurrentWorkout();
            
            // Switch to current workout tab
            document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
            document.querySelector('.tab[data-tab="current"]').classList.add('active');
            
            document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
            document.getElementById('current-workout').classList.add('active');
            
            showAlert(`${exercise.name} added to current workout!`, 'success');
        });
    });
}

// Save current workout
function saveWorkout() {
    showAlert('Workout saved successfully!', 'success');
}

// Finish current workout
function finishWorkout() {
    // Add to history
    const now = new Date();
    const workoutDate = now.toISOString().split('T')[0];
    
    // Count completed sets for duration estimation
    let completedSets = 0;
    workoutData.currentWorkout.exercises.forEach(exercise => {
        exercise.sets.forEach(set => {
            if (set.reps !== null) completedSets++;
        });
    });
    
    // Estimate duration (1 minute per set)
    const duration = completedSets > 0 ? `${completedSets} min` : '0 min';
    
    // Create a deep copy of the current workout
    const workoutToAdd = {
        date: workoutDate,
        name: workoutData.currentWorkout.name,
        duration: duration,
        exercises: JSON.parse(JSON.stringify(workoutData.currentWorkout.exercises))
    };
    
    // Add to history
    workoutData.workoutHistory.unshift(workoutToAdd);
    
    // Reset current workout (keep the structure but clear the data)
    workoutData.currentWorkout.exercises.forEach(exercise => {
        exercise.sets.forEach(set => {
            if (exercise.isBodyweight) {
                set.reps = null;
            } else {
                set.weight = null;
                set.reps = null;
            }
        });
    });
    
    // Update UI
    renderCurrentWorkout();
    renderWorkoutHistory();
    
    showAlert('Workout completed and added to your history!', 'success');
}