
const { ccclass, property } = cc._decorator;

@ccclass
export default class MyLabel extends cc.Label {

    @property
    nodestirng: boolean = false;

    start() {
        if (this.nodestirng)
            this.setNodNumber();
    }

    setNodNumber() {

        let nodCount = window["nodCount"] as number
        if (nodCount)
            this.string = nodCount.toString();
        else
            this.string = '0';

    }

}
