from PIL import Image

# Open the raw Samsung Ultra image
img = Image.open("public/images/samsungs_ultra.png").convert("RGBA")
width, height = img.size
pixels = img.load()

# Bounding box of the phone is (143, 31, 357, 468)
# Camera lenses box is: x from 148 to 242, y from 33 to 196
for x in range(width):
    for y in range(height):
        if 143 <= x <= 357 and 31 <= y <= 468:
            is_border = (x < 147 or x > 353 or y < 35 or y > 464)
            
            if not is_border:
                is_camera_box = (148 <= x <= 242 and 33 <= y <= 196)
                
                if not is_camera_box:
                    pixels[x, y] = (0, 0, 0, 0)

# Step 2: Draw a thin 2-pixel subtle 3D bezel around the camera box
c_shadow = (25, 25, 27, 255)
c_highlight = (70, 70, 72, 255)

# Horizontal top & bottom borders
for x in range(148, 243):
    pixels[x, 33] = c_shadow
    pixels[x, 34] = c_highlight
    
    pixels[x, 195] = c_highlight
    pixels[x, 196] = c_shadow

# Vertical left & right borders
for y in range(33, 197):
    pixels[148, y] = c_shadow
    pixels[149, y] = c_highlight
    
    pixels[239, y] = c_highlight
    pixels[240, y] = c_shadow

# Auto-crop
bbox = img.getbbox()
if bbox:
    cropped_img = img.crop(bbox)
    cropped_img.save("public/images/phone-templates/samsung.png", "PNG")
    print("Successfully generated Samsung Ultra template with a thin 2-pixel camera bezel!")
else:
    print("Error: Bounding box is empty.")
