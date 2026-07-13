from PIL import Image

try:
    img = Image.open("public/images/samsungs_ultra.png")
    w, h = img.size
    print(f"samsungs_ultra.png size: {w}x{h} | Mode: {img.mode}")
    print("Sample pixels:")
    print(f"Top-Left (0,0): {img.getpixel((0,0))}")
    print(f"Center ({w//2},{h//2}): {img.getpixel((w//2, h//2))}")
    # Print transparency bounding box
    bbox = img.getbbox()
    print(f"Active bounding box: {bbox}")
except Exception as e:
    print(e)
