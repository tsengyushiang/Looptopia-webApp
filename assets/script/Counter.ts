
const { ccclass, property } = cc._decorator;
cc.Button
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

        this.startTimer();
    }


    startTimer() {


        let currentTime = 0;
        let onFinish = function () {

            if (currentTime === this.countDown_second) {

                this.unschedule(onFinish);
                this.timeUp();

            }

            this.timeBar.progress = 1 - currentTime / this.countDown_second;

            currentTime++;
        }

        this.schedule(onFinish, 1);
    }



    timeUp() {

        cc.director.loadScene(this.nextSceneName);

    }



    update(dt) {

        cc.log(1234);

    }
}
