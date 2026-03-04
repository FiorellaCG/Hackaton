import requests

login_data = {
    "correo": "nairiosfwd@gmail.com",
    "contrasena": "2345"
}
response = requests.post("http://127.0.0.1:8000/api/login/", json=login_data)
print(f"Login for nairiosfwd@gmail.com: {response.status_code}")
if response.status_code == 200:
    print(f"Response Body: {response.json()}")
else:
    print(f"Error: {response.json()}")
