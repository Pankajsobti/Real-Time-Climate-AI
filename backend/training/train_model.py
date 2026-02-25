import pandas as pd
from prophet import Prophet
import joblib

df = pd.read_csv("../data/delhi_weather.csv")

df_prophet = pd.DataFrame({
    "ds": pd.date_range(start="2015-01-01", periods=len(df)),
    "y": df["temp"]
})

model = Prophet()
model.fit(df_prophet)

joblib.dump(model, "../models/temp_model.pkl")

print("Model trained")