import React, { useState } from "react";

// Dummy data for demonstration
const initialMembers = [
    { id: 1, name: "Alice Smith", email: "alice@example.com", attendance: 18, rewards: [] },
    { id: 2, name: "Bob Jones", email: "bob@example.com", attendance: 15, rewards: ["Star Performer"] },
    { id: 3, name: "Carol Lee", email: "carol@example.com", attendance: 20, rewards: [] },
];

const rewardOptions = ["Star Performer", "Perfect Attendance", "Team Player"];

function Admin() {
    const [members, setMembers] = useState(initialMembers);
    const [selectedReward, setSelectedReward] = useState(rewardOptions[0]);

    const handleAddReward = (memberId) => {
        setMembers(members.map(m =>
            m.id === memberId && !m.rewards.includes(selectedReward)
                ? { ...m, rewards: [...m.rewards, selectedReward] }
                : m
        ));
    };

    const handleRemoveReward = (memberId, reward) => {
        setMembers(members.map(m =>
            m.id === memberId
                ? { ...m, rewards: m.rewards.filter(r => r !== reward) }
                : m
        ));
    };

    const handleGenerateReport = () => {
        const csvRows = [
            ["Name", "Email", "Attendance", "Rewards"].join(","),
            ...members.map(m =>
                [m.name, m.email, m.attendance, m.rewards.join("; ")].join(",")
            ),
        ];
        const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "attendance_report.csv";
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div style={{ padding: 24 }}>
            <h1>Admin Dashboard</h1>
            <button onClick={handleGenerateReport}>Generate Attendance Report</button>
            <table border="1" cellPadding="8" style={{ marginTop: 24, width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Attendance</th>
                        <th>Rewards</th>
                        <th>Add Reward</th>
                    </tr>
                </thead>
                <tbody>
                    {members.map(member => (
                        <tr key={member.id}>
                            <td>{member.name}</td>
                            <td>{member.email}</td>
                            <td>{member.attendance}</td>
                            <td>
                                {member.rewards.map(reward => (
                                    <span key={reward} style={{ marginRight: 8 }}>
                                        {reward}
                                        <button
                                            style={{ marginLeft: 4 }}
                                            onClick={() => handleRemoveReward(member.id, reward)}
                                        >
                                            Remove
                                        </button>
                                    </span>
                                ))}
                            </td>
                            <td>
                                <select
                                    value={selectedReward}
                                    onChange={e => setSelectedReward(e.target.value)}
                                >
                                    {rewardOptions.map(opt => (
                                        <option key={opt} value={opt}>{opt}</option>
                                    ))}
                                </select>
                                <button onClick={() => handleAddReward(member.id)}>Add</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Admin;