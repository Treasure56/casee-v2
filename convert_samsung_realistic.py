from PIL import Image

# Open the raw Samsung Ultra image
img = Image.open("public/images/samsungs_ultra.png").convert("RGBA")
width, height = img.size
pixels = img.load()

# Step 1: Erase the case body
# Target body color is roughly grey (67, 63, 64)
# We will match any pixel whose R, G, B are all between 45 and 85
for x in range(width):
    for y in range(height):
        r, g, b, a = pixels[x, y]
        
        if a > 0:
            # We want to erase the case body grey (R, G, B between 45 and 85)
            # but leave the camera lenses intact. The lenses are black/chrome (outside this grey range).
            # To ensure the Google/G logo equivalent or any text is erased:
            if 45 <= r <= 85 and 45 <= g <= 85 and 45 <= b <= 85:
                pixels[x, y] = (0, 0, 0, 0)

# Step 2: Draw a realistic 3D bezel/lip around the camera lenses block
# The camera cluster on the Samsung Ultra is roughly:
# x from 152 to 238, y from 38 to 192.
# We will draw a dark 3D frame around it to act as the case camera ring cutout.
c_highlight = (80, 80, 83, 255)
c_mid = (45, 45, 47, 255)
c_shadow = (25, 25, 27, 255)
c_deep = (15, 15, 17, 255)

# Draw horizontal top & bottom borders
for x in range(152, 239):
    # Top Bezel
    pixels[x, 38] = c_deep
    pixels[x, 39] = c_shadow
    pixels[x, 40] = c_mid
    pixels[x, 41] = c_highlight
    
    # Bottom Bezel
    pixels[x, 189] = c_highlight
    pixels[x, 190] = c_mid
    pixels[x, 191] = c_shadow
    pixels[x, 192] = c_deep

# Draw vertical left & right borders
for y in range(38, 193):
    # Left Bezel
    pixels[152, y] = c_deep
    pixels[153, y] = c_shadow
    pixels[154, y] = c_mid
    pixels[155, y] = c_highlight
    
    # Right Bezel
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
    print("Successfully generated Samsung Ultra template with 3D camera ring bezel!")
else:
    print("Error: Bounding box is empty.")
