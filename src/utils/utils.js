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
        frames: { key: 'dude', config: { start: 5, end: 8 } }, //this.anims.generateFrameNumbers('dude', { start: 5, end: 8 })
        frameRate: 10,
        repeat: -1
    }
];
export const createdPlayer = {
    x: 100,
    y: 250,
    key: 'dude',
    frame: 0,
}