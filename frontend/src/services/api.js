import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api"
});

export const createPrediction = async (customerData) => {
    const response = await API.post("/predict", customerData);
    return response.data;
};

export const getPredictions = async () => {
    const response = await API.get("/predict");
    return response.data;
};

export const getDashboard = async () => {
    const response = await API.get("/dashboard");
    return response.data;
};