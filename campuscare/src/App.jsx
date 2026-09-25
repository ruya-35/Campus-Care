import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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
        <div className="home-page" style={{ textAlign: "center", padding: "30px" }}>
            <h2>Welcome to CampusCare Clinic</h2>
            <p>Browse department doctors, view schedules, and book your appointments easily online.</p>
        </div>
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