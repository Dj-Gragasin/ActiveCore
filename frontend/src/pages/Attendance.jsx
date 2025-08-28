import React, { useState } from 'react';

const getTodayDate = () => new Date().toISOString().slice(0, 10);

const initialHistory = [
    // Example data
    // { date: '2024-06-10', checkIn: '08:30', checkOut: '17:00' },
];

export default function Attendance() {
    const [history, setHistory] = useState(initialHistory);
    const [today, setToday] = useState(() => {
        const todayDate = getTodayDate();
        return (
            history.find((h) => h.date === todayDate) || {
                date: todayDate,
                checkIn: null,
                checkOut: null,
            }
        );
    });

    const handleCheckIn = () => {
        if (today.checkIn) return;
        const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const updatedToday = { ...today, checkIn: now };
        setToday(updatedToday);
        updateHistory(updatedToday);
    };

    const handleCheckOut = () => {
        if (!today.checkIn || today.checkOut) return;
        const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const updatedToday = { ...today, checkOut: now };
        setToday(updatedToday);
        updateHistory(updatedToday);
    };

    const updateHistory = (updatedToday) => {
        setHistory((prev) => {
            const filtered = prev.filter((h) => h.date !== updatedToday.date);
            return [updatedToday, ...filtered];
        });
    };

    return (
        <div style={{ maxWidth: 500, margin: '2rem auto', padding: 24, border: '1px solid #eee', borderRadius: 8 }}>
            <h2>Attendance</h2>
            <div style={{ marginBottom: 24 }}>
                <div>
                    <strong>Today's Date:</strong> {today.date}
                </div>
                <div>
                    <strong>Check In:</strong> {today.checkIn || '-'}
                </div>
                <div>
                    <strong>Check Out:</strong> {today.checkOut || '-'}
                </div>
                <div style={{ marginTop: 16 }}>
                    <button onClick={handleCheckIn} disabled={!!today.checkIn}>
                        Check In
                    </button>
                    <button
                        onClick={handleCheckOut}
                        disabled={!today.checkIn || !!today.checkOut}
                        style={{ marginLeft: 8 }}
                    >
                        Check Out
                    </button>
                </div>
            </div>
            <h3>Attendance History</h3>
            <table width="100%" border="1" cellPadding={6} style={{ borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Check In</th>
                        <th>Check Out</th>
                    </tr>
                </thead>
                <tbody>
                    {history.length === 0 && (
                        <tr>
                            <td colSpan={3} align="center">
                                No attendance records.
                            </td>
                        </tr>
                    )}
                    {history.map((h) => (
                        <tr key={h.date}>
                            <td>{h.date}</td>
                            <td>{h.checkIn || '-'}</td>
                            <td>{h.checkOut || '-'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}