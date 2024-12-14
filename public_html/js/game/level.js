import Game from '../engine/game.js';
import Confiner from '../engine/confiner.js';
import Platform from './platform.js';
import Player from './player.js';
import Renderer from '../engine/renderer.js'
import Background from'./background.js'
import {Images} from '../engine/resources.js'
import Enemy from './enemy.js';
class Level extends Game
{
    constructor(canvasId)
    {
        super(canvasId);
        this.addGameObject(new Background(0, this.canvas.height-2000));
        this.addGameObject(new Background(1500, this.canvas.height-2000));
        const player = new Player(10, this.canvas.height - 150,50, 50);
        this.camera.confiner = new Confiner(0,0,200000,this.canvas.height);
        this.camera.target = player;
        this.addGameObject(player);
        


        
        const platforms = [
            new Platform(0, this.canvas.height-150, 20000),
            new Platform(300, this.canvas.height-250, 100),
            new Platform(400, this.canvas.height-420, 100),
            new Platform(600, this.canvas.height-270, 100),
            new Platform(700, this.canvas.height-420, 100)
        ];
        
        
        for(const platform of platforms)
        {
            this.addGameObject(platform);
        }
        
        
        const enemies = [
            new Enemy(300, 100,1),
            new Enemy(700, 100,5)
            
        ];
        
        for(let enemy of enemies)
        {
            this.addGameObject(enemy);
        }
        
    }
}
export default Level

