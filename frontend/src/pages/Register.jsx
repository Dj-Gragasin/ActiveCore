import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message || "Registration failed");
            }
            navigate("/login");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: "40px auto" }}>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={handleChange}
                        required
                        autoComplete="name"
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        autoComplete="email"
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        autoComplete="new-password"
                    />
                </div>
                {error && <div style={{ color: "red" }}>{error}</div>}
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;