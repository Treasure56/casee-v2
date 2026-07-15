import os
import math
from PIL import Image

# Camera island parameters (keeps the smooth second-step glass border)
x_min_island = 23.0
x_max_island = 198.0
y_min_island = 14.0
y_max_island = 117.0
r_island = 16.0

# Case body cutout pushed very close to outer edges for a thin, light frame
x_min_body = 21.0
x_max_body = 209.0
y_min_body = 9.0
y_max_body = 408.0
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
    img = Image.open("public/images/iphone17pro.png").convert("RGBA")
    width, height = img.size
    pixels = img.load()

    new_img = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    new_pixels = new_img.load()

    for x in range(width):
        for y in range(height):
            r, g, b, a = pixels[x, y]
            if a == 0:
                continue

            if inside_rounded_rect(x, y, x_min_island, x_max_island, y_min_island, y_max_island, r_island):
                new_pixels[x, y] = (r, g, b, a)
            else:
                if inside_rounded_rect(x, y, x_min_body, x_max_body, y_min_body, y_max_body, r_body):
                    new_pixels[x, y] = (0, 0, 0, 0)
                else:
                    new_pixels[x, y] = (r, g, b, a)

    bbox = new_img.getbbox()
    if bbox:
        cropped_img = new_img.crop(bbox)
        print(f"Cropped size: {cropped_img.size}")
        os.makedirs("public/images/phone-templates", exist_ok=True)
        cropped_img.save("public/images/phone-templates/iphone17pro.png", "PNG")
        print("Done!")
    else:
        print("Error: Bounding box is empty.")

if __name__ == "__main__":
    process()
