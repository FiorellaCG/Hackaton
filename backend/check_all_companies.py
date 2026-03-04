import urllib.request
import json

try:
    with urllib.request.urlopen("http://127.0.0.1:8000/api/postulaciones/") as response:
        data = json.loads(response.read().decode())
        print(f"Total: {len(data)}")
        for i, item in enumerate(data):
            v_obj = item.get('vacante_obj')
            if v_obj:
                print(f"Postulation {i} - Company ID: {v_obj.get('empresa')}")
            else:
                print(f"Postulation {i} - NO vacante_obj")
except Exception as e:
    print(f"Error: {e}")
