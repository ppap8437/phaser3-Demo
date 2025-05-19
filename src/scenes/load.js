/*
 * @Author: mayx 1019724021@qq.com
 * @Date: 2025-05-19 15:39:38
 * @LastEditors: mayx 1019724021@qq.com
 * @LastEditTime: 2025-05-19 16:54:15
 * @FilePath: \test\src\scenes\load.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Phaser from "phaser";
export class LoadScene extends Phaser.Scene {
    constructor() {
        super("LoadScene");
    }
    preload() {
        this.load.setBaseURL('assets');
        this.load.image('sky', 'skies/space3.png');
        this.load.image('logo', 'sprites/phaser3-logo.png');
        this.load.image('red', 'particles/red.png');
    }
    create() {
        this.add.image(400, 300, 'sky');

        const particles = this.add.particles(0, 0, 'red', {
            speed: 100,
            scale: { start: 1, end: 0 },
            blendMode: 'ADD'
        });

        const logo = this.physics.add.image(400, 100, 'logo');
        logo.setVelocity(100, 100);
        logo.setBounce(1, 1);
        logo.setCollideWorldBounds(true);
        particles.startFollow(logo);
    }
}