import re

def extract_selectors(file_path):
    # Read the file and extract selectors
    with open(file_path, 'r') as file:
        lines = file.readlines()

    selectors = set()
    for line in lines:
        line = line.strip()

        if not line or line.startswith('!'):
            continue

        match = re.match(r'.*##([.#]?)([\w-]+)', line)
        if match:
            prefix, name = match.groups()
            if prefix == '#':
                selectors.add(name)  # ID
            elif prefix == '.':
                selectors.add(name)  # Class

    # Exclude common terms
    selectors.difference_update({
        'MS', 'container', 'content', 'left', 'button',
        'modalContainer', 'header', 'top', 'body', 'right',
        'text', 'btn', 'article', 'buy', 'background', 'secondary', 'premium',
        'odd', 'even', 'vert', 'domain', 'post'
    })

    return selectors

def generate_js_file(selectors, output_path):
    escaped_selectors = [re.escape(selector) for selector in selectors]

    js_content = f"""// content.js
(function() {{
    const adSelectors = {escaped_selectors};

    const transformAdToPopup = (adElement) => {{
        const computedStyle = window.getComputedStyle(adElement);
        const adWidth = parseFloat(computedStyle.width.replace('px', ''));
        const adHeight = parseFloat(computedStyle.height.replace('px', ''));
        const adDisplay = computedStyle.display;

        // Check if the ad should not be transformed
        if (adDisplay === 'none' || adWidth <= 1 || adHeight <= 1) {{
            return;
        }}

        const randomSize = Math.floor(Math.random() * 351) + 150;
        const randomX = Math.floor(Math.random() * (window.innerWidth - randomSize));
        const randomY = Math.floor(Math.random() * (window.innerHeight - randomSize));
        const zIndexBase = 1000;

        const iframe = document.createElement('iframe');
        iframe.style.border = 'none';
        iframe.style.position = 'fixed';
        iframe.style.width = randomSize + 'px';
        iframe.style.height = randomSize + 'px';
        iframe.style.left = randomX + 'px';
        iframe.style.top = randomY + 'px';
        iframe.style.zIndex = zIndexBase + document.querySelectorAll('iframe').length;
        iframe.allowTransparency = 'true';

        document.body.appendChild(iframe);

        const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
        var adContent = adElement.outerHTML;
        var titleText = adElement.textContent.split(' ').slice(0, 5).join(' ');

        if(titleText == "") {{
            titleText = "Invisible Ad Tracker";
            adContent = "<img src='https://placecats.com/" + (Math.floor(Math.random() * 351) + 150) + "/" + (Math.floor(Math.random() * 351) + 150) + "/' />"
        }}

        const iframeContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <style>
                body {{ 
                    background-color: #${{Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}}; 
                    margin: 0px;
                }}
                .title-bar {{
                    align-items: center;
                    background: linear-gradient(90deg, navy, #1084d0);
                    display: flex;
                    justify-content: space-between;
                    padding: 3px 2px 3px 3px;
                    -webkit-font-smoothing: none;
                    font-family: "Pixelated MS Sans Serif", Arial;
                    font-size: 11px;
                    cursor: move; /* Indicate draggable content */
                }}
                .title-bar-text {{
                    color: #fff;
                    font-weight: 700;
                    letter-spacing: 0;
                    margin-right: 24px;
                }}
                .title-bar-controls {{
                    display: flex;
                }}
                .title-bar-controls button {{
                    display: block;
                    min-height: 14px;
                    min-width: 16px;
                    padding: 0;
                    background: silver;
                    border: none;
                    border-radius: 0;
                    box-shadow: inset -1px -1px #0a0a0a, inset 1px 1px #fff, inset -2px -2px grey, inset 2px 2px #dfdfdf;
                }}
                #minimize {{
                    background-image: url(data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%276%27%20height%3D%272%27%20fill%3D%27none%27%20xmlns%3D%27http%3A//www.w3.org/2000/svg%27%3E%3Cpath%20fill%3D%27%23000%27%20d%3D%27M0%200h6v2H0z%27/%3E%3C/svg%3E);
                    background-position: bottom 3px left 4px;
                    background-repeat: no-repeat;
                }}
                #maximize {{
                    background-image: url(data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%279%27%20height%3D%279%27%20fill%3D%27none%27%20xmlns%3D%27http%3A//www.w3.org/2000/svg%27%3E%3Cpath%20fill-rule%3D%27evenodd%27%20clip-rule%3D%27evenodd%27%20d%3D%27M9%200H0v9h9V0zM8%202H1v6h7V2z%27%20fill%3D%27%23000%27/%3E%3C/svg%3E);
                    background-position: top 2px left 3px;
                    background-repeat: no-repeat;
                }}
                #close {{
                    background-image: url(data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%278%27%20height%3D%277%27%20fill%3D%27none%27%20xmlns%3D%27http%3A//www.w3.org/2000/svg%27%3E%3Cpath%20fill-rule%3D%27evenodd%27%20clip-rule%3D%27evenodd%27%20d%3D%27M0%200h2v1h1v1h2V1h1V0h2v1H7v1H6v1H5v1h1v1h1v1h1v1H6V6H5V5H3v1H2v1H0V6h1V5h1V4h1V3H2V2H1V1H0V0z%27%20fill%3D%27%23000%27/%3E%3C/svg%3E);
                    background-position: top 3px left 4px;
                    background-repeat: no-repeat;
                }}
            </style>
        </head>
        <body>
            <div class="title-bar">
                <div class="title-bar-text">${{titleText}}</div>
                <div class="title-bar-controls">
                    <button id="minimize" aria-label="Minimize"></button>
                    <button id="maximize" aria-label="Maximize"></button>
                    <button id="close" aria-label="Close"></button>
                </div>
            </div>
            <div style="
                color: #${{Math.floor(Math.random() * 16777215).toString(16)}}; 
                font-size: ${{Math.floor(Math.random() * 10) + 12}}px; 
                font-family: ${{['Arial', 'Verdana', 'Courier New', 'Georgia', 'Times New Roman'][Math.floor(Math.random() * 5)]}}; 
                padding: 5px;">
                <div>${{adContent}}</div>
            </div>
        </body>
        </html>`;
        
        iframeDocument.open();
        iframeDocument.write(iframeContent);
        iframeDocument.close();

        adElement.style.display = 'none';

        // Function to make the iframe draggable
        const makeDraggable = (iframe) => {{
            let startX, startY, initialX, initialY;
            let document = iframe.contentDocument || iframe.contentWindow.document;

            const dragMouseDown = (event) => {{
                event.preventDefault();
                startX = event.clientX;
                startY = event.clientY;

                // Use the iframe's existing offset position
                initialX = iframe.offsetLeft;
                initialY = iframe.offsetTop;

                window.addEventListener('mousemove', elementDrag, true);
                window.addEventListener('mouseup', closeDragElement, true);
            }};

            const elementDrag = (event) => {{
                event.preventDefault();
                
                // Calculate new cursor position
                const currentX = event.clientX;
                const currentY = event.clientY;

                // Determine new position
                const deltaX = currentX - startX;
                const deltaY = currentY - startY;

                // Set the element's new position
                iframe.style.left = initialX + deltaX + 'px';
                iframe.style.top = initialY + deltaY + 'px';
            }};

            const closeDragElement = () => {{
                // Stop moving when mouse button is released
                window.removeEventListener('mousemove', elementDrag, true);
                window.removeEventListener('mouseup', closeDragElement, true);
            }};

            // Add drag event to the title bar
            document.querySelector('.title-bar').onmousedown = dragMouseDown;
        }};

        // Handlers for buttons
        iframeDocument.getElementById('minimize').onclick = (event) => {{
            event.stopPropagation(); // Ensure it doesn't propagate and trigger other actions
            iframe.style.display = 'none';
        }};

        iframeDocument.getElementById('maximize').onclick = (event) => {{
            event.stopPropagation();
            iframe.style.width = window.innerWidth + 'px';
            iframe.style.height = window.innerHeight + 'px';
            iframe.style.left = 0;
            iframe.style.top = 0;
            iframe.style.zIndex = zIndexBase + 1000;
        }};

        iframeDocument.getElementById('close').onclick = (event) => {{
            event.stopPropagation();
            iframe.remove();
        }};

        
        
        makeDraggable(iframe);
    }};
    
    document.querySelectorAll('*').forEach(element => {{
        adSelectors.forEach(selector => {{
            const regex = new RegExp("\\\\b" + selector + "\\\\b", "i");
            if (regex.test(element.id) || regex.test(element.className)) {{
                console.log('Ad detected and transformed:', element);
                transformAdToPopup(element);
                console.log(`Regex pattern matched: \\b${{selector}}\\b`);
            }}
        }});
    }});
}})();
"""

    with open(output_path, 'w') as js_file:
        js_file.write(js_content)

    print(f"Generated JavaScript file at {output_path}")

def main():
    file_path = 'patterns.txt'
    output_path = 'content.js'
    selectors = extract_selectors(file_path)
    
    if selectors:
        generate_js_file(selectors, output_path)
    else:
        print("No selectors found.")

if __name__ == "__main__":
    main()