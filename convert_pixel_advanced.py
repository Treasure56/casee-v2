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

# Step 2: Auto-crop to remove all transparent padding at the edges
bbox = img.getbbox()
if bbox:
    cropped_img = img.crop(bbox)
    print(f"Original size: {img.size}")
    print(f"Cropped size: {cropped_img.size}")
    # Save the cropped template
    cropped_img.save("public/images/phone-templates/pixel.png", "PNG")
    print("Successfully cropped transparent edges and removed logo!")
else:
    print("Error: Bounding box is empty.")
