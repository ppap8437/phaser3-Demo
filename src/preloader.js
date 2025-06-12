/*
 * @Author: mayx 1019724021@qq.com
 * @Date: 2025-06-09 14:25:22
 * @LastEditors: mayx 1019724021@qq.com
 * @LastEditTime: 2025-06-12 16:27:31
 * @FilePath: \test\src\preloader.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// Class to preload all the assets
// Remember you can load this assets in another scene if you need it
import { Scene } from "phaser";
import { preLoadResource,preLoadSpritesheet } from "./utils/utils";
export class PreLoader extends Scene {
    constructor() {
        super({ key: 'PreLoader' })
    }
    player;
    autoCreateImage(array) {
        if (!Array.isArray(array) || array.length === 0) return;
        for (let index = 0; index < array.length; index++) {
            this.load.image(array[index]['key'], array[index]['path'])
        }
    }
    autoCreateSprite(array) {
        if (!Array.isArray(array) || array.length === 0) return;
        for (let index = 0; index < array.length; index++) {
            this.load.spritesheet(array[index]['key'], array[index]['path'], { ...array[index]['config'] })
        }
    }
    preload() {
        this.load.setBaseURL('assets');
        this.autoCreateImage(preLoadResource);
        this.autoCreateSprite(preLoadSpritesheet);
    }
    create() {
        this.add.image(400, 300, 'sky');
        this.time.addEvent({
            delay: 1000,
            callback:()=> {
                this.scene.launch("LoadScene", {
                    parentScene: this,
                });
            }
        })

        // this.scene.launch("LoadScene", {
        //     parentScene: this
        // });
    }
} 