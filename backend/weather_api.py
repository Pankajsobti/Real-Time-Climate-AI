import requests
import json
import time
from dotenv import load_dotenv
import os

# Load API key from .env
load_dotenv()
API_KEY = os.getenv("OPENWEATHER_API_KEY")

# Indian cities
cities = ["Delhi", "Mumbai", "Chennai", "Kolkata", "Ahmedabad"]

# Real-time loop
while True:
    weather_data = []

    for city in cities:
        url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric"

        response = requests.get(url)

        if response.status_code == 200:
            data = response.json()

            weather_data.append({
                "city": city,
                "temperature": data["main"]["temp"],
                "humidity": data["main"]["humidity"],
                "weather": data["weather"][0]["description"]
            })
        else:
            print("Error for", city, response.status_code)

    # Save data
    with open("data/weather_data.json", "w") as f:
        json.dump(weather_data, f, indent=4)

    print("Updated weather data")

    # update every 30 sec
    time.sleep(30)