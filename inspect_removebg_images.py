import os
from PIL import Image

files = [f for f in os.listdir("public/images") if f.endswith(".png")]

for filename in files:
    filepath = os.path.join("public/images", filename)
    try:
        img = Image.open(filepath)
        print(f"File: {filename} | Size: {img.size} | Mode: {img.mode}")
    except Exception as e:
        print(f"Error {filename}: {e}")
