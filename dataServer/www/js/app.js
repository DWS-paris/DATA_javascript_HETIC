/* 
Attendre le chargement du DOM
*/
    document.addEventListener('DOMContentLoaded', () => {
        //=> Sélection le formulaire et le placer dans une constante
        const fromConverter = document.querySelector('#fromConverter form');
        const rawData = document.querySelector('#rawData');

        // Capter la soumission (event) du formulaire
        fromConverter.addEventListener( 'submit', (event) => {
            event.preventDefault();

            const header = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body:  JSON.stringify({ input: rawData.value })
            }

            if( rawData.value.length !== 0 ){
                fetch( 'http://localhost:9876/api/d3/convert', header )
                .then( data => { 
                    return data.json()
                })
                .then( jsonData => {
                    rawData.value = JSON.stringify(jsonData)
                })
                .catch( err => console.error(err) );
            }
        })
    });
//