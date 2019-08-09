const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    target: cc.Node = null;

    initPosition: cc.Vec2;

    start() {
        this.initPosition = this.target.position;
    }

    update(dt) {

        if (!this.initPosition.fuzzyEquals(this.target.position, 0.1))
            this.node.active = false;
    }
}
