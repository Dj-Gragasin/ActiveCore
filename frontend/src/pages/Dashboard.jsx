import React from 'react';
import { Link } from 'react-router-dom';

// Mock data (replace with real data or props as needed)
const user = {
    name: 'Dj Gragasin',
    attendanceStreak: 7,
    todaysCalories: 1850,
    mealSuggestion: 'Grilled Chicken Salad',
};

const Dashboard = () => {
    return (
        <div style={{ padding: '2rem', maxWidth: 600, margin: '0 auto' }}>
            <h1>Welcome, {user.name}!</h1>
            <section style={{ margin: '2rem 0' }}>
                <div>
                    <strong>Attendance Streak:</strong> {user.attendanceStreak} days
                </div>
                <div>
                    <strong>Today's Calorie Intake:</strong> {user.todaysCalories} kcal
                </div>
                <div>
                    <strong>Quick Meal Suggestion:</strong> {user.mealSuggestion}
                </div>
            </section>
            <nav style={{ display: 'flex', gap: '1rem' }}>
                <Link to="/attendance">
                    <button>Attendance</button>
                </Link>
                <Link to="/meal-planner">
                    <button>Meal Planner</button>
                </Link>
                <Link to="/rewards">
                    <button>Rewards</button>
                </Link>
            </nav>
        </div>
    );
};

export default Dashboard;