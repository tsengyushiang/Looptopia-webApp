import axios from "axios"

export default class NetworkManger {

    // update (dt) {}

    static getAllRecords(callBack: Function) {

        axios('https://script.google.com/macros/s/AKfycbwk1bNZccy5l6yYKtYd1VAcPuOCkyxAb69DEXHF7z0-2lDhYBDB/exec',
        ).then(function (response) {

            let data = [];

            response.data.forEach(element => {
                data.push(JSON.parse(element));
            });

            callBack(data)

        }).catch(function (err) {
            console.log("Error : ", err);
        })

    }

    static saveFile(dataString: any) {

        let compressed_string = dataString.compress();

        /*  let decoded_string = compressed_string.decompress();
  
          console.log(dataString);
          console.log(compressed_string);
          console.log(dataString == decoded_string); 
        */

        let s = document.createElement("script");
        s.src = "https://script.google.com/macros/s/AKfycbwk1bNZccy5l6yYKtYd1VAcPuOCkyxAb69DEXHF7z0-2lDhYBDB/exec?data=" + compressed_string + "&callback=" + "getRequestCallBack";
        document.body.appendChild(s);
    }

    /*
        static saveFile(dataString: string, callBack: Function) {
    
    
            axios({
                method: 'post',
                url: 'https://script.google.com/macros/s/AKfycbwk1bNZccy5l6yYKtYd1VAcPuOCkyxAb69DEXHF7z0-2lDhYBDB/exec',
                data: {
                    data: dataString,
                },
                headers: {
                    'Content-Type': 'text/plain;charset=utf-8',
                }
            }).then(function (response) {
    
                let data = [];
    
                response.data.forEach(element => {
                    data.push(JSON.parse(element));
                });
    
                callBack(data)
    
            }).catch(function (err) {
    
                console.log("Error : ", err);
                
            })
        }
    */


}
