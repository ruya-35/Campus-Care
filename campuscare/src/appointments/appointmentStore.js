import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAppointmentStore = create(
    persist(
        (set) => ({
            appointments: [],
            
            addAppointment: (appointment) =>
                set((state) => ({
                    appointments: [...state.appointments, { ...appointment, id: appointment.id || Date.now() }],
                })),
            
            removeAppointment: (id) =>
                set((state) => ({
                    appointments: state.appointments.filter((app) => app.id !== id),
                })),

            clearAppointments: () => set({ appointments: [] }),
        }),
        { name: "campus-care-appointments" }
    )
);