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
        this.addComponent(new Renderer("yellow",50,50, Images.collectible));
        this.addComponent(new Physics({x:50, y:0},{x:0, y:0},{x:0, y:0}));
        this.movementDistance = 0;
        this.movementLimit = 100;
        this.moveRight = true;
        this.tag = "treat";
        
    }
    
     update(deltaTime)
    {
        let physics = this.getComponent(Physics);
       
        if(this.moveRight)
        {
            if(this.movementDistance < this.movementLimit)
            {
                physics.velocity.x = 50;
                this.movementDistance += Math.abs(physics.velocity.x) * deltaTime;
                this.getComponent(Renderer).gameObject.direction = 1;

            }
            else
            {
                this.moveRight = false;
                physics.velocity.x = 0;
                this.movementDistance = 0;
            }
        }
        else
        {
             if(this.movementDistance < this.movementLimit)
            {
                physics.velocity.x = -50;
                this.movementDistance += Math.abs(physics.velocity.x) * deltaTime;
                this.getComponent(Renderer).gameObject.direction = -1;

            }
            else
            {
                this.moveRight = true;
                physics.velocity.x = 0;
                this.movementDistance = 0;
            }
        }
        
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