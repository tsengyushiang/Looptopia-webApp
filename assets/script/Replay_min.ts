import PathDrawer from "./PathDrawer";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Replay_min extends cc.Component {

    @property(cc.Component)
    drawer: PathDrawer = null

    setDrawPath(arr) {

        this.drawer.path = arr;
        this.drawer.drawLine_second = this.drawer.totalPlayTime * 1000 / this.drawer.path.length;

    }

}
