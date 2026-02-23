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
@app.get("/risk/{state}")
def risk_score(state: str):
    # demo AI risk logic
    temp = random.uniform(20, 40)
    humidity = random.uniform(30, 90)

    risk = (temp * 0.6 + humidity * 0.4) / 100

    level = "Low"
    if risk > 0.7:
        level = "High"
    elif risk > 0.4:
        level = "Moderate"

    return {
        "state": state,
        "risk_score": round(risk, 2),
        "risk_level": level
    }
@app.get("/alerts/{state}")
def disaster_alert(state: str):

    alerts = []

    # ❌ REMOVE FAKE CYCLONE
    # if state in coastal_states:
    #     alerts.append("⚠ Cyclone risk in next 48 hours")

    # ✅ Only real weather based alerts
    city = state_city.get(state, "Delhi")

    url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric"
    response = requests.get(url)
    data = response.json()

    if "weather" in data:
        condition = data["weather"][0]["main"]

        if condition in ["Thunderstorm"]:
            alerts.append("⚡ Thunderstorm warning")

        if condition in ["Rain"]:
            alerts.append("🌧 Heavy rainfall possible")

    return {
        "state": state,
        "alerts": alerts
    }
@app.get("/future-climate/{state}")
def future_climate(state: str):

    # Real weather based future trend
    city = state_city.get(state, "Delhi")

    url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric"
    response = requests.get(url)
    data = response.json()

    if "main" not in data:
        return {"error": "weather unavailable"}

    current_temp = data["main"]["temp"]
    humidity = data["main"]["humidity"]

    # Climate change simulation
    # (based on global warming trends)

    temp_2050 = current_temp + random.uniform(1.5, 3.5)
    temp_2100 = current_temp + random.uniform(3, 6)

    drought_risk = "Low"
    if humidity < 40:
        drought_risk = "High"

    flood_risk = "Low"
    if state in coastal_states:
        flood_risk = "High"

    return {
        "state": state,
        "current_temp": current_temp,
        "2050_temp": round(temp_2050, 2),
        "2100_temp": round(temp_2100, 2),
        "drought": drought_risk,
        "flood": flood_risk
    }

@app.get("/forecast/{state}")
def real_forecast(state: str):
    city = state_city.get(state, "Delhi")

    url = f"https://api.openweathermap.org/data/2.5/forecast?q={city}&appid={API_KEY}&units=metric"
    response = requests.get(url)
    data = response.json()

    if "list" not in data:
        return {"error": "forecast unavailable"}

    daily = {}

    for item in data["list"]:
        date = item["dt_txt"].split(" ")[0]
        temp = item["main"]["temp"]

        if date not in daily:
            daily[date] = []
        daily[date].append(temp)

    # average per day
    forecast = []
    for d in list(daily.keys())[:7]:
        avg = sum(daily[d]) / len(daily[d])
        forecast.append(round(avg, 2))

    return {
        "state": state,
        "forecast": forecast
    }