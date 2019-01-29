/* 
Import & config
*/
    // Nodejs
    const d3 = require('d3');
    const express = require('express');
    const d3Router = express.Router();

    // Inner
    const { csvParser, trainDataConvertor } = require('../../services/parser.serv');
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
                // Conversion CSV/JSON
                const jsonData = csvParser( req.body.input )

                // Conversion JSON/Tensorflow
                const convertedData = trainDataConvertor(jsonData);

                //=> Renvoyer le résultat
                res.json({ msg: 'Data from service', data: convertedData });
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