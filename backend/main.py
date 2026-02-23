from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
import asyncio
import random
import requests

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 🔥 Coastal vs land logic
coastal_states = [
    "Tamil Nadu", "Kerala", "Karnataka", "Goa",
    "Maharashtra", "Gujarat", "Andhra Pradesh",
    "Odisha", "West Bengal"
]

def region_type(state):
    return "coastal" if state in coastal_states else "land"


# 🔥 State → city mapping
state_city = {
    "Delhi": "Delhi",
    "Maharashtra": "Mumbai",
    "Tamil Nadu": "Chennai",
    "West Bengal": "Kolkata",
    "Karnataka": "Bangalore",
    "Gujarat": "Ahmedabad",
    "Kerala": "Kochi",
    "Uttar Pradesh": "Lucknow"
}

API_KEY = "fa0e88be24ce09678792a832e2773f46"


# ✅ REST weather API (ye missing tha)
@app.get("/weather/{state}")
def get_weather(state: str):
    city = state_city.get(state, "Delhi")

    url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric"
    response = requests.get(url)
    data = response.json()

    # 🔥 Error handling
    if "main" not in data:
        return {
            "error": data.get("message", "API error"),
            "state": state
        }

    return {
        "state": state,
        "region": region_type(state),
        "temperature": data["main"]["temp"],
        "humidity": data["main"]["humidity"],
        "wind": data["wind"]["speed"],
        "condition": data["weather"][0]["main"]
    }


# 🔥 Real-time streaming (demo)
@app.websocket("/ws/weather/{state}")
async def weather_stream(websocket: WebSocket, state: str):
    await websocket.accept()

    while True:
        city = state_city.get(state, "Delhi")

        url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric"
        response = requests.get(url)
        data = response.json()

        if "main" in data:
            live = {
                "temperature": data["main"]["temp"],
                "humidity": data["main"]["humidity"],
                "wind": data["wind"]["speed"],
            }
        else:
            live = {
                "temperature": 0,
                "humidity": 0,
                "wind": 0,
            }

        await websocket.send_json(live)
        await asyncio.sleep(5)
@app.get("/predict/{state}")
def predict_weather(state: str):
    # Hackathon demo prediction
    future = []

    base_temp = random.uniform(20, 35)

    for i in range(7):
        future.append({
            "day": i + 1,
            "temperature": round(base_temp + random.uniform(-2, 3), 2),
            "humidity": round(random.uniform(40, 80), 2),
        })

    return {
        "state": state,
        "forecast": future
    }        