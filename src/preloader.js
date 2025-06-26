/*
 * @Author: mayx 1019724021@qq.com
 * @Date: 2025-06-09 14:25:22
 * @LastEditors: mayx 1019724021@qq.com
 * @LastEditTime: 2025-06-26 15:08:42
 * @FilePath: \test\src\preloader.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// Class to preload all the assets
// Remember you can load this assets in another scene if you need it
import { Scene } from "phaser";
import { preLoadResource, preLoadSpritesheet, preLoadAtlas } from "./utils/utils";
export class PreLoader extends Scene {
    constructor() {
        super({ key: 'PreLoader' })
    }
    autoLoadAllResource(type = '', array) {
        if (!Array.isArray(array) || array.length === 0 || !type) return;
        switch (type) {
            // 之后优化
            case 'image':
                for (let index = 0; index < array.length; index++) {
                    this.load[type](array[index]['key'], array[index]['path']);
                }
                break;
            case 'spritesheet':
                for (let index = 0; index < array.length; index++) {
                    this.load[type](array[index]['key'], array[index]['path'], { ...array[index]['config'] });
                }
                break;
            case 'atlas':
                for (let index = 0; index < array.length; index++) {
                    this.load[type](array[index]['key'], array[index]['textureURL'], array[index]['atlasURL']);
                }
                break;
            default:
                throw '未知错误'
        }
    }
    preload() {
        this.load.setBaseURL('assets');
        this.autoLoadAllResource('image', preLoadResource);
        this.autoLoadAllResource('spritesheet', preLoadSpritesheet);
        // this.autoLoadAllResource('atlas', preLoadAtlas);
        // this.load.animation("propulsion-fire-anim", "players/propulsion/propulsion-fire_anim.json");
        // 
        this.load.on("progress", (progress) => {
            console.log('正在加载....' + Math.round(progress * 100) + '%');
            if (progress === 1) console.log('加载完成');
        })
    }
    create() {
        this.add.image(400, 300, 'sky');
        this.time.addEvent({
            delay: 500,
            callback: () => {
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