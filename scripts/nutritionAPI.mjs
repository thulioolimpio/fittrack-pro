const APP_ID = 'YOUR_NUTRITIONIX_APP_ID';
const APP_KEY = 'YOUR_NUTRITIONIX_APP_KEY';

export async function searchFoods(query) {
    try {
        const response = await fetch(`https://api.nutritionix.com/v1_1/search/${query}?results=0:20&fields=item_name,brand_name,item_id,nf_calories,nf_total_fat,nf_protein,nf_total_carbohydrate&appId=${APP_ID}&appKey=${APP_KEY}`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching food data:', error);
        return [];
    }
}