import API from "../api/api";

export const userService = {
    getProfile: async (email) => {
        const response = await API.get(`/user/${email}`);
        return response.data;
    },

    updateProfile: async (email, data) => {
        const response = await API.put(`/user/${email}`, data);
        return response.data;
    },

    getAppointments: async (email) => {
        const response = await API.get(`/appointments/${email}`);
        return response.data;
    },
};