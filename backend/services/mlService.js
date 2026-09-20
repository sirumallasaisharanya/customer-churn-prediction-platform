const axios = require("axios");

const predictChurn = async (customerData) => {
    try {
        const response = await axios.post(
            "http://127.0.0.1:8000/predict",
            customerData
        );

        return response.data;
    } catch (error) {
        console.error(
            "ML service error:",
            error.response?.data || error.message
        );

        throw new Error("Failed to get prediction from ML service");
    }
};

module.exports = {
    predictChurn
};