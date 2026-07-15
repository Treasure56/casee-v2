import os
from PIL import Image

"""
iPhone 16 Template Compiler
Source: public/images/iphone16.png (236x407)
Non-transparent bounds: x=[31,202], y=[27,383]

Camera: diagonal dual-camera arrangement in top-left
  - Upper lens center ~(55, 55), radius ~20px
  - Lower lens center ~(75, 100), radius ~20px  
  - Flash highlight cluster around (105, 80)
  
Frame borders:
  Left:   x=31 (anti-aliased), solid from x=34
  Right:  x=201 (anti-aliased), solid up to x=199
  Top:    y=27 (anti-aliased), solid from y=30
  Bottom: y=383 (anti-aliased), solid up to y=380
"""

# Camera island: rounded square containing both lenses, flash, and surroundings
x_min_island = 33.0
x_max_island = 118.0
y_min_island = 30.0
y_max_island = 130.0
r_island = 18.0

# Case body cutout - pushed close to edges for thin, light frame (like iphone.png)
x_min_body = 33.0
x_max_body = 200.0
y_min_body = 29.0
y_max_body = 382.0
r_body = 14.0

def inside_rounded_rect(x, y, x_min, x_max, y_min, y_max, r):
    if x < x_min or x > x_max or y < y_min or y > y_max:
        return False
    
    cx_tl, cy_tl = x_min + r, y_min + r
    cx_tr, cy_tr = x_max - r, y_min + r
    cx_bl, cy_bl = x_min + r, y_max - r
    cx_br, cy_br = x_max - r, y_max - r

    if x < cx_tl and y < cy_tl:
        return (x - cx_tl)**2 + (y - cy_tl)**2 <= r**2
    if x > cx_tr and y < cy_tr:
        return (x - cx_tr)**2 + (y - cy_tr)**2 <= r**2
    if x < cx_bl and y > cy_bl:
        return (x - cx_bl)**2 + (y - cy_bl)**2 <= r**2
    if x > cx_br and y > cy_br:
        return (x - cx_br)**2 + (y - cy_br)**2 <= r**2
        
    return True

def process():
    img = Image.open("public/images/iphone16.png").convert("RGBA")
    width, height = img.size
    pixels = img.load()

    new_img = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    new_pixels = new_img.load()

    for x in range(width):
        for y in range(height):
            r, g, b, a = pixels[x, y]
            if a == 0:
                continue

            # Keep camera island pixels solid
            if inside_rounded_rect(x, y, x_min_island, x_max_island, y_min_island, y_max_island, r_island):
                new_pixels[x, y] = (r, g, b, a)
            else:
                # Inside case body = transparent (shows case color)
                if inside_rounded_rect(x, y, x_min_body, x_max_body, y_min_body, y_max_body, r_body):
                    new_pixels[x, y] = (0, 0, 0, 0)
                else:
                    # Frame border = keep original
                    new_pixels[x, y] = (r, g, b, a)

    bbox = new_img.getbbox()
    if bbox:
        cropped_img = new_img.crop(bbox)
        print(f"Cropped size: {cropped_img.size}")
        os.makedirs("public/images/phone-templates", exist_ok=True)
        cropped_img.save("public/images/phone-templates/iphone16.png", "PNG")
        print("Done! iPhone 16 template generated.")
    else:
        print("Error: Bounding box is empty.")

if __name__ == "__main__":
    process()
