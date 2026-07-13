from PIL import Image

try:
    img = Image.open("public/images/phone-templates/pixel.png")
    w, h = img.size
    print(f"Template size: {w}x{h}")
    # Sample a grid in the center area to see if logo or grey is still there
    for y in range(h // 2 - 20, h // 2 + 20, 10):
        row = []
        for x in range(w // 2 - 20, w // 2 + 20, 10):
            row.append(img.getpixel((x, y)))
        print(f"Row y={y}: {row}")
except Exception as e:
    print(e)
