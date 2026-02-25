import pandas as pd
import os

BASE_DIR = os.path.dirname(os.path.dirname(__file__))
data_path = os.path.join(BASE_DIR, "data")

all_states = []

for file in os.listdir(data_path):
    if file.endswith(".csv"):
        state = file.replace(".csv", "")
        df = pd.read_csv(os.path.join(data_path, file))

        df["state"] = state
        all_states.append(df)

final_df = pd.concat(all_states, ignore_index=True)

save_path = os.path.join(data_path, "india_combined.csv")
final_df.to_csv(save_path, index=False)

print("India dataset ready 🚀")