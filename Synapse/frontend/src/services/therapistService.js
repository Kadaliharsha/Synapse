import API from "../api/api";

export const therapistService = {
    getAll: async (filters = {}) => {
        const params = new URLSearchParams();
        if (filters.specialization) params.append("specialization", filters.specialization);
        if (filters.gender) params.append("gender", filters.gender);
        if (filters.maxPrice) params.append("maxPrice", filters.maxPrice);
        if (filters.minRating) params.append("minRating", filters.minRating);

        const response = await API.get(`/therapist/all?${params.toString()}`);
        return response.data;
    },

    getByEmail: async (email) => {
        const response = await API.get(`/therapist/${email}`);
        return response.data;
    },

    getById: async (id) => {
        const response = await API.get(`/therapist/id/${id}`);
        return response.data;
    },

    updateProfile: async (email, data) => {
        const response = await API.put(`/therapist/${email}`, data);
        return response.data;
    },

    getPatients: async (email) => {
        const response = await API.get(`/therapist/${email}/patients`);
        return response.data;
    },

    getPatientDetail: async (therapistEmail, patientEmail) => {
        const response = await API.get(`/therapist/${therapistEmail}/patient/${patientEmail}`);
        return response.data;
    },
};