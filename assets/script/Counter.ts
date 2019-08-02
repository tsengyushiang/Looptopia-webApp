
const { ccclass, property } = cc._decorator;

@ccclass
export default class Counter extends cc.Component {

    @property(cc.Slider)
    timeBar: cc.Slider = null;

    @property
    showTimeBar: boolean = false;

    @property
    nextSceneName: string = '';

    @property
    countDown_second: number = 0;


    @property(cc.Animation)
    startAnimation = null;

    @property(cc.Animation)
    endAnimation = null;


    @property(cc.Component.EventHandler)
    onBegin = [];

    @property(cc.Component.EventHandler)
    onFinish = [];

    onLoad() {

        this.timeBar.progress = 1;
        this.timeBar.node.active = this.showTimeBar;

        cc.director.preloadScene(this.nextSceneName, function () { });
    }

    start() {

        if (this.startAnimation) {

            let self = this;

            let onFinished = function () {

                self.startTimer();
                self.startAnimation.off('finished', onFinished, this);
            }

            this.startAnimation.on('finished', onFinished, this);
            this.startAnimation.play();
        }
        else {
            this.startTimer();
        }

    }


    startTimer() {

        let currentTime = 0;
        let onFinish = function () {

            if (currentTime >= this.countDown_second) {

                this.unschedule(onFinish);
                this.timeUp();

            }

            this.timeBar.progress = 1 - currentTime / this.countDown_second;

            currentTime++;

        }

        this.schedule(onFinish, 1);
    }



    timeUp() {

        let self = this;


        let endScenefunc = function () {

            self.onFinish.forEach(funcs => {
                funcs.emit();
            })

            cc.director.loadScene(self.nextSceneName);
        }

        if (this.endAnimation) {


            let onFinished = function () {

                endScenefunc();
                self.endAnimation.off('finished', onFinished, this);
            }

            this.endAnimation.on('finished', onFinished, this);
            this.endAnimation.play();
        }
        else {
            endScenefunc()
        }
    }

}
