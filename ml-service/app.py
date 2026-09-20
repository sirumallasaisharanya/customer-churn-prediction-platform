from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
import joblib


# Create FastAPI application
app = FastAPI(title="Customer Churn Prediction API")


# Load trained model
model = joblib.load("churn_model.pkl")


# Define the customer data we expect
class CustomerData(BaseModel):
    CreditScore: int
    Geography: str
    Gender: str
    Age: int
    Tenure: int
    Balance: float
    NumOfProducts: int
    HasCrCard: int
    IsActiveMember: int
    EstimatedSalary: float


# Health check endpoint
@app.get("/")
def home():
    return {
        "message": "Customer Churn Prediction API is running"
    }


# Prediction endpoint
@app.post("/predict")
def predict(customer: CustomerData):

    # Convert incoming data to DataFrame
    data = pd.DataFrame([{
        "CreditScore": customer.CreditScore,
        "Geography": customer.Geography,
        "Gender": customer.Gender,
        "Age": customer.Age,
        "Tenure": customer.Tenure,
        "Balance": customer.Balance,
        "NumOfProducts": customer.NumOfProducts,
        "HasCrCard": customer.HasCrCard,
        "IsActiveMember": customer.IsActiveMember,
        "EstimatedSalary": customer.EstimatedSalary
    }])

    # Prediction
    prediction = model.predict(data)[0]

    # Churn probability
    probability = model.predict_proba(data)[0][1]

    # Convert probability to percentage
    churn_probability = round(probability * 100, 2)

    # Determine risk level
    if churn_probability >= 70:
        risk = "HIGH"
    elif churn_probability >= 40:
        risk = "MEDIUM"
    else:
        risk = "LOW"

    return {
        "prediction": int(prediction),
        "churn_probability": churn_probability,
        "risk": risk
    }