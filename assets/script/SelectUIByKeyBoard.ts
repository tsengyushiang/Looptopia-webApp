
const { ccclass, property } = cc._decorator;

@ccclass
export default class SelectUIByKeyBoard extends cc.Component {

    @property(cc.Button)
    wakeupbtn: cc.Button = null;

    @property(cc.Button)
    forestbtn: cc.Button = null;

    @property(cc.Button)
    keepSleepbtn: cc.Button = null;

    @property(cc.Node)
    wakeupTag: cc.Node = null;

    @property(cc.Node)
    forestTag: cc.Node = null;

    @property(cc.Node)
    keepSleepTag: cc.Node = null;

    @property({
        type: cc.AudioClip
    })
    hitAudio: cc.AudioClip = null;


    btnArr: cc.Button[] = [];
    tagArr: cc.Node[] = [];
    _currnetSelect = 0;
    set currnetSelect(value: number) {
        this._currnetSelect = value;
        this.setSelected(value);
    }
    get currnetSelect(): number {
        return this._currnetSelect
    }

    start() {
        this.btnArr.push(this.wakeupbtn, this.forestbtn, this.keepSleepbtn);
        this.tagArr.push(this.wakeupTag, this.forestTag, this.keepSleepTag);

        this.currnetSelect = 0;

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this)
    }

    setSelected(index: number) {

        this.tagArr.forEach((tag, index) => {
            if (index == this.currnetSelect)
                tag.active = true;
            else
                tag.active = false;
        })


    }

    onKeyDown(event) {

        switch (event.keyCode) {

            case cc.macro.KEY.up:
                if (!cc.audioEngine.isMusicPlaying())
                    cc.audioEngine.play(this.hitAudio, false, 0.5);

                this.currnetSelect--;
                if (this.currnetSelect < 0)
                    this.currnetSelect = this.tagArr.length - 1;
                break;
            case cc.macro.KEY.down:

                if (!cc.audioEngine.isMusicPlaying())
                    cc.audioEngine.play(this.hitAudio, false, 0.5);

                this.currnetSelect++;
                if (this.currnetSelect > this.tagArr.length - 1)
                    this.currnetSelect = 0;
                break;
            case cc.macro.KEY.space:
                if (!cc.audioEngine.isMusicPlaying())
                    cc.audioEngine.play(this.hitAudio, false, 0.5);



                this.btnArr[this.currnetSelect].clickEvents[0].emit([]);

                if (this.currnetSelect == 0)
                    cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this)


                break;
        }
    }


}
