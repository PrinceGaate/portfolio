import urllib.request
import os
import ssl

ssl._create_default_https_context = ssl._create_unverified_context

images_dir = r"w:\user\Projects\new portfolio\portfolio\src\assets\images\skills"
os.makedirs(images_dir, exist_ok=True)

skills = {
    "scikitlearn": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Scikit_learn_logo_small.svg/256px-Scikit_learn_logo_small.svg.png",
    "pandas": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Pandas_logo.svg/256px-Pandas_logo.svg.png",
    "numpy": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/NumPy_logo_2020.svg/256px-NumPy_logo_2020.svg.png",
    "matplotlib": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Matplotlib_icon.svg/256px-Matplotlib_icon.svg.png",
    "seaborn": "https://seaborn.pydata.org/_images/logo-mark-lightbg.png",
    "jupyter": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Jupyter_logo.svg/256px-Jupyter_logo.svg.png",
    "openai": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/OpenAI_Logo.svg/256px-OpenAI_Logo.svg.png",
    "claude": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Anthropic_logo.svg/256px-Anthropic_logo.svg.png",
    "canva": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Canva_icon_2021.svg/256px-Canva_icon_2021.svg.png"
}

opener = urllib.request.build_opener()
opener.addheaders = [('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)')]
urllib.request.install_opener(opener)

for name, url in skills.items():
    try:
        urllib.request.urlretrieve(url, os.path.join(images_dir, f"{name}.png"))
        print(f"Downloaded {name}")
    except Exception as e:
        print(f"Failed to download {name} from {url}: {e}")
