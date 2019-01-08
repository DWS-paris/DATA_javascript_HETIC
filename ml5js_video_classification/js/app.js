/* 
Variables
*/
    const video = document.getElementById('video');
    let myResult = document.querySelector('#myResult');
/**/

/* 
Get WebCam with navigator
*/
    // Check for navigator WebCam functions
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // Set WebCam
        navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
            // Set WebCam
            video.srcObject = stream;
            video.play();
        })
    }
//

/* 
Set Classifier
*/
    // Add Classifier
    ml5.imageClassifier('MobileNet', video).then(classifier => loop(classifier));

    // Define classifier callback
    const loop = (classifier) => {
        classifier.predict().then(results => {
            // Append result
            myResult.innerHTML = `
                <h2>Prediction results</h2>
                <ul>
                    <li><strong>Label found:</strong><br> ${results[0].className}</li>
                    <li><strong>Confidence:</strong> ${results[0].probability.toFixed(4)}</li>
                </ul>
            `;

            // Call the loop again
            loop(classifier);
        });
    };
//