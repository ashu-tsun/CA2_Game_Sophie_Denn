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
        this.hDirection = 1;
        
    }
    
    update(deltaTime)
    {
        //Just the collectable code from the powerpoint with some changes
        let physics = this.getComponent(Physics);
        //Check horizontal movement
        if(this.hDirection===1)
        {
            //If moving left, move the collectable left and change the direction of the snail
            physics.velocity.x = -50;
            this.direction = 1;
        }
        else
        {
            //Otherwise, move the colllectable and flip the snail
            physics.velocity.x = 50;
            this.direction =-1;
        }
        //Decrease the remaining float time by how much time has passed
        this.timeFloating -= deltaTime;
        //If there is no float time remaining
        if(this.timeFloating < 0)
        {
            //Reset the time, change vertical direction and stop the collectable from moving
            this.timeFloating = this.floatTime;
            this.hDirection *=-1;
            physics.velocity.x=0;
        }
        
        //Update the time
        super.update(deltaTime);
        
        //set on platfrom to false and for all instances of platforms
        this.isOnPlatform = false;
        const platforms = this.game.gameObjects.filter((obj)=> obj instanceof Platform);
        for(const platform of platforms)
        {
           //If there is a collision with a platfroom
            if(physics.isColliding(platform.getComponent(Physics)))
            {
                //Stop movement vertically
                physics.velocity.y = 0;
                physics.acceleration.y = 0;
                //Place the collectable on the platform and set on platform to true
                this.y = platform.y - this.getComponent(Renderer).height;
                this.isOnPlatform = true;
            }
        }
    }
}

export default Collectible