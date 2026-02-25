import requests
import pandas as pd

# Example: Delhi
lat = 28.6
lon = 77.2

url = f"https://archive-api.open-meteo.com/v1/archive?latitude={lat}&longitude={lon}&start_date=2015-01-01&end_date=2024-12-31&daily=temperature_2m_max,relative_humidity_2m_max,precipitation_sum&timezone=Asia%2FKolkata"

data = requests.get(url).json()

df = pd.DataFrame({
    "temp": data["daily"]["temperature_2m_max"],
    "humidity": data["daily"]["relative_humidity_2m_max"],
    "rainfall": data["daily"]["precipitation_sum"],
})

df.to_csv("../data/delhi_weather.csv", index=False)

print("Data saved")