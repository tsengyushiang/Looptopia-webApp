
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {


    @property
    width: number = 0;

    @property
    height: number = 0;

    onLoad() {


        //設定物理引擎
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getPhysicsManager().debugDrawFlags = 1;
        cc.director.getPhysicsManager().gravity = cc.v2(0, 0);

        //加入物理邊框
        let width = this.width;
        let height = this.height;

        let node = new cc.Node();

        let body = node.addComponent(cc.RigidBody);
        body.type = cc.RigidBodyType.Static;

        this._addBound(node, 0, height / 2, width, 20);
        this._addBound(node, 0, -height / 2, width, 20);
        this._addBound(node, -width / 2, 0, 20, height);
        this._addBound(node, width / 2, 0, 20, height);
        node.parent = this.node;

    }

    //物理邊界
    _addBound(node: cc.Node, x: number, y: number, width: number, height: number) {

        let collider = node.addComponent(cc.PhysicsBoxCollider);
        collider.offset.x = x;
        collider.offset.y = y;
        collider.size.width = width;
        collider.size.height = height;

    }


    start() {

    }

    // update (dt) {}
}
