/*
 * @Author: mayx 1019724021@qq.com
 * @Date: 2025-06-26 15:19:58
 * @LastEditors: mayx 1019724021@qq.com
 * @LastEditTime: 2025-06-26 15:40:16
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
        this.speed = Phaser.Math.GetSpeed(450, 1);//?
        this.postFX.addBloom(0xffffff, 1, 1, 2, 1.2);//?
        this.name = 'bullet';
    }
    fire(x, y, targetX = 1, targetY = 0, bullet_texture = "bullet"){
        console.log(12313);
        
    }
    update() {
    }
}