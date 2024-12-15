import GameObject from "../engine/gameObject.js"
import Renderer from '../engine/renderer.js';
import Physics from '../engine/physics.js';
import {Images} from '../engine/resources.js';
import {EnemyImages} from '../engine/resources.js'
import Animation from '../engine/Animation.js'
import Animator from '../engine/Animator.js'
import Player from './player.js';
import Platform from './platform.js';

class Enemy extends GameObject
{
    //speed is also needed
    constructor(x, y, w, h)
    {
        super(x,y);
        this.addComponent(new Physics({x:0, y:0},{x:0, y:0}));
        this.speed = 1;
        
        //Enemy animation is always idle
        this.animator = new Animator('red',w,h);
        this.addComponent(this.animator);
        //Run animation
        let idle = new Animation('red', 100, 100, EnemyImages, 10);
        this.animator.addAnimation("idle", idle);
        this.animator.setAnimation("idle");
    }
    update(deltaTime)
    {
       let physics = this.getComponent(Physics);
       
       //Always move to the right with increasing speed
       this.x += this.speed;
        
        //Platform collider, set on pplatfrom to false
        this.isOnPlatform = false;
        //store all instances of platforms
        const platforms = this.game.gameObjects.filter((obj)=> obj instanceof Platform);
        for(const platform of platforms)
        {
           //If colliding with platform
            if(physics.isColliding(platform.getComponent(Physics)))
            {
                //stop vertical movement and place the enemy on the platfrom
                physics.velocity.y = 0;
                physics.acceleration.y = 0;
                this.y = platform.y - this.getComponent(Renderer).height;
                this.isOnPlatform = true;

            }
        }
        
        //Player collider, store all instamces of player
        const player = this.game.gameObjects.find((obj)=> obj instanceof Player);
        //if colliding with player
        if(physics.isColliding(player.getComponent(Physics)))
        {
            //If collided with player run the method in player
            player.collidedWithEnemy();
        }
        //Update
        super.update(deltaTime);
        
        //If the enemy has run to the end then end the game
        if(this.x >= 10000)
        {
            player.collidedWithEnemy();
             
        }
    }
    
    //Increases the enemy speed by 0.8, it will be faster than the player by the end
    increaseSpeed()
    {
        this.speed = this.speed*1.8;
    }
    
}

export default Enemy