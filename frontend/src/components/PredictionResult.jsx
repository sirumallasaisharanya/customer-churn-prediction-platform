function PredictionResult({ prediction }) {
    if (!prediction) {
        return (
            <div className="empty-result">
                <div className="empty-result-icon">✦</div>

                <h2>AI Risk Assessment</h2>

                <p>
                    Enter customer details and run a prediction
                    to see the customer's churn risk.
                </p>
            </div>
        );
    }

    const {
        prediction: churnPrediction,
        churnProbability,
        risk
    } = prediction;

    const riskClass = risk.toLowerCase();

    return (
        <div className="risk-result">

            <div className="result-heading">
                <span className="result-icon">✦</span>

                <div>
                    <p>AI RISK ASSESSMENT</p>
                    <h2>Customer Risk</h2>
                </div>
            </div>

            <div
                className="risk-circle"
                style={{
                    "--progress": `${churnProbability * 3.6}deg`
                }}
            >
                <div className="risk-circle-inner">
                    <strong>{churnProbability}%</strong>
                    <span>Churn Probability</span>
                </div>
            </div>

            <div className={`risk-badge ${riskClass}`}>
                <span className="risk-dot"></span>
                {risk} RISK
            </div>

            <div className="prediction-message">
                <strong>
                    {churnPrediction === 1
                        ? "Customer may churn"
                        : "Customer likely to stay"}
                </strong>

                <p>
                    Based on the customer's profile and
                    machine learning analysis.
                </p>
            </div>

            <div className="result-divider"></div>

            <div className="result-footer">
                <span>Model Status</span>
                <span className="model-status">
                    ● Analysis Complete
                </span>
            </div>

        </div>
    );
}

export default PredictionResult;