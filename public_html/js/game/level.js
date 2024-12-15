import Game from '../engine/game.js';
import Confiner from '../engine/confiner.js';
import Platform from './platform.js';
import Player from './player.js';
import Renderer from '../engine/renderer.js'
import Background from'./background.js'
import Collectible from './collectible.js';
import {Images} from '../engine/resources.js'
import Enemy from './enemy.js';
import PlayerUI from './playerUI.js';
import Button from './button.js';
import Deadly from './deadly.js'
class Level extends Game
{
    constructor(canvasId)
    {
        super(canvasId);
        this.addGameObject(new Background(0, this.canvas.height-2000));
        this.addGameObject(new Background(1500, this.canvas.height-2000));
        this.addGameObject(new Background(3000, this.canvas.height-2000));
        this.addGameObject(new Background(4500, this.canvas.height-2000));
        this.addGameObject(new Background(6000, this.canvas.height-2000));
        this.addGameObject(new Background(7500, this.canvas.height-2000));
        this.addGameObject(new Background(9000, this.canvas.height-2000));
        
        const player = new Player(500, this.canvas.height - 150);
        this.camera.confiner = new Confiner(0,0,10000,this.canvas.height);
        this.addGameObject(new PlayerUI(10, 10));
        this.camera.target = player;
        this.addGameObject(player);
        this.enemySpeed= 1;
        this.paused = false;
        this.player = player;   

        const platforms = [
            new Platform(0, this.canvas.height-150, 40000),
            new Platform(1000, this.canvas.height-320, 100),
            new Platform(2000, this.canvas.height-420, 100),
            new Platform(3000, this.canvas.height-320, 100),
            new Platform(4000, this.canvas.height-420, 100),
            new Platform(5000, this.canvas.height-320, 100),
            new Platform(6000, this.canvas.height-420, 100),
            new Platform(7000, this.canvas.height-320, 100),
            new Platform(8000, this.canvas.height-420, 100),
            new Platform(9000, this.canvas.height-320, 100),
            new Platform(10000, this.canvas.height-420, 100)
        ];
        
        
        for(const platform of platforms)
        {
            this.addGameObject(platform);
        }
     
        const enemies = [
            new Enemy(10,500,100,100,this.enemySpeed)   
        ];
        
        for(let enemy of enemies)
        {
            this.addGameObject(enemy);
        }
        
        const Collectibles = [
            new Collectible(1020,this.canvas.height-320),
            new Collectible(3020,this.canvas.height-320),
            new Collectible(5200,this.canvas.height-420)
           
        ];
        
        for(const coll of Collectibles)
        {
            this.addGameObject(coll);
        }
        
        
        const DeadlyItems = [
            new Deadly(1000,this.canvas.height-220,100,100),
            new Deadly(2000,this.canvas.height-220,100,100),
            new Deadly(3000,this.canvas.height-220,100,100),
            new Deadly(4000,this.canvas.height-220,100,100),
            new Deadly(5000,this.canvas.height-220,100,100),
            new Deadly(6000,this.canvas.height-220,100,100),
           
        ];
        
        for(const dead of DeadlyItems)
        {
            this.addGameObject(dead);
        }
            
    
        let ui = new PlayerUI(10,10);
        this.addGameObject(ui);
        
        
        this.addGameObject(new Button(this.canvas.width-160,10,150,60,'MidnightBlue', "Pause")); 

    }
    
    update(deltaTime){
        if(this.paused){
            return;
        }
        
        super.update(deltaTime);  
        
        if(this.player.dead)
        {
            this.addGameObject(new Button((this.canvas.width/2)-100,(this.canvas.height/2)-40,200,80,'MidnightBlue', "Restart?")); 
            this.paused = true;
        }
    }
    
    
    
}
export default Level

