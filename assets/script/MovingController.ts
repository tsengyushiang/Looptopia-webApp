const { ccclass, property } = cc._decorator;

@ccclass
export default class MovingController extends cc.Component {

    @property({ type: cc.Integer })
    stepSize: number = 0;

    @property(cc.AnimationClip)
    moveUp = null;
    @property(cc.AnimationClip)
    moveDown = null;
    @property(cc.AnimationClip)
    moveRight = null;
    @property(cc.AnimationClip)
    moveLeft = null;
    @property(cc.AnimationClip)
    eat = null;
    @property(cc.AnimationClip)
    nod = null;

    @property(cc.Node)
    targetPositionNode = null;

    animator: cc.Animation;
    rigibody: cc.RigidBody;
    currentMovingType: number = null;

    onLoad() {


        cc.director.getCollisionManager().enabled = true;


        //設定物理引擎
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getPhysicsManager().gravity = cc.v2(0, 0);

        this.animator = this.node.getComponent(cc.Animation);
        this.rigibody = this.node.getComponent(cc.RigidBody);

        //偵測鍵盤按下事件
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this)
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this)


    }

    onDestroy() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this)
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this)
    }


    start() {

        this.animator.addClip(this.moveUp, 'moveup');
        this.animator.addClip(this.moveDown, 'movedown');
        this.animator.addClip(this.moveRight, 'moveright');
        this.animator.addClip(this.moveLeft, 'moveleft');
        this.animator.addClip(this.eat, 'eat');
        this.animator.addClip(this.nod, 'nod');
    }

    update(dt) {

        dt *= 10000;

        if (this.node.getNumberOfRunningActions()) return;

        switch (this.currentMovingType) {
            case cc.macro.KEY.w:
                if (this.animator.getAnimationState("moveup").isPlaying == false)
                    this.animator.play('moveup');
                break;
            case cc.macro.KEY.s:
                if (this.animator.getAnimationState("movedown").isPlaying == false)
                    this.animator.play('movedown');
                break;
            case cc.macro.KEY.a:
                if (this.animator.getAnimationState("moveleft").isPlaying == false)
                    this.animator.play('moveleft');
                break;
            case cc.macro.KEY.d:
                if (this.animator.getAnimationState("moveright").isPlaying == false)
                    this.animator.play('moveright');
                break;
            default:
                this.animator.stop();
                break;
        }

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
            case cc.macro.KEY.space:

                this.rigibody.linearVelocity = cc.v2(0, 0);

                let self = this;
                let goEat = cc.sequence(
                    cc.callFunc(function () {

                        if (self.node.position.y - self.targetPositionNode.y > 1e-5) {
                            if (self.animator.getAnimationState("movedown").isPlaying == false)
                                self.animator.play('movedown');
                        }
                        else if (self.node.position.y - self.targetPositionNode.y < -1e-5) {
                            if (self.animator.getAnimationState("moveup").isPlaying == false)
                                self.animator.play('moveup');
                        }

                    }),
                    cc.moveTo(
                        Math.abs(this.node.position.y - this.targetPositionNode.y) / (this.stepSize * dt),
                        cc.v2(this.node.position.x, this.targetPositionNode.y)),
                    cc.callFunc(function () {

                        if (self.node.position.x - self.targetPositionNode.x > 1e-5) {
                            if (self.animator.getAnimationState("moveleft").isPlaying == false)
                                self.animator.play('moveleft');
                        }
                        else if (self.node.position.x - self.targetPositionNode.x < -1e-5) {
                            if (self.animator.getAnimationState("moveright").isPlaying == false)
                                self.animator.play('moveright');
                        }

                    }),
                    cc.moveTo(
                        Math.abs(this.node.position.x - this.targetPositionNode.x) / (this.stepSize * dt),
                        cc.v2(this.targetPositionNode.x, this.targetPositionNode.y))
                    ,
                    cc.callFunc(function () {
                        self.animator.play('eat');
                    }),
                );

                this.node.runAction(goEat);
                this.currentMovingType = null
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
            case cc.macro.KEY.space:

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

    onBeginContact(contact, selfCollider, otherCollider) {
        console.log(contact, selfCollider, otherCollider);
    }
}
