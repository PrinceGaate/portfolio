import urllib.request
import os

images_dir = r"w:\user\Projects\new portfolio\portfolio\src\assets\images\skills"
os.makedirs(images_dir, exist_ok=True)

skills = {
    # Generic Database cylinder (transparent)
    "sql": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Database-icon.svg/640px-Database-icon.svg.png", 
    # Official MongoDB leaf logo
    "mongodb": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Antu_mongodb.svg/640px-Antu_mongodb.svg.png",
    # Official Git orange diamond logo
    "git": "https://git-scm.com/images/logos/downloads/Git-Icon-1788C.png",
    # GitHub invertocat (white) for dark backgrounds
    "github": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/GitHub_Invertocat_Logo.svg/640px-GitHub_Invertocat_Logo.svg.png",
    # FastAPI lightning logo
    "fastapi": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/FastAPI_logo.svg/640px-FastAPI_logo.svg.png"
}

opener = urllib.request.build_opener()
opener.addheaders = [('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36')]
urllib.request.install_opener(opener)

for name, url in skills.items():
    try:
        urllib.request.urlretrieve(url, os.path.join(images_dir, f"{name}.png"))
        print(f"Downloaded {name}")
    except Exception as e:
        print(f"Failed to download {name}: {e}")
