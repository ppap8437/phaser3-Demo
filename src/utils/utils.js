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
    },
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