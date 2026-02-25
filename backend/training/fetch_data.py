import requests
import pandas as pd
import os
import time

BASE_DIR = os.path.dirname(os.path.dirname(__file__))
data_path = os.path.join(BASE_DIR, "data")

states = {
    "andhra_pradesh": (15.9, 79.7),
    "arunachal_pradesh": (28.2, 94.7),
    "assam": (26.2, 92.9),
    "bihar": (25.6, 85.1),
    "chhattisgarh": (21.2, 81.0),
    "goa": (15.3, 74.1),
    "gujarat": (23.2, 72.6),
    "haryana": (29.1, 76.0),
    "karnataka": (15.3, 75.7),
    "kerala": (10.8, 76.3),
    "maharashtra": (19.0, 72.8),
    "rajasthan": (26.9, 75.8),
    "tamil_nadu": (13.0, 80.2),
    "uttar_pradesh": (26.8, 80.9),
    "west_bengal": (22.9, 88.4),
    "delhi": (28.6, 77.2),
}

# Smaller chunks for stability
years = [
    ("2015-01-01", "2017-12-31"),
    ("2018-01-01", "2020-12-31"),
    ("2021-01-01", "2024-12-31"),
]

for state, (lat, lon) in states.items():
    print(f"\nDownloading {state}...")

    all_data = []

    for start, end in years:
        url = f"https://archive-api.open-meteo.com/v1/archive?latitude={lat}&longitude={lon}&start_date={start}&end_date={end}&daily=temperature_2m_max,relative_humidity_2m_max,precipitation_sum"

        try:
            res = requests.get(url)
            data = res.json()

            if "daily" not in data:
                print(f"❌ Failed chunk {start}-{end}")
                continue

            df = pd.DataFrame({
                "temp": data["daily"]["temperature_2m_max"],
                "humidity": data["daily"]["relative_humidity_2m_max"],
                "rainfall": data["daily"]["precipitation_sum"],
            })

            all_data.append(df)
            time.sleep(1)

        except Exception as e:
            print("Error:", e)

    if len(all_data) == 0:
        print("❌ No data for", state)
        continue

    final_df = pd.concat(all_data, ignore_index=True)
    file_name = os.path.join(data_path, f"{state}.csv")
    final_df.to_csv(file_name, index=False)

    print("✅ Saved", state)

print("\nAll India data saved successfully 🚀")