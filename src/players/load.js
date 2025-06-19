/*
 * @Author: mayx 1019724021@qq.com
 * @Date: 2025-06-05 11:15:39
 * @LastEditors: mayx 1019724021@qq.com
 * @LastEditTime: 2025-06-12 17:11:58
 * @FilePath: \test\src\players\load.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Physics } from "phaser";
import { preLoadResource, createdPlayer, actionConfigList } from "../utils/utils";
export class Player extends Physics.Arcade.Image {
    playerInfo;
    cursors;
    player;
    scoreText;
    score = 0;
    scene;
    isCheckMode = false;
    actionConfigList = [];
    scoreStyle = {
        fontSize: '32px',
        fill: '#fff',
    };
    constructor({ scene }) {
        const { x, y, key } = createdPlayer;
        super(scene, x, y, key);
        this.scene = scene;
        this.scene.add.existing(this);
        // 在子类中保存物理效果
        this.scene.physics.add.existing(this);
    }
    // 批量创建角色动作
    preLoadActions(actionConfigList) {
        if (actionConfigList.length === 0 || !Array.isArray(actionConfigList)) return;
        for (let index = 0; index < actionConfigList.length; index++) {
            if (!actionConfigList[index].key || actionConfigList[index].key.trim() === '') break;
            this.scene.anims.create({ ...actionConfigList[index] })
        }
    }

    // 处理导入角色和角色动作函数
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
    changePlayerStatus() {
        console.log(this.score);
        // 一次性得分超过50，速度加速
        if (this.score >= 50) {
            this.player.body.setVelocity(200);
        }
    }
    preload() {

    }
    create() {
        // 输入
        // 创建文字
        this.scoreText = this.add.text(100, 50, '得分:0', { ...this.scoreStyle });
    }
    update() {
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
            this.player.anims.play('left', true);
        }
        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
            this.player.anims.play('right', true);
        }
        // 调试模式
        else if (this.cursors.shift.isDown) {
            this.isCheckMode = !this.isCheckMode;
            // this.showBombs(this.player);
        }
        else {
            this.player.setVelocityX(0);
            this.player.anims.play('turn');
        }

        if (this.cursors.space.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-330);
        }
    }
}