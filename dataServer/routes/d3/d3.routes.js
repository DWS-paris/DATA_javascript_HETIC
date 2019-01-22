/* 
Import & config
*/
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

            d3Router.post( '/', (req, res) => {
                res.json({ msg: 'Post data', req: req.body });
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