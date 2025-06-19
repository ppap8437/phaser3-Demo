
import { Physics } from "phaser";
// 存放游戏对象的集合池，除了玩家之外
export class GameObjectsPool extends Physics.Arcade.Image{
    scene;
    constructor({scene}){
        super(scene);
    }
}