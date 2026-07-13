from PIL import Image

# Load the raw Pixel image
img = Image.open("public/images/pixel.png").convert("RGBA")
width, height = img.size
pixels = img.load()

# We want to clear the case body area.
# In pixel.png (375x666):
# The camera visor is roughly at y coordinates between 75 and 185.
# Everything below y = 185 and above y = 75 is the case body, except the camera visor itself.
# We want to make the grey backplate area (which has colors near 66,66,66) completely transparent.

for x in range(width):
    for y in range(height):
        r, g, b, a = pixels[x, y]
        
        # If it's part of the case body (anything greyish)
        # We will erase all grey/silver body colors (R, G, B between 30 and 220) 
        # that are outside the camera visor region (visor is y between 80 and 180)
        is_visor_y = (80 <= y <= 180)
        
        if a > 0:
            # Erase body area
            if not is_visor_y:
                if 25 <= r <= 220 and 25 <= g <= 220 and 25 <= b <= 220:
                    pixels[x, y] = (0, 0, 0, 0) # Make completely transparent
            else:
                # Inside visor Y range, erase the grey phone body around the visor bar
                # The visor bar is in the middle of the X range. The sides are phone body.
                # Visor bar is roughly between x = 40 and x = 335
                is_outside_visor_x = (x < 36 or x > 338)
                if is_outside_visor_x:
                    if 25 <= r <= 220 and 25 <= g <= 220 and 25 <= b <= 220:
                        pixels[x, y] = (0, 0, 0, 0)

# Save the clean transparent template
img.save("public/images/phone-templates/pixel.png", "PNG")
print("Clean, transparent body Google Pixel template successfully generated!")
