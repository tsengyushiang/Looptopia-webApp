import axios from "axios"

const { ccclass, property } = cc._decorator;

@ccclass
export default class NetworkManger extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }

    // update (dt) {}

    saveFile(data: Blob) {

        var myReader = new FileReader();

        myReader.addEventListener("loadend", function (e) {
 
            var params = new URLSearchParams();
            params.append('data', e.srcElement["result"]);
            axios.post('/php_records/save.php', params)
                .then(res => {
                    console.log("Response : ", res);
                }).catch(e => {
                    console.log("Error : ", e);
                })

        });

        myReader.readAsDataURL(data);

    }
}
