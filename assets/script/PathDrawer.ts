import NetworkManger from "./NetWrokManger";
import AnimationReplay from "./AnimationReplay";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PathDrawer extends cc.Component {

    @property(AnimationReplay)
    target: AnimationReplay = null;

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

    loadLatestPath() {

        this.path = window['accurate_path'];
        this.drawLine_second = this.totalPlayTime * 1000 / this.path.length;
    }

    smallOut() {

        let seq = cc.sequence(cc.delayTime(1.0), cc.scaleTo(1, 0, 0));
        this.node.parent.runAction(seq);
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

            this.target.node.position = this.path[this.index + 1].pos;
            this.target.setAnimation(this.path[this.index + 1].animation);

            if (this.drawPath)
                this.graphics.stroke();

            this.index++;
            this.currentTime = 0;
        }

        if (this.index >= this.path.length - 1) {

            if (this.loop) {
                this.graphics.clear();
                this.currentTime = 0;
                this.index = 0;
            }
            else {
                this.target.end();
            }
        }

    }
}
