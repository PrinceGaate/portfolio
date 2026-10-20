import urllib.request
import os

images_dir = r"w:\user\Projects\new portfolio\portfolio\src\assets\images\skills"
os.makedirs(images_dir, exist_ok=True)

skills = {
    # MongoDB
    "mongodb": "https://logo.clearbit.com/mongodb.com?size=256",
    # GitHub (Wait, clearbit might be black. Let's get the white invertocat from a reliable github repo)
    "github": "https://raw.githubusercontent.com/rdimascio/icons/master/icons/github.png",
    # FastAPI
    "fastapi": "https://raw.githubusercontent.com/devicons/devicon/master/icons/fastapi/fastapi-original.svg" # I'll see if I can find a PNG repo for FastAPI.
}

# Actually, devicon doesn't provide PNGs anymore for FastAPI. Let's find another repo for FastAPI png:
skills["fastapi"] = "https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/fastapi.png"
skills["mongodb"] = "https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/mongodb.png"

opener = urllib.request.build_opener()
opener.addheaders = [('User-Agent', 'Mozilla/5.0')]
urllib.request.install_opener(opener)

for name, url in skills.items():
    try:
        urllib.request.urlretrieve(url, os.path.join(images_dir, f"{name}.png"))
        print(f"Downloaded {name}")
    except Exception as e:
        print(f"Failed to download {name}: {e}")
