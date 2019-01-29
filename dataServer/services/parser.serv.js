/* 
Imports
*/
    //=> Conversion
    const d3 = require('d3');
//


/* 
Configuration
*/
    const csvParser = ( cvsData ) => {
        //=> Converttir un CSV en JSON avec D3js
        let jsonData = d3.csvParse( cvsData );

        //=> Regex to check numeric value
        const regexNumeric = /(\d+(\.\d+)?)/;

        const regexDate = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;

        //=> Faire une boucle sur la collection de données
        for( let i = 0; i < jsonData.length; i++ ){

            let item = jsonData[i] ;
            
            //=> Boucle sur un objet
            for( let prop in item ){
                //=> Vérifier les valeurs numériques
                if( regexNumeric.test(item[prop]) && !regexDate.test(item[prop])){
                    item[prop] = +item[prop];
                }
                else if( regexDate.test(item[prop]) ){
                    item[prop] = new Date(item[prop]);
                }
            }
        }
        // Renvoyer les données
        return jsonData;
    }

    const trainDataConvertor = (data) => {
        // Déclaration
        let convertedData = [];
        let outputs = [];

        // Configurer le tableau des output
        for( let item of data ){
            outputs.indexOf( item.output ) === -1 ? outputs.push(item.output) : null;
        };

        // Convertir la data pour Tensorflow
        for( let item of data ){
            // Créer un objet vide
            let converted = {
                input: [],
                output: []
            };

            // Boucle sur l'objet item
            for( let prop in item ){
                prop !== 'output' ? converted.input.push( item[prop] ) : null;
            }

            // Définition de la valeur de l'output
            for( let value of outputs ){
                value === item.output ? converted.output.push(1) : converted.output.push(0);
            }

            // Ajouter l'obbjet dans la collection convertedData
            convertedData.push(converted);
        }

        // Renvoyer le résultat
        return convertedData;
    }
//

/* 
Export
*/
    module.exports = {
        csvParser,
        trainDataConvertor
    }
//