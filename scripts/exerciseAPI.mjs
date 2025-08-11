const API_KEY = 'YOUR_EXERCISEDB_API_KEY';

export async function searchExercises(query) {
    try {
        const response = await fetch(`https://exercisedb.p.rapidapi.com/exercises?search=${query}`, {
            headers: {
                'X-RapidAPI-Key': API_KEY,
                'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
            }
        });
        return await response.json();
    } catch (error) {
        console.error('Error fetching exercises:', error);
        return [];
    }
}