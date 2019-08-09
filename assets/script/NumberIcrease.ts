
const { ccclass, property } = cc._decorator;

@ccclass
export default class RunNumber extends cc.Component {

    lable: cc.Label = null;

    runTime = 7;
    accumlateTime = 0;
    goalNumber = -1;
    start() {
        this.lable = this.getComponent(cc.Label);
        this.lable.string = '0'
    }

    update(dt) {

        if (this.goalNumber == -1) return;

        this.accumlateTime += dt;

        let time_normalize = this.accumlateTime / this.runTime;
        let result = Math.floor((time_normalize * time_normalize * this.goalNumber));

        if (result > this.goalNumber) {
            result = this.goalNumber
            this.destroy();
        }

        this.lable.string = result.toString();
    }

}
