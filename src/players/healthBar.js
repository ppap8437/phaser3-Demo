/*
 * @Author: mayx 1019724021@qq.com
 * @Date: 2025-07-01 11:48:41
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2025-07-09 17:52:22
 * @FilePath: \test\src\players\healthBar.js
 * @Description: 动态血量、受伤状态
 */
import { GameObjects } from "phaser";
// 血条类
export class HealthBar extends GameObjects.Container {
    scene;
    currentPercent;
    maxHealth;
    width = 100;
    height = 30;
    padding = 10;//边距
    position = {
        x: 0,
        y: 0,
    }
    rt;
    constructor(scene, x, y, maxHealth) {
        super(scene, x, y);
        this.scene = scene;
        this.position.x = 66;
        this.position.y = 0;
        this.maxHealth = maxHealth;
        scene.add.existing(this);
        this.currentPercent = 1;
        this.rt = scene.add.graphics();
        this.add(this.rt);
        this.init();
    }
    // 绘制动态血条
    init() {
        this.rt.clear()
            .fillStyle(0x333333)  // 背景色
            .fillRoundedRect(this.position.x - this.padding / 2, this.position.y - this.padding / 2, this.width + this.padding, this.height + this.padding, 10)
            .fillGradientStyle(
                0x00ff00,  // 起始色
                0x00ff00,  // 结束色
                0x00ff00,
                0x00ff00,
                .8         // 透明度
            ).fillRoundedRect(this.position.x, this.position.y, this.width, this.height,10);
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
                        .fillGradientStyle(0xFFFF00, 0xFFFF00, 0xFFFF00, 0xFFFF00, 1)
                        .fillRect(0, 0, this.width * val, this.height);
                } else if (newPercent <= 0.3) {
                    this.rt.clear()
                        .fillGradientStyle(0xFF0000, 0xFF0000, 0xFF0000, 0xFF0000, 1)
                        .fillRect(0, 0, this.width * val, this.height);
                } else {
                    this.rt.clear().fillRect(0, 0, this.width * val, this.height);
                }
            },
            onComplete: () => {
                this.currentPercent = newPercent;
            }
        });
    }
}