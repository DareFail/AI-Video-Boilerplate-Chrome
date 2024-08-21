var modal = null;
var mediaStream = null;

var bounding_box_colors = {};

var user_confidence = 0.6;
var confidence_threshold = 0.1;
var model_name = "rock-paper-scissors-sxsw";
var model_version = 11;
var model_type = "pushups";
var video;
var video_camera;

// Pushups
var countPushup = 0;
var currentStatusPushup = "nothing"

const verifyTimesPushup = 10;
var currentVerifyPushup = 0;
var newStatusPushup = "nothing";
const shoulderOffset = 0;

// Situps
var countSitup = 0;
var currentStatusSitup = "nothing"

const verifyTimesSitup = 10;
var currentVerifySitup = 0;
var newStatusSitup = "nothing";

// Squats
var countSquat = 0;
var currentStatusSquat = "squat-up"

const verifyTimesSquat = 10;
var currentVerifySquat = 0;
var newStatusSquat = "squat-up";



var shouldMirrorVideo = true;

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

var canvas_input;
var ctx_input;

const inferEngine = new inferencejs.InferenceEngine();
var modelWorkerId = null;
const publishable_key = "ROBOFLOW";
var drawingSelected = false;

let poseLandmarker = undefined
let runningMode = "IMAGE"

let lastVideoTime = -1

const POSE_CONNECTIONS_PUSHUP = [
  {
      "start": 0,
      "end": 1
  },
  {
      "start": 0,
      "end": 2
  },
  {
      "start": 2,
      "end": 4
  },
  {
      "start": 1,
      "end": 3
  },
  {
      "start": 3,
      "end": 5
  },
  {
      "start": 0,
      "end": 6
  },
  {
      "start": 1,
      "end": 7
  },
  {
      "start": 6,
      "end": 7
  },
  {
      "start": 6,
      "end": 8
  },
  {
      "start": 7,
      "end": 8
  },
  {
      "start": 8,
      "end": 10
  },
  {
      "start": 9,
      "end": 11
  },
]


const POSE_CONNECTIONS_SITUP = [
  {
      "start": 0,
      "end": 1
  },
  {
      "start": 0,
      "end": 2
  },
  {
      "start": 1,
      "end": 3
  },
  {
      "start": 2,
      "end": 3
  },
  {
      "start": 2,
      "end": 4
  },
  {
      "start": 4,
      "end": 6
  },
  {
      "start": 3,
      "end": 5
  },
  {
      "start": 5,
      "end": 7
  },
]


const POSE_CONNECTIONS_SQUAT = [
  {
      "start": 0,
      "end": 1
  },
  {
      "start": 0,
      "end": 2
  },
  {
      "start": 1,
      "end": 3
  },
  {
      "start": 2,
      "end": 3
  },
  {
      "start": 2,
      "end": 4
  },
  {
      "start": 4,
      "end": 6
  },
  {
      "start": 6,
      "end": 8
  },
  {
      "start": 8,
      "end": 10
  },
  {
      "start": 6,
      "end": 10
  },
  {
      "start": 3,
      "end": 5
  },
  {
      "start": 5,
      "end": 7
  },
  {
      "start": 7,
      "end": 9
  },
  {
      "start": 9,
      "end": 11
  },
  {
      "start": 11,
      "end": 7
  },
]


chrome.runtime.onMessage.addListener((request) => {
  if (request.command === "start") {

    createRightSideModal();

    navigator.mediaDevices
    .getUserMedia({ 
      video: { facingMode: "user" },
      audio: false
    })
    .then(function(stream) {
      mediaStream = stream;
  
      video_camera = document.createElement("video");
      video_camera.srcObject = stream;

      video_camera.onloadedmetadata = function() {
        video_camera.play();
      }

      video = document.createElement("video");
      var canvasStream = canvas_input.captureStream(25);
      video.srcObject = canvasStream;

      video.id = "webcam";

      // hide video until the web stream is ready
      video.style.display = "none";
      video.setAttribute("playsinline", "");

      document.getElementById("result_canvas").after(video);

      video.onloadedmetadata = function() {
        video.play();
      }

      // on full load, set the video height and width
      video.onplay = function() {
        var height = video.videoHeight;
        var width = video.videoWidth;

        // scale down video by 0.75

        video.width = width;
        video.height = height;
        video.style.width = 640 + "px";
        video.style.height = 480 + "px";

        canvas.style.width = 640 + "px";
        canvas.style.height = 480 + "px";
        canvas.width = width;
        canvas.height = height;

        document.getElementById("result_canvas").style.display = "block";
      };

      ctx = canvas.getContext("2d");
      ctx_input = canvas_input.getContext("2d");
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

    function createRightSideModal() {
      modal = document.createElement('div');
      modal.setAttribute('id', 'myModal');
      modal.style.display = 'block';
      modal.style.position = 'fixed';
      modal.style.top = '0';
      modal.style.right = '0';
      modal.style.height = '100%';
      modal.style.width = '100%';
      modal.style.backgroundColor = 'rgba(0,0,0,0.5)';
      modal.style.zIndex = '1';

      innerDiv = document.createElement('div');
      innerDiv.style.textAlign = 'center';

      var inferWidgetDiv = document.createElement('div');
      inferWidgetDiv.className = 'infer-widget';
      
      canvas_input = document.createElement('canvas');
      canvas_input.id = 'input_canvas';
      canvas_input.style.display = "block";
      canvas_input.style.position = "absolute";
      canvas_input.style.zIndex = 50;
      canvas_input.width = 640;
      canvas_input.height = 480;

      inferWidgetDiv.appendChild(canvas_input);

      canvas = document.createElement('canvas');
      canvas.id = 'result_canvas';
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
      if (!modelWorkerId) {
        return requestAnimationFrame(detectFrame);
      }
    
      if (!drawingSelected) {
        if (shouldMirrorVideo) {
          ctx_input.save();
          ctx_input.scale(-1, 1);
          ctx_input.translate(-canvas_input.width, 0);
          ctx_input.drawImage(video_camera, 0, 0, canvas_input.width, canvas_input.height);
          ctx_input.restore();
        } else {
          ctx_input.drawImage(video_camera, 0, 0, canvas_input.width, canvas_input.height);
        }
      }

      if (!canvas_painted) {
        var video_start = document.getElementById("webcam");
  
        canvas.top = video_start.top;
        canvas.left = video_start.left;
        canvas.style.top = video_start.top + "px";
        canvas.style.left = video_start.left + "px";
        canvas.style.position = "absolute";
        canvas.style.zIndex = 100;
        video_start.style.display = "block";
        canvas.style.display = "absolute";
        canvas_painted = true;
      }
      requestAnimationFrame(detectFrame);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      if (video) {
  
        pose.send({image: video});
        //drawBoundingBoxes(predictions, ctx)
      }

      /*inferEngine.infer(modelWorkerId, new inferencejs.CVImage(video)).then(function(predictions) {
    
        if (!canvas_painted) {
          var video_start = document.getElementById("webcam");
    
          canvas.top = video_start.top;
          canvas.left = video_start.left;
          canvas.style.top = video_start.top + "px";
          canvas.style.left = video_start.left + "px";
          canvas.style.position = "absolute";
          canvas.style.zIndex = 100;
          video_start.style.display = "block";
          canvas.style.display = "absolute";
          canvas_painted = true;
    
          var loading = document.getElementById("loading");
          loading.style.display = "none";
          document.getElementById("videoSource").style.display = "none";
          document.getElementById("infer-widget").style.display = "block";
        }
        requestAnimationFrame(detectFrame);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    
        if (video) {
    
          //drawBoundingBoxes(predictions, ctx)
        }
      });*/
    }
    
    function drawBoundingBoxes(predictions, ctx) {


      if (model_type == "pushups") {
    
        if (runningMode === "IMAGE") {
          runningMode = "VIDEO"
          poseLandmarker.setOptions({ runningMode: "VIDEO" })
        }
        let startTimeMs = performance.now()
        if (lastVideoTime !== video.currentTime) {
          lastVideoTime = video.currentTime
          poseLandmarker.detectForVideo(video, startTimeMs, result => {
            for (const landmark of result.landmarks) {
              landmark.splice(0, 11);
              landmark.splice(6, 7);
              landmark.splice(11);
              var newLandmark = landmark;
              drawLandmarks(ctx, newLandmark)          
              
              if (currentStatusPushup != "nothing" && (newLandmark[2].y < newLandmark[0].y || newLandmark[2].y < newLandmark[1].y || newLandmark[3].y < newLandmark[0].y || newLandmark[3].y < newLandmark[1].y)) {
                drawConnectors(ctx, newLandmark, POSE_CONNECTIONS_PUSHUP, { color: "#00FF00", lineWidth: 5 })
                if (currentVerifyPushup >= verifyTimesPushup && currentStatusPushup == "push-downs") {
                  countPushup = countPushup + 1;
                  document.getElementById("pushupCount").innerHTML = countPushup;
                  currentStatusPushup = "push-ups";
                } else if(newStatusPushup == "push-ups") {
                  currentVerifyPushup = currentVerifyPushup + 1;
                } else {
                  currentVerifyPushup = 0;
                  newStatusPushup = "push-ups";
                }
              } else if (currentStatusPushup == "nothing" && (newLandmark[2].y > (newLandmark[0].y + shoulderOffset) || newLandmark[2].y > (newLandmark[1].y + shoulderOffset) || newLandmark[3].y > (newLandmark[0].y + shoulderOffset) || newLandmark[3].y > (newLandmark[1].y + shoulderOffset))) {
                drawConnectors(ctx, newLandmark, POSE_CONNECTIONS_PUSHUP, { color: "#FFFFFF", lineWidth: 5 })
                currentStatusPushup = "push-downs";
              } else {
                drawConnectors(ctx, newLandmark, POSE_CONNECTIONS_PUSHUP, { color: "#FFFFFF", lineWidth: 5 })
                if (currentVerifyPushup >= verifyTimesPushup && currentStatusPushup == "push-ups") {
                  currentStatusPushup = "push-downs";
                } else if(newStatusPushup == "push-downs") {
                  currentVerifyPushup = currentVerifyPushup + 1;
                } else {
                  currentVerifyPushup = 0;
                  newStatusPushup = "push-downs";
                }
              }
            }
          })
        }
    
        for (var i = 0; i < predictions.length && i < 1; i++) {
          var confidence = predictions[i].confidence;
      
          if (confidence < user_confidence) {
            continue;
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
          var x = prediction.bbox.x - prediction.bbox.width / 2;
          var y = prediction.bbox.y - prediction.bbox.height / 2;
          var width = prediction.bbox.width;
          var height = prediction.bbox.height;
      
          ctx.rect(x, y, width, height);
          ctx.fillStyle = "rgba(0, 0, 0, 0)";
          ctx.fill();
          ctx.fillStyle = ctx.strokeStyle;
          ctx.lineWidth = "4";
          
          ctx.strokeRect(x, y, width, height);
          
          // Text stays the same regardless of mirroring
          ctx.font = "25px Arial";
          ctx.fillText(prediction.class + " " + Math.round(confidence * 100) + "%", x, y - 10);
    
          
      
      
    
        }
      } else if (model_type == "situps") {
    
        if (runningMode === "IMAGE") {
          runningMode = "VIDEO"
          poseLandmarker.setOptions({ runningMode: "VIDEO" })
        }
        let startTimeMs = performance.now()
        if (lastVideoTime !== video.currentTime) {
          lastVideoTime = video.currentTime
          poseLandmarker.detectForVideo(video, startTimeMs, result => {
            for (const landmark of result.landmarks) {
              landmark.splice(0, 11)
              landmark.splice(2, 10);
              landmark.splice(7);
              var newLandmark = landmark;
              drawLandmarks(ctx, newLandmark)
              
              if (currentStatusSitup != "nothing" && (newLandmark[0].y < newLandmark[4].y || newLandmark[0].y < newLandmark[5].y || newLandmark[1].y < newLandmark[4].y || newLandmark[1].y < newLandmark[5].y)) {
                drawConnectors(ctx, newLandmark, POSE_CONNECTIONS_SITUP, { color: "#00FF00", lineWidth: 5 })
                if (currentVerifySitup >= verifyTimesSitup && currentStatusSitup == "sit-down") {
                  countSitup = countSitup + 1;
                  document.getElementById("situpCount").innerHTML = countSitup;
                  currentStatusSitup = "sit-up";
                } else if(newStatusSitup == "sit-up") {
                  currentVerifySitup = currentVerifySitup + 1;
                } else {
                  currentVerifySitup = 0;
                  newStatusSitup = "sit-up";
                }
              } else if (currentStatusSitup == "nothing" && (newLandmark[0].y > newLandmark[4].y || newLandmark[0].y > newLandmark[5].y || newLandmark[1].y > newLandmark[4].y || newLandmark[1].y > newLandmark[5].y)) {
                drawConnectors(ctx, newLandmark, POSE_CONNECTIONS_SITUP, { color: "#FFFFFF", lineWidth: 5 })
                currentStatusSitup = "sit-down";
              } else {
                drawConnectors(ctx, newLandmark, POSE_CONNECTIONS_SITUP, { color: "#FFFFFF", lineWidth: 5 })
                if (currentVerifySitup >= verifyTimesSitup && currentStatusSitup == "sit-up") {
                  currentStatusSitup = "sit-down";
                } else if(newStatusSitup == "sit-down") {
                  currentVerifySitup = currentVerifySitup + 1;
                } else {
                  currentVerifySitup = 0;
                  newStatusSitup = "sit-down";
                }
              }
            }
          })
        }
    
    
        let filteredPredictions = predictions.filter(prediction => prediction.class.toLowerCase().includes("sit"));
    
        for (var i = 0; i < filteredPredictions.length && i < 1; i++) {
    
          var confidence = filteredPredictions[i].confidence;
      
          if (confidence < user_confidence) {
            continue;
          }
      
          if (filteredPredictions[i].class in bounding_box_colors) {
            ctx.strokeStyle = bounding_box_colors[filteredPredictions[i].class];
          } else {
            var color =
              color_choices[Math.floor(Math.random() * color_choices.length)];
            ctx.strokeStyle = color;
            // remove color from choices
            color_choices.splice(color_choices.indexOf(color), 1);
            
            bounding_box_colors[filteredPredictions[i].class] = color;
          }
      
          var prediction = filteredPredictions[i];
          var x = prediction.bbox.x - prediction.bbox.width / 2;
          var y = prediction.bbox.y - prediction.bbox.height / 2;
          var width = prediction.bbox.width;
          var height = prediction.bbox.height;
      
          ctx.rect(x, y, width, height);
          ctx.fillStyle = "rgba(0, 0, 0, 0)";
          ctx.fill();
          ctx.fillStyle = ctx.strokeStyle;
          ctx.lineWidth = "4";
          
          ctx.strokeRect(x, y, width, height);
          
          // Text stays the same regardless of mirroring
          ctx.font = "25px Arial";
          ctx.fillText(prediction.class + " " + Math.round(confidence * 100) + "%", x, y - 10);
    
        }
    
      } else if (model_type == "squats") {
      
          if (runningMode === "IMAGE") {
            runningMode = "VIDEO"
            poseLandmarker.setOptions({ runningMode: "VIDEO" })
          }
          let startTimeMs = performance.now()
          if (lastVideoTime !== video.currentTime) {
            lastVideoTime = video.currentTime
            poseLandmarker.detectForVideo(video, startTimeMs, result => {
              for (const landmark of result.landmarks) {
                landmark.splice(0, 11)
                landmark.splice(2, 10);
                var newLandmark = landmark;
                drawLandmarks(ctx, newLandmark)
    
    
                if (newLandmark[2].y > newLandmark[4].y || newLandmark[2].y > newLandmark[5].y || newLandmark[3].y > newLandmark[4].y || newLandmark[3].y > newLandmark[5].y) {
                  drawConnectors(ctx, newLandmark, POSE_CONNECTIONS_SQUAT, { color: "#00FF00", lineWidth: 5 })
                  if (currentVerifySquat >= verifyTimesSquat && currentStatusSquat == "squat-down") {
                    countSquat = countSquat + 1;
                    document.getElementById("squatCount").innerHTML = countSquat;
                    currentStatusSquat = "squat-up";
                  } else if(newStatusSquat == "squat-up") {
                    currentVerifySquat = currentVerifySquat + 1;
                  } else {
                    currentVerifySquat = 0;
                    newStatusSquat = "squat-up";
                  }
                } else {
                  drawConnectors(ctx, newLandmark, POSE_CONNECTIONS_SQUAT, { color: "#FFFFFF", lineWidth: 5 })
                  if (currentVerifySquat >= verifyTimesSquat && currentStatusSquat == "squat-up") {
                    currentStatusSquat = "squat-down";
                  } else if(newStatusSquat == "squat-down") {
                    currentVerifySquat = currentVerifySquat + 1;
                  } else {
                    currentVerifySquat = 0;
                    newStatusSquat = "squat-down";
                  }
                }
              }
            })
          }
    
          let filteredPredictions = predictions.filter(prediction => prediction.class.toLowerCase().includes("squat"));
    
          for (var i = 0; i < filteredPredictions.length && i < 1; i++) {
            var confidence = filteredPredictions[i].confidence;
        
            if (confidence < user_confidence) {
              continue;
            }
        
            if (filteredPredictions[i].class in bounding_box_colors) {
              ctx.strokeStyle = bounding_box_colors[filteredPredictions[i].class];
            } else {
              var color =
                color_choices[Math.floor(Math.random() * color_choices.length)];
              ctx.strokeStyle = color;
              // remove color from choices
              color_choices.splice(color_choices.indexOf(color), 1);
              
              bounding_box_colors[filteredPredictions[i].class] = color;
            }
        
            var prediction = filteredPredictions[i];
            var x = prediction.bbox.x - prediction.bbox.width / 2;
            var y = prediction.bbox.y - prediction.bbox.height / 2;
            var width = prediction.bbox.width;
            var height = prediction.bbox.height;
        
            ctx.rect(x, y, width, height);
            ctx.fillStyle = "rgba(0, 0, 0, 0)";
            ctx.fill();
            ctx.fillStyle = ctx.strokeStyle;
            ctx.lineWidth = "4";
            
            ctx.strokeRect(x, y, width, height);
            
            // Text stays the same regardless of mirroring
            ctx.font = "25px Arial";
            ctx.fillText(prediction.class + " " + Math.round(confidence * 100) + "%", x, y - 10);
        }
    
      }
    
    }

    function changeModel(modelName) {

      if (modelName == "pushup") {
        model_type = "pushups";
        document.getElementById("pushupCountContainer").style.display = "block";
        document.getElementById("situpCountContainer").style.display = "none";
        document.getElementById("squatCountContainer").style.display = "none";
        model_name = "push-up-ditection";
        model_version = 3;
      } else if (modelName == "situp") {
        model_type = "situps";
        document.getElementById("pushupCountContainer").style.display = "none";
        document.getElementById("situpCountContainer").style.display = "block";
        document.getElementById("squatCountContainer").style.display = "none";
        model_name = "p-s-s";
        model_version = 1;
      } else if (modelName == "squat") {
        model_type = "squats";
        document.getElementById("pushupCountContainer").style.display = "none";
        document.getElementById("situpCountContainer").style.display = "none";
        document.getElementById("squatCountContainer").style.display = "block";
        model_name = "p-s-s";
        model_version = 1;
        
      }
    
    }

    function onResultsPose(results) {
      document.body.classList.add('loaded');
      fpsControl.tick();
    
      canvasCtx5.save();
      canvasCtx5.clearRect(0, 0, out5.width, out5.height);
      canvasCtx5.drawImage(
          results.image, 0, 0, out5.width, out5.height);
      drawConnectors(
          canvasCtx5, results.poseLandmarks, POSE_CONNECTIONS, {
            color: (data) => {
              const x0 = out5.width * data.from.x;
              const y0 = out5.height * data.from.y;
              const x1 = out5.width * data.to.x;
              const y1 = out5.height * data.to.y;
    
              const z0 = clamp(data.from.z + 0.5, 0, 1);
              const z1 = clamp(data.to.z + 0.5, 0, 1);
    
              const gradient = canvasCtx5.createLinearGradient(x0, y0, x1, y1);
              gradient.addColorStop(
                  0, `rgba(0, ${255 * z0}, ${255 * (1 - z0)}, 1)`);
              gradient.addColorStop(
                  1.0, `rgba(0, ${255 * z1}, ${255 * (1 - z1)}, 1)`);
              return gradient;
            }
          });
      drawLandmarks(
          canvasCtx5,
          Object.values(POSE_LANDMARKS_LEFT)
              .map(index => results.poseLandmarks[index]),
          {color: zColor, fillColor: '#FF0000'});
      drawLandmarks(
          canvasCtx5,
          Object.values(POSE_LANDMARKS_RIGHT)
              .map(index => results.poseLandmarks[index]),
          {color: zColor, fillColor: '#00FF00'});
      drawLandmarks(
          canvasCtx5,
          Object.values(POSE_LANDMARKS_NEUTRAL)
              .map(index => results.poseLandmarks[index]),
          {color: zColor, fillColor: '#AAAAAA'});
      canvasCtx5.restore();
    }

    /*const pose = new Pose({locateFile: (file) => {
      return `./mediapipe/pose/${file}`;
    }});
    pose.onResults(onResultsPose);*/
  }
});
