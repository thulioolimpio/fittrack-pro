// api.mjs - API Simulada usando localStorage
export const api = {
    // Usuário
    getCurrentUser() {
        const user = localStorage.getItem('fitnessUser');
        return user ? JSON.parse(user) : null;
    },

    updateUser(updatedData) {
        const user = this.getCurrentUser() || {};
        const updatedUser = {...user, ...updatedData};
        localStorage.setItem('fitnessUser', JSON.stringify(updatedUser));
        return updatedUser;
    },

    updateGoal(newGoal) {
        const user = this.getCurrentUser();
        if (user) {
            user.goal = newGoal;
            localStorage.setItem('fitnessUser', JSON.stringify(user));
            return true;
        }
        return false;
    },

    // Workouts
    getTodayWorkout() {
        const workouts = JSON.parse(localStorage.getItem('workouts') || '[]');
        const today = new Date().toDateString();
        return workouts.find(w => new Date(w.date).toDateString() === today);
    },

    getWorkouts() {
        return JSON.parse(localStorage.getItem('workouts') || '[]');
    },

    saveWorkout(workout) {
        let workouts = this.getWorkouts();
        
        // Remove workout existente para a mesma data, se houver
        workouts = workouts.filter(w => 
            new Date(w.date).toDateString() !== new Date(workout.date).toDateString()
        );
        
        workouts.push(workout);
        localStorage.setItem('workouts', JSON.stringify(workouts));
        return workout;
    },

    updateWorkoutProgress(exerciseName) {
        const workout = this.getTodayWorkout();
        if (workout) {
            const exercise = workout.exercises.find(ex => ex.name === exerciseName);
            if (exercise) {
                exercise.completed = exercise.completed === exercise.sets ? 0 : exercise.sets;
                this.saveWorkout(workout);
                return true;
            }
        }
        return false;
    },

    // Nutrition
    getTodayMeals() {
        const today = new Date().toDateString();
        const meals = JSON.parse(localStorage.getItem('meals') || '[]');
        return meals.filter(meal => new Date(meal.date).toDateString() === today);
    },

    getAllMeals() {
        return JSON.parse(localStorage.getItem('meals') || '[]');
    },

    addMeal(meal) {
        const meals = this.getAllMeals();
        const mealWithDate = {
            ...meal,
            date: new Date().toISOString(),
            id: Date.now()
        };
        meals.push(mealWithDate);
        localStorage.setItem('meals', JSON.stringify(meals));
        return mealWithDate;
    },

    removeMeal(mealId) {
        let meals = this.getAllMeals();
        meals = meals.filter(meal => meal.id !== mealId);
        localStorage.setItem('meals', JSON.stringify(meals));
        return true;
    },

    // Water
    getWaterIntake() {
        const today = new Date().toDateString();
        const waterLog = JSON.parse(localStorage.getItem('waterLog') || '[]');
        const todayLog = waterLog.find(log => new Date(log.date).toDateString() === today);
        return todayLog ? todayLog.amount : 0;
    },

    addWater(amount) {
        const today = new Date().toDateString();
        let waterLog = JSON.parse(localStorage.getItem('waterLog') || '[]');
        
        // Remove registro existente para hoje, se houver
        waterLog = waterLog.filter(log => new Date(log.date).toDateString() !== today);
        
        const newLog = {
            date: new Date().toISOString(),
            amount: (waterLog.find(log => new Date(log.date).toDateString() === today)?.amount || 0) + amount
        };
        
        waterLog.push(newLog);
        localStorage.setItem('waterLog', JSON.stringify(waterLog));
        return newLog.amount;
    },

    // Activity
    getRecentActivities(limit = 3) {
        const activities = JSON.parse(localStorage.getItem('activities') || '[]');
        return activities
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, limit);
    },

    logActivity(type, message) {
        const activities = JSON.parse(localStorage.getItem('activities') || '[]');
        activities.push({
            type,
            message,
            date: new Date().toISOString()
        });
        localStorage.setItem('activities', JSON.stringify(activities));
    },

    // Initialize sample data if empty
    initSampleData() {
        if (!this.getCurrentUser()) {
            this.updateUser({
                name: 'John Doe',
                weight: 75,
                goal: 'lose-weight',
                height: 180,
                birthDate: '1990-01-01'
            });
            this.logActivity('system', 'User profile created');
        }

        if (this.getWorkouts().length === 0) {
            this.saveWorkout({
                date: new Date().toISOString(),
                type: 'Full Body Circuit',
                exercises: [
                    { name: 'Squats', sets: 3, reps: 12, completed: 1 },
                    { name: 'Push Ups', sets: 3, reps: 10, completed: 1 },
                    { name: 'Rows', sets: 3, reps: 10, completed: 0 }
                ]
            });
            this.logActivity('workout', 'Workout plan created');
        }

        if (this.getAllMeals().length === 0) {
            this.addMeal({ 
                name: 'Oatmeal', 
                type: 'breakfast', 
                calories: 350, 
                protein: 12 
            });
            this.addMeal({ 
                name: 'Salmon', 
                type: 'lunch', 
                calories: 550, 
                protein: 40 
            });
            this.logActivity('nutrition', 'Sample meals added');
        }

        if (JSON.parse(localStorage.getItem('waterLog') || '[]').length === 0) {
            this.addWater(500);
            this.logActivity('water', 'Initial water intake logged');
        }

        if (JSON.parse(localStorage.getItem('activities') || '[]').length === 0) {
            this.logActivity('system', 'Application initialized');
        }
    }
};

// Inicializa dados de exemplo
api.initSampleData();