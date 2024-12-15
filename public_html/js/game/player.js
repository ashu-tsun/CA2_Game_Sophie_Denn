import GameObject from '../engine/gameobject.js'
import Renderer from '../engine/renderer.js'
import Physics from '../engine/physics.js'
import Input from "../engine/input.js"
import {Images, RunImages, IdleImages, AudioFiles} from '../engine/resources.js'
import Platform from './platform.js'
import Animation from '../engine/Animation.js'
import Animator from '../engine/Animator.js'
import Collectible from './collectible.js'
import Enemy from './enemy.js'
import Deadly from './deadly.js'
class Player extends GameObject
{
    constructor(x, y, w, h)
    {
        super(x, y);        
        this.addComponent(new Physics({x:0, y:0}, {x:0, y:0}) );
        this.addComponent(new Input());
        this.animator = new Animator('red',w,h);
        this.addComponent(this.animator);
        
        //Animations for different states
        let run = new Animation('red',70,70, RunImages, 10);
        let idle = new Animation('red', 70, 70, IdleImages, 10);
        let jump = new Animation('red', 70, 70, [RunImages[3]], 10);
        
        this.animator.addAnimation("run", run);
        this.animator.addAnimation("idle", idle);
        this.animator.addAnimation("jump", jump);
        this.animator.setAnimation("idle");
        
        this.tag = "player";
        this.isOnPlatform = false;
        this.direction = 1;
        
        //Player scoer
        this.score = 0;
        this.speed = 100;
        //Check if player has died
        this.dead = false;
        //Check if player has won
        this.won = false;

        this.isJumping = false;
        this.jumpForce = 400;
        this.jumpTime = 1.0;
        this.jumpTimer = 0;
    }
    
    update(deltaTime)
    {
        const physics = this.getComponent(Physics);
        const input = this.getComponent(Input);
        
        //Input directions
        if(input.isKeyDown("ArrowRight"))
        {
            //Move in direction
            physics.velocity.x = this.speed; 
            this.direction = -1;
            //Play run animation
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
            //Play idle animation
            this.animator.setAnimation("idle");
        }
        
        
         if(input.isKeyDown("Space") && this.isOnPlatform)
        {
            this.startJump();
            //Play jump sound
            AudioFiles.jump.play();
        }
       
        if(this.isJumping)
        {
            this.updateJump(deltaTime);
            //Play jump animation, slightly later than pressing
            this.animator.setAnimation("jump");
        }
        
        
        //Platform collider
        const platforms = this.game.gameObjects.filter((obj) => obj instanceof Platform);
        for(const platform of platforms)
        {
             if(physics.isColliding(platform.getComponent(Physics)))
            {
                if (!this.isJumping) 
                {
                    //Stop movement
                    physics.acceleration.y = 0;
                    physics.velocity.y = 0;
                    this.y = platform.y - this.getComponent(Renderer).height;
                    this.isOnPlatform = true;
                }
            } 
        }
        //Update 
        super.update(deltaTime);          
    
        //Collectible collider (snail)
        const collectibles = this.game.gameObjects.filter
        ((obj)=> obj instanceof Collectible);
        for(const coll of collectibles)
        {
            //If player collides with snail
            if(physics.isColliding(coll.getComponent(Physics)))
            {
                //Run collect snail method
                this.collectSnail(coll);
                //play collection audio
                AudioFiles.collect.play();
            }
        }
        
        //Harmful Slimes collider
        const deadlyItems = this.game.gameObjects.filter
        ((obj)=> obj instanceof Deadly);
        for(const dead of deadlyItems)
        {
            //If collided with slime
            if(physics.isColliding(dead.getComponent(Physics)))
            {
                //Run collided with enemy
                this.collidedWithEnemy();
            }
        }
        
        //If the score is 500 (maximum) set win to true
        if(this.score === 500)
        {
            this.won = true;
        } 
    }   
    //If collided with enemy
    collidedWithEnemy()
    {
        //set dead to true (as there is only one life)
        this.dead = true;
        //play death sound
        AudioFiles.die.play();
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
    
    //Collect snail
    collectSnail(collectible)
    {
        //Destroy the snail
        this.game.removeGameObject(collectible);
        //Increase players speed
        this.speed *= 1.5;
        //Get the enemy (cat)
        const enemy = this.game.gameObjects.find((obj)=> obj instanceof Enemy);
        //Increase the enemies speed
        enemy.increaseSpeed();
        //Imcrease score
        this.score+=100;
    }
}
export default Player