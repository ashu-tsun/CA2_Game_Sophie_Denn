import GameObject from "../engine/gameobject.js";
import Renderer from "../engine/renderer.js";
import Physics from "../engine/physics.js";
import {Images} from "../engine/resources.js"
import Platform from './platform.js';
class Collectible extends GameObject
{
    constructor(x, y)
    {
        super(x, y);
        //Render the snail image
        this.addComponent(new Renderer("yellow",50,50, Images.collectible));
        this.addComponent(new Physics({x:0, y:0},{x:0, y:0},{x:0, y:0}));
        this.tag = "snail";
        
        this.floatTime = 1.0;
        this.timeFloating = this.floatTime;
        this.vDirection = 1;
        
        this.maxWidth = 30;
        this.hDirection = 1;
        
    }
    
    update(deltaTime)
    {
        let physics = this.getComponent(Physics);
        let renderer = this.getComponent(Renderer);
        if(this.vDirection===1)
        {
            physics.velocity.y = -50;
        }
        else
        {
            physics.velocity.y = 50;
        }
        this.timeFloating -= deltaTime;
        if(this.timeFloating < 0)
        {
            this.timeFloating = this.floatTime;
            this.vDirection *=-1;
            physics.velocity.y=0;
        }
        
        renderer.width += this.hDirection;
        this.x += (this.hDirection/2)*-1;
        if(renderer.width > 30 || renderer.width <1)
        {
            this.hDirection *=-1;
        }
        super.update(deltaTime);
        
        this.isOnPlatform = false;
        const platforms = this.game.gameObjects.filter((obj)=> obj instanceof Platform);
        for(const platform of platforms)
        {
           
            if(physics.isColliding(platform.getComponent(Physics)))
            {
                physics.velocity.y = 0;
                physics.acceleration.y = 0;
                this.y = platform.y - this.getComponent(Renderer).height;
                this.isOnPlatform = true;

            }
        }
    }
}

export default Collectible