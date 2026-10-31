import json
import shutil
import os

os.makedirs("d:/Assignment/frontend/public/cursor", exist_ok=True)
os.makedirs("d:/Assignment/frontend/public/brand", exist_ok=True)
os.makedirs("d:/Assignment/frontend/public/media", exist_ok=True)

# Copy cursor assets
shutil.copy("d:/Assignment/scraped_assets/cursor/paw.svg", "d:/Assignment/frontend/public/cursor/paw.svg")
shutil.copy("d:/Assignment/scraped_assets/cursor/paw-press.svg", "d:/Assignment/frontend/public/cursor/paw-press.svg")

# Copy brand assets
shutil.copy("d:/Assignment/scraped_assets/brand/logo.png", "d:/Assignment/frontend/public/brand/logo.png")
shutil.copy("d:/Assignment/scraped_assets/icon.png", "d:/Assignment/frontend/public/icon.png")
shutil.copy("d:/Assignment/scraped_assets/apple-icon.png", "d:/Assignment/frontend/public/apple-icon.png")

# Copy media files to exact paths
with open("d:/Assignment/backend/data/puppies.json", "r", encoding="utf-8") as f:
    puppies = json.load(f)

source_media_dir = "d:/Assignment/scraped_data/media"

copied = 0
for p in puppies:
    for im in p.get("images", []):
        # im is e.g. /media/Z0ToauDx7Eve/5fffe4d022/b942a5_4b8cfb8204d24eadaf524332aba1dc15-mv2.webp
        clean_im = im.lstrip('/')
        # source file was saved as clean_im with / replaced by __
        src_name = clean_im.replace('/', '__')
        src_file = os.path.join(source_media_dir, src_name)
        
        target_file = os.path.join("d:/Assignment/frontend/public", clean_im)
        os.makedirs(os.path.dirname(target_file), exist_ok=True)
        if os.path.exists(src_file):
            shutil.copy(src_file, target_file)
            copied += 1

print(f"Copied {copied} media files with exact path structure!")
