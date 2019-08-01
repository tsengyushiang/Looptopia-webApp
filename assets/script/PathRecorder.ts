import NetworkManger from "./NetWrokManger";

const { ccclass, property } = cc._decorator;


@ccclass
export default class PathRecorder extends cc.Component {


    @property
    recordFPS = 0.1;


    @property(cc.Node)
    target: cc.Node = null;


    accumulateTime = 0;

    onLoad() {

        if (!window.hasOwnProperty("path")) {
            this.init()
        }

        this.accumulateTime = 0;
    }

    init() {

        window["path"] = [];

    }

    update(dt) {

        let timeUnit = 1000;
        let recordSampleTime = timeUnit / this.recordFPS;
        this.accumulateTime += dt;
        let accumulateTimeMiniSecond = Math.round(this.accumulateTime * timeUnit);

        if (accumulateTimeMiniSecond <= recordSampleTime) return;
        
        this.accumulateTime = 0;

        if (this.target){

            window["path"].push(this.target.position);
        }
    }


    getPath() {

        return window["path"]
    }

    passPathToServer() {

        NetworkManger.saveFile(JSON.stringify(window["path"]));
    }

}
