import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setError('');
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message || 'Login failed');
            }
            const { token } = await res.json();
            localStorage.setItem('jwt', token);
            navigate('/dashboard');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: '40px auto', padding: 24, border: '1px solid #ddd', borderRadius: 8 }}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: 16 }}>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: 8, marginTop: 4 }}
                    />
                </div>
                <div style={{ marginBottom: 16 }}>
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: 8, marginTop: 4 }}
                    />
                </div>
                {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
                <button type="submit" style={{ width: '100%', padding: 10 }}>Login</button>
            </form>
            <div style={{ marginTop: 16, textAlign: 'center' }}>
                <Link to="/register">Don't have an account? Register</Link>
            </div>
        </div>
    );
};

export default Login;