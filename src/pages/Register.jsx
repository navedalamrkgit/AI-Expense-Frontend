import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/authService";
import { toast, ToastContainer } from "react-toastify";

function Register() {

    const navigate = useNavigate();

    const [form, setForm] = useState({

        name: "",

        email: "",

        password: ""

    });

    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await registerUser(form);

            toast.success("Registration Successful");

            setTimeout(() => {

                navigate("/login");

            },1000);

        } catch (error) {

            toast.error("Registration Failed");

        }

    };

    return (
        <div className="auth-page">
            <ToastContainer />

            <div className="auth-card shadow-lg">
                <div className="auth-illustration">
                    <div>
                        <h2>Let’s get started</h2>
                        <p>Create your account and start managing your finances smarter.</p>
                        <div className="auth-stats">
                            <div>
                                <strong>5x</strong>
                                <span>Faster insights</span>
                            </div>
                            <div>
                                <strong>100%</strong>
                                <span>Secure access</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="auth-form">
                    <h3 className="fw-bold mb-3">Register</h3>
                    <p className="text-muted mb-4">Create your account to unlock premium expense tracking.</p>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="form-label">Name</label>
                            <input
                                className="form-control auth-input"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

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
                            Create Account
                        </button>
                    </form>

                    <p className="text-center mt-4 mb-0 auth-footer-text">
                        Already have an account?{' '}
                        <Link to="/login" className="auth-link">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );

}

export default Register;