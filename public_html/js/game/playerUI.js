import UI from "../engine/ui.js";
import GameObject from "../engine/gameObject.js"
import Player from "./player.js"
class PlayerUI extends GameObject
{
    constructor(x, y)
    {
        super(x,y);
        //Create the ui
        this.ui = new UI('Score: 0 Time: 0', 10,10);
        //Add it
        this.addComponent(this.ui);
       
    }

    update(deltaTime)
    {
        //Store the player
        const player = this.game.gameObjects.find((obj)=>obj instanceof Player);
        //Update the ui text to show the players score
        //Round function from: https://coreui.io/blog/how-to-round-a-number-to-two-decimal-places-in-javascript/
        this.ui.setText("Score: "+player.score + " Time: " + Math.round(player.time * 100) / 100);
        
        //If the value in player is won
        if(player.won === true)
        {
            //Create a new Ui element to say the player has won ( made it bigger too)
            this.win = new UI('You won!', 570,100,'80px Arial');
            this.win2 = new UI('Your final time was: ' + Math.round(player.finalTime * 100) / 100, 570,200,'40px Arial');
            //Add the ui
            this.addComponent(this.win);
            this.addComponent(this.win2);
        }
    }
}

export default PlayerUI;