import pandas as pd
import numpy as np
import os
import torch
import torch.nn as nn
from sklearn.preprocessing import MinMaxScaler
import joblib

# Paths
BASE_DIR = os.path.dirname(os.path.dirname(__file__))
data_path = os.path.join(BASE_DIR, "data", "india_combined.csv")

df = pd.read_csv(data_path)

# 🔥 Use multiple features
features = ["temp", "humidity", "rainfall"]

data = df[features].values

scaler = MinMaxScaler()
data_scaled = scaler.fit_transform(data)

# Sequence preparation
window = 30
X, y = [], []

for i in range(window, len(data_scaled)):
    X.append(data_scaled[i-window:i])
    y.append(data_scaled[i])

X = np.array(X)
y = np.array(y)

X = torch.tensor(X, dtype=torch.float32)
y = torch.tensor(y, dtype=torch.float32)

# 🔥 LSTM model
class ClimateLSTM(nn.Module):
    def __init__(self):
        super().__init__()
        self.lstm = nn.LSTM(input_size=3, hidden_size=64, batch_first=True)
        self.fc = nn.Linear(64, 3)

    def forward(self, x):
        out, _ = self.lstm(x)
        out = out[:, -1, :]
        return self.fc(out)

model = ClimateLSTM()

loss_fn = nn.MSELoss()
optimizer = torch.optim.Adam(model.parameters(), lr=0.001)

# Training
epochs = 5

for epoch in range(epochs):
    optimizer.zero_grad()
    output = model(X)
    loss = loss_fn(output, y)
    loss.backward()
    optimizer.step()

    print(f"Epoch {epoch+1}, Loss: {loss.item()}")

# Save
model_path = os.path.join(BASE_DIR, "models", "india_lstm.pt")
torch.save(model.state_dict(), model_path)

joblib.dump(scaler, os.path.join(BASE_DIR, "models", "scaler.pkl"))

print("🔥 PyTorch Climate AI model ready")