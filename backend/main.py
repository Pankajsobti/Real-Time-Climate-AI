from fastapi import FastAPI
import json
import threading
import backend.weather_api as weather_api
from fastapi.middleware.cors import CORSMiddleware
import joblib
import pandas as pd

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load ML model
model = joblib.load("models/climate_risk.pkl")


@app.get("/")
def home():
    return {"message": "Climate AI backend running"}


@app.get("/weather")
def get_weather():
    with open("data/weather_data.json", "r") as f:
        data = json.load(f)

    for city in data:
        X = pd.DataFrame(
            [[city["temperature"], city["humidity"]]],
            columns=["temperature", "humidity"],
        )
        risk = model.predict(X)[0]
        city["risk"] = round(float(risk), 2)

        # Flood logic
        if city["coastal"] == 1 and city["humidity"] > 70:
            city["flood_risk"] = "High"
        else:
            city["flood_risk"] = "Low"

    return data


def start_weather():
    # weather_api.main()
    pass

thread = threading.Thread(target=start_weather)
thread.daemon = True
thread.start()