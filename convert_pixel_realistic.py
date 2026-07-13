from PIL import Image

# Open the raw template image
img = Image.open("public/images/pixel.png").convert("RGBA")
width, height = img.size
pixels = img.load()

# Step 1: Erase the case body and the Google logo
# Visor region is roughly y from 80 to 180, and x from 36 to 338.
for x in range(width):
    for y in range(height):
        r, g, b, a = pixels[x, y]
        
        if a > 0:
            is_visor_y = (80 <= y <= 180)
            
            if not is_visor_y:
                # Erase case body and logo (R, G, B between 20 and 220)
                if 20 <= r <= 220 and 20 <= g <= 220 and 20 <= b <= 220:
                    pixels[x, y] = (0, 0, 0, 0)
            else:
                # Erase sides around the visor bar
                is_outside_visor_x = (x < 36 or x > 338)
                if is_outside_visor_x:
                    if 20 <= r <= 220 and 20 <= g <= 220 and 20 <= b <= 220:
                        pixels[x, y] = (0, 0, 0, 0)

# Step 2: Draw a realistic 3D bezel/lip around the camera visor cutouts
# This frames the camera bar so it looks integrated into the case (laps correctly)
for x in range(width):
    # Only draw within the active phone width boundaries
    if 36 <= x <= 338:
        # 1. Visor Bottom Bezel (creates a physical border/shadow where the case wraps the camera)
        pixels[x, 180] = (80, 80, 83, 255)  # Light highlight edge
        pixels[x, 181] = (45, 45, 47, 255)  # Mid bezel color
        pixels[x, 182] = (25, 25, 27, 255)  # Shadow edge
        pixels[x, 183] = (15, 15, 17, 255)  # Inner deep shadow

        # 2. Visor Top Bezel
        pixels[x, 77] = (15, 15, 17, 255)   # Inner deep shadow
        pixels[x, 78] = (25, 25, 27, 255)   # Shadow edge
        pixels[x, 79] = (45, 45, 47, 255)   # Mid bezel color
        pixels[x, 80] = (80, 80, 83, 255)   # Light highlight edge

# Step 3: Auto-crop to remove all transparent padding at the edges
bbox = img.getbbox()
if bbox:
    cropped_img = img.crop(bbox)
    print(f"Original size: {img.size}")
    print(f"Cropped size: {cropped_img.size}")
    # Save the cropped template
    cropped_img.save("public/images/phone-templates/pixel.png", "PNG")
    print("Successfully generated realistic Pixel template with 3D visor bezels!")
else:
    print("Error: Bounding box is empty.")
