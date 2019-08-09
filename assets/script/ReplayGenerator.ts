import NetworkManger from "./NetWrokManger";
import Replay_min from "./Replay_min";
import RunNumber from "./NumberIcrease";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Prefab)
    replayUnit: cc.Prefab = null;

    @property
    nextSceneName = '';

    @property(RunNumber)
    activeWhenLoadAll: RunNumber = null

    start() {

        let self = this;
        NetworkManger.getAllRecords(function (res) {

            if (res.length) {

                for (let i = 0; i < res.length - 1; i++) {

                    let node = cc.instantiate(self.replayUnit);

                    node.parent = self.node;

                    node.getComponent(Replay_min).setDrawPath(res[i]);
                }

                let seq = cc.sequence(
                    cc.delayTime(1.0),
                    cc.moveTo(1, cc.v2(0, Math.floor(res.length / 84) * 1035)),
                    cc.delayTime(1.0),
                    cc.callFunc(function () {

                        let node = cc.instantiate(self.replayUnit);
                        node.parent = self.node;
                        node.opacity = 0.0;
                        node.getComponent(Replay_min).setDrawPath(res[res.length - 1]);

                        let newnode_seq = cc.sequence(
                            cc.fadeIn(1.0),
                            cc.delayTime(5.0),
                            cc.callFunc(function () {
                                self.node.opacity = 0;
                            }),
                            cc.delayTime(3.0),
                            cc.callFunc(function () {
                                self.activeWhenLoadAll.node.parent.opacity = 255;
                                self.activeWhenLoadAll.goalNumber = res.length;
                            }),
                            cc.delayTime(10),
                            cc.callFunc(function () {
                                cc.director.loadScene(self.nextSceneName);
                            })
                        )
                        node.runAction(newnode_seq)

                    })
                );
                self.node.runAction(seq);

            }

        })

    }

}
