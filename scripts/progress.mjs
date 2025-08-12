// Módulo de armazenamento
const ProgressStorage = {
  get(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  },
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export function loadProgressPage() {
  // Carrega CSS
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'styles/progress.css';
  document.head.appendChild(link);
  
  // Carrega HTML com modais já escondidos via style inline
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
              <input type="number" id="current-weight" placeholder="Current weight (kg)" class="form-control">
              <button class="button button-primary" id="update-weight">
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
                <input type="number" id="chest-measure" class="form-control">
              </div>
              <div class="form-group">
                <label>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M4 12h16"/>
                    <path d="M12 4v16"/>
                  </svg>
                  Waist (cm)
                </label>
                <input type="number" id="waist-measure" class="form-control">
              </div>
              <div class="form-group">
                <label>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <rect x="3" y="3" width="18" height="18" rx="2"/>
                    <path d="M9 9h6v6H9z"/>
                  </svg>
                  Hips (cm)
                </label>
                <input type="number" id="hips-measure" class="form-control">
              </div>
              <button class="button button-primary" id="save-measurements">
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
              <select class="form-control" id="exercise-select" style="width: auto;">
                <option value="squat">Squat</option>
                <option value="bench">Bench Press</option>
                <option value="deadlift">Deadlift</option>
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
              <select class="form-control" id="frequency-select" style="width: auto;">
                <option value="4">Last 4 Weeks</option>
                <option value="12">Last 12 Weeks</option>
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
              <select class="form-control" id="calories-select" style="width: auto;">
                <option value="7">Last 7 Days</option>
                <option value="30">Last 30 Days</option>
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
              <button class="button button-secondary water-amount" data-amount="250">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M12 5v14M5 12h14"/>
                </svg>
                250ml
              </button>
              <button class="button button-secondary water-amount" data-amount="500">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M12 5v14M5 12h14"/>
                </svg>
                500ml
              </button>
              <button class="button button-primary" id="log-water">
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
    
    <div class="modal" id="weight-modal" style="display: none; opacity: 0; transition: opacity 0.3s ease;">
      <div class="modal-content">
        <span class="close-modal">&times;</span>
        <h3>Add Weight Entry</h3>
        <form id="weight-form">
          <div class="form-group">
            <label>Weight (kg)</label>
            <input type="number" step="0.1" id="weight-input" class="form-control" required>
          </div>
          <div class="form-group">
            <label>Date</label>
            <input type="date" id="weight-date" class="form-control" required>
          </div>
          <div class="form-group">
            <label>Notes (optional)</label>
            <textarea id="weight-notes" class="form-control" rows="3"></textarea>
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

  // Inicializa funcionalidades
  initTabs();
  initWeightTracking();
  initBodyMeasurements();
  initWorkoutProgress();
  initNutritionProgress();

  // Funções de inicialização
  function initTabs() {
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
  }

  function initWeightTracking() {
    // Inicializa modal
    const modal = document.getElementById('weight-modal');
    const addWeightBtn = document.getElementById('add-weight');
    const closeModal = document.querySelector('.close-modal');
    const weightForm = document.getElementById('weight-form');
    
    // Configura data padrão para hoje
    document.getElementById('weight-date').valueAsDate = new Date();
    
    // Event listeners
    if (addWeightBtn) {
      addWeightBtn.addEventListener('click', () => {
        modal.style.display = 'flex';
        setTimeout(() => {
          modal.style.opacity = '1';
        }, 10);
      });
    }
    
    if (closeModal) {
      closeModal.addEventListener('click', () => {
        modal.style.opacity = '0';
        setTimeout(() => {
          modal.style.display = 'none';
        }, 300);
      });
    }
    
    window.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.opacity = '0';
        setTimeout(() => {
          modal.style.display = 'none';
        }, 300);
      }
    });
    
    // Formulário de peso
    weightForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const weightEntry = {
        date: document.getElementById('weight-date').value,
        weight: parseFloat(document.getElementById('weight-input').value),
        notes: document.getElementById('weight-notes').value,
        timestamp: new Date().getTime()
      };
      
      // Salva no localStorage
      const weightHistory = ProgressStorage.get('weightHistory') || [];
      weightHistory.push(weightEntry);
      ProgressStorage.set('weightHistory', weightHistory);
      
      // Atualiza gráfico e valor atual
      updateWeightChart();
      document.getElementById('current-weight').value = weightEntry.weight;
      
      // Fecha modal e limpa formulário
      modal.style.opacity = '0';
      setTimeout(() => {
        modal.style.display = 'none';
      }, 300);
      weightForm.reset();
      document.getElementById('weight-date').valueAsDate = new Date();
    });
    
    // Atualização rápida de peso
    document.getElementById('update-weight').addEventListener('click', () => {
      const currentWeight = parseFloat(document.getElementById('current-weight').value);
      if (!isNaN(currentWeight)) {
        const weightEntry = {
          date: new Date().toISOString().split('T')[0],
          weight: currentWeight,
          notes: 'Quick update',
          timestamp: new Date().getTime()
        };
        
        const weightHistory = ProgressStorage.get('weightHistory') || [];
        weightHistory.push(weightEntry);
        ProgressStorage.set('weightHistory', weightHistory);
        
        updateWeightChart();
      }
    });
    
    // Inicializa gráfico
    updateWeightChart();
    
    // Carrega último peso registrado
    const weightHistory = ProgressStorage.get('weightHistory') || [];
    if (weightHistory.length > 0) {
      const lastEntry = weightHistory[weightHistory.length - 1];
      document.getElementById('current-weight').value = lastEntry.weight;
    }
  }

  // ... (restante das funções permanecem iguais)
  function updateWeightChart() {
    const weightHistory = ProgressStorage.get('weightHistory') || [];
    
    // Ordena por data
    weightHistory.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    // Prepara dados para o gráfico
    const labels = weightHistory.map(entry => {
      const date = new Date(entry.date);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    });
    
    const data = weightHistory.map(entry => entry.weight);
    
    // Cria/atualiza gráfico
    const ctx = document.getElementById('weight-chart');
    if (ctx) {
      if (ctx.chart) {
        ctx.chart.destroy();
      }
      
      // Usando a versão global do Chart.js (incluída via script no HTML)
      ctx.chart = new window.Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: 'Weight (kg)',
            data: data,
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
  }

  function initBodyMeasurements() {
    const saveBtn = document.getElementById('save-measurements');
    
    // Carrega medidas salvas
    const measurements = ProgressStorage.get('bodyMeasurements') || {};
    if (measurements.chest) document.getElementById('chest-measure').value = measurements.chest;
    if (measurements.waist) document.getElementById('waist-measure').value = measurements.waist;
    if (measurements.hips) document.getElementById('hips-measure').value = measurements.hips;
    
    // Salva novas medidas
    saveBtn.addEventListener('click', () => {
      const newMeasurements = {
        chest: parseFloat(document.getElementById('chest-measure').value) || 0,
        waist: parseFloat(document.getElementById('waist-measure').value) || 0,
        hips: parseFloat(document.getElementById('hips-measure').value) || 0,
        date: new Date().toISOString()
      };
      
      ProgressStorage.set('bodyMeasurements', newMeasurements);
      alert('Measurements saved!');
    });
  }

  function initWorkoutProgress() {
    // Inicializa gráfico de força
    updateStrengthChart();
    
    // Atualiza quando o exercício selecionado muda
    document.getElementById('exercise-select').addEventListener('change', updateStrengthChart);
    
    // Inicializa gráfico de frequência
    updateFrequencyChart();
    
    // Atualiza quando o período selecionado muda
    document.getElementById('frequency-select').addEventListener('change', updateFrequencyChart);
  }

  function updateStrengthChart() {
    const exercise = document.getElementById('exercise-select').value;
    
    // Dados de exemplo - substitua por dados reais do localStorage
    const workoutData = {
      squat: [120, 125, 130, 135, 140],
      bench: [80, 85, 85, 90, 95],
      deadlift: [150, 155, 160, 165, 170]
    };
    
    const labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'];
    const data = workoutData[exercise];
    const colors = {
      squat: { bg: 'rgba(76, 175, 80, 0.7)', border: 'rgba(76, 175, 80, 1)' },
      bench: { bg: 'rgba(25, 118, 210, 0.7)', border: 'rgba(25, 118, 210, 1)' },
      deadlift: { bg: 'rgba(255, 152, 0, 0.7)', border: 'rgba(255, 152, 0, 1)' }
    };
    
    const ctx = document.getElementById('strength-chart');
    if (ctx) {
      if (ctx.chart) {
        ctx.chart.destroy();
      }
      
      ctx.chart = new window.Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: '1RM (kg)',
            data: data,
            backgroundColor: colors[exercise].bg,
            borderColor: colors[exercise].border,
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

  function updateFrequencyChart() {
    const weeks = parseInt(document.getElementById('frequency-select').value);
    
    // Dados de exemplo - substitua por dados reais do localStorage
    const frequencyData = {
      4: [3, 4, 5, 4],
      12: [3, 4, 5, 4, 3, 4, 5, 4, 3, 4, 5, 4]
    };
    
    const labels = weeks === 4 
      ? ['Week 1', 'Week 2', 'Week 3', 'Week 4']
      : Array.from({ length: 12 }, (_, i) => `Week ${i + 1}`);
    
    const data = frequencyData[weeks];
    
    const ctx = document.getElementById('frequency-chart');
    if (ctx) {
      if (ctx.chart) {
        ctx.chart.destroy();
      }
      
      ctx.chart = new window.Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Workouts',
            data: data,
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
  }

  function initNutritionProgress() {
    // Inicializa gráficos
    updateCaloriesChart();
    updateMacrosChart();
    updateWaterChart();
    
    // Event listeners
    document.getElementById('calories-select').addEventListener('change', updateCaloriesChart);
    document.querySelectorAll('.water-amount').forEach(btn => {
      btn.addEventListener('click', function() {
        document.getElementById('log-water').dataset.amount = this.dataset.amount;
      });
    });
    
    document.getElementById('log-water').addEventListener('click', function() {
      const amount = parseInt(this.dataset.amount) || 250;
      logWaterIntake(amount);
    });
  }

  function updateCaloriesChart() {
    const days = parseInt(document.getElementById('calories-select').value);
    
    // Dados de exemplo - substitua por dados reais do localStorage
    const caloriesData = {
      7: [1800, 2000, 1900, 2100, 1950, 2200, 2300],
      30: Array.from({ length: 30 }, (_, i) => 1800 + Math.floor(Math.random() * 600))
    };
    
    const labels = days === 7 
      ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      : Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`);
    
    const data = caloriesData[days];
    
    const ctx = document.getElementById('calories-chart');
    if (ctx) {
      if (ctx.chart) {
        ctx.chart.destroy();
      }
      
      ctx.chart = new window.Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: 'Calories',
            data: data,
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
  }

  function updateMacrosChart() {
    // Dados de exemplo - substitua por dados reais do localStorage
    const macrosData = {
      protein: 35,
      carbs: 45,
      fat: 20
    };
    
    const ctx = document.getElementById('macros-chart');
    if (ctx) {
      if (ctx.chart) {
        ctx.chart.destroy();
      }
      
      ctx.chart = new window.Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Protein', 'Carbs', 'Fat'],
          datasets: [{
            data: [macrosData.protein, macrosData.carbs, macrosData.fat],
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
  }

  function updateWaterChart() {
    // Dados de exemplo - substitua por dados reais do localStorage
    const waterData = [2000, 1800, 2200, 2500, 2300, 2100, 1900];
    const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    
    const ctx = document.getElementById('water-chart');
    if (ctx) {
      if (ctx.chart) {
        ctx.chart.destroy();
      }
      
      ctx.chart = new window.Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Water (ml)',
            data: waterData,
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

  function logWaterIntake(amount) {
    const today = new Date().toISOString().split('T')[0];
    const waterHistory = ProgressStorage.get('waterHistory') || {};
    
    if (!waterHistory[today]) {
      waterHistory[today] = 0;
    }
    
    waterHistory[today] += amount;
    ProgressStorage.set('waterHistory', waterHistory);
    
    updateWaterChart();
    alert(`Added ${amount}ml to today's water intake!`);
  }
}