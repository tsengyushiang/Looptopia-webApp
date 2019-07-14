import PathRecorder from "./PathRecorder";

const { ccclass, property } = cc._decorator;

cc.Component.EventHandler

@ccclass
export default class PathDrawer extends cc.Component {

    path = [];

    @property
    totalPlayTime: number = 10;

    currentTime: number = 0;

    onLoad() {

        this.path = this.getComponent(PathRecorder).getPath();
        console.log(this.path);
    }

    update(dt) {

        this.currentTime += dt;

        console.log(Math.floor(this.currentTime));

    }
}
