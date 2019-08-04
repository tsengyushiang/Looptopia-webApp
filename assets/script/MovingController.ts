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
    nodright = null;
    @property(cc.AnimationClip)
    nodleft = null;
    @property(cc.AnimationClip)
    nodfront = null;
    @property(cc.AnimationClip)
    nodback = null;

    @property(cc.AnimationClip)
    sit = null;

    @property(cc.Node)
    potFood = null;
    @property(cc.Node)
    hint_nod = null;
    @property(cc.Node)
    hint_eat = null;

    @property(cc.Node)
    targetPositionNode = null;

    animator: cc.Animation;
    rigibody: cc.RigidBody;
    currentMovingType: number = null;
    disableDetectInput: boolean = false;
    spaceFunc: Function = null;
    // 'right','left','front','back'
    latestDirection: string;
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
        this.animator.addClip(this.sit, 'sit');


        if (this.nodback && this.nodfront && this.nodleft && this.nodright) {
            //nod
            this.animator.addClip(this.nodright, 'right');
            this.animator.addClip(this.nodleft, 'left');
            this.animator.addClip(this.nodfront, 'front');
            this.animator.addClip(this.nodback, 'back');
            this.latestDirection = 'right';
        }

        this.spaceFunc = this.goNod;
        window["nodCount"] = 0;

    }

    update(dt) {

        dt *= 10000;

        switch (this.currentMovingType) {
            case cc.macro.KEY.up:
                this.rigibody.linearVelocity = cc.v2(0, Math.abs(this.stepSize * dt));
                if (this.animator.getAnimationState("moveup").isPlaying == false)
                    this.animator.play('moveup');

                this.latestDirection = 'back';
                break;
            case cc.macro.KEY.down:
                this.rigibody.linearVelocity = cc.v2(0, -Math.abs(this.stepSize * dt));
                if (this.animator.getAnimationState("movedown").isPlaying == false)
                    this.animator.play('movedown');

                this.latestDirection = 'front';
                break;
            case cc.macro.KEY.left:
                this.rigibody.linearVelocity = cc.v2(-Math.abs(this.stepSize * dt), 0);
                if (this.animator.getAnimationState("moveleft").isPlaying == false)
                    this.animator.play('moveleft');

                this.latestDirection = 'left';
                break;
            case cc.macro.KEY.right:
                this.rigibody.linearVelocity = cc.v2(Math.abs(this.stepSize * dt), 0);
                if (this.animator.getAnimationState("moveright").isPlaying == false)
                    this.animator.play('moveright');

                this.latestDirection = 'right';

                break;
            case cc.macro.KEY.space:
                this.rigibody.linearVelocity = cc.v2(0, 0);

                this.spaceFunc(dt);
                this.currentMovingType = cc.macro.KEY.escape;
                break;
            case cc.macro.KEY.escape:
                // idle
                break;
            default:
                this.rigibody.linearVelocity = cc.v2(0, 0);
                this.animator.stop();
                break;
        }
    }

    goSit() {

        let self = this;
        this.rigibody.linearVelocity = cc.v2(0, 0);
        this.node.stopAllActions();
        this.disableDetectInput = true;
        this.currentMovingType = cc.macro.KEY.escape

        let onFinished = function () {

            self.disableDetectInput = false;
            self.animator.off('finished', onFinished, this);
        }

        self.animator.on('finished', onFinished, this);
        self.animator.play('sit');

    }
    getCurrentAction(): string {


        let animationList = [
            'moveup', 'movedown', 'moveright', 'moveleft',
            'eat', 'sit',
            'right', 'left', 'front', 'back'
        ]

        for (let i = 0; i < animationList.length; i++) {
            if (this.animator.getAnimationState(animationList[i]).isPlaying == true)
                return animationList[i];
        }

        return '';
    }
    goEat(dt) {

        this.disableDetectInput = true;
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


                let onFinished = function () {

                    self.disableDetectInput = false;
                    self.potFood.destroy();
                    self.spaceFunc = self.goNod;
                    self.latestDirection = 'back';

                    self.animator.off('finished', onFinished, this);
                }

                self.animator.on('finished', onFinished, this);
                self.animator.play('eat');

            }),
        );

        this.node.runAction(goEat);
    }

    goNod(dt) {

        if (this.animator.getAnimationState("left") &&
            this.animator.getAnimationState("right") &&
            this.animator.getAnimationState("front") &&
            this.animator.getAnimationState("back")) {

        }
        else return;

        if (this.animator.getAnimationState("left").isPlaying == true) return;
        if (this.animator.getAnimationState("right").isPlaying == true) return;
        if (this.animator.getAnimationState("front").isPlaying == true) return;
        if (this.animator.getAnimationState("back").isPlaying == true) return;

        window["nodCount"]++;


        let self = this;

        this.disableDetectInput = true;

        let onFinished = function () {

            self.disableDetectInput = false;
            self.animator.off('finished', onFinished, this);
        }

        self.animator.on('finished', onFinished, this);
        self.animator.play(this.latestDirection);
    }


    onKeyDown(event) {

        if (this.disableDetectInput) return;

        switch (event.keyCode) {

            case cc.macro.KEY.up:
            case cc.macro.KEY.down:
            case cc.macro.KEY.left:
            case cc.macro.KEY.right:
            case cc.macro.KEY.space:

                this.currentMovingType = event.keyCode;
                break;
        }
    }


    onKeyUp(event) {

        if (this.disableDetectInput) return;

        switch (event.keyCode) {

            case cc.macro.KEY.up:
            case cc.macro.KEY.down:
            case cc.macro.KEY.left:
            case cc.macro.KEY.right:

                if (this.currentMovingType == event.keyCode)
                    this.currentMovingType = null;
                break;
        }
    }

    onBeginContact(contact, selfCollider, otherCollider) {

        if (otherCollider.node == this.potFood) {
            this.hint_eat.active = true;
            this.hint_nod.active = false;
            this.spaceFunc = this.goEat;
        }
    }

    onEndContact(contact, selfCollider, otherCollider) {
        if (otherCollider.node == this.potFood) {

            this.hint_nod.active = true;
            this.hint_eat.active = false;
            this.spaceFunc = this.goNod;

        }
    }
}
