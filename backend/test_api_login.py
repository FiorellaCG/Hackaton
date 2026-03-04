import requests

url = "http://127.0.0.1:8000/api/login/"
payload = {"correo": "institucion@test.com", "contrasena": "1234"}
headers = {"Content-Type": "application/json"}

try:
    response = requests.post(url, json=payload, headers=headers)
    print(f"Status: {response.status_code}")
    print(f"Response: {response.text}")
except Exception as e:
    print(f"Error: {e}")
