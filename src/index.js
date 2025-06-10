/*
 * @Author: mayx 1019724021@qq.com
 * @Date: 2025-05-19 10:04:30
 * @LastEditors: mayx 1019724021@qq.com
 * @LastEditTime: 2025-06-10 15:31:30
 * @FilePath: \2D\test\src\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// const Phaser = require('phaser')
import { Scene } from "phaser";
import LoadScene from "./scenes/load";
import { PreLoader } from "./preloader";
class Example extends Scene {
}
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [PreLoader,LoadScene],// 多场景加载需要手动激活
    parent: 'game',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    }
};

const game = new Phaser.Game(config);
game.events.on('ready', () => {
    console.log('当前场景:', Object.keys(game.scene.keys));
});