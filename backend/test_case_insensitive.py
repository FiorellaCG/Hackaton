import requests

# Test lowercase for uppercase DB record
login_data = {
    "correo": "hrcr@nextern.com",
    "contrasena": "Pass123!"
}
response = requests.post("http://127.0.0.1:8000/api/login/", json=login_data)
print(f"LOWERCASE LOGIN - Status Code: {response.status_code}")
if response.status_code == 200:
    print(f"LOWERCASE LOGIN - Response Body: {response.json()}")
else:
    print(f"LOWERCASE LOGIN - Error Body: {response.json()}")
