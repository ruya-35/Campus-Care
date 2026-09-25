import { lazy, Suspense } from "react";
import { CalendarPlus } from "lucide-react";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";

import { Layout } from "./ui/Layout";
import { RequireAuth } from "./auth/RequireAuth";
import { Booking } from "./booking/Booking";
import { Confirmation } from "./booking/Confirmation";
import Login from "./auth/Login";

import { useUserStore } from "./auth/userStore";

const Doctors = lazy(() => import("./doctors/Doctors"));
const DoctorDetail = lazy(() => import("./doctors/DoctorDetail"));
const AppointmentHistory = lazy(() => import("./appointments/AppointmentHistory"));

function Home() {
    return (
        <section className="home-hero">
            <div className="home-hero-copy">
                <p className="home-eyebrow">Care that fits campus life</p>
                <h1>Welcome to CampusCare Clinic</h1>
                <p className="home-hero-description">Accessible, thoughtful healthcare for students and the campus community, from routine checkups to specialist support.</p>
                <div className="home-hero-actions">
                    <Link className="header-cta" to="/doctors">
                        <CalendarPlus aria-hidden="true" size={17} />
                        Find a Doctor
                    </Link>
                    <Link className="hero-secondary-link" to="/appointments">View My Appointments</Link>
                </div>
            </div>
            <div className="home-hero-media">
                <img src="/images/clinic-hero.jpg" alt="Bright modern clinic reception with a welcoming care team" />
            </div>
        </section>
    );
}

function NotFound() {
    return (
        <div className="not-found-page" style={{ textAlign: "center", padding: "30px" }}>
            <h2>404 - Page Not Found</h2>
            <p>The page you are looking for does not exist.</p>
        </div>
    );
}

export default function App() {
    const user = useUserStore((state) => state.user);
    const isAuthenticated = Boolean(user);

    return (
        <BrowserRouter>
            <Suspense fallback={<div className="loading-msg">Loading...</div>}>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="doctors" element={<Doctors />} />
                        <Route path="doctors/:id" element={<DoctorDetail />} />
                        <Route 
                            path="doctors/:id/book"  
                            element={
                                <RequireAuth isAuthenticated={isAuthenticated}>
                                    <Booking />
                                </RequireAuth>
                            } 
                        />
                        <Route path="booking/:ref" element={<Confirmation />} />
                        <Route path="appointments" element={<AppointmentHistory />} />
                        <Route path="login" element={<Login />} />
                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}