from PIL import Image

# Open the raw Samsung Ultra image
img = Image.open("public/images/samsungs_ultra.png").convert("RGBA")
width, height = img.size
pixels = img.load()

# Bounding box of the phone is (143, 31, 357, 468)
# Camera lenses box is: x from 147 to 248 (reduced right boundary to 248), y from 35 to 196
for x in range(width):
    for y in range(height):
        if 143 <= x <= 357 and 31 <= y <= 468:
            is_border = (x < 147 or x > 353 or y < 35 or y > 464)
            
            if not is_border:
                is_camera_box = (147 <= x <= 248 and 35 <= y <= 196)
                
                if not is_camera_box:
                    pixels[x, y] = (0, 0, 0, 0)

# Step 2: Draw the aligned thin 2-pixel camera bezel
c_shadow = (25, 25, 27, 255)
c_highlight = (70, 70, 72, 255)

# Horizontal borders (top: 35-36, bottom: 195-196)
for x in range(147, 249):
    pixels[x, 35] = c_shadow
    pixels[x, 36] = c_highlight
    
    pixels[x, 195] = c_highlight
    pixels[x, 196] = c_shadow

# Vertical borders (left: 147-148, right: 247-248)
for y in range(35, 197):
    pixels[147, y] = c_shadow
    pixels[148, y] = c_highlight
    
    pixels[247, y] = c_highlight
    pixels[248, y] = c_shadow

# Auto-crop
bbox = img.getbbox()
if bbox:
    cropped_img = img.crop(bbox)
    cropped_img.save("public/images/phone-templates/samsung.png", "PNG")
    print("Successfully generated Samsung Ultra template with optimized right camera boundary!")
else:
    print("Error: Bounding box is empty.")
