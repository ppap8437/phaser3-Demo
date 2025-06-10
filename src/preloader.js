/*
 * @Author: mayx 1019724021@qq.com
 * @Date: 2025-06-09 14:25:22
 * @LastEditors: mayx 1019724021@qq.com
 * @LastEditTime: 2025-06-10 15:13:21
 * @FilePath: \test\src\preloader.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// Class to preload all the assets
// Remember you can load this assets in another scene if you need it
import { Scene } from "phaser";
import { preLoadResource, createdPlayer, actionConfigList, preLoadSpritesheet } from "./utils/utils";
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
    // 批量创建角色动作
    preLoadActions(actionConfigList) {
        if (actionConfigList.length === 0 || !Array.isArray(actionConfigList)) return;
        for (let index = 0; index < actionConfigList.length; index++) {
            if (!actionConfigList[index].key || actionConfigList[index].key.trim() === '') break;
            this.anims.create({ ...actionConfigList[index] })
        }
    }

    // 处理导入角色和角色动作函数
    prePlayerActions(playerInfo, array) {
        const res = [], pushData = {};
        if (!Array.isArray(array) || Object.keys(playerInfo).length === 0) return;
        try {
            const { x, y, key, frame = 0 } = playerInfo;
            // 对玩家的设置

            this.player.setBounce(.2);
            this.player.body.setGravityY(150);
            this.player.setCollideWorldBounds(true);
        } catch (error) {
            return new Error(error);
        }
        for (let i = 0; i < array.length; i++) {
            for (const [index, value] of Object.entries(array[i])) {
                if (index === 'frames' && typeof value[Symbol.iterator] !== 'function') {
                    pushData[index] = this.anims.generateFrameNumbers(value.key, { ...value.config });
                } else pushData[index] = value;
            }
            res.push({ ...pushData })
        }
        return res;
    }
    preload() {
        this.load.setBaseURL('assets');
        this.autoCreateImage(preLoadResource);
        this.autoCreateSprite(preLoadSpritesheet);
    }
    create() {
        this.add.image(400, 300, 'sky');
        this.preLoadActions(this.prePlayerActions(createdPlayer, actionConfigList));
        this.time.addEvent({
            delay: 1000,
            callback:()=> {
                this.scene.launch("LoadScene", {
                    parentScene: this
                });
            }
        })

        // this.scene.launch("LoadScene", {
        //     parentScene: this
        // });
    }
} 