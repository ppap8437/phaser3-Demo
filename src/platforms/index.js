
import { Physics } from "phaser";

export class Platforms extends Physics.Arcade.Image {
    scene;
    gamePlatforms;
    // 平台创造、星、得分、
    constructor({scene}) {
        super(scene);
        this.scene = scene;
        this.init();
    }
    init(){
        console.log(this);
        
        this.gamePlatforms = this.scene.physics.add.staticGroup();
        this.gamePlatforms.create(400, 568, 'ground').setScale(2).refreshBody();
        this.gamePlatforms.create(600, 400, 'ground');
        this.gamePlatforms.create(50, 250, 'ground');
        this.gamePlatforms.create(750, 220, 'ground');
    }
}   