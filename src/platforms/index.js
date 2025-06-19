
import { Physics } from "phaser";

export class Platforms extends Physics.Arcade.Image {
    scene;
    platforms;
    // 平台创造、星、得分、
    constructor({scene}) {
        super(scene);
        this.scene = scene;
        this.init();
    }
    init(){
        console.log(this);
        
        this.platforms = this.scene.physics.add.staticGroup();
        this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();
        this.platforms.create(600, 400, 'ground');
        this.platforms.create(50, 250, 'ground');
        this.platforms.create(750, 220, 'ground');
    }
}   