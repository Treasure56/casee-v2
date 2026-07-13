from PIL import Image

# Open the user's raw template image
img = Image.open("public/images/pixel.png")
width, height = img.size

print(f"Image dimensions: {width}x{height}")

# Sample a few pixels to find the background and phone case body colors
print("Sample pixel colors:")
print(f"Top-Left corner (background): {img.getpixel((10, 10))}")
print(f"Center (case body): {img.getpixel((width // 2, height // 2))}")
print(f"Camera visor (approximate): {img.getpixel((width // 2, int(height * 0.2)))}")
print(f"Phone border (edge): {img.getpixel((5, height // 2))}")
