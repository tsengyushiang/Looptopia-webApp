import axios from "axios"

export default class NetworkManger {

    // update (dt) {}

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
}
