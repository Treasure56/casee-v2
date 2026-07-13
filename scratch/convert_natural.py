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
                    # Erase phone body to make it transparent
                    pixels[x, y] = (0, 0, 0, 0)
                else:
                    # Keep the camera box 100% solid and natural (no erasing, no drawing borders)
                    pass

# Auto-crop to remove transparent padding
bbox = img.getbbox()
if bbox:
    cropped_img = img.crop(bbox)
    cropped_img.save("public/images/phone-templates/samsung.png", "PNG")
    print("Successfully regenerated public/images/phone-templates/samsung.png without artificial borders!")
else:
    print("Error: Bounding box is empty.")
