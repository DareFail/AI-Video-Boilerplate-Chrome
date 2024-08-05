# AI-video-boilerplate-chrome

  This is a completely free Live AI Video Chrome Extension Boilerplate for you to play with.  

There are more live video boilerplates at: [https://github.com/DareFail/AI-Video-Boilerplate-Simple](https://github.com/DareFail/AI-Video-Boilerplate-Simple)


## Features

-  **Frontend**: Plain Javascript

-  **Live Video**: From your webcam, desktop, browser tab, or a local .mp4 or .mov file

-  **AI Vision**: Integrated with Roboflow (sponsored project)

  

## Getting Started

  
This is a template for Chrome Extensions that uses live AI video on your webcam, desktop, and browser tabs.
  

### Prerequisites

  

1. Get a free API key from [Roboflow](https://roboflow.com/) to use their vision models.

2. Replace "ROBOFLOW_API_KEY" in content.js

```

publishable_key="YOUR_ROBOFLOW_KEY_HERE"

```

### Installation

1. Go to the url: chrome://extensions/

   <img width="169" alt="url" src="https://github.com/user-attachments/assets/6665cc6e-0434-409a-95c7-212f9be1cc9f">


3. Turn on developer mode

   <img width="171" alt="developermode" src="https://github.com/user-attachments/assets/6f26110b-2990-4faa-9a79-2da5594d6e50">


5. Load unpacked

   <img width="154" alt="loadunpacked" src="https://github.com/user-attachments/assets/8db2dec6-46ed-49e4-8534-5816de93ba2b">


7. Open a new tab

  

### Deployment to Chrome

If you to submit this as a public chrome extension in the store:

1. Add a ROBOFLOW_API_KEY in content.js

2. Generate Icons for Chrome Extension
 - Put in a 128x128 image in the images folder and call it icon128.png

- Run Python
```
python3 -m venv .venv
source .venv/bin/activate
pip install Pillow 
python3 generateIcons.py images/icon128.png
```

- Then put all images in the images folder.

  

## Included Templates

Privasee: Pauses, mutes, and blurs any media when you look away.
- How to use: On any tab, right click "Priva-see"


## Acknowledgements

  

- Thanks to Roboflow for sponsoring this project. Get your free API key at: [Roboflow](https://roboflow.com/)

  

## License
  

Distributed under the APACHE 2.0 License. See `LICENSE` for more information.

  

## Contact (feel free to ask questions!)

  

Twitter: [@darefailed](https://twitter.com/darefailed)

  

Youtube: [How to Video coming soon](https://www.youtube.com/@darefail)

  

Project Link: [https://github.com/DareFail/AI-Video-Boilerplate-Simple](https://github.com/DareFail/AI-Video-Boilerplate-Simple)
