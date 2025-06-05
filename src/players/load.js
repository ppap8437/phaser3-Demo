import Phaser from "phaser";
export default class PlayerScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PlayerScene' });
    }
    player;
    cursors;
    scoreText;
    score = 0;
    isCheckMode = false;
    test = '这是PlayerScene类专属的变量'
    scoreStyle = {
        fontSize: '32px',
        fill: '#fff',
    };
    // 批量创建角色动作
    preLoadActions(actionConfigList) {
        if (actionConfigList.length === 0 || !Array.isArray(actionConfigList)) return;
        for (let index = 0; index < actionConfigList.length; index++) {
            if (!actionConfigList[index].key || actionConfigList[index].key.trim() === '') break;
            this.anims.create({ ...actionConfigList[index] })
        }
    }
    preload() {
        this.load.setBaseURL('assets');
        this.load.spritesheet('dude', 'players/dude.png', { frameWidth: 32, frameHeight: 48 })
    }
    changePlayerStatus() {
        console.log(this.score);
        // 一次性得分超过50，速度加速
        if (this.score >= 50) {
            this.player.body.setVelocity(200);
        }
    }
    create() {
        this.actionConfigList = [
            {
                key: 'left',
                frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
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
                frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
                frameRate: 10,
                repeat: -1
            }
        ];
        // 对玩家的设置
        this.player = this.physics.add.sprite(100, 250, 'dude');
        this.player.setBounce(.2);
        this.player.body.setGravityY(150);
        this.player.setCollideWorldBounds(true);
        // 输入
        this.cursors = this.input.keyboard.createCursorKeys();
        // 创建文字
        this.scoreText = this.add.text(100, 50, '得分:0', { ...this.scoreStyle });
        this.preLoadActions(this.actionConfigList);
    }
    update() {
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
            this.player.anims.play('left', true);
        }
        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);

            this.player.anims.play('right', true);
        }
        // 调试模式
        else if (this.cursors.shift.isDown) {
            this.isCheckMode = !this.isCheckMode;
            // this.showBombs(this.player);
        }
        else {
            this.player.setVelocityX(0);
            this.player.anims.play('turn');
        }

        if (this.cursors.space.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-330);
        }
    }
}