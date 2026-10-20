import urllib.request
import os

images_dir = r"w:\user\Projects\new portfolio\portfolio\src\assets\images\skills"

skills = {
    "scikitlearn": "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/scikitlearn.svg",
    "openai": "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/openai.svg"
}

opener = urllib.request.build_opener()
opener.addheaders = [('User-Agent', 'Mozilla/5.0')]
urllib.request.install_opener(opener)

for name, url in skills.items():
    try:
        urllib.request.urlretrieve(url, os.path.join(images_dir, f"{name}.svg"))
        print(f"Downloaded {name}")
    except Exception as e:
        print(f"Failed to download {name}: {e}")
