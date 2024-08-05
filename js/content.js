var modal = null;
var mediaStream = null;

var bounding_box_colors = {};

var user_confidence = 0.6;
var confidence_threshold = 0.1;
var model_name = "gaze";
var model_version = 1;

var lastX = 0;
var lastY = 0;

var shouldMirrorVideo = true;
var filterStrength = 0.91;
var sensitivity = 25;
var verticalOffset = -1;
var dotSize = 5;

// Update the colors in this list to set the bounding box colors
var color_choices = [
  "#C7FC00",
  "#FF00FF",
  "#8622FF",
  "#FE0056",
  "#00FFCE",
  "#FF8000",
  "#00B7EB",
  "#FFFF00",
  "#0E7AFE",
  "#FFABAB",
  "#0000FF",
  "#CCCCCC",
];

var canvas_painted = false;
var canvas;
var ctx;

const inferEngine = new inferencejs.InferenceEngine();
var modelWorkerId = null;
var publishable_key = "rf_l8GLzZgLQL6gZLAin1iU";



chrome.runtime.onMessage.addListener((request) => {
  if (request.command === "start") {

    if (modal !== null) {
      modal.style.display = 'block';
      modal.style.visibility = "visible";
    }
    else {
      createRightSideModal();

      canvas = document.getElementById("video_canvas");
      ctx= canvas.getContext("2d");


      var focusedElement = document.activeElement;

      navigator.mediaDevices
      .getUserMedia({ 
        video: { facingMode: "environment" },
        audio: false
      })
      .then(function(stream) {
        mediaStream = stream;
        console.log('success');
    
        video = document.createElement("video");
        video.srcObject = stream;
        video.id = "webcam";

        // hide video until the web stream is ready
        video.style.display = "none";
        video.setAttribute("playsinline", "");

        document.getElementById("video_canvas").after(video);

        video.onloadedmetadata = function() {
          video.play();
        }

        // on full load, set the video height and width
        video.onplay = function() {
          height = video.videoHeight;
          width = video.videoWidth;

          // scale down video by 0.75

          video.width = width;
          video.height = height;
          video.style.width = 640 + "px";
          video.style.height = 480 + "px";

          canvas.style.width = 640 + "px";
          canvas.style.height = 480 + "px";
          canvas.width = width;
          canvas.height = height;

          document.getElementById("video_canvas").style.display = "block";
        };

        ctx.scale(1, 1);

        // Load the Roboflow model using the publishable_key set in index.html
        // and the model name and version set at the top of this file
        inferEngine.startWorker(model_name, model_version, publishable_key, [{ scoreThreshold: confidence_threshold }])
          .then((id) => {
            modelWorkerId = id;
            // Start inference
            detectFrame();
          });
        
      })
      .catch(function(err) {
        console.log(err);
      });
    }


    


    function createRightSideModal() {
      modal = document.createElement('div');
      modal.setAttribute('id', 'myModal');
      modal.style.display = 'block';
      modal.style.position = 'fixed';
      modal.style.top = '0';
      modal.style.right = '0';
      modal.style.height = '100%';
      modal.style.backgroundColor = 'rgba(0,0,0,0.5)';
      modal.style.zIndex = '1';

      innerDiv = document.createElement('div');
      innerDiv.style.textAlign = 'center';

      var inferWidgetDiv = document.createElement('div');
      inferWidgetDiv.className = 'infer-widget';
      
      var canvas = document.createElement('canvas');
      canvas.id = 'video_canvas';
      canvas.width = 640;
      canvas.height = 480;
      
      inferWidgetDiv.appendChild(canvas);

      var hideButton = document.createElement('button');
      hideButton.textContent = 'Hide';
      hideButton.style.width = '200px';
      hideButton.style.height = '30px';
      hideButton.style.marginTop = "20px";
      hideButton.style.background = 'white';
      hideButton.style.color = 'black';

      hideButton.onclick = () => {
        modal.style.visibility = "hidden";
      };
      
      
      var exitButton = document.createElement('button');
      exitButton.textContent = 'Exit';
      exitButton.style.width = '200px';
      exitButton.style.height = '30px';
      exitButton.style.marginTop = "40px";
      exitButton.style.background = 'white';
      exitButton.style.color = 'black';

      exitButton.onclick = () => {
        if (mediaStream) {
            mediaStream.getTracks().forEach(track => track.stop());
            mediaStream = null;
        }
        modal.style.display = 'none';   
        //document.body.style.filter = 'blur(0px)';
        var element = document.getElementById("coverDiv");
        element.parentNode.removeChild(element);

        chrome.runtime.sendMessage({command: "unmuteTab"});
 
         
      };

      modal.appendChild(innerDiv);
      innerDiv.appendChild(inferWidgetDiv);
      innerDiv.appendChild(hideButton);
      innerDiv.appendChild(exitButton);
      document.body.appendChild(modal);
    }

    function detectFrame() {
      // On first run, initialize a canvas
      // On all runs, run inference using a video frame
      // For each video frame, draw bounding boxes on the canvas
      if (!modelWorkerId) return requestAnimationFrame(detectFrame);
    
      inferEngine.infer(modelWorkerId, new inferencejs.CVImage(video)).then(function(predictions) {
    
        if (!canvas_painted) {
          var video_start = document.getElementById("webcam");
    
          canvas.top = video_start.top;
          canvas.left = video_start.left;
          canvas.style.top = video_start.top + "px";
          canvas.style.left = video_start.left + "px";
          canvas.style.position = "absolute";
          video_start.style.display = "block";
          canvas.style.display = "absolute";
          canvas_painted = true;
    
        }
        requestAnimationFrame(detectFrame);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    
        if (shouldMirrorVideo) {
          ctx.save();  // save the current state
          ctx.scale(-1, 1); // flip x axis
          ctx.translate(-video.width, 0); // translate the x axis
          ctx.drawImage(video, 0, 0); 
          ctx.restore();
        }
    
        if (video) {
    
          drawBoundingBoxes(predictions, ctx)
        }
      });
    }
    
    function drawBoundingBoxes(predictions, ctx) {
      for (var i = 0; i < predictions.length; i++) {
        var confidence = predictions[i].confidence;
    
        //console.log(user_confidence)
    
        if (confidence < user_confidence) {
          continue
        }
    
        if (predictions[i].class in bounding_box_colors) {
          ctx.strokeStyle = bounding_box_colors[predictions[i].class];
        } else {
          var color =
            color_choices[Math.floor(Math.random() * color_choices.length)];
          ctx.strokeStyle = color;
          // remove color from choices
          color_choices.splice(color_choices.indexOf(color), 1);
    
          bounding_box_colors[predictions[i].class] = color;
        }
    
        var prediction = predictions[i];
    
        var gazeCoords = estimateCanvasCoordinates(prediction.leftEye.x, prediction.leftEye.y, prediction.pitch, prediction.yaw)
    
        if (gazeCoords == "NONE") {
          //document.body.style.filter = 'blur(20px)';

          var coverDiv = document.getElementById("coverDiv");
          if(coverDiv) {
            coverDiv.style.display = 'block';
          } else {
            var div = document.createElement("div");
            div.id = "coverDiv";
            var img = document.createElement("img");
            img.src = chrome.runtime.getURL("media/excel.png");

            // set the image styles including width and height
            img.style.width = "100%";
            img.style.height = "100%";
            img.style.position = "fixed";
            // set position of the image in the div
            img.style.left = "0";
            img.style.top = "0";
            img.style.zIndex = "9999";

            // add image as a child to div
            div.appendChild(img);

            // add div as a child to body
            document.body.appendChild(div);
          }

          chrome.runtime.sendMessage({command: "muteTab"});

          const audios = document.getElementsByTagName('audio');
          for (let i = 0; i < audios.length; i++) {
            if (!audios[i].paused) {
              audios[i].pause();
            }
          }
       
          const videos = document.getElementsByTagName('video');
          for (let i = 0; i < videos.length; i++) {
            if (!videos[i].paused && videos[i].id != "webcam") {
              videos[i].pause();
            }
          }
        }
        else {
          ctx.beginPath();
          ctx.arc(gazeCoords.x, gazeCoords.y, dotSize, 0, 2 * Math.PI, false);
          ctx.fillStyle = 'red';
          ctx.fill();
          ctx.lineWidth = 1;
          ctx.strokeStyle = 'red';
          ctx.stroke();

          //document.body.style.filter = 'blur(0px)';
          var coverDiv = document.getElementById("coverDiv");
          if(coverDiv) {
            coverDiv.style.display = 'none';
          }


          chrome.runtime.sendMessage({command: "unmuteTab"});

          const audios = document.getElementsByTagName('audio');
          for (let i = 0; i < audios.length; i++) {
            if (audios[i].paused) {
              audios[i].play();
            }
          }
       
          const videos = document.getElementsByTagName('video');
          for (let i = 0; i < videos.length; i++) {
            if (videos[i].paused && videos[i].id != "webcam") {
              videos[i].play();
            }
          }
    
        }
    
      }
    }

    function estimateCanvasCoordinates(eyeX, eyeY, pitch, yaw) {

      var canvas = document.getElementById("video_canvas");
      var canvasHeight = canvas.offsetHeight;
      var canvasWidth = canvas.offsetWidth;
    
      if (verticalOffset == -1) {
        verticalOffset = eyeY * canvasHeight;
        //document.getElementById("verticalOffset").value = verticalOffset;
      }
      // Adjust pitch and yaw based on sensitivity
      pitch *= sensitivity;
      yaw *= sensitivity;
      
      // Map adjusted pitch and yaw to coordinates
      var canvasX = (yaw / Math.PI / 2 + 0.5) * canvasWidth;
      var canvasY = (-pitch / Math.PI / 2 + 0.5) * canvasHeight - verticalOffset;
    
      // Apply simple filter to smooth out jitter
      canvasX = lastX * filterStrength + (1 - filterStrength) * canvasX;
      canvasY = lastY * filterStrength + (1 - filterStrength) * canvasY;
      
      // Save the current coordinates for the next frame
      lastX = canvasX;
      lastY = canvasY;
      
      if (canvasX > canvasWidth) {
        lastX = canvasWidth + 10;
        return "NONE";
      }
      else if (canvasX < 0) {
        lastX = -10;
        return "NONE";
      }
      else if (canvasY > canvasHeight) {
        lastY = canvasHeight + 10;
        return "NONE";
      }
      else if (canvasY < 0) {
        lastY = -10;
        return "NONE";
      }
    
      return {x: canvasX, y: canvasY};
    }

  }
});


function changeMirror () {
  //shouldMirrorVideo = document.getElementById("mirror").checked;
}



