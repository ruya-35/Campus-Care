import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppointmentStore } from "../appointments/appointmentStore";

export function Booking() {
    const { id } = useParams();
    const navigate = useNavigate();
    const addAppointment = useAppointmentStore((state) => state.addAppointment);

    const [form, setForm] = useState({
        studentName: "",
        idNumber: "",
        slot: "Morning (09:00 AM)",
    });

    const validId = /^UGR\/\d{4,5}\/\d{2}$/i.test(form.idNumber) || form.idNumber.length >= 5;

    function handleChange(e) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        
        if (!form.studentName.trim() || !form.idNumber.trim()) {
            alert("Please fill out all booking fields.");
            return;
        }

        addAppointment({
            doctorId: id,
            studentName: form.studentName,
            idNumber: form.idNumber,
            slot: form.slot,
            date: new Date().toLocaleDateString(),
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
                <label>Select Time Slot:</label>
                <select name="slot" value={form.slot} onChange={handleChange}>
                    <option value="Morning (09:00 AM)">Morning (09:00 AM)</option>
                    <option value="Midday (11:30 AM)">Midday (11:30 AM)</option>
                    <option value="Afternoon (02:00 PM)">Afternoon (02:00 PM)</option>
                </select>
            </div>

            <button type="submit">Confirm Booking</button>
        </form>
    );
}

export default Booking;