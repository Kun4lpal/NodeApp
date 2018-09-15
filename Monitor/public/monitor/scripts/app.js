// set up basic variables for app

var record = document.querySelector('.record');
var stop = document.querySelector('.stop');

var auth = document.querySelector('.auth');
var profile = document.querySelector('.profile');
var send = document.querySelector('.send');

var speech = document.querySelector('.speech');
var job = document.querySelector('.job');
var event = document.querySelector('.event');

var soundClips = document.querySelector('.sound-clips');
var canvas = document.querySelector('.visualizer');
var mainSection = document.querySelector('.main-controls');
var BASE64_MARKER = ';base64,';

// disable stop button while not recording

stop.disabled = true;
// visualiser setup - create web audio api context and canvas

var audioCtx = new (window.AudioContext || webkitAudioContext)();
var canvasCtx = canvas.getContext("2d");

//main block for doing the audio recording

if (navigator.mediaDevices.getUserMedia) {
  console.log('getUserMedia supported.');

  var constraints = { audio: true };
  var chunks = [];

  var onSuccess = function(stream) {
    var mediaRecorder = new MediaRecorder(stream);

    visualize(stream);


    // on click event for recording user input
    record.onclick = function() {
      mediaRecorder.start();
      console.log(mediaRecorder.state);
      console.log("recorder started");
      record.style.background = "red";

      stop.disabled = false;
      record.disabled = true;
    }

    // on stop event 
    stop.onclick = function() {
      mediaRecorder.stop();
      console.log(mediaRecorder.state);
      console.log("recorder stopped");
      record.style.background = "";
      record.style.color = "";
      // mediaRecorder.requestData();

      stop.disabled = true;
      record.disabled = false;
    }

    auth.onclick = function(e){
      
      var markers = { firstName: "Kunal", lastName: "Paliwal" };
      console.log("onclick event");

      $.ajax({        
        url: "http://localhost:8085/",        
        type: "GET",
        crossDomain: true,        
        success: function (response) {            
            $(".auth").html("Test Authentication  &#9996;");
            // alert(resp.status);
        },
        error: function (xhr, status) {            
            $(".auth").html("Test Authentication &#10006;");            
        }
    });
    }

    profile.onclick = function(e){      
      var markers = { firstName: "Kunal", lastName: "Paliwal" };
      console.log("onclick event");
      $.ajax({        
        url: "http://localhost:8085/",        
        type: "GET",
        crossDomain: true,        
        success: function (response) {            
            $(".profile").html("Test User Service  &#9996;");            
        },
        error: function (xhr, status) {
          $(".profile").html("Test User Service &#10006;");            
        }
    });
    }

    send.onclick = function(e){      
      var markers = { firstName: "Kunal", lastName: "Paliwal" };
      console.log("onclick event");
      $.ajax({        
        url: "http://localhost:8085/",        
        type: "GET",
        crossDomain: true,        
        success: function (response) {            
            $(".send").html("Test MessageService  &#9996;");            
        },
        error: function (xhr, status) {
          $(".send").html("Test MessageService &#10006;");            
        }
    });
    }

    speech.onclick = function(e){      
      var markers = { firstName: "speech", lastName: "Python" };      
      console.log("onclick event");

      $.ajax({        
        url: "http://localhost:5003/test",        
        type: "GET",
        crossDomain: true,
        data: { firstName: "Testing", lastName: "python Server" },
        dataType: "json",
        success: function (response) {
            // var resp = JSON.parse(response)
            $(".speech").html("Test Speech-to-text  &#9996;");
            // alert("Testing python service success");
        },
        error: function (xhr, status) {            
            $(".speech").html("Test Speech-to-text  &#10006;");
            // alert("Error");
        }
    });
    }  
    
    job.onclick = function(e){      
      var markers = { firstName: "Kunal", lastName: "Paliwal" };
      console.log("onclick event");
      $.ajax({        
        url: "http://localhost:3002/test",        
        type: "GET",
        crossDomain: true,        
        success: function (response) {            
            $(".job").html("Test JobListings  &#9996;");            
        },
        error: function (xhr, status) {
          $(".job").html("Test JobListings &#10006;");            
        }
    });
    }

    event.onclick = function(e){      
      var markers = { firstName: "Kunal", lastName: "Paliwal" };
      console.log("onclick event");
      $.ajax({        
        url: "http://localhost:3001/test",        
        type: "GET",
        crossDomain: true,
        // data: { firstName: "Testing", lastName: "Event Server" },
        // dataType: "json",        
        success: function (response) {            
            console.log("eventTest");            
            // var resp = JSON.parse(response)            
            $(".event").html("Test EventHosting  &#9996;");            
        },
        error: function (xhr, status) {                              
          $(".event").html("Test EventHosting &#10006;");            
        }
    });
    }  

    function convertDataURIToBinary(dataURI) {
      var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
      var base64 = dataURI.substring(base64Index);
      var raw = window.atob(base64);
      var rawLength = raw.length;
      var array = new Uint8Array(new ArrayBuffer(rawLength));
    
      for(i = 0; i < rawLength; i++) {
        array[i] = raw.charCodeAt(i);
      }
      return array;
    }


    // handle data 
    mediaRecorder.onstop = function(e) {
      console.log("data available after MediaRecorder.stop() called.");      
      var clipName = prompt('Enter a name for your sound clip?','My unnamed clip');
      console.log(clipName);
      var clipContainer = document.createElement('article');
      var clipLabel = document.createElement('p');
      var audio = document.createElement('audio');
      var deleteButton = document.createElement('button');
     
      clipContainer.classList.add('clip');
      audio.setAttribute('controls', '');
      deleteButton.textContent = 'Delete';
      deleteButton.className = 'delete';

      if(clipName === null) {
        clipLabel.textContent = 'My unnamed clip';
      } else {
        clipLabel.textContent = clipName;
      }


      // CLIP construction UI 
      clipContainer.appendChild(audio);
      clipContainer.appendChild(clipLabel);
      clipContainer.appendChild(deleteButton);
      soundClips.appendChild(clipContainer);

      audio.controls = true;

      //  THIS BLOB CONTAINS AUDIO
      var blob = new Blob(chunks, { 'type' : 'audio/ogg' });//; codecs=opus
      var form = new FormData();
      form.append('file', blob, 'filename.ogg');      
      $.ajax({
        type: 'POST',
        url: "http://localhost:5003/audio",
        data: form,
        cache: false,
        processData: false,
        contentType: false
      }).done(function(data) {
        console.log(data);
      });

      chunks = [];
      var audioURL = window.URL.createObjectURL(blob);
      audio.src = audioURL;
    
      console.log("recorder stopped");

      deleteButton.onclick = function(e) {
        evtTgt = e.target;
        evtTgt.parentNode.parentNode.removeChild(evtTgt.parentNode);
      }

      //pop up window asking for new clip
      clipLabel.onclick = function() {
        var existingName = clipLabel.textContent;
        var newClipName = prompt('Enter a new name for your sound clip?');
        if(newClipName === null) {
          clipLabel.textContent = existingName;
        } else {
          clipLabel.textContent = newClipName;
        }
      }
    }

    mediaRecorder.ondataavailable = function(e) {
      chunks.push(e.data);
    }
  }

  var onError = function(err) {
    console.log('The following error occured: ' + err);
  }

  navigator.mediaDevices.getUserMedia(constraints).then(onSuccess, onError);

} else {
   console.log('getUserMedia not supported on your browser!');
}

function visualize(stream) {
  var source = audioCtx.createMediaStreamSource(stream);

  var analyser = audioCtx.createAnalyser();
  analyser.fftSize = 2048;
  var bufferLength = analyser.frequencyBinCount;
  var dataArray = new Uint8Array(bufferLength);

  source.connect(analyser);
  //analyser.connect(audioCtx.destination);

  draw()

  function draw() {
    WIDTH = canvas.width
    HEIGHT = canvas.height;

    requestAnimationFrame(draw);

    analyser.getByteTimeDomainData(dataArray);

    canvasCtx.fillStyle = 'rgb(200, 200, 200)';
    canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

    canvasCtx.lineWidth = 2;
    canvasCtx.strokeStyle = 'rgb(0, 0, 0)';

    canvasCtx.beginPath();

    var sliceWidth = WIDTH * 1.0 / bufferLength;
    var x = 0;


    for(var i = 0; i < bufferLength; i++) {
 
      var v = dataArray[i] / 128.0;
      var y = v * HEIGHT/2;

      if(i === 0) {
        canvasCtx.moveTo(x, y);
      } else {
        canvasCtx.lineTo(x, y);
      }

      x += sliceWidth;
    }

    canvasCtx.lineTo(canvas.width, canvas.height/2);
    canvasCtx.stroke();

  }
}

window.onresize = function() {
  canvas.width = mainSection.offsetWidth;
}

window.onresize();