import requests
import json
import time
from dotenv import load_dotenv
import os


def main():
    load_dotenv()
    API_KEY = os.getenv("OPENWEATHER_API_KEY")

    # Cities with coordinates (India level foundation)
    cities = [
        {"name": "Delhi", "lat": 28.6139, "lon": 77.209},
        {"name": "Mumbai", "lat": 19.076, "lon": 72.8777},
        {"name": "Chennai", "lat": 13.0827, "lon": 80.2707},
        {"name": "Kolkata", "lat": 22.5726, "lon": 88.3639},
        {"name": "Ahmedabad", "lat": 23.0225, "lon": 72.5714},
    ]

    while True:
        weather_data = []

        for city in cities:
            url = f"https://api.openweathermap.org/data/2.5/weather?q={city['name']}&appid={API_KEY}&units=metric"

            response = requests.get(url)

            if response.status_code == 200:
                data = response.json()

                weather_data.append({
                    "city": city["name"],
                    "temperature": data["main"]["temp"],
                    "humidity": data["main"]["humidity"],
                    "weather": data["weather"][0]["description"],
                    "lat": city["lat"],
                    "lon": city["lon"]
                })
            else:
                print("Error for", city["name"], response.status_code)

        # Save file
        with open("data/weather_data.json", "w") as f:
            json.dump(weather_data, f, indent=4)

        print("Updated weather data")

        # Real-time interval
        time.sleep(5)  # demo ke liye fast


if __name__ == "__main__":
    main()