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
Start application 
*/
    document.addEventListener('DOMContentLoaded', () => {

    });
//