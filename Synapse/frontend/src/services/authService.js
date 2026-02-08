import API from "../api/api";

export const authService = {
    login: async (credentials) => {
        const response = await API.post("/auth/login", credentials);
        return response.data;
    },

    registerUser: async (userData) => {
        const response = await API.post("/auth/signUp/user", userData);
        return response.data;
    },

    registerTherapist: async (therapistData) => {
        const response = await API.post("/auth/signUp/therapist", therapistData);
        return response.data;
    },
};