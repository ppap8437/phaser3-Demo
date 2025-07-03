/*
 * @Author: mayx 1019724021@qq.com
 * @Date: 2025-06-19 17:41:23
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2025-07-03 16:56:18
 * @FilePath: \test\src\GameObjectsPool\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { Physics } from "phaser";
// 存放游戏对象的集合池，除了玩家之外
export class GameObjectsPool extends Physics.Arcade.Image {
    scene;
    star;
    bombs;
    constructor({ scene }) {
        super(scene);// Physics.Arcade.Image父类继承机制 强制要求传入场景实例作为第一个参数
        this.scene = scene;
        this.name = 'gamePool'
        this.init();
    }
    init() {
        this.initStars();
        this.initBombs();
    }
    initStars() {
        this.star = this.scene.physics.add.group({
            key: 'star',
            repeat: 1,
            setXY: {
                x: 12,
                y: 0,
                stepX: 70,
            }
        })
        this.star.children.iterate(function (child) {
            child.setBounceY(Phaser.Math.FloatBetween(.4, .8)).setCollideWorldBounds(true);
        })

    }
    initBombs() {
        this.bombs = this.scene.physics.add.group();
    }
    // 检测玩家是否碰到星星
    collectStar(player, star) {
        star.disableBody(true, true);
        this.score += 10;
        this.scoreText.setText('得分:' + this.score);
        this.player.collectSpeedBoost(player);
        if (this.gamePool.star.countActive(true) === 0) {
            var nextStarPosition = player.x < 350 ? Phaser.Math.Between(350, 800) : Phaser.Math.Between(0, 350);
            this.gamePool.star.create(nextStarPosition, 16, 'star').setBounce(1).setVelocity(Phaser.Math.Between(-180, 200), 20)
                .setCollideWorldBounds(true);
            this.gamePool.showBombs(player);
        }
    }
    explode(bombs, damage) {
        if (!bombs || !damage) return;
        bombs.setData('health', bombs.getData('health') - damage);
        if (bombs.getData('health') <= 0) {
            bombs.setData('currentStep', 0);
            bombs.setActive(false);
            bombs.setVisible(false);
            bombs.destroy();
        }
    }

    showBombs(player) {
        const nextBombsPosition = Phaser.Math.Between(player.x - 30, player.x + 30);
        if (this.bombs.countActive(true) < 2) {
            this.bombs.create(nextBombsPosition, 16, 'bombs').setBounce(1)
                .setCollideWorldBounds(true).setVelocity(Phaser.Math.Between(-200, 200), 20).setData('health', 100).setData({
                    health: 100,
                    owner: player,
                    name: 'bombs_' + player.x,
                    currentStep: 0,
                });


        }
    }

    // 检测玩家是否碰到炸弹
    hitBomb(player, bombs) {
        bombs.disableBody(true, true);
        console.log(this);
        this.playerHealth.se
        this.player.HP -= 20;
        this.player.HpText.setText('血量:' + this.player.HP);
        this.player.collectBombsSpeed(player);
        if (this.player.HP <= 0) {
            player.anims.play('turn');
            this.gameOver = true;
            this.physics.pause();
            return;
        }
    }
}