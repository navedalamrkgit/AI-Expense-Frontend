import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Layout({ children }) {

    const navigate = useNavigate();
    const location = useLocation();
    const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");

    useEffect(() => {
        document.body.dataset.theme = theme;
        localStorage.setItem("theme", theme);
    }, [theme]);

    const logout = () => {

        localStorage.removeItem("token");
        navigate("/login");

    };

    const menu = [

        {
            name: "🏠 Dashboard",
            path: "/dashboard"
        },

        {
            name: "Expenses",
            path: "/expenses"
        },

        {
            name: "Add Expense",
            path: "/add-expense"
        },

        {
            name: "Receipt Scanner",
            path: "/receipt"
        },

        {
    name: "Savings Goals",
    path: "/goals"
},

{
    name: "Notifications",
    path: "/notifications"
},

        {
            name: "Analytics",
            path: "/analytics"
        },

        {
            name: "AI Advisor",
            path: "/advisor"
        },

        {
            name: "💰 Budget",
            path: "/budget"
        },

        {
            name: "👤 Profile",
            path: "/profile"
        }

    ];

    return (

        <div className="app-shell">

            <aside className="sidebar">

                <div className="sidebar-brand">
                    <div className="brand-icon">💰</div>
                    <div>
                        <h3 className="mb-0">Spendsens</h3>
                        <p className="mb-0">Finance Hub</p>
                    </div>
                </div>

                <div className="sidebar-menu">
                    {
                        menu.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`sidebar-link ${location.pathname === item.path ? "active" : ""}`}
                            >
                                <span>{item.name}</span>
                            </Link>
                        ))
                    }
                </div>

                <div className="sidebar-footer">
                    <button className="btn btn-outline-light w-100" onClick={logout}>
                        Logout
                    </button>
                </div>

            </aside>

            <main className="main-content">

                <nav className="top-navbar">
                    <div>
                        <p className="text-muted mb-1">Welcome back</p>
                        <h4 className="m-0 fw-bold">{menu.find((item) => item.path === location.pathname)?.name || "Dashboard"}</h4>
                    </div>

                    <div className="top-navbar-actions">
                        <button
                            className="theme-toggle"
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        >
                            {theme === "dark" ? "☀ Light" : "🌙 Dark"}
                        </button>
                        <div className="top-pill">Premium Dashboard</div>
                    </div>
                </nav>

                <div className="page-content">
                    <div className="page-inner">
                        {children}
                    </div>
                </div>

            </main>

        </div>

    );

}

export default Layout;