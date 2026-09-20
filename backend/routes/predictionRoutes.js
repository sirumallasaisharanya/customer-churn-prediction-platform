const express = require("express");

const {
    createPrediction,
    getPredictions,  getDashboard
} = require("../controllers/predictionController");

const router = express.Router();


// POST - Create a new prediction
router.post("/predict", createPrediction);


// GET - Get all predictions
router.get("/predict", getPredictions);



router.get("/dashboard", getDashboard);

module.exports = router;