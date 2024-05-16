var modal = null;
var intervalId = null;

var tempOnMouseUp = null;
var tempOnMouseDown = null;

chrome.runtime.onMessage.addListener((request) => {
  if (request.command === "start") {

    if (modal !== null) modal.style.display = 'block';
    else {
      createRightSideModal();
    }


    var focusedElement = document.activeElement;

    function appendJames() {
      tempOnMouseUp = focusedElement.onmouseup;
      tempOnMouseDown = focusedElement.onmousedown;
      focusedElement.onmousedown = function() {
        focusedElement.focus();
          down();
          return false;
        };

        focusedElement.onmouseup = function() {
          up();
          return false;
        };

        focusedElement.focus();
    }

    var audioCtx, oscillator, biquadFilter, gainNode;

    var audio_started = false;

    function init_audio () {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        oscillator = audioCtx.createOscillator();
        biquadFilter = audioCtx.createBiquadFilter();
        gainNode = audioCtx.createGain();
        biquadFilter.type = "lowpass";
        biquadFilter.frequency.setValueAtTime(600, audioCtx.currentTime);
        biquadFilter.Q.setValueAtTime(15, audioCtx.currentTime);

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(600, audioCtx.currentTime); // value in hertz

        oscillator.connect(gainNode);
        gainNode.connect(biquadFilter);
        biquadFilter.connect(audioCtx.destination);

        oscillator.start();

        gainNode.gain.value = 0;
        audio_started = true;
    }

    function checkspace () {
      if (keydown) { return; }
      var mytime = new Date().getTime();
      var diff = mytime-idletime;

      if (diff > 700) {
        if (queue.getlength() > 0) {
          submittext(queue.purge(), Math.round(effspeed));
        }
      }

      if (diff > 2*dotlength) {
        if (code[lastchar]) {
          append(code[lastchar]);
          queue.add(code[lastchar]);
        }
        else if (lastchar) {
          append("*");
          queue.add('*');
        }
        lastchar = '';
        if (time-idletime > 10*dotlength) {
          append(" ");
          queue.add(' ');
        }
      }
    }
    
    function append(what) {
      if(focusedElement.tagName.toLowerCase() == 'div' || focusedElement.tagName.toLowerCase() == 'span') {
        focusedElement.innerHTML = focusedElement.innerHTML + what;
      } else {
        focusedElement.value = focusedElement.value + what;
      }
    }

    function changespeed (a) {
      if (a) {
        dotlength -= 5;	
      }
      else {
        dotlength += 5;	
      }
      update();
    }

    function update () {
      wpm = Math.round(10*1200/dotlength)/10;
      ratio = Math.round(10*avgdash / avgdot)/10;
      effspeed = Math.round(10*3600/avgdash)/10;
    }

    function Queue () {
      this.content = '';
      this.tmp = '';
      this.add = function (chr) {
          this.content += chr;
      }
      this.getlength = function () {
          return this.content.length;
      }
      this.purge = function () {
          this.tmp = this.content;
          this.content = '';
          return this.tmp+ ' ';
      }
    }


  function submittext (text, wpm) {
  }


      var time;
      var temp;
      var lastchar = "";
      var dotlength = 120;
      var avgdot = dotlength;
      var avgdash = dotlength*3;
      var idletime = new Date().getTime();
      var keydown = 0;
      var sent = 0;
      var queue = new Queue();

      var code = new Array();
      code['.-'] = "A"; code['-...'] = "B"; code['-.-.'] = "C";
      code['-..'] = "D"; code['.'] = "E"; code['..-.'] = "F";
      code['--.'] = "G"; code['....'] = "H"; code['..'] = "I";
      code['.---'] = "J"; code['-.-'] = "K"; code['.-..'] = "L";
      code['--'] = "M"; code['-.'] = "N"; code['---'] = "O";
      code['.--.'] = "P"; code['--.-'] = "Q"; code['.-.'] = "R";
      code['...'] = "S"; code['-'] = "T"; code['..-'] = "U";
      code['...-'] = "V"; code['.--'] = "W"; code['-..-'] = "X";
      code['-.--'] = "Y"; code['--..'] = "Z"; code['.----'] = "1";
      code['..---'] = "2"; code['...--'] = "3"; code['....-'] = "4";
      code['.....'] = "5"; code['-....'] = "6"; code['--...'] = "7";
      code['---..'] = "8"; code['----.'] = "9"; code['-----'] = "0";
      code['.-.-.-'] = "."; code['..--..'] = "?"; code['---...'] = ":";
      code['-....-'] = "-"; code['-.--.-'] = ")"; code['-.--.'] = "(";
      code['.-.-.'] = "+"; code['...-.-'] = "<u>SK</u>";
      code['-.-.-'] = "<u>CT</u>"; code['.--.-.'] = "@";
      code['-..-.'] = "/";
      code['--..--'] = ",";
        code['---.'] = '&Ouml;';
        code['.-.-'] = '&Auml;';
        code['..--'] = '&Uuml;';
        code['.--.-'] = '&Aring;';
        code['........'] = '<u>ERR</u>';
        code['.-...'] = '<u>AS</u>';
        code['-...-'] = '=';

      intervalId = window.setInterval("checkspace();", 3*dotlength);


      function down () {
            if (!audio_started) {
                init_audio();
            }
        time = new Date().getTime();
        checkspace();
        keydown = 1;
            gainNode.gain.value = 0.1;
      }


      function up () {
        keydown = 0;
            gainNode.gain.value = 0.0;
        time = new Date().getTime() - time;
        if (time > dotlength) {
          element = "-";
          avgdash = (avgdash + time)/2;
        }
        else {
          element = ".";
          avgdot = (avgdot + time)/2;
        }
        lastchar += element;
        update();
        idletime = new Date().getTime();
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

      var test = document.createElement('button');
      test.id = "test";
      test.style.display = "none";
      
      var exitButton = document.createElement('button');
      exitButton.textContent = 'Exit';
      exitButton.style.width = '200px';
      exitButton.style.height = '30px';

      exitButton.onclick = () => {
        if (intervalId !== null) clearInterval(intervalId);
        intervalId = null;
        modal.style.display = 'none';     
        focusedElement.onmouseup = tempOnMouseUp;
        focusedElement.onmousedown = tempOnMouseDown;
        tempOnMouseUp = null;
        tempOnMouseDown = null;   
      };

      modal.appendChild(innerDiv);
      modal.appendChild(test);
      innerDiv.appendChild(exitButton);
      document.body.appendChild(modal);
    }

    appendJames();
  }
});