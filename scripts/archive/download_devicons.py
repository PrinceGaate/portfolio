import urllib.request
import os
import ssl
import time

ssl._create_default_https_context = ssl._create_unverified_context

images_dir = r"w:\user\Projects\new portfolio\portfolio\src\assets\images\skills"

skills = {
    "jupyter_color": "https://raw.githubusercontent.com/devicons/devicon/master/icons/jupyter/jupyter-original-wordmark.svg",
    "canva_color": "https://raw.githubusercontent.com/devicons/devicon/master/icons/canva/canva-original.svg",
}

opener = urllib.request.build_opener()
opener.addheaders = [('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36')]
urllib.request.install_opener(opener)

for name, url in skills.items():
    try:
        time.sleep(1)
        urllib.request.urlretrieve(url, os.path.join(images_dir, f"{name}.svg"))
        print(f"Downloaded {name}")
    except Exception as e:
        print(f"Failed to download {name} from {url}: {e}")
