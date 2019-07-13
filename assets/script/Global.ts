import NetworkManger from "./NetWrokManger";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Global extends cc.Component {

    @property(cc.Node)
    animatSprite: cc.Node = null;

    // GlobalManger
    public static get Instance() {

        return this;
    }

    networkManger: NetworkManger;
    recorder: any;

    start() {
        
        let self = this;
        cc.loader.loadRes("sprites/splash",cc.SpriteFrame,function (err, res) {
            self.animatSprite.getComponent(cc.Sprite).spriteFrame = res;
        });
        

        var seq = cc.repeatForever(
            cc.sequence(
                cc.moveBy(2, 200, 0),
                cc.moveBy(2, -200, 0)
            ));
        this.animatSprite.runAction(seq);

        this.recorder = new CanvasRecorder(document.getElementById("GameCanvas"))
        this.recorder.start();

        this.networkManger = new NetworkManger();
    }

    endRecord() {

        this.networkManger.saveFile("123.webm", this.recorder.getBlob());
        this.recorder.stop('123.webm');
    }

    update(dt) {

    }

}
