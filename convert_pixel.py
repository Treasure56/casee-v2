import os
from PIL import Image

# Ensure the output directory exists
os.makedirs("public/images/phone-templates", exist_ok=True)

# Load the raw template image
img = Image.open("public/images/pixel.png").convert("RGBA")
width, height = img.size

# Load pixel data
pixels = img.load()

# Target body color is roughly grey (66, 66, 66)
# We will match any pixel whose R, G, B are all between 50 and 85
for x in range(width):
    for y in range(height):
        r, g, b, a = pixels[x, y]
        
        # If it is solid grey (case body area)
        if a > 0 and 50 <= r <= 85 and 50 <= g <= 85 and 50 <= b <= 85:
            # Replace it with a semi-transparent black (40% opacity = 102 alpha)
            pixels[x, y] = (0, 0, 0, 102)

# Save the new transparent template
img.save("public/images/phone-templates/pixel.png", "PNG")
print("Successfully generated public/images/phone-templates/pixel.png with transparent black body!")
