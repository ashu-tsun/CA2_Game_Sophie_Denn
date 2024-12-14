import GameObject from '../engine/gameobject.js'
import Renderer from '../engine/renderer.js'
import Physics from '../engine/physics.js'
import HorizontalTileRenderer from '../engine/horizontalTileRenderer.js'
import {Images} from '../engine/resources.js'
class Platform extends GameObject
{
    constructor(x, y, w, h, img, color = "blue")
    {
        super(x, y);
        
        this.addComponent(new HorizontalTileRenderer(color, w, h, Images.tiles));
        this.addComponent(new Physics({x:0, y:0},{x:0, y:0},{x:0, y:0}));
        
        this.tag = "platform";
    }
}

export default Platform

