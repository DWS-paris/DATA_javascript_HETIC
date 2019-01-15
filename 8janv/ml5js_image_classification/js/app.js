// Initialize the Image Classifier method with MobileNet. A callback needs to be passed.
const classifier = ml5.imageClassifier('MobileNet', () => {
    console.log('Model is ready!')
});

/* 
Variables
*/
    let myImage = new Image();
    let myCanvas = document.createElement('canvas');
    let context = myCanvas.getContext('2d');
    let myResult = document.querySelector('#myResult');
    let resultList = document.createElement('ul');
//

/* 
Function to create image canvas
*/
    const createImageCanvas = (imgPath) => {
        // Set image
        myImage.src = imgPath;
        
        // Add image to canvas when loaded
        myImage.onload = () => {
            // Set canvas size
            myCanvas.width = myImage.width;
            myCanvas.height = myImage.height;

            // Draw image
            context.drawImage(myImage, 0, 0);
            
            // Get image classification
            classifyImage(myImage);
        };
    };
//


/* 
Function yo display prediction results
*/
    const getPredictionResult = (results) => {
        console.log(results)
        // Append canvas
        document.querySelector('#myCanvas').appendChild(myCanvas);

        // Append result
        myResult.innerHTML = `<h2>Prediction results</h2>`;
        resultList = document.createElement('ul');
        results.map( item => {
            resultList.innerHTML += `<li>${item.className} <b>Confidence : ${item.probability}</b></li>`;
        });
        myResult.appendChild(resultList)
    }
//

/* 
Functions for prediction
*/
    // Use ML5js to classify image
    const classifyImage = (img) => {
        // Specify the amount of classes you want in the result (3 by default)
        classifier.predict(img, 5, getPrediction);
    }

    // Set classification callback function
    const getPrediction = (err, results) => {
        results ? getPredictionResult(results) : console.error(err);
    };
//


/* 
Start application
*/
    document.querySelectorAll('ul img').forEach( item => {
        item.addEventListener('click', () => {
            createImageCanvas(item.getAttribute('src'));
        })
    } )
//