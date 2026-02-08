import API from "../api/api";

export const appointmentService = {
    create: async (appointmentData) => {
        const response = await API.post("/appointments", appointmentData);
        return response.data;
    },

    getByUser: async (email) => {
        const response = await API.get(`/appointments/${email}`);
        return response.data;
    },

    getByTherapist: async (email) => {
        const response = await API.get(`/appointments/therapist/${email}`);
        return response.data;
    },

    getPending: async () => {
        const response = await API.get("/appointments/pending");
        return response.data;
    },

    updateStatus: async (id, status) => {
        const response = await API.put(`/appointments/${id}/status`, { status });
        return response.data;
    },
};