import urllib.request, json

data = json.dumps({'correo': 'test@test.com', 'contrasena': '12345'}).encode('utf-8')
req = urllib.request.Request(
    'http://127.0.0.1:8000/api/login/', 
    data=data, 
    headers={'Content-Type': 'application/json'}
)

try:
    with urllib.request.urlopen(req) as response:
        print("STATUS:", response.status)
        print("RESPONSE:", response.read().decode('utf-8'))
except urllib.error.HTTPError as e:
    print("STATUS:", e.code)
    print("ERROR:", e.read().decode('utf-8') if hasattr(e, 'read') else str(e))
