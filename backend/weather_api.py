import requests

API_KEY = "fa0e88be24ce09678792a832e2773f46"

city = "Delhi"

url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric"

response = requests.get(url)

print(response.json())