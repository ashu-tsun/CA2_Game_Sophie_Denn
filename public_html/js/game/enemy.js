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
    constructor(x, y, w, h, speed)
    {
        super(x,y);
        this.addComponent(new Physics({x:0, y:0},{x:0, y:0}));
        this.speed = speed;
        this.animator = new Animator('red',w,h);
        this.addComponent(this.animator);
        let idle = new Animation('red', 100, 100, EnemyImages, 10);
        this.animator.addAnimation("idle", idle);
        this.animator.setAnimation("idle");
    }
    update(deltaTime)
    {
       let physics = this.getComponent(Physics);
       
       this.x += this.speed;
        
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
        
        const player = this.game.gameObjects.find((obj)=> obj instanceof Player);
        if(physics.isColliding(player.getComponent(Physics)))
        {
            player.collidedWithEnemy();
        }
        super.update(deltaTime);

        
    }
    
    increaseSpeed()
    {
        this.speed = this.speed*2;
    }
    
}

export default Enemy