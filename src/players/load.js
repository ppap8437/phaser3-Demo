/*
 * @Author: mayx 1019724021@qq.com
 * @Date: 2025-06-05 11:15:39
 * @LastEditors: mayx 1019724021@qq.com
 * @LastEditTime: 2025-06-06 17:58:57
 * @FilePath: \test\src\players\load.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Phaser from "phaser";
export class PlayerScene extends Phaser.Scene {
    playerInfo;
    #player;
    cursors;
    scoreText;
    score = 0;
    isCheckMode = false;
    actionConfigList = [];
    scoreStyle = {
        fontSize: '32px',
        fill: '#fff',
    };
    constructor(player, actionConfigList) {
        super('PlayerScene');
        this.actionConfigList = actionConfigList;
        this.playerInfo = player;
    }
    // 批量创建角色动作
    preLoadActions(actionConfigList) {
        if (actionConfigList.length === 0 || !Array.isArray(actionConfigList)) return;
        for (let index = 0; index < actionConfigList.length; index++) {
            if (!actionConfigList[index].key || actionConfigList[index].key.trim() === '') break;
            this.anims.create({ ...actionConfigList[index] })
        }
    }

    // 处理导入角色和角色动作函数
    prePlayerActions(playerInfo, array) {
        const res = [], pushData = {};
        if (!Array.isArray(array) || Object.keys(playerInfo).length === 0) return;
        try {
            const { x, y, key, frame = 0 } = playerInfo;
            // 对玩家的设置
            this.#player = this.physics.add.sprite(x, y, key);
            this.#player.setBounce(.2);
            this.#player.body.setGravityY(150);
            this.#player.setCollideWorldBounds(true);
        } catch (error) {
            return new Error(error);
        }
        for (let i = 0; i < array.length; i++) {
            for (const [index, value] of Object.entries(array[i])) {
                // console.log(index, value);
                pushData = {
                    index: value,
                }
                if (index === 'frames' && typeof value[Symbol.iterator] !== 'function') {
                    console.log(value);

                }

            }
            // res.push({

            // })
        }
        return array;
    }
    preload() {
        this.load.setBaseURL('assets');
        this.load.spritesheet('dude', 'players/dude.png', { frameWidth: 32, frameHeight: 48 })
    }
    changePlayerStatus() {
        console.log(this.score);
        // 一次性得分超过50，速度加速
        if (this.score >= 50) {
            this.#player.body.setVelocity(200);
        }
    }
    create() {
        this.prePlayerActions(this.playerInfo, this.actionConfigList);
        this.actionConfigList = [
            {
                key: 'left',
                frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
                frameRate: 10,
                repeat: -1
            },
            {
                key: 'turn',
                frames: [{ key: 'dude', frame: 4 }],
                frameRate: 20
            },
            {
                key: 'right',
                frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
                frameRate: 10,
                repeat: -1
            }
        ];

        // 输入
        this.cursors = this.input.keyboard.createCursorKeys();
        // 创建文字
        this.scoreText = this.add.text(100, 50, '得分:0', { ...this.scoreStyle });
        this.preLoadActions(this.actionConfigList);
    }
    update() {
        if (this.cursors.left.isDown) {
            this.#player.setVelocityX(-160);
            this.#player.anims.play('left', true);
        }
        else if (this.cursors.right.isDown) {
            this.#player.setVelocityX(160);

            this.#player.anims.play('right', true);
        }
        // 调试模式
        else if (this.cursors.shift.isDown) {
            this.isCheckMode = !this.isCheckMode;
            // this.showBombs(this.#player);
        }
        else {
            this.#player.setVelocityX(0);
            this.#player.anims.play('turn');
        }

        if (this.cursors.space.isDown && this.#player.body.touching.down) {
            this.#player.setVelocityY(-330);
        }
    }
}
const playerData = new PlayerScene();
export { playerData };