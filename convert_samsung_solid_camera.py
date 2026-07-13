from PIL import Image

# Open the raw Samsung Ultra image
img = Image.open("public/images/samsungs_ultra.png").convert("RGBA")
width, height = img.size
pixels = img.load()

# Bounding box of the phone is (143, 31, 357, 468)
# Borders are approximately 4px thick.
# Camera lenses box is: x from 152 to 238, y from 38 to 192.

for x in range(width):
    for y in range(height):
        # We only process pixels inside the phone bounding box
        if 143 <= x <= 357 and 31 <= y <= 468:
            is_border = (x < 147 or x > 353 or y < 35 or y > 464)
            
            if not is_border:
                is_camera_box = (152 <= x <= 238 and 38 <= y <= 192)
                
                if not is_camera_box:
                    # Erase EVERYTHING in the phone body completely to make it transparent
                    pixels[x, y] = (0, 0, 0, 0)
                else:
                    # Keep the camera box 100% solid and unchanged (do not erase any pixels)
                    pass

# Step 2: Draw the realistic 3D bezel/lip around the camera lenses block
c_highlight = (80, 80, 83, 255)
c_mid = (45, 45, 47, 255)
c_shadow = (25, 25, 27, 255)
c_deep = (15, 15, 17, 255)

# Draw horizontal top & bottom borders
for x in range(152, 239):
    pixels[x, 38] = c_deep
    pixels[x, 39] = c_shadow
    pixels[x, 40] = c_mid
    pixels[x, 41] = c_highlight
    
    pixels[x, 189] = c_highlight
    pixels[x, 190] = c_mid
    pixels[x, 191] = c_shadow
    pixels[x, 192] = c_deep

# Draw vertical left & right borders
for y in range(38, 193):
    pixels[152, y] = c_deep
    pixels[153, y] = c_shadow
    pixels[154, y] = c_mid
    pixels[155, y] = c_highlight
    
    pixels[235, y] = c_highlight
    pixels[236, y] = c_mid
    pixels[237, y] = c_shadow
    pixels[238, y] = c_deep

# Step 3: Auto-crop to remove all transparent padding at the edges
bbox = img.getbbox()
if bbox:
    cropped_img = img.crop(bbox)
    print(f"Original size: {img.size}")
    print(f"Cropped size: {cropped_img.size}")
    # Save the cropped template
    cropped_img.save("public/images/phone-templates/samsung.png", "PNG")
    print("Successfully generated Samsung Ultra template with solid camera area!")
else:
    print("Error: Bounding box is empty.")
