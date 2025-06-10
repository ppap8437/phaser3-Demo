/*
 * @Author: mayx 1019724021@qq.com
 * @Date: 2025-06-05 11:15:39
 * @LastEditors: mayx 1019724021@qq.com
 * @LastEditTime: 2025-06-10 09:40:08
 * @FilePath: \test\src\players\load.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Scene } from "phaser";
import { preLoadResource, createdPlayer, actionConfigList, preLoadSpritesheet } from "../utils/utils";
export class PlayerScene extends Scene {
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
        super(scene, "PlayerScene");
        this.scene = scene;
    }
    preload() {

    }
    changePlayerStatus() {
        console.log(this.score);
        // 一次性得分超过50，速度加速
        if (this.score >= 50) {
            this.player.body.setVelocity(200);
        }
    }
    create() {
        // 输入
        this.cursors = this.input.keyboard.createCursorKeys();
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