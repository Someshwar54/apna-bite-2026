from PIL import Image
import sys

def remove_white(img_path, out_path):
    img = Image.open(img_path).convert("RGBA")
    pixels = img.load()
    width, height = img.size
    
    # We will do a simple pass: if pixel is white or very close, make it transparent.
    # To handle anti-aliasing (fringes), if it's partially white/gray transitioning,
    # we can map luminosity to alpha. But simpler is usually better for vectors:
    for y in range(height):
        for x in range(width):
            r, g, b, a = pixels[x, y]
            # Calculate distance to pure white
            if r > 240 and g > 240 and b > 240:
                # Completely transparent
                pixels[x, y] = (r, g, b, 0)
            elif r > 200 and g > 200 and b > 200:
                # Fringing edge - Make semi-transparent relative to whiteness
                # The closer to 255, the closer alpha is to 0
                avg = (r + g + b) / 3.0
                # When avg=200, alpha=255. When avg=240, alpha=0.
                alpha = int(((240 - avg) / 40.0) * 255)
                pixels[x, y] = (r, g, b, max(0, min(255, alpha)))
                
    img.save(out_path, "PNG")
    print(f"Successfully processed {img_path} to {out_path}")

if __name__ == '__main__':
    remove_white(sys.argv[1], sys.argv[2])
