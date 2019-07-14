
const { ccclass, property } = cc._decorator;


@ccclass
export default class PathRecorder extends cc.Component {


    @property(cc.Node)
    target: cc.Node = null;

    onLoad() {

        if (!window.hasOwnProperty("path")) {
            this.init()
        }
    }

    init() {

        window["path"] = [];

    }

    update(dt) {

        if (this.target && (
            window["path"].length == 0 ||
            window["path"][window["path"].length - 1] != this.target.position)
        ){

            window["path"].push(this.target.position);
        }
    }


    getPath() {

        return window["path"]
    }

}
