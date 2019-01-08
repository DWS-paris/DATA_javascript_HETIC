/* 
Variables
*/
    let style;
    let video = document.querySelector('#video');
    let isTransferring = false;
    let resultImg = document.createElement('img')
    let startStopBtn = document.querySelector('#startStopBtn')
    document.querySelector('#myResult').appendChild(resultImg)
//

/* 
Get navigator WebCam
*/
    // Check for navigator WebCam functions
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
        .then( (stream) => {
            video.src = window.URL.createObjectURL(stream);
            video.play();

            // Set style transfert
            style = ml5.styleTransfer('models/udnie', video, () => {
                console.log('Model Loaded');
              });
        });
    };
//

function draw(){
    // Switch between showing the raw camera or the style
    if (isTransferring) {
      image(resultImg, 0, 0, 600, 600);
    } else {
      image(video, 0, 0, 600, 600);
    }
  }


  // When we get the results, update the result image src
function gotResult(err, img) {
    resultImg.setAttribute('src', img.src);
    console.log(resultImg)

    if (isTransferring) {
        style.transfer(gotResult); 
    }
}

/* 
UI/UX
*/
    // Set start/stop buttons UI
    startStopBtn.addEventListener('click', () => {
        if (isTransferring) {
            startStopBtn.textContent = 'Start';
            // resultImg.style.display = 'none';
        } 
        else {
            startStopBtn.textContent = 'Stop';
            // Make a transfer using the video
            style.transfer(gotResult); 
        }

        isTransferring = !isTransferring;
    })
// 