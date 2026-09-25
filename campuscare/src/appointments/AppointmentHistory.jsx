import { useAppointmentStore } from "./appointmentStore";

export function AppointmentHistory() {
    const appointments = useAppointmentStore((state) => state.appointments);
    const removeAppointment = useAppointmentStore((state) => state.removeAppointment);
    const clearAppointments = useAppointmentStore((state) => state.clearAppointments);

    if (!appointments || appointments.length === 0) {
        return (
            <div className="cart-page" style={{ textAlign: "center", padding: "20px" }}>
                <h2>Your Appointments</h2>
                <p>No medical appointments booked yet.</p>
            </div>
        );
    }

    return (
        <div className="cart-page" style={{ maxWidth: "600px", margin: "20px auto" }}>
            <h2>Your Appointments</h2>
            <ul className="cart-list">
                {appointments.map((item) => (
                    <li key={item.id} className="cart-item">
                        <div>
                            <strong>Student: {item.studentName}</strong>
                            <p style={{ margin: "4px 0", fontSize: "13px" }}>
                                Date: {item.date} | Time: {item.time || item.slot} | ID: {item.idNumber}
                            </p>
                        </div>
                        <button onClick={() => removeAppointment(item.id)} className="remove-btn">Cancel</button>
                    </li>
                ))}
            </ul>
            <button 
                className="add-btn" 
                onClick={clearAppointments}
                style={{ backgroundColor: "#dc3545", marginTop: "15px" }}
            >
                Clear All Appointments
            </button>
        </div>
    );
}

export default AppointmentHistory;