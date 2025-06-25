/*
 * @Author: mayx 1019724021@qq.com
 * @Date: 2025-06-05 11:15:39
 * @LastEditors: mayx 1019724021@qq.com
 * @LastEditTime: 2025-06-25 16:14:45
 * @FilePath: \test\src\players\load.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%A
 */
import { Physics } from "phaser";
import { createdPlayer, actionConfigList } from "../utils/utils";
export class Player extends Physics.Arcade.Image {
    playerSprite;
    HpText;
    HP = 100;
    score = 0;
    scene;
    speed = 160;
    jump = 250;
    isSpeed = false;
    isSlow = false;
    originalSpeed = 160;
    isCheckMode = false;
    scoreStyle = {
        fontSize: '24px',
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
        this.HpText = this.scene.add.text(16, 46, `血量:${this.HP}`, { ...this.scoreStyle });

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
    // 
    collectSpeedBoost(player) {
        // 防止速度无限叠加 （或者说有次数上限）
        if (this.isSpeed) { return };
        this.originalSpeed = this.speed;
        this.isSpeed = true;
        this.speed *= 2;
        this.changePlayerColor(player, 0xffff00, 2000);
        this.scene.time.delayedCall(2000, () => {
            this.isSpeed = false;
            this.speed = this.originalSpeed;
        })
    }
    collectBombsSpeed(player) {
        if (this.isSlow) { return; }
        this.isSlow = true;
        this.speed = this.originalSpeed;
        this.speed /= 2;
        this.changePlayerColor(player, 0xff0000, 2000);
        this.scene.time.delayedCall(2000, () => {
            this.isSlow = false;
            this.speed = this.originalSpeed;
        })
    }
    changePlayerColor(player, color, delay = 100) {
        if (!player) return;
        player.setTint(color);
        setTimeout(() => {
            player.clearTint()
        }, delay);
    }
    move(direction) {
        // play()
        //  key=>指定要播放的动画名称或动画配置中的key,
        // ignoreIfPlaying=>如果当前正在播放相同动画，则忽略本次调用,
        // startFrame=>可选参数，指定从动画的第几帧开始播放,‌
        // 返回值=>返回当前游戏对象（支持链式调用）
        if (typeof this.speed !== 'number' || typeof this.jump !== 'number') return;
        if (direction === "left") {
            this.playerSprite.setVelocityX(-this.speed);
            this.playerSprite.play('left', true);
        } else if (direction === "right") {
            this.playerSprite.setVelocityX(this.speed);
            this.playerSprite.play('right', true);
        } else {
            this.playerSprite.setVelocityX(0);
            this.playerSprite.play('turn');
        }
        if (direction === 'space') {
            this.playerSprite.setVelocityY(-this.jump);
        }
    }
}