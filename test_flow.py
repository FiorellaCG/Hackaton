import urllib.request, json

register_data = {
    "correo": "test_aspirante123@xyz.com",
    "telefono": "8888-8888",
    "contrasena": "Secreta123",
    "rol": "aspirante",
    "activo": True,
    "consentimiento": True
}

req_reg = urllib.request.Request(
    'http://127.0.0.1:8000/api/usuarios/', 
    data=json.dumps(register_data).encode('utf-8'), 
    headers={'Content-Type': 'application/json'}
)

try:
    with urllib.request.urlopen(req_reg) as r:
        print("REG STATUS:", r.status)
        print("REG B:", r.read().decode('utf-8'))
except Exception as e:
    print("REG ERR:", e.read().decode('utf-8') if hasattr(e, 'read') else str(e))

req_login = urllib.request.Request(
    'http://127.0.0.1:8000/api/login/', 
    data=json.dumps({"correo": "test_aspirante123@xyz.com", "contrasena": "Secreta123"}).encode('utf-8'), 
    headers={'Content-Type': 'application/json'}
)

try:
    with urllib.request.urlopen(req_login) as l:
        print("LOGIN STATUS:", l.status)
        print("LOGIN B:", l.read().decode('utf-8'))
except Exception as e:
    print("LOGIN ERR:", e.read().decode('utf-8') if hasattr(e, 'read') else str(e))
