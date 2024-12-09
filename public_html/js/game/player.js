import GameObject from '../engine/gameobject.js'
import Renderer from '../engine/renderer.js'
import Physics from '../engine/physics.js'
import Input from "../engine/input.js"
import {Images} from '../engine/resources.js'
import Platform from './platform.js'
import Animation from '../engine/Animation.js'
import Animator from '../engine/Animator.js'
import {RunImages} from '../engine/resources.js'
class Player extends GameObject
{
    constructor(x, y, w, h)
    {
        super(x, y);        
        this.addComponent(new Physics({x:0, y:0}, {x:0, y:0}) );
        this.addComponent(new Input());
        this.animator = new Animator('red',w,h);
        this.addComponent(this.animator);
        let run = new Animation('red',70,70, RunImages, 10);
        let idle = new Animation('red', 70, 70, [RunImages[0]], 10);
        let jump = new Animation('red', 70, 70, [RunImages[4]], 10);
        
        this.animator.addAnimation("run", run);
        this.animator.addAnimation("idle", idle);
        this.animator.addAnimation("jump", jump);
        this.animator.setAnimation("idle");
        this.tag = "player";
        this.isOnPlatform = false;
        this.direction = 1;
        this.score = 0;
        this.defaultSpeed=100;
        this.speed = 100;
        
        this.isOnPlatform = false;
        this.isJumping = false;
        this.jumpForce = 300;
        this.jumpTime = 1.0;
        this.jumpTimer = 0;
    }
    
    update(deltaTime)
    {
        const physics = this.getComponent(Physics);
        const input = this.getComponent(Input);
        
        if(input.isKeyDown("ArrowRight"))
        {
            physics.velocity.x = this.speed;
            this.direction = -1;
            this.animator.setAnimation("run");
        } 
        else if(input.isKeyDown("ArrowLeft"))
        {
            physics.velocity.x = -this.speed;
            this.direction = 1;
            this.animator.setAnimation("run");
        }
        else
        {
            physics.velocity.x = 0;
            this.animator.setAnimation("idle");
        }
        
         if(input.isKeyDown("Space") && this.isOnPlatform)
        {
            this.startJump();
        }
       
        if(this.isJumping)
        {
            this.updateJump(deltaTime);
            this.animator.setAnimation("jump");
        }
        
        const platforms = this.game.gameObjects.filter((obj) => obj instanceof Platform);
        for(const platform of platforms)
        {
          
             if(physics.isColliding(platform.getComponent(Physics)))
            {
                if (!this.isJumping) 
                {
                    physics.acceleration.y = 0;
                    physics.velocity.y = 0;
                    this.y = platform.y - this.getComponent(Renderer).height;
                    this.isOnPlatform = true;
                }
            } 
        }
        super.update(deltaTime);          
    }
    
    startJump()
    {
        if(this.isOnPlatform)
        {
            this.isJumping = true;
            this.jumpTimer = this.jumpTime;
            this.getComponent(Physics).velocity.y = -this.jumpForce;
            this.isOnPlatform = false;
        }
    }
    
    updateJump(deltaTime)
    {
        this.jumpTimer -= deltaTime;
        if(this.jumpTimer <=0 || this.getComponent(Physics).velocity.y > 0)
        {
            this.isJumping = false;
        }
    }

    
}
export default Player