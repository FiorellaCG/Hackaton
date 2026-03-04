import urllib.request
import json

# Replace with the actual ID from Coloplast user
USER_ID = "365fb736-c3dc-48f0-822a-5a43b700c298" 

try:
    with urllib.request.urlopen(f"http://127.0.0.1:8000/api/mi-perfil/{USER_ID}/") as response:
        data = json.loads(response.read().decode())
        print("Profile keys:", data.keys())
        print(f"empresa_id: {data.get('empresa_id')}")
        print(f"rol: {data.get('rol')}")
except Exception as e:
    print(f"Error: {e}")
