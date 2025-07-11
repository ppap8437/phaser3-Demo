/*
 * @Author: mayx 1019724021@qq.com
 * @Date: 2025-06-06 16:17:35
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2025-07-11 17:47:19
 * @FilePath: \test\src\utils\utils.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 玩家基础设置
export const actionConfigList = [
    {
        key: 'left',
        frames: { key: 'dude', config: { start: 0, end: 3 } },
        frameRate: 10,
        repeat: -1
    },
    {
        key: 'turn',
        frames: [{ key: 'dude', frame: 4 }],
        frameRate: 20
    },
    {
        key: 'right',
        frames: { key: 'dude', config: { start: 5, end: 8 } },
        frameRate: 10,
        repeat: -1
    }
];
export const createdPlayer = {
    x: 100,
    y: 300,
    key: 'dude',
}
export const preLoadResource = [
    {
        key: 'sky',
        path: 'skies/space3.png'
    }, {
        key: 'logo',
        path: 'sprites/phaser3-logo.png'
    }, {
        key: 'ground',
        path: 'sprites/s1.png'
    }, {
        key: 'red',
        path: 'particles/red.png'
    }, {
        key: 'star',
        path: 'particles/star.png'
    }, {
        key: 'bombs',
        path: 'particles/bomb.png'
    },{
        key:'bullet',
        path:'particles/bullet.png'
    },{
        key:'flares',
        path:'particles/flares.png'
    },{
        key:'knighthawks',
        path:'fonts/knight3.png'
    },{
        key:'logo',
        path:'logo.png'
    }
]
export const preLoadAtlas = [
    {
        key:'propulsion-fire',
        textureURL:'players/propulsion/propulsion-fire.png',
        atlasURL:'players/propulsion/propulsion-fire_atlas.json'
    }
]
export const preLoadSpritesheet = [
    {
        key: 'dude',
        path: 'players/dude.png',
        config: {
            frameWidth: 32,
            frameHeight: 48
        }
    }
]