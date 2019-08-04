import PathRecorder from "./PathRecorder";
import NetworkManger from "./NetWrokManger";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PathDrawer extends cc.Component {

    @property(cc.Graphics)
    graphics: cc.Graphics = null;

    path = [];
    drawLine_second = 0;
    index = 0;

    @property
    drawPath: boolean = false;

    @property
    loop: boolean = false;

    @property
    totalPlayTime: number = 10;

    currentTime: number = 0;
    start() {
        let self = this;
        NetworkManger.getAllRecords(function (res) {
            self.path = res[res.length - 1];
            self.drawLine_second = self.totalPlayTime * 1000 / self.path.length;
        })

    }

    smallOut() {

        let seq = cc.sequence(cc.delayTime(1.0), cc.scaleTo(1, 0, 0));
        this.node.runAction(seq);
    }


    update(dt) {

        if (this.path.length <= 0) return;

        this.currentTime += dt;
        let accumelateMinSecond = this.currentTime * 1000;


        if (this.index < this.path.length - 1 && accumelateMinSecond > this.drawLine_second) {

            this.graphics.moveTo(
                this.path[this.index].pos.x,
                this.path[this.index].pos.y);

            this.graphics.lineTo(
                this.path[this.index + 1].pos.x,
                this.path[this.index + 1].pos.y);

            this.graphics.stroke();
            this.index++;
            this.currentTime = 0;
            console.log(this.index, this.path[this.index]);
        }

        if (this.loop && this.index >= this.path.length) {
            this.graphics.clear();
            this.currentTime = 0;
        }

    }
}
