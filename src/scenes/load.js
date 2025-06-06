/*
 * @Author: mayx 1019724021@qq.com
 * @Date: 2025-05-19 15:39:38
 * @LastEditors: mayx 1019724021@qq.com
 * @LastEditTime: 2025-06-06 16:09:00
 * @FilePath: \test\src\scenes\load.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Phaser, { Physics } from "phaser";
import { playerData } from "../players/load";
export default class LoadScene extends Phaser.Scene {
    platforms;
    player;
    cursors;
    start;
    bombs;
    score = 0;
    scoreText;
    isCheckMode = false;
    gameOver = false;
    scoreStyle = {
        fontSize: '32px',
        fill: '#fff',
    }
    constructor() {
        super("LoadScene");
    }
    // 检测玩家是否碰到星星
    collectStar(player, start) {
        start.disableBody(true, true);
        this.score += 10;
        this.scoreText.setText('得分:' + this.score);
        this.changePlayerStatus();
        var test = this.player.x < 350 ? Phaser.Math.Between(350, 800) : Phaser.Math.Between(0, 350);
        const newBomb = this.start.create(test, 16, 'star');
        newBomb.setBounce(1);
        newBomb.setCollideWorldBounds(true);
        newBomb.setVelocity(Phaser.Math.Between(-180, 200), 20);
        if (this.start.countActive(true) === 0) {
            this.showBombs();
        }
    }
    hitBomb() {
        this.physics.pause();
        this.player.setTint(0xff0000);
        this.player.anims.play('turn');
        this.gameOver = true;
    }
    showBombs() {
        if (this.isCheckMode) {
            this.scoreText.setText('调试模式');
            this.start.clear(true, true);
        }
        this.start.children.iterate(function (child) {
            child.enableBody(true, child.x, 0, true, true);
        })
        var x = (this.player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
        var bomb = this.bombs.create(x, 16, 'bombs');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    }
    generateCollider(object1, object2, collideCallback, processCallback, callbackContext) {
        if (!object1 && !object2) return new Error('require collider Object Name!')
        this.physics.add.collider(object1, object2, collideCallback, processCallback, callbackContext);
        // return 
    }
    preload() {
        this.load.setBaseURL('assets');
        this.load.image('sky', 'skies/space3.png');
        this.load.image('logo', 'sprites/phaser3-logo.png');
        this.load.image('ground', 'sprites/s1.png');
        this.load.image('red', 'particles/red.png');
        this.load.image('star', 'particles/star.png');
        this.load.image('bombs', 'particles/bomb.png');
    }
    create() {
        // 
        this.scene.launch('PlayerScene');
        this.add.image(400, 300, 'sky');
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();
        this.platforms.create(600, 400, 'ground');
        this.platforms.create(50, 250, 'ground');
        this.platforms.create(750, 220, 'ground');
        // start
        this.start = this.physics.add.group({
            key: 'star',
            repeat: 1,
            setXY: {
                x: 12,
                y: 0,
                stepX: 70,
            }
        })
        this.bombs = this.physics.add.group();

        // 碰撞器（Collider）是施魔法的地方。它接收两个对象，检测二者之间的碰撞，并使二者分开。
        // this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.platforms, this.start);
        this.physics.add.collider(this.bombs, this.platforms);
        // this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);
        this.physics.add.collider(this.start);
        // this.physics.add.overlap(this.player, this.start, this.collectStar, null, this);
        // 
        this.start.children.iterate(function (child) {
            child.setBounceY(Phaser.Math.FloatBetween(.4, .8))
        })
    }
    update() {
    }
}

