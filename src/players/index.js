/*
 * @Author: mayx 1019724021@qq.com
 * @Date: 2025-06-05 11:15:39
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2025-07-04 11:01:11
 * @FilePath: \test\src\players\load.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%A
 */
import { Physics } from "phaser";
import { createdPlayer, actionConfigList } from "../utils/utils";
import { Bullet } from "./Bullet";
export class Player extends Physics.Arcade.Image {
    playerSprite;
    HpText;
    HP;
    fullHp;
    scene;
    originalSpeed = 160;
    speed = this.originalSpeed;
    jump = 250;
    activeEffect = null;
    effectTimer = null;
    isCheckMode = false;
    bullets = null;
    scoreStyle = {
        fontSize: '24px',
        fill: '#fff',
    };
    constructor({ scene,hp=100 }) {
        const { x, y, key } = createdPlayer;
        super(scene, x, y, key);
        this.scene = scene;
        this.HP = hp;
        this.fullHp = hp;
        // this.scene.add.existing(this); //
        // 在子类中保存物理效果
        // this.scene.physics.add.existing(this);
        this.playerSprite = this.scene.physics.add.sprite(this.x, this.y, key).setCollideWorldBounds(true); // 手动创建唯一精灵
        this.preLoadActions(this.prePlayerActions(actionConfigList));
        this.playerSprite.play('turn');
        this.setDepth(100);
        this.name = key;
        // bullet
        this.bullets = this.scene.physics.add.group({
            classType: Bullet,//自定义子对象类
            maxSize: 100,
            runChildUpdate: true,//是否自动调用子对象update()
            allowGravity:false
        })
        this.HpText = this.scene.add.text(16, 46, `血量:`, { ...this.scoreStyle });
        
    }
    applyEffect(type, multiplier) {
        // 清除旧效果
        if (this.effectTimer) {
            this.effectTimer.destroy();
            this.speed = this.originalSpeed;
        }
        this.activeEffect = type;
        this.speed = this.originalSpeed * multiplier;

        this.effectTimer = this.scene.time.delayedCall(2000, () => {
            this.speed = this.originalSpeed;
            this.activeEffect = null;
        })
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
        if (this.activeEffect) return;
        this.applyEffect('speed', 2);
        this.changePlayerColor(player, 0xffff00, 2000, true);
    }
    collectBombsSpeed(player) {
        if (this.activeEffect) return;
        this.applyEffect('slow', 0.5);
        this.changePlayerColor(player, 0xff0000, 2000);
    }
    changePlayerColor(player, color, delay = 100, isShow = false) {
        if (!player) return;
        player.setTint(color);
        if (isShow) { player.postFX.addBloom(0xffffff, 1, 1, 2, 1.2) };
        setTimeout(() => {
            player.clearTint()
            player.postFX.clear();
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
    // fire
    fire(x, y) {
        const bullet = this.bullets.get(x,y,'bullet');      
        const { body: { x: player_x, y: player_y } } = this.playerSprite;
        if (bullet) {
            bullet.fire(player_x + 16, player_y + 36, x, y);
        }
    }
}