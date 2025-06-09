# server/encode_image.py
import base64

# CHANGE this to the actual file path of your image
image_path = "//Users/parakhchaudhary/InSync/code/server/IMG.JPG"

with open(image_path, "rb") as img:
    encoded = base64.b64encode(img.read()).decode("utf-8")
    print(encoded)
