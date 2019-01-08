/* 
Variables
*/
    let video = document.getElementById('video');
    let arrowButton = document.querySelectorAll('nav ul:first-of-type button');
    let arrowQuantity = document.querySelectorAll('nav span');
    let myResult = document.querySelector('#myResult');
    let trainButton = document.querySelector('#trainButton');
    let predictButton = document.querySelector('#predictButton');
    let totalLoss = 0;
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
        });
    };
//

/* 
Set featureExtractor and classifier
*/
    // Initialize the Image Classifier method with MobileNet. A callback needs to be passed.
    const featureExtractor = ml5.featureExtractor('MobileNet', () => {
        console.log('Model is ready!')
    });

    // Set the amount of class
    featureExtractor.numClasses = 4;

    // Create a new classifier using those features
    const classifier = featureExtractor.classification(video, () => {
        console.log('Video is ready!')
    });
//


/* 
UI/UX
*/
    // Set direction buttons UI
    arrowButton.forEach( (item, index) => {
        item.addEventListener('click', () => {
            // Edit DOM
            arrowQuantity[index].textContent = parseInt(arrowQuantity[index].textContent) + 1;

            // Add classifier image
            classifier.addImage(item.getAttribute('direction-data'));
        })
    });

    // Set train button
    trainButton.onclick =  () => {
        classifier.train( (lossValue) => {
            if (lossValue) {
                totalLoss = lossValue;
                myResult.innerHTML = 'Loss: ' + totalLoss;
            } else {
                myResult.innerHTML = 'Done Training! Final Loss: ' + totalLoss;
            }
        });
    };

    // Set predict button
    predictButton.onclick =  () => {
        classifier.classify((err, data) => {
            // Display any error
            if (err) {
                console.error(err);
            } else{
                myResult.innerText = data;
                classifier.classify(gotResults);
            }
        });
    }

    // Show the results
    const gotResults = (err, data) => {
        // Display any error
        if (err) {
            console.error(err);
        }
        else{
            myResult.innerText = data;
            classifier.classify(gotResults);
        }
    }
//