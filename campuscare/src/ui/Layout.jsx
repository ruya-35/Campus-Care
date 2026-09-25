import { useState } from "react";
import { CalendarDays, CalendarPlus, Clock3, HeartPulse, Home, LogIn, LogOut, Mail, MapPin, Menu, Phone, Stethoscope, X } from "lucide-react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useUserStore } from "../auth/userStore";

const navigationItems = [
    { label: "Home", to: "/", icon: Home, end: true },
    { label: "Doctors", to: "/doctors", icon: Stethoscope },
    { label: "My Appointments", to: "/appointments", icon: CalendarDays },
];

export function Layout() {
    const [menuOpen, setMenuOpen] = useState(false);
    const user = useUserStore((state) => state.user);
    const logout = useUserStore((state) => state.logout);
    const navigate = useNavigate();

    function closeMenu() {
        setMenuOpen(false);
    }

    function handleSignOut() {
        logout();
        closeMenu();
        navigate("/", { replace: true });
    }

    return (
        <div className="app-layout">
            <header className="header">
                <div className="header-inner">
                    <NavLink className="brand" onClick={closeMenu} to="/">
                        <span aria-hidden="true" className="brand-mark">
                            <HeartPulse size={22} strokeWidth={1.8} />
                        </span>
                        <span className="brand-copy">
                            <span className="brand-name">Campus-Care</span>
                            <span className="brand-tagline">Student health services</span>
                        </span>
                    </NavLink>

                    <button
                        aria-expanded={menuOpen}
                        aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
                        className="menu-toggle"
                        onClick={() => setMenuOpen((isOpen) => !isOpen)}
                        type="button"
                    >
                        {menuOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>

                    <nav aria-label="Primary navigation" className={`nav-bar${menuOpen ? " is-open" : ""}`}>
                        <div className="nav-links">
                            {navigationItems.map(({ label, to, icon: Icon, end }) => (
                                <NavLink
                                    className={({ isActive }) => (isActive ? "active" : "")}
                                    end={end}
                                    key={to}
                                    onClick={closeMenu}
                                    to={to}
                                >
                                    <Icon aria-hidden="true" size={17} strokeWidth={1.9} />
                                    <span>{label}</span>
                                </NavLink>
                            ))}
                        </div>
                        <NavLink className="header-cta" onClick={closeMenu} to="/doctors">
                            <CalendarPlus aria-hidden="true" size={17} strokeWidth={1.9} />
                            <span>Book Appointment</span>
                        </NavLink>
                        {user ? (
                            <button className="nav-action" onClick={handleSignOut} type="button">
                                <LogOut aria-hidden="true" size={17} strokeWidth={1.9} />
                                <span>Sign Out</span>
                            </button>
                        ) : (
                            <NavLink className={({ isActive }) => (isActive ? "active" : "")} onClick={closeMenu} to="/login">
                                <LogIn aria-hidden="true" size={17} strokeWidth={1.9} />
                                <span>Sign In</span>
                            </NavLink>
                        )}
                    </nav>
                </div>
            </header>

            <main className="main-content">
                <Outlet />
            </main>

            <footer className="footer">
                <div className="footer-inner">
                    <div className="footer-brand">
                        <NavLink className="footer-brand-name" to="/">Campus-Care</NavLink>
                        <p>Accessible healthcare services for students and the campus community.</p>
                    </div>

                    <div className="footer-column">
                        <h2>Quick Links</h2>
                        <NavLink to="/">Home</NavLink>
                        <NavLink to="/doctors">Doctors</NavLink>
                        <NavLink to="/appointments">My Appointments</NavLink>
                        <NavLink to="/doctors">Booking</NavLink>
                    </div>

                    <div className="footer-column footer-contact">
                        <h2>Contact</h2>
                        <span><Phone aria-hidden="true" size={18} />Phone support via campus health desk</span>
                        <span><Mail aria-hidden="true" size={18} />studenthealth@campus.edu</span>
                        <span><MapPin aria-hidden="true" size={18} />Campus health center</span>
                        <span><Clock3 aria-hidden="true" size={18} />Weekdays, 8:00 AM - 5:00 PM</span>
                    </div>
                </div>

                <div className="footer-bottom">
                    <span>&copy; 2026 Campus-Care</span>
                    <div className="footer-legal">
                        <span>Privacy Policy</span>
                        <span>Terms of Service</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}