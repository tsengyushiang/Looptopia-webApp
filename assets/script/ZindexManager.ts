const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    settingObj = [];

    update(dt) {

        this.settingObj.sort(function (a, b) {
            return Math.sign(b.position.y - a.position.y);
        })


        this.settingObj.forEach((obj, index) => {
            obj.zIndex = index + 1;
        })
    }
}
