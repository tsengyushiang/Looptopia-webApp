import NetworkManger from "./NetWrokManger";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Global extends cc.Component {

    @property(cc.Label)
    dayString: cc.Label = null;

    @property(cc.Node)
    ui: cc.Node = null;


    // GlobalManger
    public static get Instance() {
        return this;
    }

    recorder: any;


    onLoad() {


        //this.recorder = new CanvasRecorder(document.getElementById("GameCanvas"))
        let self = this;
        NetworkManger.getAllRecords(function (data: any) {
            self.dayString.string = data.length.toString();

            self.ui.active = true;
            self.node.runAction(cc.fadeOut(1))

        });

    }
    /*
        startRecord() {
            this.recorder.start();
        }
    
        endRecord() {
    
            this.networkManger.saveFile(this.recorder.getBlob());
            this.recorder.stop();
        }
    */
    GoPracticeScene() {
        cc.director.loadScene("practiceScene");

    }
    GoGameScene() {
        cc.director.loadScene("playingScene");

    }
    GoEndScene() {
        cc.director.loadScene("recordScene");

    }
    GoMenu() {
        cc.director.loadScene("startMenu");

    }
    exit() {
        cc.game.end();
    }


}
