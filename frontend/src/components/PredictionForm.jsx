import { useState } from "react";
import { createPrediction } from "../services/api";

function PredictionForm({ onPrediction }) {
    const [formData, setFormData] = useState({
        CreditScore: "",
        Geography: "France",
        Gender: "Female",
        Age: "",
        Tenure: "",
        Balance: "",
        NumOfProducts: "",
        HasCrCard: 1,
        IsActiveMember: 0,
        EstimatedSalary: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            setLoading(true);

            const customerData = {
                ...formData,
                CreditScore: Number(formData.CreditScore),
                Age: Number(formData.Age),
                Tenure: Number(formData.Tenure),
                Balance: Number(formData.Balance),
                NumOfProducts: Number(formData.NumOfProducts),
                HasCrCard: Number(formData.HasCrCard),
                IsActiveMember: Number(formData.IsActiveMember),
                EstimatedSalary: Number(formData.EstimatedSalary)
            };

            const result = await createPrediction(customerData);

            onPrediction(result.prediction);

        } catch (error) {
            console.error("Prediction failed:", error);
            alert("Failed to get prediction");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="prediction-form" onSubmit={handleSubmit}>

            <div className="form-grid">

                <div className="form-group">
                    <label>Credit Score</label>
                    <input
                        type="number"
                        name="CreditScore"
                        placeholder="e.g. 619"
                        value={formData.CreditScore}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Age</label>
                    <input
                        type="number"
                        name="Age"
                        placeholder="e.g. 42"
                        value={formData.Age}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Geography</label>
                    <select
                        name="Geography"
                        value={formData.Geography}
                        onChange={handleChange}
                    >
                        <option value="France">France</option>
                        <option value="Germany">Germany</option>
                        <option value="Spain">Spain</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Gender</label>
                    <select
                        name="Gender"
                        value={formData.Gender}
                        onChange={handleChange}
                    >
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Tenure</label>
                    <input
                        type="number"
                        name="Tenure"
                        placeholder="Years with bank"
                        value={formData.Tenure}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Balance</label>
                    <input
                        type="number"
                        name="Balance"
                        placeholder="e.g. 85000"
                        value={formData.Balance}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Number of Products</label>
                    <input
                        type="number"
                        name="NumOfProducts"
                        placeholder="e.g. 2"
                        value={formData.NumOfProducts}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Estimated Salary</label>
                    <input
                        type="number"
                        name="EstimatedSalary"
                        placeholder="e.g. 101348"
                        value={formData.EstimatedSalary}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Credit Card</label>
                    <select
                        name="HasCrCard"
                        value={formData.HasCrCard}
                        onChange={handleChange}
                    >
                        <option value="1">Has Credit Card</option>
                        <option value="0">No Credit Card</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Membership Status</label>
                    <select
                        name="IsActiveMember"
                        value={formData.IsActiveMember}
                        onChange={handleChange}
                    >
                        <option value="1">Active Member</option>
                        <option value="0">Inactive Member</option>
                    </select>
                </div>

            </div>

            <button
                className="predict-button"
                type="submit"
                disabled={loading}
            >
                {loading ? "Analyzing Customer..." : "Predict Churn Risk →"}
            </button>

        </form>
    );
}

export default PredictionForm;