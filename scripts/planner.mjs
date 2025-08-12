export function loadPlannerPage() {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'styles/planner.css';
    document.head.appendChild(link);
    
    // Initialize planner data
    let currentDate = new Date();
    let plannerData = JSON.parse(localStorage.getItem('plannerData')) || {};
    let currentlyEditingDay = null;
    let currentlyEditingType = null;
    
    // Weather API configuration
    const weatherAPI = {
        key: '748ec4ed05c799a55eb7e320d8f24d20',
        baseUrl: 'https://api.openweathermap.org/data/2.5/'
    };

    const appContainer = document.getElementById('app-container');
    appContainer.innerHTML = `
        <section class="planner">
            <h2>Weekly Planner</h2>
            
            <div class="week-selector">
                <button class="button" id="prev-week">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M15 18l-6-6 6-6"/>
                    </svg>
                    Previous
                </button>
                <h3 id="week-range">${formatWeekRange(getWeekDates(currentDate))}</h3>
                <button class="button" id="next-week">
                    Next
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M9 18l6-6-6-6"/>
                    </svg>
                </button>
            </div>
            
            <div class="week-view" id="week-view">
                <!-- Days will be generated dynamically -->
            </div>
            
            <!-- Workout Edit Form -->
            <div class="inline-edit-form" id="workout-edit-form">
                <h3>Edit Workout</h3>
                <form id="workout-plan-form">
                    <input type="hidden" id="edit-day">
                    <div class="form-group">
                        <label>Workout Type</label>
                        <select class="form-control" id="workout-type">
                            <option value="Strength Training">Strength Training</option>
                            <option value="Cardio">Cardio</option>
                            <option value="HIIT">HIIT</option>
                            <option value="Yoga">Yoga</option>
                            <option value="Rest Day">Rest Day</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Time</label>
                        <input type="time" class="form-control" id="workout-time">
                    </div>
                    <div class="form-group">
                        <label>Notes</label>
                        <textarea class="form-control" rows="3" id="workout-notes"></textarea>
                    </div>
                    <div class="form-actions">
                        <button type="submit" class="button button-primary">Save</button>
                        <button type="button" class="button button-secondary" id="cancel-workout-edit">Cancel</button>
                    </div>
                </form>
            </div>
            
            <!-- Meal Edit Form -->
            <div class="inline-edit-form" id="meal-edit-form">
                <h3>Edit Meals</h3>
                <form id="meal-plan-form">
                    <input type="hidden" id="edit-meal-day">
                    <div class="form-group">
                        <label>Breakfast</label>
                        <input type="text" class="form-control" id="breakfast">
                    </div>
                    <div class="form-group">
                        <label>Lunch</label>
                        <input type="text" class="form-control" id="lunch">
                    </div>
                    <div class="form-group">
                        <label>Dinner</label>
                        <input type="text" class="form-control" id="dinner">
                    </div>
                    <div class="form-group">
                        <label>Snacks</label>
                        <input type="text" class="form-control" id="snacks">
                    </div>
                    <div class="form-actions">
                        <button type="submit" class="button button-primary">Save</button>
                        <button type="button" class="button button-secondary" id="cancel-meal-edit">Cancel</button>
                    </div>
                </form>
            </div>
            
            <!-- Location Edit Form -->
            <div class="inline-edit-form" id="location-edit-form">
                <h3>Add Location for Weather</h3>
                <form id="location-form">
                    <input type="hidden" id="location-day">
                    <div class="form-group">
                        <label>City and Country (e.g., "London,UK" or "São Paulo,BR")</label>
                        <input type="text" class="form-control" id="city-name" required>
                        <p class="input-hint">For better results, include country code</p>
                    </div>
                    <div class="form-actions">
                        <button type="submit" class="button button-primary">Get Weather</button>
                        <button type="button" class="button button-secondary" id="cancel-location-edit">Cancel</button>
                    </div>
                </form>
            </div>
            
            <div class="planner-actions">
                <button class="button button-primary" id="save-plan">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
                        <path d="M17 21v-8H7v8"/>
                        <path d="M7 3v5h8"/>
                    </svg>
                    Save Plan
                </button>
                <button class="button button-secondary" id="copy-next-week">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    </svg>
                    Copy to Next Week
                </button>
            </div>
        </section>
    `;
    
    // Helper functions
    function getWeekDates(date) {
        const startDate = new Date(date);
        startDate.setDate(date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1));
        
        return Array.from({ length: 7 }, (_, i) => {
            const dayDate = new Date(startDate);
            dayDate.setDate(startDate.getDate() + i);
            return dayDate;
        });
    }
    
    function formatDate(date) {
        return date.toLocaleString('default', { month: 'short', day: 'numeric' });
    }
    
    function formatDateKey(date) {
        return date.toISOString().split('T')[0];
    }
    
    function formatWeekRange(dates) {
        const firstDay = dates[0];
        const lastDay = dates[6];
        return `${firstDay.toLocaleString('default', { month: 'long', day: 'numeric' })} - ${lastDay.toLocaleString('default', { day: 'numeric', year: 'numeric' })}`;
    }
    
    function hideAllEditForms() {
        document.getElementById('workout-edit-form').style.display = 'none';
        document.getElementById('meal-edit-form').style.display = 'none';
        document.getElementById('location-edit-form').style.display = 'none';
        currentlyEditingDay = null;
        currentlyEditingType = null;
    }
    
    // Improved Weather API function with fallback
    async function fetchWeather(city, date) {
        try {
            if (!city || typeof city !== 'string' || city.trim().length < 2) {
                throw new Error('Please enter a valid city name');
            }

            // First try forecast API
            const forecastResponse = await fetch(
                `${weatherAPI.baseUrl}forecast?q=${encodeURIComponent(city)}&appid=${weatherAPI.key}&units=metric&lang=pt_br`
            );
            
            if (forecastResponse.ok) {
                const forecastData = await forecastResponse.json();
                const targetDate = new Date(date).toDateString();
                
                const forecastsForDate = forecastData.list.filter(item => {
                    return new Date(item.dt_txt).toDateString() === targetDate;
                });

                if (forecastsForDate.length > 0) {
                    const forecast = forecastsForDate.reduce((closest, item) => {
                        const itemHours = new Date(item.dt_txt).getHours();
                        const closestHours = closest ? new Date(closest.dt_txt).getHours() : null;
                        
                        if (!closest || Math.abs(12 - itemHours) < Math.abs(12 - closestHours)) {
                            return item;
                        }
                        return closest;
                    }, forecastsForDate[0]);

                    return {
                        temp: forecast.main.temp,
                        icon: forecast.weather[0].icon,
                        description: forecast.weather[0].description,
                        humidity: forecast.main.humidity,
                        wind: forecast.wind.speed,
                        feels_like: forecast.main.feels_like,
                        source: 'forecast'
                    };
                }
            }

            // Fallback to current weather API
            const currentResponse = await fetch(
                `${weatherAPI.baseUrl}weather?q=${encodeURIComponent(city)}&appid=${weatherAPI.key}&units=metric&lang=pt_br`
            );
            
            if (!currentResponse.ok) {
                const errorData = await currentResponse.json();
                if (errorData.cod === "404") {
                    throw new Error(`City "${city}" not found. Try "City,Country" format.`);
                } else {
                    throw new Error('Weather service unavailable');
                }
            }
            
            const currentData = await currentResponse.json();
            
            return {
                temp: currentData.main.temp,
                icon: currentData.weather[0].icon,
                description: currentData.weather[0].description,
                humidity: currentData.main.humidity,
                wind: currentData.wind.speed,
                feels_like: currentData.main.feels_like,
                source: 'current'
            };

        } catch (error) {
            console.error('Weather API Error:', error);
            throw error;
        }
    }
    
    function renderWeather(dayKey, weather) {
        const weatherElement = document.createElement('div');
        weatherElement.className = 'weather-info';
        weatherElement.innerHTML = `
            <img src="https://openweathermap.org/img/wn/${weather.icon}@2x.png" 
                 alt="${weather.description}" 
                 title="${weather.description}">
            <div class="weather-details">
                <span class="weather-temp">${Math.round(weather.temp)}°C</span>
                <small>Feels like: ${Math.round(weather.feels_like)}°C</small>
                <div class="weather-meta">
                    <span>💧 ${weather.humidity}%</span>
                    <span>🌬️ ${weather.wind} m/s</span>
                </div>
                ${weather.source === 'current' ? 
                    '<div class="weather-note">(Current weather data)</div>' : 
                    '<div class="weather-note">(Forecast for this date)</div>'}
            </div>
        `;
        
        const dayCard = document.querySelector(`.day-card[data-date="${dayKey}"]`);
        if (dayCard) {
            let weatherContainer = dayCard.querySelector('.weather-container');
            if (!weatherContainer) {
                weatherContainer = document.createElement('div');
                weatherContainer.className = 'weather-container';
                dayCard.insertBefore(weatherContainer, dayCard.querySelector('.workout-plan'));
            }
            weatherContainer.innerHTML = '';
            weatherContainer.appendChild(weatherElement);
        }
    }
    
    // Main render function
    async function renderWeekView(date) {
        const weekDates = getWeekDates(date);
        document.getElementById('week-range').textContent = formatWeekRange(weekDates);
        
        const weekView = document.getElementById('week-view');
        weekView.innerHTML = '';
        
        const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        
        for (const dayDate of weekDates) {
            const dayKey = formatDateKey(dayDate);
            const dayData = plannerData[dayKey] || {};
            
            const dayCard = document.createElement('div');
            dayCard.className = 'day-card';
            dayCard.dataset.date = dayKey;
            dayCard.innerHTML = `
                <div class="day-header">
                    <h4>${daysOfWeek[dayDate.getDay() - 1]}</h4>
                    <span>${formatDate(dayDate)}</span>
                    <button class="button button-small edit-location" data-day="${dayKey}">
                        ${dayData.location ? `📍 ${dayData.location}` : 'Add Location'}
                    </button>
                </div>
                <div class="workout-plan">
                    <h5>${dayData.workout?.type || 'No workout planned'}</h5>
                    <p>${dayData.workout?.notes || ''}</p>
                    ${dayData.workout?.time ? `<p class="workout-time">${dayData.workout.time}</p>` : ''}
                    <button class="button button-secondary edit-workout" data-day="${dayKey}">
                        ${dayData.workout ? 'Edit' : 'Add Workout'}
                    </button>
                </div>
                <div class="meal-plan">
                    <h5>Meal Plan</h5>
                    <ul>
                        ${dayData.meals?.breakfast ? `<li>Breakfast: ${dayData.meals.breakfast}</li>` : ''}
                        ${dayData.meals?.lunch ? `<li>Lunch: ${dayData.meals.lunch}</li>` : ''}
                        ${dayData.meals?.dinner ? `<li>Dinner: ${dayData.meals.dinner}</li>` : ''}
                        ${dayData.meals?.snacks ? `<li>Snacks: ${dayData.meals.snacks}</li>` : ''}
                        ${!dayData.meals ? '<li>No meals planned</li>' : ''}
                    </ul>
                    <button class="button button-secondary edit-meal" data-day="${dayKey}">
                        ${dayData.meals ? 'Edit' : 'Add Meals'}
                    </button>
                </div>
            `;
            
            weekView.appendChild(dayCard);
            
            // Add weather container if location exists
            if (dayData.location) {
                const weatherContainer = document.createElement('div');
                weatherContainer.className = 'weather-container';
                dayCard.insertBefore(weatherContainer, dayCard.querySelector('.workout-plan'));
                
                if (dayData.weather) {
                    renderWeather(dayKey, dayData.weather);
                } else {
                    weatherContainer.innerHTML = `
                        <div class="weather-loading">
                            <span class="loading-spinner"></span>
                            Loading weather data...
                        </div>
                    `;
                    try {
                        const weather = await fetchWeather(dayData.location, dayDate);
                        if (!plannerData[dayKey]) plannerData[dayKey] = {};
                        plannerData[dayKey].weather = weather;
                        plannerData[dayKey].weatherFetched = new Date().toISOString();
                        renderWeather(dayKey, weather);
                        localStorage.setItem('plannerData', JSON.stringify(plannerData));
                    } catch (error) {
                        weatherContainer.innerHTML = `
                            <div class="weather-error">
                                <p>${error.message || 'Failed to load weather data'}</p>
                                <button class="button button-small retry-weather" data-day="${dayKey}">
                                    Try Again
                                </button>
                            </div>
                        `;
                    }
                }
            }
        }
        
        setupEventListeners();
    }
    
    function setupEventListeners() {
        // Edit buttons
        document.querySelectorAll('.edit-workout').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const dayKey = e.target.dataset.day;
                const dayData = plannerData[dayKey] || {};
                
                hideAllEditForms();
                
                document.getElementById('edit-day').value = dayKey;
                document.getElementById('workout-type').value = dayData.workout?.type || 'Strength Training';
                document.getElementById('workout-time').value = dayData.workout?.time || '07:00';
                document.getElementById('workout-notes').value = dayData.workout?.notes || '';
                
                const form = document.getElementById('workout-edit-form');
                form.style.display = 'block';
                form.style.position = 'absolute';
                form.style.top = `${e.target.getBoundingClientRect().bottom + window.scrollY + 10}px`;
                form.style.left = `${e.target.getBoundingClientRect().left + window.scrollX}px`;
                
                currentlyEditingDay = dayKey;
                currentlyEditingType = 'workout';
            });
        });
        
        document.querySelectorAll('.edit-meal').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const dayKey = e.target.dataset.day;
                const dayData = plannerData[dayKey] || {};
                
                hideAllEditForms();
                
                document.getElementById('edit-meal-day').value = dayKey;
                document.getElementById('breakfast').value = dayData.meals?.breakfast || '';
                document.getElementById('lunch').value = dayData.meals?.lunch || '';
                document.getElementById('dinner').value = dayData.meals?.dinner || '';
                document.getElementById('snacks').value = dayData.meals?.snacks || '';
                
                const form = document.getElementById('meal-edit-form');
                form.style.display = 'block';
                form.style.position = 'absolute';
                form.style.top = `${e.target.getBoundingClientRect().bottom + window.scrollY + 10}px`;
                form.style.left = `${e.target.getBoundingClientRect().left + window.scrollX}px`;
                
                currentlyEditingDay = dayKey;
                currentlyEditingType = 'meal';
            });
        });
        
        document.querySelectorAll('.edit-location').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const dayKey = e.target.dataset.day;
                const dayData = plannerData[dayKey] || {};
                
                hideAllEditForms();
                
                document.getElementById('location-day').value = dayKey;
                document.getElementById('city-name').value = dayData.location || '';
                document.getElementById('city-name').focus();
                
                const form = document.getElementById('location-edit-form');
                form.style.display = 'block';
                form.style.position = 'absolute';
                form.style.top = `${e.target.getBoundingClientRect().bottom + window.scrollY + 10}px`;
                form.style.left = `${e.target.getBoundingClientRect().left + window.scrollX}px`;
                
                currentlyEditingDay = dayKey;
                currentlyEditingType = 'location';
            });
        });
        
        // Form submissions
        document.getElementById('workout-plan-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const dayKey = document.getElementById('edit-day').value;
            
            if (!plannerData[dayKey]) plannerData[dayKey] = {};
            
            plannerData[dayKey].workout = {
                type: document.getElementById('workout-type').value,
                time: document.getElementById('workout-time').value,
                notes: document.getElementById('workout-notes').value
            };
            
            hideAllEditForms();
            renderWeekView(currentDate);
        });
        
        document.getElementById('meal-plan-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const dayKey = document.getElementById('edit-meal-day').value;
            
            if (!plannerData[dayKey]) plannerData[dayKey] = {};
            
            plannerData[dayKey].meals = {
                breakfast: document.getElementById('breakfast').value,
                lunch: document.getElementById('lunch').value,
                dinner: document.getElementById('dinner').value,
                snacks: document.getElementById('snacks').value
            };
            
            hideAllEditForms();
            renderWeekView(currentDate);
        });
        
        document.getElementById('location-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            const dayKey = document.getElementById('location-day').value;
            const city = document.getElementById('city-name').value.trim();
            
            if (!city) {
                alert('Please enter a city name');
                return;
            }

            // Show loading state
            const dayCard = document.querySelector(`.day-card[data-date="${dayKey}"]`);
            if (dayCard) {
                let weatherContainer = dayCard.querySelector('.weather-container');
                if (!weatherContainer) {
                    weatherContainer = document.createElement('div');
                    weatherContainer.className = 'weather-container';
                    dayCard.insertBefore(weatherContainer, dayCard.querySelector('.workout-plan'));
                }
                weatherContainer.innerHTML = `
                    <div class="weather-loading">
                        <span class="loading-spinner"></span>
                        Loading weather data...
                    </div>
                `;
            }

            try {
                const dayDate = new Date(dayKey);
                const weather = await fetchWeather(city, dayDate);
                
                if (!plannerData[dayKey]) plannerData[dayKey] = {};
                
                plannerData[dayKey].location = city;
                plannerData[dayKey].weather = weather;
                plannerData[dayKey].weatherFetched = new Date().toISOString();
                
                localStorage.setItem('plannerData', JSON.stringify(plannerData));
                hideAllEditForms();
                renderWeekView(currentDate);
                
            } catch (error) {
                let errorMessage = 'Could not fetch weather data: ';
                
                if (error.message.includes('not found')) {
                    errorMessage = `City "${city}" not found. Try "City,Country" format (e.g., "London,UK").`;
                } else if (error.message.includes('service unavailable')) {
                    errorMessage = 'Weather service is currently unavailable. Please try again later.';
                } else {
                    errorMessage += error.message || 'Unknown error';
                }
                
                // Show error in the card
                const weatherContainer = document.querySelector(`.day-card[data-date="${dayKey}"] .weather-container`);
                if (weatherContainer) {
                    weatherContainer.innerHTML = `
                        <div class="weather-error">
                            <p>${errorMessage}</p>
                            <button class="button button-small retry-weather" data-day="${dayKey}">
                                Try Again
                            </button>
                        </div>
                    `;
                }
                
                // Remove invalid location
                if (plannerData[dayKey]) {
                    delete plannerData[dayKey].location;
                    delete plannerData[dayKey].weather;
                }
            }
        });
        
        // Retry button for weather errors
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('retry-weather')) {
                const dayKey = e.target.dataset.day;
                const dayData = plannerData[dayKey] || {};
                if (dayData.location) {
                    document.querySelector(`.edit-location[data-day="${dayKey}"]`).click();
                }
            }
        });
        
        // Navigation buttons
        document.getElementById('prev-week').addEventListener('click', () => {
            currentDate.setDate(currentDate.getDate() - 7);
            hideAllEditForms();
            renderWeekView(currentDate);
        });
        
        document.getElementById('next-week').addEventListener('click', () => {
            currentDate.setDate(currentDate.getDate() + 7);
            hideAllEditForms();
            renderWeekView(currentDate);
        });
        
        // Save and copy buttons
        document.getElementById('save-plan').addEventListener('click', () => {
            localStorage.setItem('plannerData', JSON.stringify(plannerData));
            alert('Weekly plan saved successfully!');
        });
        
        document.getElementById('copy-next-week').addEventListener('click', () => {
            const currentWeek = getWeekDates(currentDate);
            const nextWeek = getWeekDates(new Date(currentDate));
            nextWeek.forEach(date => date.setDate(date.getDate() + 7));
            
            currentWeek.forEach((date, i) => {
                const currentKey = formatDateKey(date);
                const nextKey = formatDateKey(nextWeek[i]);
                
                if (plannerData[currentKey]) {
                    plannerData[nextKey] = JSON.parse(JSON.stringify(plannerData[currentKey]));
                    // Don't copy weather data as it might be outdated
                    delete plannerData[nextKey].weather;
                    delete plannerData[nextKey].weatherFetched;
                }
            });
            
            hideAllEditForms();
            currentDate = new Date(nextWeek[0]);
            renderWeekView(currentDate);
            alert('Plan copied to next week! Weather will refresh for new locations.');
        });
        
        // Cancel buttons
        document.getElementById('cancel-workout-edit').addEventListener('click', hideAllEditForms);
        document.getElementById('cancel-meal-edit').addEventListener('click', hideAllEditForms);
        document.getElementById('cancel-location-edit').addEventListener('click', hideAllEditForms);
        
        // Close forms when clicking outside
        document.addEventListener('click', (e) => {
            if (currentlyEditingDay && 
                !e.target.closest('.inline-edit-form') && 
                !e.target.classList.contains('edit-workout') && 
                !e.target.classList.contains('edit-meal') &&
                !e.target.classList.contains('edit-location')) {
                hideAllEditForms();
            }
        });
    }

    // Initialize
    renderWeekView(currentDate);
}