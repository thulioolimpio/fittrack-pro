export function loadMealsPage() {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'styles/meals.css';
    document.head.appendChild(link);
    
    const appContainer = document.getElementById('app-container');
    appContainer.innerHTML = `
        <section class="meals">
            <h2>Nutrition Tracker</h2>
            
            <div class="tabs">
                <div class="tab active" data-tab="diary">Food Diary</div>
                <div class="tab" data-tab="log">Log Food</div>
                <div class="tab" data-tab="recipes">Recipes</div>
            </div>
            
            <div class="tab-content active" id="diary-meals">
                <div class="nutrition-summary">
                    <div class="nutrition-card">
                        <h4>Calories</h4>
                        <div class="progress-bar">
                            <div class="progress" style="width: 65%"></div>
                        </div>
                        <p>1,300 / 2,000 kcal</p>
                    </div>
                    
                    <div class="nutrition-card">
                        <h4>Protein</h4>
                        <div class="progress-bar">
                            <div class="progress" style="width: 80%"></div>
                        </div>
                        <p>120 / 150g</p>
                    </div>
                    
                    <div class="nutrition-card">
                        <h4>Carbs</h4>
                        <div class="progress-bar">
                            <div class="progress" style="width: 45%"></div>
                        </div>
                        <p>90 / 200g</p>
                    </div>
                    
                    <div class="nutrition-card">
                        <h4>Fat</h4>
                        <div class="progress-bar">
                            <div class="progress" style="width: 55%"></div>
                        </div>
                        <p>50 / 90g</p>
                    </div>
                </div>
                
                <div class="meals-list">
                    <div class="meal-time">
                        <h4>Breakfast</h4>
                        <div class="food-item">
                            <img src="assets/images/oatmeal.jpg" alt="Oatmeal">
                            <div class="food-info">
                                <h5>Oatmeal with Banana</h5>
                                <p>350 kcal | P: 12g C: 60g F: 5g</p>
                            </div>
                            <button class="button">Edit</button>
                        </div>
                    </div>
                    
                    <div class="meal-time">
                        <h4>Lunch</h4>
                        <div class="food-item">
                            <img src="assets/images/salmon.jpg" alt="Salmon">
                            <div class="food-info">
                                <h5>Grilled Salmon with Rice</h5>
                                <p>550 kcal | P: 40g C: 45g F: 20g</p>
                            </div>
                            <button class="button">Edit</button>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="tab-content" id="log-meals">
                <div class="search-bar">
                    <input type="text" placeholder="Search foods..." class="form-control">
                    <button class="button button-primary">Search</button>
                </div>
                
                <div class="card-grid">
                    <div class="card">
                        <h4>Common Foods</h4>
                        <div class="quick-foods">
                            <button class="button button-secondary">Chicken Breast</button>
                            <button class="button button-secondary">Rice</button>
                            <button class="button button-secondary">Eggs</button>
                            <button class="button button-secondary">Broccoli</button>
                        </div>
                    </div>
                    
                    <div class="card">
                        <h4>Recent Foods</h4>
                        <div class="food-item">
                            <img src="assets/images/oatmeal.jpg" alt="Oatmeal">
                            <div class="food-info">
                                <h5>Oatmeal</h5>
                                <p>150 kcal per 100g</p>
                            </div>
                            <button class="button button-primary">Add</button>
                        </div>
                    </div>
                </div>
                
                <div class="custom-food">
                    <h4>Custom Food</h4>
                    <form id="custom-food-form">
                        <div class="form-group">
                            <label>Food Name</label>
                            <input type="text" class="form-control" required>
                        </div>
                        <div class="form-group">
                            <label>Serving Size (g)</label>
                            <input type="number" class="form-control" required>
                        </div>
                        <div class="form-group">
                            <label>Calories</label>
                            <input type="number" class="form-control" required>
                        </div>
                        <div class="macros-group">
                            <div class="form-group">
                                <label>Protein (g)</label>
                                <input type="number" class="form-control">
                            </div>
                            <div class="form-group">
                                <label>Carbs (g)</label>
                                <input type="number" class="form-control">
                            </div>
                            <div class="form-group">
                                <label>Fat (g)</label>
                                <input type="number" class="form-control">
                            </div>
                        </div>
                        <button type="submit" class="button button-primary">Add Food</button>
                    </form>
                </div>
            </div>
            
            <div class="tab-content" id="recipes-meals">
                <div class="card-grid">
                    <div class="card recipe-card">
                        <img src="assets/images/meal-prep.jpg" alt="Meal Prep">
                        <div class="recipe-info">
                            <h4>Meal Prep Chicken</h4>
                            <p>4 servings | 450 kcal each</p>
                            <div class="recipe-meta">
                                <span>P: 45g C: 30g F: 15g</span>
                                <button class="button button-primary">Add to Plan</button>
                            </div>
                        </div>
                    </div>
                    
                    <div class="card recipe-card">
                        <img src="assets/images/smoothie.jpg" alt="Smoothie">
                        <div class="recipe-info">
                            <h4>Protein Smoothie</h4>
                            <p>1 serving | 320 kcal</p>
                            <div class="recipe-meta">
                                <span>P: 30g C: 40g F: 5g</span>
                                <button class="button button-primary">Add to Plan</button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <button class="button button-secondary">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M12 5v14M5 12h14"/>
                    </svg>
                    Add New Recipe
                </button>
            </div>
        </section>
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
            document.getElementById(`${tabId}-meals`).classList.add('active');
        });
    });
}