const { ccclass, property } = cc._decorator;

@ccclass
export default class AnimationReplay extends cc.Component {

    animator: cc.Animation;

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

    onLoad() {
        this.animator = this.getComponent(cc.Animation);
    }

    start() {


        this.animator.addClip(this.moveUp, 'moveup');
        this.animator.addClip(this.moveDown, 'movedown');
        this.animator.addClip(this.moveRight, 'moveright');
        this.animator.addClip(this.moveLeft, 'moveleft');
        this.animator.addClip(this.eat, 'eat');
        this.animator.addClip(this.nodright, 'right');
        this.animator.addClip(this.nodleft, 'left');
        this.animator.addClip(this.nodfront, 'front');
        this.animator.addClip(this.nodback, 'back');
        this.animator.addClip(this.sit, 'sit');

    }

    setAnimation(clipName: string) {

        if (clipName == '')
            this.animator.stop();
        else if (this.animator.getAnimationState(clipName).isPlaying == false)
            this.animator.play(clipName);
    }

    end() {

        if (this.animator.getAnimationState('sit')) {
            if (this.animator.getAnimationState('sit').isPlaying == true) return

            let self = this;
            let onFinished = function () {

                self.animator.removeClip(self.sit);
                self.animator.off('finished', onFinished, this);
            }

            self.animator.on('finished', onFinished, this);
            self.animator.play('sit');
        }
    }


}
