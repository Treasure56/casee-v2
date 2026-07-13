from PIL import Image

img = Image.open("public/images/samsungs_ultra.png").convert("RGBA")
width, height = img.size
pixels = img.load()

matches = []
for y in range(35, 196): # inside the camera box height
    for x in range(210, 300):
        r, g, b, a = pixels[x, y]
        if a > 0:
            if (r < 40 and g < 40 and b < 40) or (r > 150 and g > 150 and b > 150):
                matches.append((x, y, (r, g, b)))

print(f"Total active matches in camera body height with x >= 210: {len(matches)}")
if matches:
    xs = [m[0] for m in matches]
    print(f"Max x: {max(xs)}")
    high_x = [m for m in matches if m[0] > max(xs) - 10]
    print("Matches close to max x:")
    for m in high_x[:20]:
        print(f"x={m[0]}, y={m[1]}: color={m[2]}")
