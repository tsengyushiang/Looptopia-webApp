
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

    @property(cc.Node)
    active_whenStart = []

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

        let self = this;

        let startfunc = function () {

            self.startTimer();
            self.active_whenStart.forEach(node => {
                node.active = true;
            })

            if (self.startAnimation) {
                self.startAnimation.node.active = false;
            }

        }

        if (this.startAnimation) {


            let onFinished = function () {

                startfunc();
                self.startAnimation.off('finished', onFinished, this);
            }

            this.startAnimation.on('finished', onFinished, this);
            this.startAnimation.play();
        }
        else {
            startfunc()
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

        self.onFinish.forEach(funcs => {
            funcs.emit();
        })

        if (this.endAnimation) {


            let onFinished = function () {
                cc.director.loadScene(self.nextSceneName);
            }

            this.endAnimation.on('finished', onFinished, this);
            this.endAnimation.play();
        }
    }

}
