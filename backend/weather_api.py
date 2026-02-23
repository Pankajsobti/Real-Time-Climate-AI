from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests

app = FastAPI()

# CORS (React connect ke liye)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Coastal vs land logic
coastal_states = [
    "Tamil Nadu", "Kerala", "Karnataka", "Goa",
    "Maharashtra", "Gujarat", "Andhra Pradesh",
    "Odisha", "West Bengal"
]

def region_type(state):
    if state in coastal_states:
        return "coastal"
    return "land"


# State → city mapping (simple hackathon version)
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


# API KEY (replace later)
API_KEY = "YOUR_OPENWEATHER_KEY"


@app.get("/weather/{state}")
def get_weather(state: str):
    city = state_city.get(state, "Delhi")

    url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric"
    response = requests.get(url)
    data = response.json()

    return {
        "state": state,
        "region": region_type(state),
        "temperature": data["main"]["temp"],
        "humidity": data["main"]["humidity"],
        "wind": data["wind"]["speed"],
        "condition": data["weather"][0]["main"]
    }