// Fetch menu items from the backend API
export const fetchMenuItems = async () => {
    try {
        const response = await fetch('http://localhost:5000/api/menu');
        if (!response.ok) {
            throw new Error('Failed to fetch menu items');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching menu items:', error);
        // Fallback to static data if API fails
        return [
            {
                id: 1,
                name: "Espresso",
                description: "Strong and bold Italian classic",
                price: 3.50
            },
            {
                id: 2,
                name: "Cappuccino",
                description: "Perfect balance of espresso and foam",
                price: 4.25
            },
            {
                id: 3,
                name: "Latte",
                description: "Smooth and creamy favorite",
                price: 4.50
            },
            {
                id: 4,
                name: "Mocha",
                description: "Chocolate and coffee delight",
                price: 5.00
            }
        ];
    }
};
