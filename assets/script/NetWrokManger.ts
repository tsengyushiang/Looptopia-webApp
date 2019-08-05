import axios from "axios"

export default class NetworkManger {


    static getAllRecords(callback: Function) {

        let s = document.createElement("script");
        s.src = "https://script.google.com/macros/s/AKfycbwk1bNZccy5l6yYKtYd1VAcPuOCkyxAb69DEXHF7z0-2lDhYBDB/exec?callback=" + "getRequestCallBack";
        document.body.appendChild(s);

        window["requestOnFinishedFunction"] = callback

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

    static isEnglish(): boolean {


        if (window.location.href.indexOf("english") == -1)
            return false;
        else
            return true;
   
        }

}
