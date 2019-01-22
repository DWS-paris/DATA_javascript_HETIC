/* 
Import
- Importer tous les modules
*/
    //=> NodeJS
    require('dotenv').config();
    const express = require('express');
    const path = require('path');
    const ejs = require('ejs');
    const bodyParser = require('body-parser');

    //=> Inner
    const FrontRouterClass = require('./routes/front/front.routes');
//

/* 
Configuration
- Définition du server
*/
    const server = express();
    const port = process.env.PORT;

    class ServerClass{
        init(){
            //=> Client folder
            server.set( 'views', __dirname + '/www' );
            server.use( express.static(path.join(__dirname, 'www')) );

            //=> View engine
            server.engine( 'html', ejs.renderFile );
            server.set( 'view engine', 'html' );

            //=> Set Body-parser
            server.use( bodyParser.json( { limit: '10mb' } ) );
            server.use( bodyParser.urlencoded( { extended: true } ) );

            //=> Routers
            const frontRouter = new FrontRouterClass();
            server.use( '/', frontRouter.init() );

            //=> Start server
            this.launch();
        }

        launch(){
            server.listen( port, () => {
                console.log(`Server listening on port ${port}`);
            });
        };
    };
//

/* 
Lancer le server
*/
    new ServerClass().init();
//