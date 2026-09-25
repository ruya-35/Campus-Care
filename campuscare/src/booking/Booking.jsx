import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppointmentStore } from "../appointments/appointmentStore";

const today = new Date().toISOString().split("T")[0];

export function Booking() {
    const { id } = useParams();
    const navigate = useNavigate();
    const addAppointment = useAppointmentStore((state) => state.addAppointment);

    const [form, setForm] = useState({
        studentName: "",
        idNumber: "",
        date: "",
        time: "",
    });
    const [validationError, setValidationError] = useState("");

    function handleChange(e) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        setValidationError("");
    }

    function handleSubmit(e) {
        e.preventDefault();
        
        if (!form.studentName.trim() || !form.idNumber.trim()) {
            alert("Please fill out all booking fields.");
            return;
        }

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

        alert("Appointment successfully booked!");
        navigate("/appointments");
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Book Doctor Appointment</h2>
            <div>
                <label>Full Name:</label>
                <input
                    name="studentName"
                    value={form.studentName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                />
            </div>
            
            <div>
                <label>Student ID Number:</label>
                <input
                    name="idNumber"
                    value={form.idNumber}
                    onChange={handleChange}
                    placeholder="e.g. 0000-IBT-0000"
                />
            </div>

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
    );
}

export default Booking;