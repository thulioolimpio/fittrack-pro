// storage.js - Auxiliar para salvar no localStorage
export const Storage = {
  get(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  },
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

// nutrition.js - API de nutrição
export async function searchFoods(query) {
  try {
    const response = await fetch(
      `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${query}&page_size=5&json=1`
    );
    const data = await response.json();
    
    return data.products.map(product => ({
      id: product.code || Math.random().toString(36).substring(2),
      name: product.product_name || "Nome não disponível",
      brand: product.brands || "Marca não disponível",
      calories: product.nutriments?.energy_kcal_100g || 0,
      protein: product.nutriments?.proteins_100g || 0,
      carbs: product.nutriments?.carbohydrates_100g || 0,
      fat: product.nutriments?.fat_100g || 0,
      servingSize: 100 // Padrão para 100g
    }));
  } catch (error) {
    console.error('Erro ao buscar alimentos:', error);
    return [];
  }
}

// meals.js - Página principal
export function loadMealsPage() {
  // Carrega CSS
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'styles/meals.css';
  document.head.appendChild(link);
  
  // Carrega HTML
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
        <div class="nutrition-summary" id="nutrition-summary">
          <!-- Dinâmico - será atualizado via JS -->
        </div>
        
        <div class="meals-list" id="meals-list">
          <!-- Dinâmico - será atualizado via JS -->
        </div>
      </div>
      
      <div class="tab-content" id="log-meals">
        <div class="search-bar">
          <input type="text" id="food-search" placeholder="Search foods..." class="form-control">
          <button id="search-btn" class="button button-primary">Search</button>
        </div>
        
        <div class="search-results" id="search-results">
          <!-- Resultados da busca aparecerão aqui -->
        </div>
        
        <div class="custom-food">
          <h4>Custom Food</h4>
          <form id="custom-food-form">
            <div class="form-group">
              <label>Food Name</label>
              <input type="text" id="custom-food-name" class="form-control" required>
            </div>
            <div class="form-group">
              <label>Serving Size (g)</label>
              <input type="number" id="custom-food-serving" class="form-control" value="100" required>
            </div>
            <div class="form-group">
              <label>Calories</label>
              <input type="number" id="custom-food-calories" class="form-control" required>
            </div>
            <div class="macros-group">
              <div class="form-group">
                <label>Protein (g)</label>
                <input type="number" id="custom-food-protein" class="form-control">
              </div>
              <div class="form-group">
                <label>Carbs (g)</label>
                <input type="number" id="custom-food-carbs" class="form-control">
              </div>
              <div class="form-group">
                <label>Fat (g)</label>
                <input type="number" id="custom-food-fat" class="form-control">
              </div>
            </div>
            <button type="submit" class="button button-primary">Add Food</button>
          </form>
        </div>
      </div>
      
      <div class="tab-content" id="recipes-meals">
        <div class="card-grid" id="recipes-list">
          <!-- Receitas aparecerão aqui -->
        </div>
        <button id="add-recipe-btn" class="button button-secondary">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 5v14M5 12h14"/>
          </svg>
          Add New Recipe
        </button>
      </div>
    </section>
  `;
  
  // Inicializa funcionalidades
  initTabs();
  initFoodSearch();
  initCustomFoodForm();
  initDiary();
  initRecipes();
}

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
      document.getElementById(`${tabId}-meals`).classList.add('active');
    });
  });
}

function initFoodSearch() {
  const searchBtn = document.getElementById('search-btn');
  const searchInput = document.getElementById('food-search');
  const resultsContainer = document.getElementById('search-results');
  
  searchBtn.addEventListener('click', async () => {
    const query = searchInput.value.trim();
    if (!query) return;
    
    resultsContainer.innerHTML = '<p>Searching...</p>';
    const foods = await searchFoods(query);
    
    if (foods.length === 0) {
      resultsContainer.innerHTML = '<p>No foods found</p>';
      return;
    }
    
    resultsContainer.innerHTML = foods.map(food => `
      <div class="food-item">
        <div class="food-info">
          <h5>${food.name}</h5>
          <p>${food.brand} • ${food.calories} kcal/100g</p>
          <p>P: ${food.protein}g C: ${food.carbs}g F: ${food.fat}g</p>
        </div>
        <button class="button button-primary add-food-btn" data-food='${JSON.stringify(food)}'>
          Add
        </button>
      </div>
    `).join('');
    
    // Adiciona listeners aos botões
    document.querySelectorAll('.add-food-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const food = JSON.parse(btn.dataset.food);
        addFoodToDiary(food);
        alert(`${food.name} added to diary!`);
      });
    });
  });
}

function initCustomFoodForm() {
  const form = document.getElementById('custom-food-form');
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const customFood = {
      id: Math.random().toString(36).substring(2),
      name: document.getElementById('custom-food-name').value,
      servingSize: parseInt(document.getElementById('custom-food-serving').value),
      calories: parseInt(document.getElementById('custom-food-calories').value),
      protein: parseInt(document.getElementById('custom-food-protein').value) || 0,
      carbs: parseInt(document.getElementById('custom-food-carbs').value) || 0,
      fat: parseInt(document.getElementById('custom-food-fat').value) || 0,
      brand: "Custom"
    };
    
    addFoodToDiary(customFood);
    form.reset();
    alert(`${customFood.name} added to diary!`);
  });
}

function initDiary() {
  updateNutritionSummary();
  updateMealsList();
}

function updateNutritionSummary() {
  const diary = Storage.get('foodDiary') || [];
  
  // Calcula totais
  const totals = diary.reduce((acc, food) => {
    const servingFactor = food.servingSize / 100;
    return {
      calories: acc.calories + (food.calories * servingFactor),
      protein: acc.protein + (food.protein * servingFactor),
      carbs: acc.carbs + (food.carbs * servingFactor),
      fat: acc.fat + (food.fat * servingFactor)
    };
  }, { calories: 0, protein: 0, carbs: 0, fat: 0 });
  
  // Metas diárias (pode ser personalizado)
  const goals = {
    calories: 2000,
    protein: 150,
    carbs: 200,
    fat: 90
  };
  
  // Atualiza HTML
  const summaryHTML = `
    <div class="nutrition-card">
      <h4>Calories</h4>
      <div class="progress-bar">
        <div class="progress" style="width: ${Math.min(100, (totals.calories / goals.calories) * 100)}%"></div>
      </div>
      <p>${Math.round(totals.calories)} / ${goals.calories} kcal</p>
    </div>
    
    <div class="nutrition-card">
      <h4>Protein</h4>
      <div class="progress-bar">
        <div class="progress" style="width: ${Math.min(100, (totals.protein / goals.protein) * 100)}%"></div>
      </div>
      <p>${Math.round(totals.protein)} / ${goals.protein}g</p>
    </div>
    
    <div class="nutrition-card">
      <h4>Carbs</h4>
      <div class="progress-bar">
        <div class="progress" style="width: ${Math.min(100, (totals.carbs / goals.carbs) * 100)}%"></div>
      </div>
      <p>${Math.round(totals.carbs)} / ${goals.carbs}g</p>
    </div>
    
    <div class="nutrition-card">
      <h4>Fat</h4>
      <div class="progress-bar">
        <div class="progress" style="width: ${Math.min(100, (totals.fat / goals.fat) * 100)}%"></div>
      </div>
      <p>${Math.round(totals.fat)} / ${goals.fat}g</p>
    </div>
  `;
  
  document.getElementById('nutrition-summary').innerHTML = summaryHTML;
}

function updateMealsList() {
  const diary = Storage.get('foodDiary') || [];
  
  if (diary.length === 0) {
    document.getElementById('meals-list').innerHTML = '<p>No foods logged today</p>';
    return;
  }
  
  // Agrupa por refeição (simplificado)
  const mealsHTML = `
    <div class="meal-time">
      <h4>Today's Foods</h4>
      ${diary.map(food => `
        <div class="food-item">
          <div class="food-info">
            <h5>${food.name}</h5>
            <p>${Math.round(food.calories * (food.servingSize / 100))} kcal | 
               P: ${Math.round(food.protein * (food.servingSize / 100))}g 
               C: ${Math.round(food.carbs * (food.servingSize / 100))}g 
               F: ${Math.round(food.fat * (food.servingSize / 100))}g</p>
          </div>
          <button class="button edit-food-btn" data-id="${food.id}">Edit</button>
          <button class="button delete-food-btn" data-id="${food.id}">Delete</button>
        </div>
      `).join('')}
    </div>
  `;
  
  document.getElementById('meals-list').innerHTML = mealsHTML;
  
  // Adiciona listeners para editar/excluir
  document.querySelectorAll('.delete-food-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const diary = Storage.get('foodDiary') || [];
      const updatedDiary = diary.filter(food => food.id !== id);
      Storage.set('foodDiary', updatedDiary);
      updateDiary();
    });
  });
}

function addFoodToDiary(food) {
  const diary = Storage.get('foodDiary') || [];
  diary.push(food);
  Storage.set('foodDiary', diary);
  updateDiary();
}

function updateDiary() {
  updateNutritionSummary();
  updateMealsList();
}

function initRecipes() {
  // Implementação básica - pode ser expandida
  const recipes = Storage.get('recipes') || [
    {
      id: 1,
      name: "Meal Prep Chicken",
      servings: 4,
      calories: 450,
      protein: 45,
      carbs: 30,
      fat: 15,
      
    },
    {
      id: 2,
      name: "Protein Smoothie",
      servings: 1,
      calories: 320,
      protein: 30,
      carbs: 40,
      fat: 5,
      
    }
  ];
  
  document.getElementById('recipes-list').innerHTML = recipes.map(recipe => `
    <div class="card recipe-card">
      <div class="recipe-info">
        <h4>${recipe.name}</h4>
        <p>${recipe.servings} serving${recipe.servings > 1 ? 's' : ''} | ${recipe.calories} kcal each</p>
        <div class="recipe-meta">
          <span>P: ${recipe.protein}g C: ${recipe.carbs}g F: ${recipe.fat}g</span>
          <button class="button button-primary add-recipe-btn" data-recipe='${JSON.stringify(recipe)}'>
            Add to Plan
          </button>
        </div>
      </div>
    </div>
  `).join('');
  
  // Adiciona listeners para adicionar receitas
  document.querySelectorAll('.add-recipe-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const recipe = JSON.parse(btn.dataset.recipe);
      // Converte receita para alimento e adiciona ao diário
      const food = {
        id: Math.random().toString(36).substring(2),
        name: recipe.name,
        servingSize: 100, // Padrão
        calories: recipe.calories,
        protein: recipe.protein,
        carbs: recipe.carbs,
        fat: recipe.fat,
        brand: "Recipe"
      };
      addFoodToDiary(food);
      alert(`${recipe.name} added to diary!`);
    });
  });
  
  // Listener para adicionar nova receita
  document.getElementById('add-recipe-btn').addEventListener('click', () => {
    alert('Feature to be implemented!');
  });
}