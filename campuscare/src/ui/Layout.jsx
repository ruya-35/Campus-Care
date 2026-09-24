import { Outlet, NavLink } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function Layout() {
    return (
        <div className="app-layout">
            <Header />
            
            <nav className="nav-bar">
                <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>Home</NavLink>
                <NavLink to="/doctors" className={({ isActive }) => (isActive ? "active" : "")}>Doctors</NavLink>
                <NavLink to="/appointments" className={({ isActive }) => (isActive ? "active" : "")}>My Appointments</NavLink>
                <NavLink to="/login" className={({ isActive }) => (isActive ? "active" : "")}>Sign In</NavLink>
            </nav>

            <main className="main-content">
                <Outlet />
            </main>
            
            <Footer />
        </div>
    );
}