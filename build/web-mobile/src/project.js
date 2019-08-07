window.__require=function t(e,o,i){function n(a,r){if(!o[a]){if(!e[a]){var s=a.split("/");if(s=s[s.length-1],!e[s]){var p="function"==typeof __require&&__require;if(!r&&p)return p(s,!0);if(c)return c(s,!0);throw new Error("Cannot find module '"+a+"'")}}var d=o[a]={exports:{}};e[a][0].call(d.exports,function(t){return n(e[a][1][t]||t)},d,d.exports,t,e,o,i)}return o[a].exports}for(var c="function"==typeof __require&&__require,a=0;a<i.length;a++)n(i[a]);return n}({AnimationReplay:[function(t,e,o){"use strict";cc._RF.push(e,"efb07t7HGFL86QAx29uZfFK","AnimationReplay"),Object.defineProperty(o,"__esModule",{value:!0});var i=cc._decorator,n=i.ccclass,c=i.property,a=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.moveUp=null,e.moveDown=null,e.moveRight=null,e.moveLeft=null,e.eat=null,e.nodright=null,e.nodleft=null,e.nodfront=null,e.nodback=null,e.sit=null,e}return __extends(e,t),e.prototype.onLoad=function(){this.animator=this.getComponent(cc.Animation)},e.prototype.start=function(){this.animator.addClip(this.moveUp,"moveup"),this.animator.addClip(this.moveDown,"movedown"),this.animator.addClip(this.moveRight,"moveright"),this.animator.addClip(this.moveLeft,"moveleft"),this.animator.addClip(this.eat,"eat"),this.animator.addClip(this.nodright,"right"),this.animator.addClip(this.nodleft,"left"),this.animator.addClip(this.nodfront,"front"),this.animator.addClip(this.nodback,"back"),this.animator.addClip(this.sit,"sit")},e.prototype.setAnimation=function(t){""==t?this.animator.stop():0==this.animator.getAnimationState(t).isPlaying&&this.animator.play(t)},e.prototype.end=function(){if(this.animator.getAnimationState("sit")){if(1==this.animator.getAnimationState("sit").isPlaying)return;var t=this,e=function(){t.animator.removeClip(t.sit),t.animator.off("finished",e,this)};t.animator.on("finished",e,this),t.animator.play("sit")}},__decorate([c(cc.AnimationClip)],e.prototype,"moveUp",void 0),__decorate([c(cc.AnimationClip)],e.prototype,"moveDown",void 0),__decorate([c(cc.AnimationClip)],e.prototype,"moveRight",void 0),__decorate([c(cc.AnimationClip)],e.prototype,"moveLeft",void 0),__decorate([c(cc.AnimationClip)],e.prototype,"eat",void 0),__decorate([c(cc.AnimationClip)],e.prototype,"nodright",void 0),__decorate([c(cc.AnimationClip)],e.prototype,"nodleft",void 0),__decorate([c(cc.AnimationClip)],e.prototype,"nodfront",void 0),__decorate([c(cc.AnimationClip)],e.prototype,"nodback",void 0),__decorate([c(cc.AnimationClip)],e.prototype,"sit",void 0),e=__decorate([n],e)}(cc.Component);o.default=a,cc._RF.pop()},{}],Counter:[function(t,e,o){"use strict";cc._RF.push(e,"a35e45QanZHcJgAtXl7kIsR","Counter"),Object.defineProperty(o,"__esModule",{value:!0});var i=cc._decorator,n=i.ccclass,c=i.property,a=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.timeBar=null,e.showTimeBar=!1,e.nextSceneName="",e.countDown_second=0,e.active_whenStart=[],e.startAnimation=null,e.endAnimation=null,e.onBegin=[],e.onFinish=[],e}return __extends(e,t),e.prototype.onLoad=function(){this.timeBar.progress=1,this.timeBar.node.active=this.showTimeBar,cc.director.preloadScene(this.nextSceneName,function(){})},e.prototype.start=function(){var t=this,e=function(){t.startTimer(),t.active_whenStart.forEach(function(t){t.active=!0}),t.onBegin.forEach(function(t){t.emit()})};if(this.startAnimation){var o=function(){e(),t.startAnimation.off("finished",o,this)};this.startAnimation.on("finished",o,this),this.startAnimation.play()}else e()},e.prototype.startTimer=function(){var t=0,e=function(){t>=this.countDown_second&&(this.unschedule(e),this.timeUp()),this.timeBar.progress=1-t/this.countDown_second,t++};this.schedule(e,1)},e.prototype.timeUp=function(){var t=this;if(t.onFinish.forEach(function(t){t.emit()}),this.endAnimation){this.endAnimation.on("finished",function(){cc.director.loadScene(t.nextSceneName)},this),this.endAnimation.play()}},__decorate([c(cc.Slider)],e.prototype,"timeBar",void 0),__decorate([c],e.prototype,"showTimeBar",void 0),__decorate([c],e.prototype,"nextSceneName",void 0),__decorate([c],e.prototype,"countDown_second",void 0),__decorate([c(cc.Node)],e.prototype,"active_whenStart",void 0),__decorate([c(cc.Animation)],e.prototype,"startAnimation",void 0),__decorate([c(cc.Animation)],e.prototype,"endAnimation",void 0),__decorate([c(cc.Component.EventHandler)],e.prototype,"onBegin",void 0),__decorate([c(cc.Component.EventHandler)],e.prototype,"onFinish",void 0),e=__decorate([n],e)}(cc.Component);o.default=a,cc._RF.pop()},{}],Global:[function(t,e,o){"use strict";cc._RF.push(e,"b6886D4mHZC3Z5ACg6C7k47","Global"),Object.defineProperty(o,"__esModule",{value:!0});var i=t("./NetWrokManger"),n=cc._decorator,c=n.ccclass,a=n.property,r=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.dayString=null,e.english=null,e.ui=null,e}return __extends(e,t),Object.defineProperty(e,"Instance",{get:function(){return this},enumerable:!0,configurable:!0}),e.prototype.onLoad=function(){var t=this;i.default.getAllRecords(function(e){t.dayString.string=(e.length+1).toString(),t.english.string=(e.length+1).toString(),t.ui.active=!0,t.node.runAction(cc.fadeOut(1))})},e.prototype.GoPracticeScene=function(){var t=cc.callFunc(function(){cc.director.loadScene("practiceScene")}),e=cc.sequence(cc.fadeIn(1),t);this.node.runAction(e)},e.prototype.GoGameScene=function(){cc.director.loadScene("playingScene")},e.prototype.GoEndScene=function(){cc.director.loadScene("recordScene")},e.prototype.GoMenu=function(){cc.director.loadScene("startMenu")},e.prototype.exit=function(){cc.game.end()},__decorate([a(cc.Label)],e.prototype,"dayString",void 0),__decorate([a(cc.Label)],e.prototype,"english",void 0),__decorate([a(cc.Node)],e.prototype,"ui",void 0),e=__decorate([c],e)}(cc.Component);o.default=r,cc._RF.pop()},{"./NetWrokManger":"NetWrokManger"}],LangugeSwitch:[function(t,e,o){"use strict";cc._RF.push(e,"2765cDFybNJVYo2DAk4Rnk0","LangugeSwitch"),Object.defineProperty(o,"__esModule",{value:!0});var i=t("./NetWrokManger"),n=cc._decorator,c=n.ccclass,a=n.property,r=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.showIfIsChinese=!0,e}return __extends(e,t),e.prototype.onLoad=function(){this.showIfIsChinese?this.node.active=!i.default.isEnglish():this.node.active=i.default.isEnglish()},__decorate([a],e.prototype,"showIfIsChinese",void 0),e=__decorate([c],e)}(cc.Component);o.default=r,cc._RF.pop()},{"./NetWrokManger":"NetWrokManger"}],MovingController:[function(t,e,o){"use strict";cc._RF.push(e,"8d901/X7XtOlYZ1dC0ipAHf","MovingController"),Object.defineProperty(o,"__esModule",{value:!0});var i=cc._decorator,n=i.ccclass,c=i.property,a=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.stepSize=0,e.moveUp=null,e.moveDown=null,e.moveRight=null,e.moveLeft=null,e.eat=null,e.nodright=null,e.nodleft=null,e.nodfront=null,e.nodback=null,e.sit=null,e.nodAudio=null,e.eatAudio=null,e.walkingAudio=null,e.potFood=null,e.hint_nod=null,e.hint_eat=null,e.targetPositionNode=null,e.currentMovingType=null,e.disableDetectInput=!1,e.spaceFunc=null,e}return __extends(e,t),e.prototype.onLoad=function(){cc.director.getCollisionManager().enabled=!0,cc.director.getPhysicsManager().enabled=!0,cc.director.getPhysicsManager().gravity=cc.v2(0,0),this.animator=this.node.getComponent(cc.Animation),this.rigibody=this.node.getComponent(cc.RigidBody),cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyDown,this),cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,this.onKeyUp,this)},e.prototype.onDestroy=function(){cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyDown,this),cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP,this.onKeyUp,this)},e.prototype.start=function(){this.animator.addClip(this.moveUp,"moveup"),this.animator.addClip(this.moveDown,"movedown"),this.animator.addClip(this.moveRight,"moveright"),this.animator.addClip(this.moveLeft,"moveleft"),this.animator.addClip(this.eat,"eat"),this.animator.addClip(this.sit,"sit"),this.nodback&&this.nodfront&&this.nodleft&&this.nodright&&(this.animator.addClip(this.nodright,"right"),this.animator.addClip(this.nodleft,"left"),this.animator.addClip(this.nodfront,"front"),this.animator.addClip(this.nodback,"back"),this.latestDirection="right"),this.spaceFunc=this.goNod,window.nodCount=0},e.prototype.update=function(t){switch(t*=1e4,this.currentMovingType){case cc.macro.KEY.up:this.rigibody.linearVelocity=cc.v2(0,Math.abs(this.stepSize*t)),0==this.animator.getAnimationState("moveup").isPlaying&&(this.animator.play("moveup"),cc.audioEngine.play(this.walkingAudio,!1,.5)),this.latestDirection="back";break;case cc.macro.KEY.down:this.rigibody.linearVelocity=cc.v2(0,-Math.abs(this.stepSize*t)),0==this.animator.getAnimationState("movedown").isPlaying&&(this.animator.play("movedown"),cc.audioEngine.play(this.walkingAudio,!1,.5)),this.latestDirection="front";break;case cc.macro.KEY.left:this.rigibody.linearVelocity=cc.v2(-Math.abs(this.stepSize*t),0),0==this.animator.getAnimationState("moveleft").isPlaying&&(this.animator.play("moveleft"),cc.audioEngine.play(this.walkingAudio,!1,.5)),this.latestDirection="left";break;case cc.macro.KEY.right:this.rigibody.linearVelocity=cc.v2(Math.abs(this.stepSize*t),0),0==this.animator.getAnimationState("moveright").isPlaying&&(this.animator.play("moveright"),cc.audioEngine.play(this.walkingAudio,!1,.5)),this.latestDirection="right";break;case cc.macro.KEY.space:this.rigibody.linearVelocity=cc.v2(0,0),this.spaceFunc(t),this.currentMovingType=cc.macro.KEY.escape;break;case cc.macro.KEY.escape:break;default:this.rigibody.linearVelocity=cc.v2(0,0),this.animator.stop()}},e.prototype.goSit=function(){var t=this;this.rigibody.linearVelocity=cc.v2(0,0),this.node.stopAllActions(),this.disableDetectInput=!0,this.currentMovingType=cc.macro.KEY.escape;var e=function(){t.disableDetectInput=!1,t.animator.off("finished",e,this)};t.animator.on("finished",e,this),t.animator.play("sit")},e.prototype.getCurrentAction=function(){for(var t=["moveup","movedown","moveright","moveleft","eat","sit","right","left","front","back"],e=0;e<t.length;e++)if(1==this.animator.getAnimationState(t[e]).isPlaying)return t[e];return""},e.prototype.goEat=function(t){this.disableDetectInput=!0;var e,o=this,i=cc.sequence(cc.callFunc(function(){e=cc.audioEngine.play(o.walkingAudio,!0,.5),o.node.position.y-o.targetPositionNode.y>1e-5?0==o.animator.getAnimationState("movedown").isPlaying&&o.animator.play("movedown"):o.node.position.y-o.targetPositionNode.y<-1e-5&&0==o.animator.getAnimationState("moveup").isPlaying&&o.animator.play("moveup")}),cc.moveTo(Math.abs(this.node.position.y-this.targetPositionNode.y)/(this.stepSize*t),cc.v2(this.node.position.x,this.targetPositionNode.y)),cc.callFunc(function(){o.node.position.x-o.targetPositionNode.x>1e-5?0==o.animator.getAnimationState("moveleft").isPlaying&&o.animator.play("moveleft"):o.node.position.x-o.targetPositionNode.x<-1e-5&&0==o.animator.getAnimationState("moveright").isPlaying&&o.animator.play("moveright")}),cc.moveTo(Math.abs(this.node.position.x-this.targetPositionNode.x)/(this.stepSize*t),cc.v2(this.targetPositionNode.x,this.targetPositionNode.y)),cc.callFunc(function(){cc.audioEngine.stop(e);var t=cc.audioEngine.play(o.eatAudio,!0,.5),i=function(){o.disableDetectInput=!1,o.potFood.destroy(),o.spaceFunc=o.goNod,o.latestDirection="back",cc.audioEngine.stop(t),o.animator.off("finished",i,this)};o.animator.on("finished",i,this),o.animator.play("eat")}));this.node.runAction(i)},e.prototype.goNod=function(t){if(this.animator.getAnimationState("left")&&this.animator.getAnimationState("right")&&this.animator.getAnimationState("front")&&this.animator.getAnimationState("back")&&1!=this.animator.getAnimationState("left").isPlaying&&1!=this.animator.getAnimationState("right").isPlaying&&1!=this.animator.getAnimationState("front").isPlaying&&1!=this.animator.getAnimationState("back").isPlaying){cc.audioEngine.play(this.nodAudio,!1,.5),window.nodCount++;var e=this;this.disableDetectInput=!0;var o=function(){e.disableDetectInput=!1,e.animator.off("finished",o,this)};e.animator.on("finished",o,this),e.animator.play(this.latestDirection)}},e.prototype.onKeyDown=function(t){if(!this.disableDetectInput)switch(t.keyCode){case cc.macro.KEY.up:case cc.macro.KEY.down:case cc.macro.KEY.left:case cc.macro.KEY.right:case cc.macro.KEY.space:this.currentMovingType=t.keyCode}},e.prototype.onKeyUp=function(t){if(!this.disableDetectInput)switch(t.keyCode){case cc.macro.KEY.up:case cc.macro.KEY.down:case cc.macro.KEY.left:case cc.macro.KEY.right:this.currentMovingType==t.keyCode&&(this.currentMovingType=null)}},e.prototype.onBeginContact=function(t,e,o){o.node==this.potFood&&(this.hint_eat.active=!0,this.hint_nod.active=!1,this.spaceFunc=this.goEat)},e.prototype.onEndContact=function(t,e,o){o.node==this.potFood&&(this.hint_nod.active=!0,this.hint_eat.active=!1,this.spaceFunc=this.goNod)},__decorate([c({type:cc.Integer})],e.prototype,"stepSize",void 0),__decorate([c(cc.AnimationClip)],e.prototype,"moveUp",void 0),__decorate([c(cc.AnimationClip)],e.prototype,"moveDown",void 0),__decorate([c(cc.AnimationClip)],e.prototype,"moveRight",void 0),__decorate([c(cc.AnimationClip)],e.prototype,"moveLeft",void 0),__decorate([c(cc.AnimationClip)],e.prototype,"eat",void 0),__decorate([c(cc.AnimationClip)],e.prototype,"nodright",void 0),__decorate([c(cc.AnimationClip)],e.prototype,"nodleft",void 0),__decorate([c(cc.AnimationClip)],e.prototype,"nodfront",void 0),__decorate([c(cc.AnimationClip)],e.prototype,"nodback",void 0),__decorate([c(cc.AnimationClip)],e.prototype,"sit",void 0),__decorate([c(cc.AudioClip)],e.prototype,"nodAudio",void 0),__decorate([c(cc.AudioClip)],e.prototype,"eatAudio",void 0),__decorate([c(cc.AudioClip)],e.prototype,"walkingAudio",void 0),__decorate([c(cc.Node)],e.prototype,"potFood",void 0),__decorate([c(cc.Node)],e.prototype,"hint_nod",void 0),__decorate([c(cc.Node)],e.prototype,"hint_eat",void 0),__decorate([c(cc.Node)],e.prototype,"targetPositionNode",void 0),e=__decorate([n],e)}(cc.Component);o.default=a,cc._RF.pop()},{}],NetWrokManger:[function(t,e,o){"use strict";cc._RF.push(e,"5a0faI1wBpAwp1zoS/F470e","NetWrokManger"),Object.defineProperty(o,"__esModule",{value:!0});var i=function(){function t(){}return t.getAllRecords=function(t){var e=document.createElement("script");e.src="https://script.google.com/macros/s/AKfycbwk1bNZccy5l6yYKtYd1VAcPuOCkyxAb69DEXHF7z0-2lDhYBDB/exec?callback=getRequestCallBack",document.body.appendChild(e),window.requestOnFinishedFunction=t},t.saveFile=function(t){var e=t.compress(),o=document.createElement("script");o.src="https://script.google.com/macros/s/AKfycbwk1bNZccy5l6yYKtYd1VAcPuOCkyxAb69DEXHF7z0-2lDhYBDB/exec?data="+e+"&callback=getRequestCallBack",document.body.appendChild(o)},t.isEnglish=function(){return-1!=window.location.href.indexOf("english")},t}();o.default=i,cc._RF.pop()},{}],NumberIcrease:[function(t,e,o){"use strict";cc._RF.push(e,"c343a4Cyy5C17sKsGpjU0OI","NumberIcrease"),Object.defineProperty(o,"__esModule",{value:!0});var i=cc._decorator,n=i.ccclass,c=(i.property,function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.lable=null,e.runTime=7,e.accumlateTime=0,e.goalNumber=100,e}return __extends(e,t),e.prototype.start=function(){this.lable=this.getComponent(cc.Label),this.lable.string="0"},e.prototype.update=function(t){this.accumlateTime+=t;var e=this.accumlateTime/this.runTime,o=Math.floor(e*e*this.goalNumber);o>this.goalNumber&&(o=this.goalNumber,this.destroy()),this.lable.string=o.toString()},e=__decorate([n],e)}(cc.Component));o.default=c,cc._RF.pop()},{}],PathDrawer:[function(t,e,o){"use strict";cc._RF.push(e,"3fddathJ31CI7Ssaw0wd1Oc","PathDrawer"),Object.defineProperty(o,"__esModule",{value:!0});var i=t("./AnimationReplay"),n=cc._decorator,c=n.ccclass,a=n.property,r=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.target=null,e.graphics=null,e.path=[],e.drawLine_second=0,e.index=0,e.drawPath=!1,e.loop=!1,e.totalPlayTime=10,e.currentTime=0,e}return __extends(e,t),e.prototype.loadLatestPath=function(){this.path=window.accurate_path,this.drawLine_second=1e3*this.totalPlayTime/this.path.length},e.prototype.smallOut=function(){var t=cc.sequence(cc.delayTime(1),cc.scaleTo(1,0,0));this.node.parent.runAction(t)},e.prototype.update=function(t){if(!(this.path.length<=0)){this.currentTime+=t;var e=1e3*this.currentTime;this.index<this.path.length-1&&e>this.drawLine_second&&(this.graphics.moveTo(this.path[this.index].pos.x,this.path[this.index].pos.y),this.graphics.lineTo(this.path[this.index+1].pos.x,this.path[this.index+1].pos.y),this.target.node.position=this.path[this.index+1].pos,this.target.setAnimation(this.path[this.index+1].animation),this.drawPath&&this.graphics.stroke(),this.index++,this.currentTime=0),this.index>=this.path.length-1&&(this.loop?(this.graphics.clear(),this.currentTime=0,this.index=0):this.target.end())}},__decorate([a(i.default)],e.prototype,"target",void 0),__decorate([a(cc.Graphics)],e.prototype,"graphics",void 0),__decorate([a],e.prototype,"drawPath",void 0),__decorate([a],e.prototype,"loop",void 0),__decorate([a],e.prototype,"totalPlayTime",void 0),e=__decorate([c],e)}(cc.Component);o.default=r,cc._RF.pop()},{"./AnimationReplay":"AnimationReplay"}],PathRecorder:[function(t,e,o){"use strict";cc._RF.push(e,"7acceozVY5M2KuBhpbSj2sC","PathRecorder"),Object.defineProperty(o,"__esModule",{value:!0});var i=t("./NetWrokManger"),n=t("./MovingController"),c=cc._decorator,a=c.ccclass,r=c.property,s=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.recordFPS=.1,e.target=null,e.accumulateTime=0,e}return __extends(e,t),e.prototype.onLoad=function(){this.init(),this.accumulateTime=0},e.prototype.init=function(){window.path=[],window.accurate_path=[]},e.prototype.update=function(t){var e=1e3/this.recordFPS;this.accumulateTime+=t;var o=Math.round(1e3*this.accumulateTime);this.target&&o%10==0&&window.accurate_path.push({pos:this.target.node.position,animation:this.target.getCurrentAction()}),o<=e||(this.accumulateTime=0,this.target&&window.path.push({pos:this.target.node.position,animation:this.target.getCurrentAction()}))},e.prototype.getPath=function(){return window.path},e.prototype.passPathToServer=function(){i.default.saveFile(JSON.stringify(window.path))},__decorate([r],e.prototype,"recordFPS",void 0),__decorate([r(n.default)],e.prototype,"target",void 0),e=__decorate([a],e)}(cc.Component);o.default=s,cc._RF.pop()},{"./MovingController":"MovingController","./NetWrokManger":"NetWrokManger"}],PathReplay:[function(t,e,o){"use strict";cc._RF.push(e,"31bccum8BRMu76nU62Sn7ha","PathReplay"),Object.defineProperty(o,"__esModule",{value:!0});var i=cc._decorator,n=i.ccclass,c=(i.property,function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return __extends(e,t),e.prototype.onLoad=function(){},e.prototype.start=function(){},e=__decorate([n],e)}(cc.Component));o.default=c,cc._RF.pop()},{}],ReplayGenerator:[function(t,e,o){"use strict";cc._RF.push(e,"f4adarj255Jp42h+4I56fA2","ReplayGenerator"),Object.defineProperty(o,"__esModule",{value:!0});var i=t("./NetWrokManger"),n=t("./Replay_min"),c=t("./NumberIcrease"),a=cc._decorator,r=a.ccclass,s=a.property,p=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.replayUnit=null,e.nextSceneName="",e.activeWhenLoadAll=null,e}return __extends(e,t),e.prototype.start=function(){var t=this;i.default.getAllRecords(function(e){if(e.length){for(var o=0;o<e.length-1;o++){var i=cc.instantiate(t.replayUnit);i.parent=t.node,i.getComponent(n.default).setDrawPath(e[o])}var c=cc.sequence(cc.delayTime(1),cc.moveTo(1,cc.v2(0,1035*Math.floor(e.length/84))),cc.callFunc(function(){var o=cc.instantiate(t.replayUnit);o.parent=t.node,o.opacity=0,o.getComponent(n.default).setDrawPath(e[e.length-1]);var i=cc.sequence(cc.fadeIn(1),cc.delayTime(3),cc.callFunc(function(){t.node.opacity=0,t.activeWhenLoadAll.node.parent.active=!0,t.activeWhenLoadAll.goalNumber=e.length}),cc.delayTime(10),cc.callFunc(function(){cc.director.loadScene(t.nextSceneName)}));o.runAction(i)}));t.node.runAction(c)}})},__decorate([s(cc.Prefab)],e.prototype,"replayUnit",void 0),__decorate([s],e.prototype,"nextSceneName",void 0),__decorate([s(c.default)],e.prototype,"activeWhenLoadAll",void 0),e=__decorate([r],e)}(cc.Component);o.default=p,cc._RF.pop()},{"./NetWrokManger":"NetWrokManger","./NumberIcrease":"NumberIcrease","./Replay_min":"Replay_min"}],Replay_min:[function(t,e,o){"use strict";cc._RF.push(e,"bb48f9EjTNHYIsONtPW1Hhr","Replay_min"),Object.defineProperty(o,"__esModule",{value:!0});var i=cc._decorator,n=i.ccclass,c=i.property,a=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.drawer=null,e}return __extends(e,t),e.prototype.setDrawPath=function(t){this.drawer.path=t,this.drawer.drawLine_second=1e3*this.drawer.totalPlayTime/this.drawer.path.length},__decorate([c(cc.Component)],e.prototype,"drawer",void 0),e=__decorate([n],e)}(cc.Component);o.default=a,cc._RF.pop()},{}],SelectUIByKeyBoard:[function(t,e,o){"use strict";cc._RF.push(e,"f3276dZjnlP8oR1sLbqJMTP","SelectUIByKeyBoard"),Object.defineProperty(o,"__esModule",{value:!0});var i=cc._decorator,n=i.ccclass,c=i.property,a=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.wakeupbtn=null,e.forestbtn=null,e.keepSleepbtn=null,e.wakeupTag=null,e.forestTag=null,e.keepSleepTag=null,e.hitAudio=null,e.btnArr=[],e.tagArr=[],e._currnetSelect=0,e}return __extends(e,t),Object.defineProperty(e.prototype,"currnetSelect",{get:function(){return this._currnetSelect},set:function(t){this._currnetSelect=t,this.setSelected(t)},enumerable:!0,configurable:!0}),e.prototype.start=function(){this.btnArr.push(this.wakeupbtn,this.forestbtn,this.keepSleepbtn),this.tagArr.push(this.wakeupTag,this.forestTag,this.keepSleepTag),this.currnetSelect=0,cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyDown,this)},e.prototype.setSelected=function(t){var e=this;this.tagArr.forEach(function(t,o){o==e.currnetSelect?t.active=!0:t.active=!1})},e.prototype.onKeyDown=function(t){switch(t.keyCode){case cc.macro.KEY.up:cc.audioEngine.play(this.hitAudio,!1,.5),this.currnetSelect--,this.currnetSelect<0&&(this.currnetSelect=this.tagArr.length-1);break;case cc.macro.KEY.down:cc.audioEngine.play(this.hitAudio,!1,.5),this.currnetSelect++,this.currnetSelect>this.tagArr.length-1&&(this.currnetSelect=0);break;case cc.macro.KEY.space:cc.audioEngine.play(this.hitAudio,!1,.5),this.btnArr[this.currnetSelect].clickEvents[0].emit([]),cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyDown,this)}},__decorate([c(cc.Button)],e.prototype,"wakeupbtn",void 0),__decorate([c(cc.Button)],e.prototype,"forestbtn",void 0),__decorate([c(cc.Button)],e.prototype,"keepSleepbtn",void 0),__decorate([c(cc.Node)],e.prototype,"wakeupTag",void 0),__decorate([c(cc.Node)],e.prototype,"forestTag",void 0),__decorate([c(cc.Node)],e.prototype,"keepSleepTag",void 0),__decorate([c(cc.AudioClip)],e.prototype,"hitAudio",void 0),e=__decorate([n],e)}(cc.Component);o.default=a,cc._RF.pop()},{}],ZindexManager:[function(t,e,o){"use strict";cc._RF.push(e,"c559baKysxJOq2/JO0Yq4cD","ZindexManager"),Object.defineProperty(o,"__esModule",{value:!0});var i=cc._decorator,n=i.ccclass,c=i.property,a=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.settingObj=[],e}return __extends(e,t),e.prototype.update=function(t){this.settingObj.sort(function(t,e){return Math.sign(e.position.y-t.position.y)}),this.settingObj.forEach(function(t,e){t.zIndex=e+1})},__decorate([c(cc.Node)],e.prototype,"settingObj",void 0),e=__decorate([n],e)}(cc.Component);o.default=a,cc._RF.pop()},{}],myLabel:[function(t,e,o){"use strict";cc._RF.push(e,"a1e33zxkIVF1bZZ1YDvixba","myLabel"),Object.defineProperty(o,"__esModule",{value:!0});var i=cc._decorator,n=i.ccclass,c=i.property,a=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.nodestirng=!1,e}return __extends(e,t),e.prototype.start=function(){this.nodestirng&&this.setNodNumber()},e.prototype.setNodNumber=function(){var t=window.nodCount;t&&(this.string=t.toString())},__decorate([c],e.prototype,"nodestirng",void 0),e=__decorate([n],e)}(cc.Label);o.default=a,cc._RF.pop()},{}],"physcis-bound":[function(t,e,o){"use strict";cc._RF.push(e,"5a89f3Kr5pIJ66r98LUHlkB","physcis-bound"),Object.defineProperty(o,"__esModule",{value:!0});var i=cc._decorator,n=i.ccclass,c=i.property,a=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.debug=!1,e.width=0,e.height=0,e}return __extends(e,t),e.prototype.onLoad=function(){cc.director.getPhysicsManager().enabled=!0,cc.director.getPhysicsManager().debugDrawFlags=1==this.debug?1:0,cc.director.getPhysicsManager().gravity=cc.v2(0,0);var t=this.width,e=this.height,o=new cc.Node;o.addComponent(cc.RigidBody).type=cc.RigidBodyType.Static,this._addBound(o,0,e/2,t,20),this._addBound(o,0,-e/2,t,20),this._addBound(o,-t/2,0,20,e),this._addBound(o,t/2,0,20,e),o.parent=this.node},e.prototype._addBound=function(t,e,o,i,n){var c=t.addComponent(cc.PhysicsBoxCollider);c.offset.x=e,c.offset.y=o,c.size.width=i,c.size.height=n},e.prototype.start=function(){cc.director.getPhysicsManager().debugDrawFlags=1==this.debug?1:0},__decorate([c],e.prototype,"debug",void 0),__decorate([c],e.prototype,"width",void 0),__decorate([c],e.prototype,"height",void 0),e=__decorate([n],e)}(cc.Component);o.default=a,cc._RF.pop()},{}]},{},["AnimationReplay","Counter","Global","LangugeSwitch","MovingController","NetWrokManger","NumberIcrease","PathDrawer","PathRecorder","PathReplay","ReplayGenerator","Replay_min","SelectUIByKeyBoard","ZindexManager","myLabel","physcis-bound"]);