import urllib.request
import json

try:
    with urllib.request.urlopen("http://127.0.0.1:8000/api/postulaciones/") as response:
        data = json.loads(response.read().decode())
        print(f"Total entries: {len(data)}")
        if len(data) > 0:
            print("First entry keys:", data[0].keys())
except Exception as e:
    print(f"Error: {e}")
