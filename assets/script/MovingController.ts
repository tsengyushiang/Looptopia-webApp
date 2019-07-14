const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property({ type: cc.Integer })
    stepSize: number = 0;


    rigibody: cc.RigidBody;
    currentMovingType: number = null;

    onLoad() {

        //設定物理引擎
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getPhysicsManager().debugDrawFlags = 1;
        cc.director.getPhysicsManager().gravity = cc.v2(0, 0);

        this.rigibody = this.node.getComponent(cc.RigidBody);

        //偵測鍵盤按下事件
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this)
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this)

    }


    onDestroy() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this)
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this)
    }

    update(dt) {

        dt *= 10000;
        switch (this.currentMovingType) {
            case cc.macro.KEY.w:
                this.rigibody.linearVelocity = cc.v2(0, Math.abs(this.stepSize * dt));
                break;
            case cc.macro.KEY.s:
                this.rigibody.linearVelocity = cc.v2(0, -Math.abs(this.stepSize * dt));
                break;
            case cc.macro.KEY.a:
                this.rigibody.linearVelocity = cc.v2(-Math.abs(this.stepSize * dt), 0);
                break;
            case cc.macro.KEY.d:
                this.rigibody.linearVelocity = cc.v2(Math.abs(this.stepSize * dt), 0);
                break;
            default:
                this.rigibody.linearVelocity = cc.v2(0, 0);
                break;
        }
    }


    onKeyDown(event) {

        switch (event.keyCode) {

            case cc.macro.KEY.w:
            case cc.macro.KEY.s:
            case cc.macro.KEY.a:
            case cc.macro.KEY.d:

                this.currentMovingType = event.keyCode;
                break;
        }
    }


    onKeyUp(event) {

        switch (event.keyCode) {

            case cc.macro.KEY.w:
            case cc.macro.KEY.s:
            case cc.macro.KEY.a:
            case cc.macro.KEY.d:

                if (this.currentMovingType == event.keyCode)
                    this.currentMovingType = null;
                break;
        }
    }
}
