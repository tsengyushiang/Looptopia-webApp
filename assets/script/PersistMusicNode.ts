
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    audio: cc.AudioSource;

    start() {

        this.node.parent = null;
        cc.game.addPersistRootNode(this.node);

        this.audio = this.getComponent(cc.AudioSource);
    }

    update() {

        if (!this.audio.isPlaying) {
            this.audio.play();
            this.audio.setCurrentTime(window["bgmCurrentTime"]);
        }
        window["bgmCurrentTime"] = this.audio.getCurrentTime();

    }

}
