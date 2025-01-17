import NetworkManger from "./NetWrokManger";
import MovingController from "./MovingController";

const { ccclass, property } = cc._decorator;


@ccclass
export default class PathRecorder extends cc.Component {


    @property
    recordFPS = 0.1;


    @property(MovingController)
    target: MovingController = null;


    accumulateTime = 0;

    onLoad() {

        this.init()
        this.accumulateTime = 0;
    }

    init() {

        window["path"] = [];
        window["accurate_path"] = [];

    }

    update(dt) {

        let timeUnit = 1000;
        let recordSampleTime = timeUnit / this.recordFPS;
        this.accumulateTime += dt;
        let accumulateTimeMiniSecond = Math.round(this.accumulateTime * timeUnit);

        if (this.target && accumulateTimeMiniSecond % 10 == 0) {
            window["accurate_path"].push({
                pos: this.target.node.position,
                animation: this.target.getCurrentAction()
            });
        }

        if (accumulateTimeMiniSecond <= recordSampleTime) return;

        this.accumulateTime = 0;

        if (this.target) {

            window["path"].push({
                pos: this.target.node.position,
                animation: this.target.getCurrentAction()
            });
        }
    }


    getPath() {

        return window["path"]
    }

    passPathToServer() {
        NetworkManger.saveFile(JSON.stringify(window["path"]));
    }

}
