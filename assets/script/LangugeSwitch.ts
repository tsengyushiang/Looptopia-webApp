import NetworkManger from "./NetWrokManger";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LangugeSwitch extends cc.Component {

    @property
    showIfIsChinese = true;

    onLoad() {

        if (this.showIfIsChinese)
            this.node.active = !NetworkManger.isEnglish();
        else
            this.node.active = NetworkManger.isEnglish();

    }

}
