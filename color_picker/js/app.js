/*
BrainJS NeuralNetwork
*/
    // Define NeuralNetwork
    const NeuralNetwork = new brain.NeuralNetwork();

    let myTitle = document.querySelector('h1');

    // Train NeuralNetwork
    NeuralNetwork.train([
        { input: { r: 0.62, g: 0.72, b: 0.88 }, output: { light: 1 } },
        { input: { r: 0.10, g: 0.84, b: 0.72 }, output: { light: 1 } },
        { input: { r: 0.74, g: 0.78, b: 0.86 }, output: { light: 1 } },
        { input: { r: 0.33, g: 0.24, b: 0.29 }, output: { dark: 1 } },
        { input: { r: 0.31, g: 0.35, b: 0.41 }, output: { dark: 1 } },
        {input: {r: 0.3, g: 0.28, b: 1}, output: { dark: 1 } }
    ], {
        errorThresh: 0.0001, // Niveau d'entraînement
        iterations: 30000, // Nombre de boucle pour l'entraînement
        log: true,
        logPeriod: 100
    });
//

/* 
Functions
*/
    // HEX color convertor in RGB
    const hexToRgb = (hex) => {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        let colorData = {
            r: Math.round(parseInt(result[1], 16) / 2.55) / 100,
            g: Math.round(parseInt(result[2], 16) / 2.55) / 100,
            b: Math.round(parseInt(result[3], 16) / 2.55) / 100
        }
        return result ? {
            r: Math.round(parseInt(result[1], 16) / 2.55) / 100,
            g: Math.round(parseInt(result[2], 16) / 2.55) / 100,
            b: Math.round(parseInt(result[3], 16) / 2.55) / 100
        } : null;
    }
//

/* 
Capter le changement de valmuer de l'input
*/
    document.querySelector('input').addEventListener('change', (event) => {
        // Change background color
        document.querySelector('body').style.background = event.target.value;

        // Convert HEX color in RGB
        const inputColor = hexToRgb(event.target.value);

        console.log(inputColor)

        // Check color with NeuralNetwork
        const NeuralNetworkResult = brain.likely(inputColor, NeuralNetwork);
        console.log(NeuralNetworkResult)

        NeuralNetworkResult === 'dark' ? myTitle.style.color = 'white' : myTitle.style.color = 'black';
    });
//