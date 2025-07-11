/*
 * @Author: mayx 1019724021@qq.com
 * @Date: 2025-07-01 11:48:41
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2025-07-10 17:07:13
 * @FilePath: \test\src\players\healthBar.js
 * @Description: 动态血量、受伤状态
 */
import { GameObjects } from "phaser";
// 血条类
export class HealthBar extends GameObjects.Container {
    scene;
    currentPercent;
    maxHealth;
    width = 200;
    height = 30;
    padding = 10;//边距
    border;
    bar;
    bordeRaduis = 0;
    position = {
        x: 0,
        y: 0,
    }
    rt;
    constructor(scene, x, y, maxHealth) {
        super(scene, x, y);
        this.scene = scene;
        this.position.x = 80;
        this.position.y = 45;
        this.bordeRaduis = 10;
        this.maxHealth = maxHealth;
        scene.add.existing(this);
        this.currentPercent = 1;
        this.init();
    }
    // 绘制动态血条
    init() {
        this.border = this.scene.add.graphics()
            .fillStyle(0xffffff, .8)
            .fillRoundedRect(this.position.x - this.padding / 2, this.position.y - this.padding / 2, this.width + this.padding, this.height + this.padding, this.bordeRaduis);
        this.bar = this.scene.add.graphics()
            .fillStyle(0x00ff00,.8)
            .fillRect(this.position.x, this.position.y, this.width, this.height).setDepth(100);
        this.rt = this.scene.add.graphics()
            .fillStyle(0xffffff) 
            .fillRoundedRect(this.position.x, this.position.y, this.width, this.height, this.bordeRaduis).setDepth(0);
        this.bar.setMask(this.rt.createGeometryMask());
    }
    animateTo(targetPercent, duration = 3000) {
        if (this.currentTween) this.currentTween.stop();
        const newPercent = Phaser.Math.Clamp(targetPercent, 0, 1); // 将数值约束在指定范围内
        console.log(newPercent);

        this.currentTween = this.scene.tweens.add({
            targets: this,
            currentPercent: { from: this.currentPercent, to: newPercent },
            duration: duration,
            ease: 'Power2',
            onUpdate: (tween) => {
                const val = tween.getValue();
                if (newPercent > 0.3 && newPercent <= 0.7) {
                    this.rt.clear()
                        .fillStyle(0xFFFF00, 1)
                        .fillRoundedRect(this.position.x, this.position.y, this.width * val, this.height, { tl: 10, tr: 0, bl: 10, br: 0 });
                } else if (newPercent <= 0.3) {
                    this.rt.clear()
                        .fillStyle(0xFF0000, 1)
                        .fillRoundedRect(this.position.x, this.position.y, this.width * val, this.height, { tl: 10, tr: 0, bl: 10, br: 0 });
                } else if (newPercent === 1) {
                    this.rt.clear().fillRoundedRect(this.position.x, this.position.y, this.width * val, this.height, this.bordeRaduis);
                } else {
                    this.rt.clear().fillRoundedRect(this.position.x, this.position.y, this.width * val, this.height, { tl: 10, tr: 0, bl: 10, br: 0 });
                }
            },
            onComplete: () => {
                this.currentPercent = newPercent;
            }
        });
    }
}