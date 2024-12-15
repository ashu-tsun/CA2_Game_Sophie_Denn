import GameObject from '../engine/gameobject.js';
import Level from './level.js';
class Button extends GameObject
{
    constructor(x, y, w, h, color, str) {
      //Set button attributes
      super(x,y);
      this.width = w;
      this.height = h;
      this.color = color;
      this.text = str;
      //Add click event and bind it ti the click method
      document.addEventListener('click', this.click.bind(this), false);
  }
  
  //Create the button on the canvas
  draw(ctx)
  {
      super.draw(ctx);
      ctx.fillStyle=this.color;
      ctx.fillRect(this.game.camera.x + this.x,this.game.camera.y + this.y, this.width, this.height );
      ctx.textAlign = "center";
      ctx.font = "40px serif";
      ctx.fillStyle="white";
      ctx.fillText(this.text, this.game.camera.x + this.x + this.width/2, this.game.camera.y + this.y + 15);
  }
  
  click(event)
  {
      //Get the coundary of the canvas
      let rect = this.game.canvas.getBoundingClientRect();
      let width = this.width;
      let height = this.height;
      
      //Check if the click happened within the bounds of the button 
      if (event.clientX - rect.left >= this.x && event.clientX - rect.left <= this.x + width && event.clientY - rect.top >= this.y && event.clientY - rect.top <= this.y + height) 
      {
         //If its the restart button then restart
        if(this.text === "Restart?")
        {
            this.game.reset();
        }
        //If its the pause button then pause
        if(this.text === "Pause")
        {
            this.game.pauseGame();
        }
        //If its the play again button then restart
        if(this.text === "Play Again?")
        {
            this.game.reset();
        }
      }    
  }
}
export default Button