from PIL import Image
img = Image.open("public/images/phone-templates/samsung.png")
# The camera box left edge in cropped space is around x = 5 (since original x was 148, and crop started at 143)
# Let's sample a horizontal row across the left border of the camera box at y = 50
print("Sampling pixels across left border of camera box (x = 2 to 10, y = 50):")
for x in range(2, 12):
    print(f"x={x}, y=50: {img.getpixel((x, 50))}")

print("\nSampling pixels across top border of camera box (x = 30, y = 0 to 6):")
for y in range(0, 7):
    print(f"x=30, y={y}: {img.getpixel((30, y))}")
