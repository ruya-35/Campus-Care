/**
 * Booking.jsx — Owner of the booking flow.
 *
 * Responsibilities:
 * 1. Read :id from the route to know which doctor is being booked
 * 2. Fetch that doctor's info to display context
 * 3. Own the form state object
 * 4. On submit: validate → if valid, save to appointments store → navigate to confirmation
 * 5. Disable submit while the operation is in progress (prevents double-click)
 */
import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useAppointmentStore } from "../appointments/appointmentStore";
import { BookingForm } from "./BookingForm";
import { validateBooking } from "./validate";

const INITIAL_FORM = {
    studentName: "",
    idNumber: "",
    date: "",
    slot: "",
    reason: "",
};

const today = new Date().toISOString().split("T")[0];

export function Booking() {
    const { id } = useParams();
    const navigate = useNavigate();
    const addAppointment = useAppointmentStore((state) => state.addAppointment);

<<<<<<< HEAD
    const [form, setForm] = useState({
        studentName: "",
        idNumber: "",
        date: "",
        time: "",
    });
    const [validationError, setValidationError] = useState("");
=======
    // --- Doctor fetch (for display context) ---
    const [doctor, setDoctor] = useState(null);
    const [doctorLoading, setDoctorLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;

        async function fetchDoctor() {
            try {
                const res = await fetch("/Doctors.json");
                if (!res.ok) throw new Error("Failed to load doctors.");
                const doctors = await res.json();
                const found = doctors.find((d) => d.id === Number(id));
                if (!cancelled) setDoctor(found || null);
            } catch (err) {
                console.error("Error fetching doctor for booking:", err);
            } finally {
                if (!cancelled) setDoctorLoading(false);
            }
        }

        fetchDoctor();
        return () => { cancelled = true; };
    }, [id]);

    // --- Form state ---
    const [form, setForm] = useState(INITIAL_FORM);
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
>>>>>>> eea3f5c3fe5b7913f61c1bc2d5cdd412c2028bc7

    function handleChange(e) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
<<<<<<< HEAD
        setValidationError("");
=======
        // Clear the specific field error as the user types
        if (errors[name]) {
            setErrors((prev) => {
                const next = { ...prev };
                delete next[name];
                return next;
            });
        }
>>>>>>> eea3f5c3fe5b7913f61c1bc2d5cdd412c2028bc7
    }

    function handleSubmit(e) {
        e.preventDefault();

        // Validate
        const validationErrors = validateBooking(form);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return; // Don't submit — no request sent
        }

<<<<<<< HEAD
        if (!form.date) {
            setValidationError("Please select an appointment date.");
            return;
        }

        if (!form.time) {
            setValidationError("Please select an appointment time.");
            return;
        }

        addAppointment({
            doctorId: id,
            studentName: form.studentName,
            idNumber: form.idNumber,
            date: form.date,
            time: form.time,
            slot: form.time,
        });
=======
        // Prevent double-click
        setSubmitting(true);
>>>>>>> eea3f5c3fe5b7913f61c1bc2d5cdd412c2028bc7

        // Build the appointment record
        const appointmentId = Date.now();
        const appointment = {
            id: appointmentId,
            doctorId: id,
            doctorName: doctor?.name || `Doctor #${id}`,
            department: doctor?.department || "",
            studentName: form.studentName.trim(),
            idNumber: form.idNumber.trim(),
            date: form.date,
            slot: form.slot,
            reason: form.reason.trim(),
        };

        // Save to shared store
        addAppointment(appointment);

        // Navigate to the confirmation screen
        navigate(`/booking/${appointmentId}`, { replace: true });
    }

    // --- Render ---
    if (doctorLoading) {
        return <p className="loading-msg">Loading booking page…</p>;
    }

    if (!doctor) {
        return (
            <div className="booking-page">
                <div className="booking-container">
                    <h2>Doctor Not Found</h2>
                    <p>No doctor found with ID <strong>{id}</strong>.</p>
                    <Link to="/doctors" className="back-link">← Back to Doctors</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="booking-page">
            <div className="booking-container">
                {/* Doctor context header */}
                <div className="booking-doctor-info">
                    <h2>Book Appointment</h2>
                    <p className="booking-doctor-name">{doctor.name}</p>
                    <p className="booking-doctor-dept">{doctor.department} · {doctor.description}</p>
                </div>

<<<<<<< HEAD
            <div>
                <label htmlFor="appointment-date">Appointment Date:</label>
                <input
                    id="appointment-date"
                    min={today}
                    name="date"
                    onChange={handleChange}
                    type="date"
                    value={form.date}
                />
            </div>

            <div>
                <label htmlFor="appointment-time">Appointment Time:</label>
                <input
                    id="appointment-time"
                    name="time"
                    onChange={handleChange}
                    type="time"
                    value={form.time}
                />
            </div>

            {validationError && <p className="form-error" role="alert">{validationError}</p>}
            <button type="submit">Confirm Booking</button>
        </form>
=======
                {/* The form itself — presentational, driven by props */}
                <BookingForm
                    values={form}
                    errors={errors}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                    submitting={submitting}
                />

                <div className="booking-back">
                    <Link to={`/doctors/${id}`} className="back-link">← Back to Doctor Profile</Link>
                </div>
            </div>
        </div>
>>>>>>> eea3f5c3fe5b7913f61c1bc2d5cdd412c2028bc7
    );
}

export default Booking;