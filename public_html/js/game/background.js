import GameObject from '../engine/gameobject.js'
import Renderer from '../engine/renderer.js'
import {Images} from '../engine/resources.js'

class Background extends GameObject
{
    constructor(x, y)
    {
        super(x, y);
        //Add the background as an image
        this.addComponent(new Renderer('red', 1500, 2000,Images.background));
        this.tag = "background";
    }
}
export default Background