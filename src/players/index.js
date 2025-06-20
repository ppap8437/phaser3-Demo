/*
 * @Author: mayx 1019724021@qq.com
 * @Date: 2025-06-05 11:15:39
 * @LastEditors: mayx 1019724021@qq.com
 * @LastEditTime: 2025-06-20 14:44:25
 * @FilePath: \test\src\players\load.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%A
 */
import { Physics } from "phaser";
import { createdPlayer, actionConfigList } from "../utils/utils";
export class Player extends Physics.Arcade.Image {
    cursors;
    playerSprite;
    scoreText;
    score = 0;
    scene;
    isCheckMode = false;
    scoreStyle = {
        fontSize: '32px',
        fill: '#fff',
    };
    constructor({ scene }) {
        super(scene);
        this.scene = scene;
        const { x, y, key } = createdPlayer;
        // this.scene.add.existing(this); //
        // 在子类中保存物理效果
        // this.scene.physics.add.existing(this);
        this.playerSprite = this.scene.physics.add.sprite(x, y, key).setCollideWorldBounds(true); // 手动创建唯一精灵
        this.preLoadActions(this.prePlayerActions(actionConfigList));
        this.playerSprite.play('turn');
        this.setDepth(100);
    }
    // 批量创建角色动作
    preLoadActions(actionConfigList) {
        if (actionConfigList.length === 0 || !Array.isArray(actionConfigList)) return;
        for (let index = 0; index < actionConfigList.length; index++) {
            if (!actionConfigList[index].key || actionConfigList[index].key.trim() === '') break;
            let res = this.scene.anims.create({ ...actionConfigList[index] });
        }
    }
    // 处理导入角色和角色动作函数，预加载动画
    prePlayerActions(array) {
        const res = [], pushData = {};
        if (!Array.isArray(array)) return;
        for (let i = 0; i < array.length; i++) {
            for (const [index, value] of Object.entries(array[i])) {
                if (index === 'frames' && typeof value[Symbol.iterator] !== 'function') {
                    pushData[index] = this.scene.anims.generateFrameNumbers(value.key, { ...value.config });
                } else pushData[index] = value;
            }
            res.push({ ...pushData })
        }
        return res;
    }
    // changePlayerStatus() {
    //     console.log(this.score);
    //     // 一次性得分超过50，速度加速
    //     if (this.score >= 50) {
    //         this.player.body.setVelocity(200);
    //     }
    // }
    move(direction) {
        // play()
        //  key=>指定要播放的动画名称或动画配置中的key,
        // ignoreIfPlaying=>如果当前正在播放相同动画，则忽略本次调用,
        // startFrame=>可选参数，指定从动画的第几帧开始播放,‌
        // 返回值=>返回当前游戏对象（支持链式调用）
        if (direction === "left") {
            this.playerSprite.setVelocityX(-160);
            this.playerSprite.play('left', true);
        } else if (direction === "right") {
            this.playerSprite.setVelocityX(160);
            this.playerSprite.play('right', true);
        } else {
            this.playerSprite.setVelocityX(0);
            this.playerSprite.play('turn');
        }
        if (direction === 'space') {
            this.playerSprite.setVelocityY(-250);
        }
    }
}