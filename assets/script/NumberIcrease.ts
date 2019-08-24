
const { ccclass, property } = cc._decorator;

@ccclass
export default class RunNumber extends cc.Component {

    lable: cc.Label = null;

    runTime = 7;
    accumlateTime = 0;
    goalNumber = -1;

    persistMusicFromPlayScene: cc.Node;
    start() {

        this.lable = this.getComponent(cc.Label);
        this.lable.string = '0'

        this.persistMusicFromPlayScene = cc.find("Persistmusic");
    }

    update(dt) {

        if (this.goalNumber == -1) return;

        this.accumlateTime += dt;

        let time_normalize = this.accumlateTime / this.runTime;
        let result = Math.floor((time_normalize * time_normalize * this.goalNumber));

        this.persistMusicFromPlayScene.getComponent(cc.AudioSource).volume =
            (1 - (time_normalize * time_normalize)) * 0.2;

        if (result > this.goalNumber) {
            result = this.goalNumber
            this.persistMusicFromPlayScene.destroy();
            window["bgmCurrentTime"] = 0 ;
            this.destroy();
        }

        this.lable.string = result.toString();
    }

}
