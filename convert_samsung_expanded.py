from PIL import Image

# Open the raw Samsung Ultra image
img = Image.open("public/images/samsungs_ultra.png").convert("RGBA")
width, height = img.size
pixels = img.load()

# Bounding box of the phone is (143, 31, 357, 468)
# Borders are approximately 4px thick.
# Expanded Camera lenses box to prevent any lens/sensor clipping:
# x from 148 to 242, y from 33 to 196.

for x in range(width):
    for y in range(height):
        # We only process pixels inside the phone bounding box
        if 143 <= x <= 357 and 31 <= y <= 468:
            is_border = (x < 147 or x > 353 or y < 35 or y > 464)
            
            if not is_border:
                is_camera_box = (148 <= x <= 242 and 33 <= y <= 196)
                
                if not is_camera_box:
                    # Erase EVERYTHING in the phone body completely to make it transparent
                    pixels[x, y] = (0, 0, 0, 0)
                else:
                    # Keep the camera box 100% solid and unchanged
                    pass

# Step 2: Draw the realistic 3D bezel/lip around the expanded camera lenses block
c_highlight = (80, 80, 83, 255)
c_mid = (45, 45, 47, 255)
c_shadow = (25, 25, 27, 255)
c_deep = (15, 15, 17, 255)

# Draw horizontal top & bottom borders
for x in range(148, 243):
    pixels[x, 33] = c_deep
    pixels[x, 34] = c_shadow
    pixels[x, 35] = c_mid
    pixels[x, 36] = c_highlight
    
    pixels[x, 193] = c_highlight
    pixels[x, 194] = c_mid
    pixels[x, 195] = c_shadow
    pixels[x, 196] = c_deep

# Draw vertical left & right borders
for y in range(33, 197):
    pixels[148, y] = c_deep
    pixels[149, y] = c_shadow
    pixels[150, y] = c_mid
    pixels[151, y] = c_highlight
    
    pixels[239, y] = c_highlight
    pixels[240, y] = c_mid
    pixels[241, y] = c_shadow
    pixels[242, y] = c_deep

# Step 3: Auto-crop to remove all transparent padding at the edges
bbox = img.getbbox()
if bbox:
    cropped_img = img.crop(bbox)
    print(f"Original size: {img.size}")
    print(f"Cropped size: {cropped_img.size}")
    # Save the cropped template
    cropped_img.save("public/images/phone-templates/samsung.png", "PNG")
    print("Successfully generated Samsung Ultra template with expanded camera box!")
else:
    print("Error: Bounding box is empty.")
