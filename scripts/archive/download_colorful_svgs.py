import urllib.request
import os
import ssl

ssl._create_default_https_context = ssl._create_unverified_context

images_dir = r"w:\user\Projects\new portfolio\portfolio\src\assets\images\skills"
os.makedirs(images_dir, exist_ok=True)

skills = {
    "scikitlearn": "https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg",
    "pandas": "https://upload.wikimedia.org/wikipedia/commons/e/ed/Pandas_logo.svg",
    "numpy": "https://upload.wikimedia.org/wikipedia/commons/3/31/NumPy_logo_2020.svg",
    "matplotlib": "https://upload.wikimedia.org/wikipedia/commons/8/84/Matplotlib_icon.svg",
    "seaborn": "https://raw.githubusercontent.com/mwaskom/seaborn/master/doc/_static/logo-mark-lightbg.svg",
    "jupyter": "https://upload.wikimedia.org/wikipedia/commons/3/38/Jupyter_logo.svg",
    "openai": "https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg",
    "claude": "https://upload.wikimedia.org/wikipedia/commons/c/c5/Claude_AI_logo.svg",
    "canva": "https://upload.wikimedia.org/wikipedia/commons/0/08/Canva_icon_2021.svg"
}

opener = urllib.request.build_opener()
opener.addheaders = [('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)')]
urllib.request.install_opener(opener)

for name, url in skills.items():
    try:
        urllib.request.urlretrieve(url, os.path.join(images_dir, f"{name}_color.svg"))
        print(f"Downloaded {name}")
    except Exception as e:
        print(f"Failed to download {name} from {url}: {e}")
