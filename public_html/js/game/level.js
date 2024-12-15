import Game from '../engine/game.js';
import Confiner from '../engine/confiner.js';
import Platform from './platform.js';
import Player from './player.js';
import Renderer from '../engine/renderer.js'
import Background from'./background.js'
import Collectible from './collectible.js';
import {Images, AudioFiles} from '../engine/resources.js'
import Enemy from './enemy.js';
import PlayerUI from './playerUI.js';
import Button from './button.js';
import Deadly from './deadly.js'
class Level extends Game
{
    constructor(canvasId)
    {
        super(canvasId);
        //Add backgrounds to the end of the level, since the background is 1500 wide, increase i by that
        for (let i = 0; i <= 9000; i += 1500) {
            this.addGameObject(new Background(i, this.canvas.height - 2000));
        }
        //Add player, camera confiner, camera target anf player ui
        const player = new Player(500, this.canvas.height - 150);
        this.camera.confiner = new Confiner(0,0,10000,this.canvas.height);
        this.addGameObject(new PlayerUI(10, 10));
        this.camera.target = player;
        this.addGameObject(player);
        //Set paused to false
        this.paused = false;
        this.player = player;   
        //Add the background music and lower it down
        AudioFiles.bgm.play();
        AudioFiles.bgm.volume *=0.1;
        
        //Create multiple platforms
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
            new Platform(9880, this.canvas.height-420, 100)
        ];
        
        //Add them to the level
        for(const platform of platforms)
        {
            this.addGameObject(platform);
        }
        
        //Create the cat enemy
        const enemies = [
            new Enemy(10,this.canvas.height-320,100,100)   
        ];
        
        //Add it to the level
        for(let enemy of enemies)
        {
            this.addGameObject(enemy);
        }
        
        //Create the snail collectables
        const Collectibles = [
            new Collectible(1050,this.canvas.height-320),
            new Collectible(3050,this.canvas.height-320),
            new Collectible(5050,this.canvas.height-320),
            new Collectible(7050,this.canvas.height-320),
            new Collectible(9890,this.canvas.height-420)
        ];
        
        //Add it to the level
        for(const coll of Collectibles)
        {
            this.addGameObject(coll);
        }
        
        //Create the slimes
        const DeadlyItems = [
            new Deadly(1000,this.canvas.height-220,100,100),
            new Deadly(2000,this.canvas.height-220,100,100),
            new Deadly(3000,this.canvas.height-220,100,100),
            new Deadly(4000,this.canvas.height-220,100,100),
            new Deadly(5000,this.canvas.height-220,100,100),
            new Deadly(6000,this.canvas.height-220,100,100),
            new Deadly(7000,this.canvas.height-220,100,100),
            new Deadly(8000,this.canvas.height-220,100,100),
            new Deadly(9880,this.canvas.height-220,100,100)  
        ];
        //Add it to the level
        for(const dead of DeadlyItems)
        {
            this.addGameObject(dead);
        }
            
        //Add the ui
        let ui = new PlayerUI(10,10);
        this.addGameObject(ui);
        
        //Add the pause button
        this.addGameObject(new Button(this.canvas.width-160,10,150,60,'MidnightBlue', "Pause")); 
        
        
        //Adding in some randomly spawned enemies, i looked up the random  fucntion from here
        //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
        //Get a random x value that is at max the end of the level and min 1000 ( past the player so it doesnt spawn on top of them)
        let randx= Math.random() * (this.camera.confiner.width)+1000;
        //set the y value to be on top of the  main platform
        let y = this.canvas.height-220;
        let randomEnemy1 = new Deadly(randx,y,100,100);
        
        //Create a new random number for each enemy
        randx= Math.random() * (this.camera.confiner.width)+1000;
        let randomEnemy2 = new Deadly(randx,y,100,100);
        
        randx= Math.random() * (this.camera.confiner.width)+1000;
        let randomEnemy3 = new Deadly(randx,y,100,100);
        
        randx= Math.random() * (this.camera.confiner.width)+1000;
        let randomEnemy4 = new Deadly(randx,y,100,100);
        
        randx= Math.random() * (this.camera.confiner.width)+1000;
        let randomEnemy5 = new Deadly(randx,y,100,100);
        
        //Add the random enemies
        this.addGameObject(randomEnemy1);
        this.addGameObject(randomEnemy2);
        this.addGameObject(randomEnemy3);
        this.addGameObject(randomEnemy4);
        this.addGameObject(randomEnemy5);
    }
    
    update(deltaTime){
        
        //If the game is paused dont update
        if(this.paused){
            return;
        }

        super.update(deltaTime);
        
        
        //If the player is dead
        if(this.player.dead)
        {
            //Add the retry button
            this.addGameObject(new Button((this.canvas.width/2)-100,(this.canvas.height/2)-40,200,80,'MidnightBlue', "Restart?")); 
            //Pause the game
            this.paused = true;
            //Pause the music
            AudioFiles.bgm.pause();
        }
        //If the player has won
        if(this.player.won)
        {
            //Add the play again button
            this.addGameObject(new Button((this.canvas.width/2)-100,(this.canvas.height/2)-40,200,80,'MidnightBlue', "Play Again?")); 
            //Pause the music
            AudioFiles.bgm.pause();
            //Pause the game
            this.paused = true;
        }
        
        //If the game isnt paused then play the music
        if(!this.paused){
          AudioFiles.bgm.play();
        }
       
    }
    
    
    
}
export default Level

