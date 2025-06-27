/*
 * @Author: mayx 1019724021@qq.com
 * @Date: 2025-06-26 15:19:58
 * @LastEditors: mayx 1019724021@qq.com
 * @LastEditTime: 2025-06-27 16:37:50
 * @FilePath: \test\src\players\Bullet.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { GameObjects, Math } from "phaser";
export class Bullet extends GameObjects.Image {
    speed;
    flame;
    endDirection = new Math.Vector2(0, 0);
    constructor(scene, x, y) {
        super(scene, x, y, 'bullet');
        this.speed = Phaser.Math.GetSpeed(450, 1);//将极坐标（角度+距离）转换为笛卡尔坐标系下的速度分量
        this.postFX.addBloom(0xffffff, 1, 1, 2, 1.2);// 游戏对象添加‌泛光（Bloom）后处理特效‌
        this.name = 'bullet';
    }
    fire(x, y, targetX = 1, targetY = 0, bullet_texture = "bullet") {
        this.setTexture(bullet_texture);
        this.setPosition(x, y);
        this.setActive(true);// 控制对象是否参与游戏逻辑更新 碰撞、更新逻辑
        this.setVisible(true);// 控制显示
        // Calculate direction towards target
        if (targetX === 1 && targetY === 0) {
            this.endDirection.setTo(1, 0);
        } else {
            this.endDirection.setTo(targetX - x, targetY - y).normalize();
        }
    }
    destroyBullet() {
        // 碰撞粒子 火焰效果
        if (this.flame === undefined) {
            this.flame = this.scene.add.particles(this.x, this.y, 'flares', {
                lifespan: 250,//粒子存活时间
                scale: { start: 1.5, end: 0, ease: 'sine.out' },
                speed: 200,
                advance: 500,
                frequency: 20,
                blendMode: 'ADD',
                duration: 100,
            })
            this.flame.setDepth(1);
            this.flame.once("complete", () => {
                this.flame.destroy();
            })
        }
        this.setActive(false);
        this.setVisible(false);
        this.destroy();
    }
    update(time, delta) {
        this.x += this.endDirection.x * this.speed * delta;
        this.y += this.endDirection.y * this.speed * delta;
        // 清除子弹
        if (this.x > this.scene.sys.canvas.width || this.y > this.scene.sys.canvas.height || this.x < 0 || this.y < 0){            
            this.setActive(false);
            this.setVisible(false);
            this.destroy();
        }
    }
}