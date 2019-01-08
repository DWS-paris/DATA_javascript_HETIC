/* 
Initialiser ML5JS
- Utiliser le modèle MobileNet
- Ajouter une fonction  dee callback
*/
    const classifier = ml5.imageClassifier( 'MobileNet', () => {
        console.log('Le modèle est prêt !');
    });
//

/* 
Variables
*/
    // Variables globales
    let myImage = new Image();
    let myResult = document.querySelector('#myResult');
    let myList = document.querySelectorAll('li img');
    
    // Canvas
    let myCanvas = document.querySelector('#myCanvas');
    let context = myCanvas.getContext('2d');
//

/* 
Fonction pour ajouter une image dans le canvas
*/
    const createImageCanvas = imagePath => {
        // Définir l'image
        myImage.src = imagePath;

        myImage.onload = () => {
            myCanvas.width = myImage.width;
            myCanvas.height = myImage.height;
            context.drawImage(myImage, 0, 0);
        }
    };
//

/* 
Fonctions d'analyse
*/
    // Classification de l'image
    const classifyImage = img => {
        // Utilisation du modèle MobileNet
        classifier.predict( img, 5, getPrediction )
    };

    // Prédictioon
    const getPrediction = (err, results) => {
        results ? getPredictionResults(results) : console.error(err);
    }
//

/* 
Afficher les résultats dans le DOM
*/
    const getPredictionResults = (results) => {
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
Start application 
*/
    document.addEventListener('DOMContentLoaded', () => {

    });
//