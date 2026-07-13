from PIL import Image

img = Image.open("public/images/samsungs_ultra.png").convert("RGBA")
width, height = img.size
pixels = img.load()

# Bounding box of the camera region in y is 30 to 200.
# Let's find the rightmost x coordinate in this region that belongs to a lens, sensor, flash, or chrome ring.
# We define body pixels as R, G, B between 50 and 80.
non_body_pixels = []
for y in range(30, 201):
    for x in range(143, 357): # within the phone width
        r, g, b, a = pixels[x, y]
        # If it's not the body color (with a conservative threshold)
        if not (50 <= r <= 80 and 50 <= g <= 80 and 50 <= b <= 80):
            non_body_pixels.append((x, y))

# Let's group them by x and find the maximum x
xs = [p[0] for p in non_body_pixels]
print(f"Total non-body pixels found in camera area: {len(xs)}")
if xs:
    print(f"Minimum x of camera elements: {min(xs)}")
    print(f"Maximum x of camera elements: {max(xs)}")
