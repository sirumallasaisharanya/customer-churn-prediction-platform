const Prediction = require("../models/Prediction");
const { predictChurn } = require("../services/mlService");

const createPrediction = async (req, res) => {
    try {
        // Customer data received from frontend
        const customerData = req.body;

        // Send customer data to Python ML service
        const mlResult = await predictChurn(customerData);

        // Save customer data + prediction in MongoDB
        const prediction = new Prediction({
            creditScore: customerData.CreditScore,
            geography: customerData.Geography,
            gender: customerData.Gender,
            age: customerData.Age,
            tenure: customerData.Tenure,
            balance: customerData.Balance,
            numOfProducts: customerData.NumOfProducts,
            hasCrCard: customerData.HasCrCard,
            isActiveMember: customerData.IsActiveMember,
            estimatedSalary: customerData.EstimatedSalary,

            prediction: mlResult.prediction,
            churnProbability: mlResult.churn_probability,
            risk: mlResult.risk
        });

        // Store in MongoDB
        const savedPrediction = await prediction.save();

        // Send result back
        res.status(201).json({
            message: "Prediction created successfully",
            prediction: savedPrediction
        });

    } catch (error) {
        console.error("Prediction controller error:", error.message);

        res.status(500).json({
            error: "Failed to create prediction"
        });
    }
};



const getPredictions = async (req, res) => {
    try {
        const predictions = await Prediction.find().sort({ createdAt: -1 });

        res.status(200).json(predictions);
    } catch (error) {
        console.error("Error fetching predictions:", error);

        res.status(500).json({
            message: "Failed to fetch predictions",
            error: error.message
        });
    }
};


const getDashboard = async (req, res) => {
    try {
        const totalCustomers = await Prediction.countDocuments();

        const highRisk = await Prediction.countDocuments({
            risk: "HIGH"
        });

        const mediumRisk = await Prediction.countDocuments({
            risk: "MEDIUM"
        });

        const lowRisk = await Prediction.countDocuments({
            risk: "LOW"
        });

        const result = await Prediction.aggregate([
            {
                $group: {
                    _id: null,
                    averageChurnProbability: {
                        $avg: "$churnProbability"
                    }
                }
            }
        ]);

        const averageChurnProbability =
            result.length > 0
                ? Number(result[0].averageChurnProbability.toFixed(2))
                : 0;

        res.status(200).json({
            totalCustomers,
            highRisk,
            mediumRisk,
            lowRisk,
            averageChurnProbability
        });

    } catch (error) {
        console.error("Dashboard error:", error);

        res.status(500).json({
            message: "Failed to fetch dashboard data",
            error: error.message
        });
    }
};

module.exports = {
    createPrediction, getPredictions ,  getDashboard
};