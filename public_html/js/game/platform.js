import GameObject from '../engine/gameobject.js'
import Renderer from '../engine/renderer.js'
import Physics from '../engine/physics.js'
import {Images} from '../engine/resources.js'
class Platform extends GameObject
{
    constructor(x, y, w, h, color = "#181027")
    {
        super(x, y);
        
        this.addComponent(new Renderer(color, w, h));
        this.addComponent(new Physics({x:0, y:0},{x:0, y:0},{x:0, y:0}));
        
        this.tag = "platform";
    }
}

export default Platform

