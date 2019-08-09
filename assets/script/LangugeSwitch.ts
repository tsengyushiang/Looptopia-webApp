import NetworkManger from "./NetWrokManger";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LangugeSwitch extends cc.Component {

    @property
    showIfIsChinese = true;

    onLoad() {

        if (this.showIfIsChinese) {
            if (!NetworkManger.isEnglish()) {
                this.node.opacity = 255;
            }
            else {
                this.node.opacity = 0;
            }
        }
        else {
            if (NetworkManger.isEnglish()) {
                this.node.opacity = 255;
            }
            else {
                this.node.opacity = 0;
            }
        }
    }


    update() {

        if (this.showIfIsChinese) {
            if (!NetworkManger.isEnglish()) {
                this.node.opacity = 255;
            }
            else {
                this.node.opacity = 0;
            }
        }
        else {
            if (NetworkManger.isEnglish()) {
                this.node.opacity = 255;
            }
            else {
                this.node.opacity = 0;
            }
        }

    }

}
