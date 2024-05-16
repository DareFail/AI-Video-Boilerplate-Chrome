let intervalId = null;
var modal = null;

chrome.runtime.onMessage.addListener((request) => {
  if (request.command === "start") {
    if (intervalId !== null) return;

    let body = document.querySelector('body');
    var focusedElement = document.activeElement;

    function appendJames() {
      if(focusedElement.tagName.toLowerCase() == 'div' || focusedElement.tagName.toLowerCase() == 'span') {
        focusedElement.innerHTML = focusedElement.innerHTML + " James";
      } else {
        focusedElement.value = focusedElement.value + " James";
      }
    }    

    function createRightSideModal() {
        modal = document.createElement('div');
        modal.setAttribute('id', 'myModal');
        modal.style.display = 'block';
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.right = '0';
        modal.style.width = '300px';
        modal.style.height = '100%';
        modal.style.backgroundColor = 'rgba(0,0,0,0.5)';
        modal.style.zIndex = '1';

        innerDiv = document.createElement('div');
        innerDiv.style.textAlign = 'center';
        innerDiv.style.marginTop = '40px';
        
        var exitButton = document.createElement('button');
        exitButton.textContent = 'Exit';
        exitButton.style.width = '200px';
        exitButton.style.height = '30px';
        exitButton.style.right = '0';
      
        exitButton.onclick = () => {
          modal.style.display = 'none';
          if (intervalId !== null) clearInterval(intervalId);
          intervalId = null;
        };

        modal.appendChild(innerDiv);
        innerDiv.appendChild(exitButton);
        document.body.appendChild(modal);
    }

    intervalId = setInterval(appendJames, 1000);

    if (modal !== null) modal.style.display = 'block';
    else {
      createRightSideModal();
    }
  }
});