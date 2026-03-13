import urllib.request
import json
from urllib.error import HTTPError

data = json.dumps({
    "correo": "mia22@gmail.com",
    "contrasena": "12345689",
    "telefono": "54692548",
    "rol": "aspirante"
}).encode('utf-8')

req = urllib.request.Request("https://hackaton-7cux.onrender.com/api/usuarios/", data=data, headers={'Content-Type': 'application/json'})

try:
    response = urllib.request.urlopen(req)
    print(response.read().decode("utf-8"))
except HTTPError as e:
    print(f"Error {e.code}")
    print(e.read().decode("utf-8"))
except Exception as e:
    print(f"Exception: {e}")
