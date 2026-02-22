from fastapi import FastAPI
import json
import threading
import backend.weather_api as weather_api
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# ✅ CORS allow frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Climate AI backend running"}

@app.get("/weather")
def get_weather():
    with open("data/weather_data.json", "r") as f:
        data = json.load(f)
    return data


def start_weather():
    weather_api.main()


thread = threading.Thread(target=start_weather)
thread.daemon = True
thread.start()