import PathRecorder from "./PathRecorder";
import NetworkManger from "./NetWrokManger";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PathDrawer extends cc.Component {

    graphics: cc.Graphics
    path = [];

    @property
    drawPath: boolean = false;

    @property
    loop: boolean = false;

    @property
    totalPlayTime: number = 10;

    currentTime: number = 0;

    onLoad() {

        //this.path = this.getComponent(PathRecorder).getPath();

        let self = this;
        NetworkManger.getAllRecords(function (res) {
            self.path = res[res.length - 1];
        })
        this.graphics = this.getComponent(cc.Graphics);
    }

    update(dt) {

        if (this.path.length <= 0) return;

        let preindex_afterNormalize = this.currentTime / this.totalPlayTime * this.path.length;
        let preindex = Math.floor(preindex_afterNormalize)

        this.currentTime += dt;

        let index_afterNormalize = this.currentTime / this.totalPlayTime * this.path.length;

        let index = Math.floor(index_afterNormalize);


        if (this.drawPath && index > 0 && index < this.path.length) {

            this.graphics.moveTo(
                this.path[preindex].x,
                this.path[preindex].y);

            this.graphics.lineTo(
                this.path[index].x,
                this.path[index].y);

            this.graphics.stroke();

        }

        if (this.loop && this.currentTime > this.totalPlayTime) {
            this.graphics.clear();
            this.currentTime = 0;
        }

    }
}
