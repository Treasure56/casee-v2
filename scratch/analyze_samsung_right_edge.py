from PIL import Image

img = Image.open("public/images/samsungs_ultra.png").convert("RGBA")
w, h = img.size

# Let's inspect the transition from x = 210 to 280 to see where the camera island ends.
# The body color is around (67, 63, 64), whereas the camera island is lighter grey.
print("Sampling row y=120 from x=210 to 280:")
for x in range(210, 281):
    color = img.getpixel((x, 120))
    print(f"x={x}: {color}")
