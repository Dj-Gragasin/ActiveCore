import React, { useState } from 'react';

const mockMealPlan = (input) => {
    // Mock AI meal suggestions based on input
    if (!input) return [];
    if (isNaN(input)) {
        // Assume food name
        return [
            { name: 'Grilled Chicken Salad', calories: 350 },
            { name: 'Quinoa Bowl', calories: 400 },
            { name: 'Fruit Smoothie', calories: 200 },
        ];
    } else {
        // Assume calories
        const cal = parseInt(input, 10);
        return [
            { name: 'Oatmeal with Berries', calories: Math.round(cal * 0.3) },
            { name: 'Turkey Sandwich', calories: Math.round(cal * 0.4) },
            { name: 'Veggie Stir Fry', calories: Math.round(cal * 0.3) },
        ];
    }
};

export default function MealPlanner() {
    const [input, setInput] = useState('');
    const [meals, setMeals] = useState([]);

    const handlePlan = () => {
        const suggestions = mockMealPlan(input.trim());
        setMeals(suggestions);
    };

    return (
        <div style={{ maxWidth: 500, margin: '2rem auto', padding: 24, border: '1px solid #eee', borderRadius: 8 }}>
            <h2>Meal Planner</h2>
            <input
                type="text"
                placeholder="Enter calories or food name"
                value={input}
                onChange={e => setInput(e.target.value)}
                style={{ width: '100%', padding: 8, marginBottom: 12, fontSize: 16 }}
            />
            <button onClick={handlePlan} style={{ padding: '8px 16px', fontSize: 16 }}>
                Get Smart Meal Plan
            </button>
            <div style={{ marginTop: 24 }}>
                {meals.length > 0 && (
                    <div>
                        <h3>AI-Suggested Meals</h3>
                        <ul>
                            {meals.map((meal, idx) => (
                                <li key={idx}>
                                    {meal.name} &mdash; <strong>{meal.calories} kcal</strong>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}