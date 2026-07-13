from PIL import Image

try:
    img = Image.open("public/images/clearphone.png")
    print(f"File: clearphone.png")
    print(f"  Size: {img.size}")
    print(f"  Format: {img.format}")
    print(f"  Mode: {img.mode}")
    # Sample a few key pixel positions
    w, h = img.size
    print(f"  Top-Left (0,0): {img.getpixel((0,0))}")
    print(f"  Center ({w//2},{h//2}): {img.getpixel((w//2, h//2))}")
except Exception as e:
    print(f"Error reading clearphone.png: {e}")
