import PathRecorder from "./PathRecorder";

const { ccclass, property } = cc._decorator;

cc.Component.EventHandler

@ccclass
export default class PathDrawer extends cc.Component {

    graphics: cc.Graphics
    path = [];


    @property
    totalPlayTime: number = 10;

    currentTime: number = 0;

    onLoad() {

        this.path = this.getComponent(PathRecorder).getPath();
        this.graphics = this.getComponent(cc.Graphics);
    }

    update(dt) {

        let preindex_afterNormalize = this.currentTime / this.totalPlayTime * this.path.length;
        let preindex =  Math.floor(preindex_afterNormalize)

        this.currentTime += dt;

        let index_afterNormalize = this.currentTime / this.totalPlayTime * this.path.length;

        let index = Math.floor(index_afterNormalize);


        if (index > 0 && index < this.path.length) {

            this.graphics.moveTo(
                this.path[preindex].x + 960,
                this.path[preindex].y + 540);

            this.graphics.lineTo(
                this.path[index].x + 960,
                this.path[index].y + 540);

            this.graphics.stroke();

        }

    }
}
