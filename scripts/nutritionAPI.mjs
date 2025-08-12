export async function searchFoods(query) {
    try {
        const response = await fetch(
            `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${query}&page_size=20&json=1`
        );
        const data = await response.json();
        
        // Mapeia os dados para um formato similar ao Nutritionix
        const formattedFoods = data.products.map(product => ({
            item_name: product.product_name || "Nome não disponível",
            brand_name: product.brands || "Marca não disponível",
            item_id: product.code || "Sem ID",
            nf_calories: product.nutriments?.energy_kcal_100g || 0,
            nf_total_fat: product.nutriments?.fat_100g || 0,
            nf_protein: product.nutriments?.proteins_100g || 0,
            nf_total_carbohydrate: product.nutriments?.carbohydrates_100g || 0,
        }));

        return formattedFoods;
    } catch (error) {
        console.error('Erro ao buscar dados de alimentos:', error);
        return [];
    }
}