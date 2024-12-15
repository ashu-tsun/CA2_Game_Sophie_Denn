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
        //Ad physics, renderer and input component
        this.addComponent(new Physics({x:0, y:0}, {x:0, y:0}) );
        this.addComponent(new Input());
        this.animator = new Animator('red',w,h);
        this.addComponent(this.animator);
        
        //Animations for different states, run, idle and jump
        let run = new Animation('red',70,70, RunImages, 10);
        let idle = new Animation('red', 70, 70, IdleImages, 10);
        let jump = new Animation('red', 70, 70, [RunImages[3]], 10);
        
        //Add the animations
        this.animator.addAnimation("run", run);
        this.animator.addAnimation("idle", idle);
        this.animator.addAnimation("jump", jump);
        //Set the play to idle
        this.animator.setAnimation("idle");
        
        this.tag = "player";
        //Set on platfrom to false and direction to be 1
        this.isOnPlatform = false;
        this.direction = 1;
        
        //Player score
        this.score = 0;
        //Player speed
        this.speed = 100;
        //Check if player has died
        this.dead = false;
        //Check if player has won
        this.won = false;
        this.time = 0;
        this.finalTime = 0;
        //Jumping variables
        this.isJumping = false;
        this.jumpForce = 400;
        this.jumpTime = 1.0;
        this.jumpTimer = 0;
    }
    
    update(deltaTime)
    {
        const physics = this.getComponent(Physics);
        const input = this.getComponent(Input);
        
        //Increases the timer by an amount that feels natural (trial an error)
        this.time = this.time += 0.015;	 

        //Input directions
        if(input.isKeyDown("ArrowRight"))
        {
            //Move right by the speed
            physics.velocity.x = this.speed; 
            //Change the direction
            this.direction = -1;
            //Play run animation
            this.animator.setAnimation("run");
        } 
        else if(input.isKeyDown("ArrowLeft"))
        {
            physics.velocity.x = -this.speed;
            //Change the direction
            this.direction = 1;
            //Play run animation
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
            //Run nump method
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
        //Store instances of platforms
        const platforms = this.game.gameObjects.filter((obj) => obj instanceof Platform);
        //For all platforms
        for(const platform of platforms)
        {
            //If colliding with platform
             if(physics.isColliding(platform.getComponent(Physics)))
            {
                //If the player isnt jumping
                if (!this.isJumping) 
                {
                    //Stop movement
                    physics.acceleration.y = 0;
                    physics.velocity.y = 0;
                    //Place the player on top of the platform
                    this.y = platform.y - this.getComponent(Renderer).height;
                    this.isOnPlatform = true;
                }
            } 
        }
        //Update 
        super.update(deltaTime);          
    
        //Collectible collider (snail)
        //Store all instances of collectable
        const collectibles = this.game.gameObjects.filter((obj)=> obj instanceof Collectible);
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
        //Store all instances of snail/ deadly items
        const deadlyItems = this.game.gameObjects.filter((obj)=> obj instanceof Deadly);
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
            this.finalTime = this.time;
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
    
    //Start jump
    startJump()
    {
        //If on platfrom jump
        if(this.isOnPlatform)
        {
            this.isJumping = true;
            this.jumpTimer = this.jumpTime;
            //Appky the jump force to the player
            this.getComponent(Physics).velocity.y = -this.jumpForce;
            //Set on platfrom to false
            this.isOnPlatform = false;
        }
    }
    
    //Update the jump
    updateJump(deltaTime)
    {
        //Reduce the jump timer
        this.jumpTimer -= deltaTime;
        //Set jumping to false when the timer runs out or falling
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