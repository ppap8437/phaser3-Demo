/*
 * @Author: mayx 1019724021@qq.com
 * @Date: 2025-05-19 15:39:38
 * @LastEditors: mayx 1019724021@qq.com
 * @LastEditTime: 2025-06-25 16:15:04
 * @FilePath: \test\src\scenes\load.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Scene } from "phaser";
import { Player } from "../players";
import { Platforms } from "../platforms";
import { GameObjectsPool } from "../GameObjectsPool";
export default class LoadScene extends Scene {
    platforms;
    player = null;
    cursors;
    start;
    parentScene;
    isCheckMode = false;
    gameOver = false;
    scoreText;
    score = 0;
    scoreStyle = {
        fontSize: '24px',
        fill: '#fff',
        padding: { x: 0, y: 3 },
        // backgroundColor:'red'
    }
    constructor() {
        super("LoadScene");
    }
    playerMove() {
        
        if (this.cursors.left.isDown) {
            this.player.move("left");
        }
        else if (this.cursors.right.isDown) {
            this.player.move("right");
        }
        // 调试模式
        else if (this.cursors.shift.isDown) {
            this.isCheckMode = true;
        }
        else {
            this.player.move();
        }
        if (this.cursors.space.isDown && this.player.playerSprite.body.touching.down) {
            this.player.move("space");
        }
    }
    init({ parentScene }) {
        this.parentScene = parentScene;
    }

    create() {
        this.scoreText = this.add.text(16, 16, `得分:${this.score}`, { ...this.scoreStyle });
        // 
        this.player = new Player({ scene: this });
        // 
        this.platforms = new Platforms({ scene: this });
        // 
        this.gamePool = new GameObjectsPool({ scene: this });
        const { playerSprite } = this.player;
        const { gamePlatforms } = this.platforms;
        const { star, bombs, collectStar, hitBomb } = this.gamePool;

        // 碰撞器（Collider）是施魔法的地方。它接收两个对象，检测二者之间的碰撞，并使二者分开。
        this.physics.add.collider(gamePlatforms, star);
        this.physics.add.collider(bombs, gamePlatforms);
        this.physics.add.collider(playerSprite, bombs, hitBomb, null, this);
        this.physics.add.collider(star);
        this.physics.add.collider(bombs);
        this.physics.add.collider(playerSprite, gamePlatforms);
        this.physics.add.overlap(playerSprite, star, collectStar, null, this);
        this.cursors = this.input.keyboard.createCursorKeys();
    }
    update() {
        this.playerMove();
    }
}

