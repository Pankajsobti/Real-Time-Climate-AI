import pandas as pd
from sklearn.ensemble import RandomForestRegressor
import joblib

# Dummy climate dataset (start)
data = {
    "temperature": [20, 25, 30, 35, 40],
    "humidity": [30, 50, 60, 70, 80],
    "risk": [1, 2, 3, 4, 5],  # 1 low, 5 high
}

df = pd.DataFrame(data)

X = df[["temperature", "humidity"]]
y = df["risk"]

model = RandomForestRegressor()
model.fit(X, y)

joblib.dump(model, "models/climate_risk.pkl")

print("Model trained and saved")