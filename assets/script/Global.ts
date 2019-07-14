import NetworkManger from "./NetWrokManger";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Global extends cc.Component {

    // GlobalManger
    public static get Instance() {
        return this;
    }

    networkManger: NetworkManger;
    recorder: any;

    onLoad() {


        this.recorder = new CanvasRecorder(document.getElementById("GameCanvas"))
        this.networkManger = new NetworkManger();
    }

    startRecord() {
        this.recorder.start();
    }

    endRecord() {

        this.networkManger.saveFile(this.recorder.getBlob());
        this.recorder.stop();
    }

    GoPracticeScene() {
        cc.director.loadScene("practiceScene");

    }
    GoGameScene() {
        cc.director.loadScene("playingScene");

    }
    GoEndScene() {
        cc.director.loadScene("recorderScene");

    }
    GoMenu() {
        cc.director.loadScene("startMenu");

    }
    exit(){
        cc.game.end();
    }


}
