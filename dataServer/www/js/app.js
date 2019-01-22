/* 
Wait for DOM content
*/
    document.addEventListener('DOMContentLoaded', () => {
        /* 
        Variables
        */
            const fromConverter = document.querySelector('#fromConverter form');
            const fromSaver = document.querySelector('#fromSaver form');
            const fromRawData = document.querySelector('[name="rawData"]');
            const fromJsonData = document.querySelector('[name="jsonData"]');
        //

        /* 
        Functions
        */
            //=> Function to get form submission by user
            const getFormSubmission = () => {
                //=> Convert form
                fromConverter.addEventListener('submit', event => {
                    //=> Stop submit event
                    event.preventDefault();
                    //=> Check textarea content
                    if(fromRawData.value.length > 0){
                        asyncFetch("http://localhost:9856/api/d3/csv-to-json", 'POST', { input: fromRawData.value })
                    }
                });

                //=> Save form
                fromSaver.addEventListener('submit', event => {
                    //=> Stop submit event
                    event.preventDefault();
                    //=> Check textarea content
                    if(fromJsonData.value.length > 0){
                        asyncFetch("http://localhost:9856/api/d3/nesting-data", 'SAVE', { input: fromJsonData.value })
                    }
                });
            };

            //=> Function ASYNC Fetch
            const asyncFetch = async (path, methode = 'GET', data = null) => {
                //=> Hide the convert form
                document.querySelector('#fromConverter').classList.add('hidden');
                
                if(methode === 'GET'){
                    const response = await fetch(path);
                    const json = await response.json()
                }
                else if(methode === 'POST'){
                    //=> Set POST request
                    const header = {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body:  JSON.stringify(data)
                    }

                    //=> Wait for response
                    const response = await fetch(path, header);
                    const json = await response.json()
                    console.log(json)
                    //=> Dislay response in the save form
                    fromJsonData.value = JSON.stringify(json.output);
                    //=> Show the save form
                    document.querySelector('#fromSaver').classList.remove('hidden')
                }
                else if(methode === 'SAVE'){
                    //=> Set POST request
                    const header = {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body:  JSON.stringify(data)
                    }

                    //=> Wait for response
                    const response = await fetch(path, header);
                    const json = await response.json()
                    console.log(json)
                }
            }
        //

        /* 
        Start interface
        */
            getFormSubmission();
        //

    });
//