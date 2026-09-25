/**
 * BookingForm.jsx — Presentational component.
 * Renders the booking form fields with per-field error messages.
 * All inputs are controlled — driven entirely by props from Booking.
 */

const TIME_SLOTS = [
    { value: "", label: "— Choose a time slot —" },
    { value: "Morning (09:00 AM)", label: "Morning — 09:00 AM" },
    { value: "Late Morning (10:30 AM)", label: "Late Morning — 10:30 AM" },
    { value: "Midday (11:30 AM)", label: "Midday — 11:30 AM" },
    { value: "Afternoon (02:00 PM)", label: "Afternoon — 02:00 PM" },
    { value: "Late Afternoon (04:00 PM)", label: "Late Afternoon — 04:00 PM" },
];

export function BookingForm({ values, errors, onChange, onSubmit, submitting }) {
    // Build today's date string for the date input min attribute
    const today = new Date().toISOString().split("T")[0];

    return (
        <form className="booking-form" onSubmit={onSubmit} noValidate>
            {/* Student Name */}
            <div className={`form-group ${errors.studentName ? "has-error" : ""}`}>
                <label htmlFor="studentName">Full Name</label>
                <input
                    id="studentName"
                    name="studentName"
                    type="text"
                    value={values.studentName}
                    onChange={onChange}
                    placeholder="Enter your full name"
                    autoComplete="name"
                />
                {errors.studentName && (
                    <span className="field-error">{errors.studentName}</span>
                )}
            </div>

            {/* Student ID */}
            <div className={`form-group ${errors.idNumber ? "has-error" : ""}`}>
                <label htmlFor="idNumber">Student ID</label>
                <input
                    id="idNumber"
                    name="idNumber"
                    type="text"
                    value={values.idNumber}
                    onChange={onChange}
                    placeholder="e.g. UGR/12345/15"
                    autoComplete="off"
                />
                {errors.idNumber && (
                    <span className="field-error">{errors.idNumber}</span>
                )}
            </div>

            {/* Appointment Date */}
            <div className={`form-group ${errors.date ? "has-error" : ""}`}>
                <label htmlFor="date">Appointment Date</label>
                <input
                    id="date"
                    name="date"
                    type="date"
                    value={values.date}
                    onChange={onChange}
                    min={today}
                />
                {errors.date && (
                    <span className="field-error">{errors.date}</span>
                )}
            </div>

            {/* Time Slot */}
            <div className={`form-group ${errors.slot ? "has-error" : ""}`}>
                <label htmlFor="slot">Time Slot</label>
                <select
                    id="slot"
                    name="slot"
                    value={values.slot}
                    onChange={onChange}
                >
                    {TIME_SLOTS.map((s) => (
                        <option key={s.value} value={s.value}>
                            {s.label}
                        </option>
                    ))}
                </select>
                {errors.slot && (
                    <span className="field-error">{errors.slot}</span>
                )}
            </div>

            {/* Reason for Visit */}
            <div className={`form-group ${errors.reason ? "has-error" : ""}`}>
                <label htmlFor="reason">Reason for Visit</label>
                <textarea
                    id="reason"
                    name="reason"
                    value={values.reason}
                    onChange={onChange}
                    placeholder="Briefly describe your symptoms or reason…"
                    rows={3}
                />
                {errors.reason && (
                    <span className="field-error">{errors.reason}</span>
                )}
            </div>

            {/* Submit */}
            <button type="submit" disabled={submitting}>
                {submitting ? "Booking…" : "Confirm Booking"}
            </button>
        </form>
    );
}
