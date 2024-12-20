import GameObject from "../engine/gameobject.js";
import Renderer from "../engine/renderer.js";
import Physics from "../engine/physics.js";
import Animation from '../engine/Animation.js'
import Animator from '../engine/Animator.js'
import {Images} from "../engine/resources.js"
import {DeadlyImages} from '../engine/resources.js'
class Deadly extends GameObject
{
    constructor(x, y, w, h)
    {
        super(x, y);
        //Add physics
        this.addComponent(new Physics({x:0, y:0},{x:0, y:0},{x:0, y:0}));
        //Add animation
        this.animator = new Animator('red',w,h);
        this.addComponent(this.animator);
        //Set the animation to idle (it only has idle)
        let idle = new Animation('red', 100, 100, DeadlyImages, 5);
        this.animator.addAnimation("idle", idle);
        this.animator.setAnimation("idle");
        this.tag = "deadly";
    }    
  
}

export default Deadly