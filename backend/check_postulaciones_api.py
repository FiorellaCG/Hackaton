import requests
import json

response = requests.get("http://127.0.0.1:8000/api/postulaciones/")
data = response.json()
print(f"Total: {len(data)}")
for i, item in enumerate(data[:3]): # First 3
    print(f"Item {i}: {list(item.keys())}")
    if 'vacante_obj' in item:
        print(f"  vacante_obj.empresa: {item['vacante_obj'].get('empresa')}")
    else:
        print(f"  NO vacante_obj")
