import { useState } from "react";
import PredictionForm from "../components/PredictionForm";
import PredictionResult from "../components/PredictionResult";

function Predict() {
    const [prediction, setPrediction] = useState(null);

    return (
        <main className="predict-page">
            <div className="page-header">
                <div>
                    <p className="page-label">AI CUSTOMER INTELLIGENCE</p>

                    <h1>Customer Churn Prediction</h1>

                    <p className="page-description">
                        Analyze customer information and assess the probability
                        of customer churn using our machine learning model.
                    </p>
                </div>
            </div>

            <div className="prediction-layout">

                <section className="prediction-card">
                    <div className="card-header">
                        <div>
                            <h2>Customer Information</h2>
                            <p>
                                Enter the customer's details below
                            </p>
                        </div>
                    </div>

                    <PredictionForm
                        onPrediction={(result) => setPrediction(result)}
                    />
                </section>

                <section className="result-card">
                    <PredictionResult
                        prediction={prediction}
                    />
                </section>

            </div>
        </main>
    );
}

export default Predict;