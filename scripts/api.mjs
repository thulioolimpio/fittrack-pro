// api.mjs - API Simulada usando localStorage
export const api = {
    // Usuário
    getCurrentUser() {
        const user = JSON.parse(localStorage.getItem('currentUser'));
        if (!user) {
            console.warn('No logged in user found');
            return {
                name: 'User',
                weight: 0,
                goal: 'maintain',
                weightHistory: []
            };
        }
        return user;
    },

    updateUser(updatedData) {
        try {
            const currentUser = this.getCurrentUser();
            if (!currentUser) return false;

            // Atualiza os dados do usuário
            const updatedUser = {
                ...currentUser,
                ...updatedData
            };

            // Se estiver atualizando o peso, adiciona ao histórico
            if (updatedData.weight !== undefined) {
                updatedUser.weightHistory = updatedUser.weightHistory || [];
                updatedUser.weightHistory.push({
                    date: new Date().toISOString(),
                    weight: updatedData.weight
                });
            }

            // Atualiza no localStorage
            localStorage.setItem('currentUser', JSON.stringify(updatedUser));

            // Atualiza também na lista de usuários (se necessário)
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const userIndex = users.findIndex(u => u.id === currentUser.id);
            if (userIndex !== -1) {
                users[userIndex] = updatedUser;
                localStorage.setItem('users', JSON.stringify(users));
            }

            return true;
        } catch (error) {
            console.error('Error updating user:', error);
            return false;
        }
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
        const user = this.getCurrentUser();
        if (!user) return [];
        
        const today = new Date().toISOString().split('T')[0];
        return user.meals?.filter(meal => 
            new Date(meal.date).toISOString().split('T')[0] === today
        ) || [];
    },

    addMeal(meal) {
        try {
            const user = this.getCurrentUser();
            if (!user) return false;

            const meals = user.meals || [];
            meals.push({
                ...meal,
                date: new Date().toISOString(),
                id: Date.now().toString() // Garante que o ID é uma string única
            });

            return this.updateUser({ meals });
        } catch (error) {
            console.error('Error adding meal:', error);
            return false;
        }
    },

    removeMeal(mealId) {
        try {
            const user = this.getCurrentUser();
            if (!user) return false;

            const meals = user.meals || [];
            const updatedMeals = meals.filter(meal => meal.id.toString() !== mealId.toString());
            
            return this.updateUser({ meals: updatedMeals });
        } catch (error) {
            console.error('Error removing meal:', error);
            return false;
        }
    },

    getAllMeals() {
        return JSON.parse(localStorage.getItem('meals') || '[]');
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