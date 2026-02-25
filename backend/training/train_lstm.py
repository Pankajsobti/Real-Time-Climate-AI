import pandas as pd
import numpy as np
import os
from sklearn.preprocessing import MinMaxScaler
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense
import joblib

BASE_DIR = os.path.dirname(os.path.dirname(__file__))
data_path = os.path.join(BASE_DIR, "data", "india_combined.csv")

df = pd.read_csv(data_path)

# Use only temperature for first model
data = df["temp"].values.reshape(-1, 1)

scaler = MinMaxScaler()
data_scaled = scaler.fit_transform(data)

# Create sequences
X, y = [], []
window = 30

for i in range(window, len(data_scaled)):
    X.append(data_scaled[i-window:i])
    y.append(data_scaled[i])

X, y = np.array(X), np.array(y)

# LSTM model
model = Sequential()
model.add(LSTM(50, return_sequences=True, input_shape=(X.shape[1], 1)))
model.add(LSTM(50))
model.add(Dense(1))

model.compile(optimizer="adam", loss="mse")
model.fit(X, y, epochs=5, batch_size=32)

# Save
model.save(os.path.join(BASE_DIR, "models", "india_lstm.h5"))
joblib.dump(scaler, os.path.join(BASE_DIR, "models", "scaler.pkl"))

print("Deep Learning model ready 🔥")