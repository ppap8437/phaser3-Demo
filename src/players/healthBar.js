/*
 * @Author: mayx 1019724021@qq.com
 * @Date: 2025-07-01 11:48:41
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2025-07-04 15:11:25
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
    rt;
    constructor(scene, x, y, maxHealth) {
        super(scene, x, y);
        this.scene = scene;
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
            .fillRect(0, 0, this.width, this.height)
            .fillGradientStyle(
                0xff0000,  // 起始色
                0x00ff00,  // 结束色
                0xff0000,
                0x00ff00,
                1          // 透明度
            ).fillRect(0, 0, this.width, this.height);
    }
    draw(percent) {
        // 停止现有动画避免冲突
        if (this.currentTween) this.currentTween.stop();
        this.scene.tweens.add({
            targets: this,
            from: this.currentPercent,
            to: percent,
            duration: 2000,
            ease: 'Power2',
            onUpdate: (tween) => {
                const currentPercent = Phaser.Math.Linear(
                    this.currentPercent,
                    percent,
                    tween.progress
                );
                // console.log('111111', currentPercent);
                this.rt.clear().fillRect(0, 0, this.width * currentPercent, this.height);
            },
            onComplete: () => {
                this.currentPercent = percent;
            }
        });
    }

    animateTo(targetPercent, duration = 3000) {
        if (this.currentTween) this.currentTween.stop();
        const newPercent = Phaser.Math.Clamp(targetPercent, 0, 1);
        this.currentTween = this.scene.tweens.add({
            targets: this,
            currentPercent: newPercent,
            duration: duration,
            ease: 'Power2',
            onUpdate: () => {
                this.draw(newPercent);
            }
        });
    }
    setPerecent(targetPercent) {
        // this.currentPercent = Phaser.Math.Clamp(targetPercent, 0, 1);
        this.draw(targetPercent);
    }
}