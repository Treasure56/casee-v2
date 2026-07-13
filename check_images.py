import os
from PIL import Image

image_files = [
    "public/images/phone-template.png",
    "public/images/phone-template-dark-edges.png",
    "public/images/phone-template-white-edges.png",
    "public/images/pixel.png",
    "public/images/iphone17.png"
]

for filename in image_files:
    if os.path.exists(filename):
        img = Image.open(filename)
        print(f"File: {filename}")
        print(f"  Size: {img.size}")
        print(f"  Format: {img.format}")
        print(f"  Mode: {img.mode}")
        # Sample a few key pixel positions
        w, h = img.size
        print(f"  Top-Left (0,0): {img.getpixel((0,0))}")
        print(f"  Center ({w//2},{h//2}): {img.getpixel((w//2, h//2))}")
        print(f"  Top-Left Camera area ({int(w*0.15)},{int(h*0.15)}): {img.getpixel((int(w*0.15), int(h*0.15)))}")
        print("-" * 50)
