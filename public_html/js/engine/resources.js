// Create an Images object to hold the Image instances for the player and the enemy.
const Images = {
  player: new Image(), // The Image instance for the player.
  enemy: new Image(),
  collectible: new Image(),// The Image instance for the enemy.
  background: new Image(),
  tiles: new Image()
};

const RunImages = 
        [
            new Image(), // The Image instance for the player.
            new Image(),
            new Image(),// The Image instance for the enemy.
            new Image(),
            new Image()
        ];
        
const IdleImages = 
        [
            new Image(), // The Image instance for the player.
            new Image(),
            new Image(),// The Image instance for the enemy.
            new Image(),
            new Image(),
            new Image(),
            new Image(),
            new Image()
        ];

// Create an AudioFiles object to hold the file paths of the audio resources.
const AudioFiles = {
  jump: './resources/audio/jump.mp3', // The file path of the jump sound.
  collect: './resources/audio/collect.mp3', // The file path of the collect sound.
  // Add more audio file paths as needed
};

// Set the source of the player image.
Images.player.src = './resources/images/player/frog.png'; // Update the image path

// Set the source of the enemy image.
Images.enemy.src = './resources/images/player/frog.png'; // Update the image path
Images.collectible.src = "./resources/images/player/frog.png";
Images.background.src = "./resources/images/background/Background.png";
Images.tiles.src = "./resources/images/tiles/grass.png";

RunImages[0].src = "./resources/images/player/Run1.png";
RunImages[1].src = "./resources/images/player/Run2.png";
RunImages[2].src = "./resources/images/player/jump.png";
RunImages[3].src = "./resources/images/player/Run3.png";
RunImages[4].src = "./resources/images/player/Run2.png";


IdleImages[0].src = "./resources/images/player/idle0.png";
IdleImages[1].src = "./resources/images/player/idle1.png";
IdleImages[2].src = "./resources/images/player/idle2.png";
IdleImages[3].src = "./resources/images/player/idle3.png";
IdleImages[4].src = "./resources/images/player/idle4.png";
IdleImages[5].src = "./resources/images/player/idle5.png";
IdleImages[6].src = "./resources/images/player/idle6.png";
IdleImages[7].src = "./resources/images/player/idle7.png";


// Export the Images and AudioFiles objects so they can be imported and used in other modules.
export { Images, AudioFiles,RunImages, IdleImages };
