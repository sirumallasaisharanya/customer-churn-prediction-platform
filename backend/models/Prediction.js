const mongoose = require("mongoose");

const predictionSchema = new mongoose.Schema(
    {
        creditScore: {
            type: Number,
            required: true
        },

        geography: {
            type: String,
            required: true
        },

        gender: {
            type: String,
            required: true
        },

        age: {
            type: Number,
            required: true
        },

        tenure: {
            type: Number,
            required: true
        },

        balance: {
            type: Number,
            required: true
        },

        numOfProducts: {
            type: Number,
            required: true
        },

        hasCrCard: {
            type: Number,
            required: true
        },

        isActiveMember: {
            type: Number,
            required: true
        },

        estimatedSalary: {
            type: Number,
            required: true
        },

        prediction: {
            type: Number,
            required: true
        },

        churnProbability: {
            type: Number,
            required: true
        },

        risk: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Prediction = mongoose.model("Prediction", predictionSchema);

module.exports = Prediction;