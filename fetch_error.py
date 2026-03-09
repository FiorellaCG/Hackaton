import urllib.request
from urllib.error import HTTPError

try:
    response = urllib.request.urlopen("https://hackaton-7cux.onrender.com/api/usuarios/stats/")
    print(response.read().decode("utf-8"))
except HTTPError as e:
    print(f"Error {e.code}")
    print(e.read().decode("utf-8"))
except Exception as e:
    print(f"Exception: {e}")
