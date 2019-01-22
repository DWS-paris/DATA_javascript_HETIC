/* 
Import & config
*/
    const d3 = require('d3');
    const express = require('express');
    const d3Router = express.Router();
//

/* 
Definition
*/
    class D3RouterClass{
        constructor(){}

        routes(){
            d3Router.get( '/', (req, res) => {
                res.json({ msg: 'Hello D3 API' });
            });

            d3Router.post( '/convert', (req, res) => {
                //=> Converttir un CSV en JSON avec D3js
                let jsonData = d3.csvParse( req.body.input );

                //=> Regex to check numeric value
                const regexNumeric = /(\d+(\.\d+)?)/;

                const regexDate = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;

                //=> Faire une boucle sur la collection de données
                for( let i = 0; i < jsonData.length; i++ ){
                    console.log( jsonData[i] )

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

                res.json({ msg: 'Post data', data: jsonData });
            });
        };

        init(){
            this.routes();
            return d3Router
        };
    }
//

/* 
Export
*/
    module.exports = D3RouterClass;
//