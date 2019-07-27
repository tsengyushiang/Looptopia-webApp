import axios from "axios"

export default class NetworkManger {

    // update (dt) {}

    static saveFile(dataString: string, callBack: Function) {

    
        axios.get('https://script.google.com/macros/s/AKfycbybBFcLXv_lQ-KNnxg_SUOWEIVHdmC__PTBqpB9Sg/exec',
            {
                headers: {"Access-Control-Allow-Origin": "*"},
                params: {
                    data: dataString
                }
            }
        ).then(function (response) {

            /*
            let data = [];

            response.data.forEach(element => {
                data.push(JSON.parse(element));
            });
            */
            callBack(response)
        }).catch(function (err) {
            console.log("Error : ", err);
        })
    }
}
