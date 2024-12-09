import Game from '../engine/game.js';
import Confiner from '../engine/confiner.js';
import Platform from './platform.js';
import Player from './player.js';
import Renderer from '../engine/renderer.js'
import Background from'./background.js'
class Level extends Game
{
    constructor(canvasId)
    {
        super(canvasId);
        this.addGameObject(new Background());
        const player = new Player(10, this.canvas.height - 100,50, 50);
        this.camera.confiner = new Confiner(0,0,2000,this.canvas.height);
        this.camera.target = player;
        this.addGameObject(player);
        


        
        const platforms = [
            new Platform(0, this.canvas.height-80, 100000, 100)
        ];
        
        
        for(const platform of platforms)
        {
            this.addGameObject(platform);
        }
        
    }
}
export default Level

