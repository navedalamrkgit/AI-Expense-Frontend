import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/authService";
import { toast, ToastContainer } from "react-toastify";

function Login() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await loginUser(form);

            localStorage.setItem("token", response.data.token);

            toast.success("Login Successful");

            setTimeout(() => {
                navigate("/dashboard");
            }, 1000);

        } catch (error) {

            toast.error("Invalid Email or Password");

        }

    };

    return (
        <div className="auth-page">
            <ToastContainer />

            <div className="auth-card shadow-lg">
                <div className="auth-illustration">
                    <div>
                        <h2>Welcome back</h2>
                        <p>Track your expenses, stay on budget, and grow your savings with confidence.</p>
                        <div className="auth-stats">
                            <div>
                                <strong>95%</strong>
                                <span>Budget accuracy</span>
                            </div>
                            <div>
                                <strong>24/7</strong>
                                <span>Insights at hand</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="auth-form">
                    <h3 className="fw-bold mb-3">Sign In</h3>
                    <p className="text-muted mb-4">Access your financial dashboard in seconds.</p>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="form-label">Email</label>
                            <input
                                className="form-control auth-input"
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="form-label">Password</label>
                            <input
                                className="form-control auth-input"
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button className="btn btn-primary w-100 py-3 fw-semibold auth-button">
                            Login
                        </button>
                    </form>

                    <p className="text-center mt-4 mb-0 auth-footer-text">
                        Don’t have an account?{' '}
                        <Link to="/register" className="auth-link">
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;