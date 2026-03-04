import requests

# Test wrong password
login_data = {
    "correo": "admin@gmail.com",
    "contrasena": "WRONG"
}
response = requests.post("http://127.0.0.1:8000/api/login/", json=login_data)
print(f"WRONG PASS - Status Code: {response.status_code}")
print(f"WRONG PASS - Response Body: {response.json()}")

# Test non-existing user
login_data = {
    "correo": "NONEXISTENT@gmail.com",
    "contrasena": "password"
}
response = requests.post("http://127.0.0.1:8000/api/login/", json=login_data)
print(f"NON-EXISTING - Status Code: {response.status_code}")
print(f"NON-EXISTING - Response Body: {response.json()}")

# Test missing field
login_data = {
    "correo": "admin@gmail.com"
}
response = requests.post("http://127.0.0.1:8000/api/login/", json=login_data)
print(f"MISSING FIELD - Status Code: {response.status_code}")
print(f"MISSING FIELD - Response Body: {response.json()}")
