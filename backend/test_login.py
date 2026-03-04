import requests

login_data = {
    "correo": "admin@gmail.com",
    "contrasena": "admin123"
}

response = requests.post("http://127.0.0.1:8000/api/login/", json=login_data)
print(f"Status Code: {response.status_code}")
print(f"Response Body: {response.json()}")
