/*
 * @Author: mayx 1019724021@qq.com
 * @Date: 2025-05-19 15:39:38
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2025-07-04 11:07:46
 * @FilePath: \test\src\scenes\load.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Scene, Input } from "phaser";
import { Player } from "../players";
import { Platforms } from "../platforms";
import { HealthBar } from "../players/healthBar";
import { GameObjectsPool } from "../GameObjectsPool";
export default class LoadScene extends Scene {
    platforms;
    player = null;
    cursors;
    currentStep = 0;
    isCheckMode = false;
    gameOver = false;
    scoreText;
    score = 0;
    test = '我是哈基米';
    playerHealth;
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
        if (this.cursors.jump.isDown && this.player.playerSprite.body.touching.down) {
            this.player.move("space");
        }
    }

    create() {
        this.scoreText = this.add.text(16, 16, `得分:${this.score}`, { ...this.scoreStyle });
        this.playerHealth = new HealthBar(this, 16, 46, 100);
        // 
        this.player = new Player({ scene: this,hp:200 });

        // 
        this.platforms = new Platforms({ scene: this });
        // 
        this.gamePool = new GameObjectsPool({ scene: this });
        const { playerSprite, bullets } = this.player;
        const { gamePlatforms } = this.platforms;
        const { star, bombs, collectStar, hitBomb, explode } = this.gamePool;
        // 碰撞器（Collider）是施魔法的地方。它接收两个对象，检测二者之间的碰撞，并使二者分开。
        this.physics.add.collider(gamePlatforms, star);
        this.physics.add.collider(bombs, gamePlatforms);
        this.physics.add.collider(playerSprite, bombs, hitBomb, null, this);
        this.physics.add.collider(star);
        this.physics.add.collider(bombs);
        this.physics.add.collider(playerSprite, gamePlatforms);
        this.physics.add.overlap(playerSprite, star, collectStar, null, this);
        //         
        const { W, S, D, A, F, SPACE, SHIFT } = Input.Keyboard.KeyCodes;
        this.cursors = this.input.keyboard.addKeys({ 'up': W, 'down': S, 'left': A, 'right': D, 'fire': F, 'jump': SPACE, 'shift': SHIFT })
        // 键盘监听事件只能放在created函数中，放在update中会导致事件重复绑定，导致内存溢出
        this.cursors.fire.on("down", () => {
            this.player.fire();
        });
        this.input.on("pointerdown", ({ x, y } = pointer) => {
            this.player.fire(x, y);
        });
        // 监听子弹
        this.physics.add.overlap(bullets, bombs, (bullet, bombs) => {
            const { damage } = bullets.get();
            let current = bombs.getData('currentStep');
            const all = Math.round(bombs.getData('health') / damage) + 2;
            bullet.destroyBullet();
            bombs.setData('currentStep', ++current);
            const res = this.darkenColorLinear(0xffffff, 0xFF0000, all, bombs.getData('currentStep'));
            explode(bombs, damage);
            bombs.setTint(res);
        })
        this.physics.add.overlap(bullets, gamePlatforms, bullet => {
            bullet.destroyBullet();
        })
    }
    darkenColorLinear(startColor, endColor, steps, currentStep) {
        const start = Phaser.Display.Color.IntegerToColor(startColor);
        const end = Phaser.Display.Color.IntegerToColor(endColor);
        const r = Phaser.Math.Linear(start.red, end.red, currentStep / steps);
        const g = Phaser.Math.Linear(start.green, end.green, currentStep / steps);
        const b = Phaser.Math.Linear(start.blue, end.blue, currentStep / steps);
        return Phaser.Display.Color.GetColor(r, g, b);
    }
    update() {
        this.playerMove();
    }
}

