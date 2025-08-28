import React, { useState } from "react";

// Example rewards data
const rewardsList = [
    { id: 1, name: "Free Coffee", points: 100 },
    { id: 2, name: "Discount Voucher", points: 200 },
    { id: 3, name: "Gift Card", points: 500 },
];

const initialPoints = 350;

const Rewards = () => {
    const [points, setPoints] = useState(initialPoints);
    const [redeemed, setRedeemed] = useState([]);

    const handleRedeem = (reward) => {
        if (points >= reward.points && !redeemed.includes(reward.id)) {
            setPoints(points - reward.points);
            setRedeemed([...redeemed, reward.id]);
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: "2rem auto", fontFamily: "sans-serif" }}>
            <h2>Rewards</h2>
            <div style={{ marginBottom: "1.5rem" }}>
                <strong>Current Points:</strong> {points}
            </div>
            <ul style={{ listStyle: "none", padding: 0 }}>
                {rewardsList.map((reward) => (
                    <li
                        key={reward.id}
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: "1rem",
                            padding: "0.75rem",
                            border: "1px solid #eee",
                            borderRadius: 6,
                        }}
                    >
                        <span>
                            {reward.name} <small>({reward.points} pts)</small>
                        </span>
                        <button
                            onClick={() => handleRedeem(reward)}
                            disabled={points < reward.points || redeemed.includes(reward.id)}
                            style={{
                                padding: "0.5rem 1rem",
                                background: points >= reward.points && !redeemed.includes(reward.id) ? "#007bff" : "#ccc",
                                color: "#fff",
                                border: "none",
                                borderRadius: 4,
                                cursor: points >= reward.points && !redeemed.includes(reward.id) ? "pointer" : "not-allowed",
                            }}
                        >
                            {redeemed.includes(reward.id) ? "Redeemed" : "Redeem"}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Rewards;