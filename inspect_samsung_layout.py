from PIL import Image

img = Image.open("public/images/samsungs_ultra.png").convert("RGBA")
w, h = img.size

# The phone body is within x from 143 to 357, y from 31 to 468.
# Let's print out the pixel colors in a grid around the top-left (the camera area)
# to see where the camera lens rings are.
# Usually, camera lenses are in the top-left of the back, say x from 160 to 220, y from 50 to 180.

print("Sampling top-left region of phone body:")
for y in range(50, 180, 10):
    row = []
    for x in range(160, 230, 10):
        color = img.getpixel((x, y))
        # simplify output for readability: show color only if it differs from the body color (67, 63, 64)
        if abs(color[0] - 67) < 15 and abs(color[1] - 63) < 15 and abs(color[2] - 64) < 15:
            row.append("BODY")
        elif color[3] == 0:
            row.append("BG")
        else:
            row.append(f"C{color[:3]}")
    print(f"y={y}: {row}")
