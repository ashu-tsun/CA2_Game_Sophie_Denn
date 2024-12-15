// Create an Images object to hold the Image instances for the player and the enemy.
const Images = {
  player: new Image(), // The Image instance for the player.
  collectible: new Image(),
  orb: new Image(),
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
        
        const EnemyImages = 
        [
            new Image(),
            new Image(),
            new Image(),
            new Image(),
            new Image(),
            new Image(),
            new Image()
        ];
        
        const DeadlyImages = 
        [
            new Image(),
            new Image(),
            new Image(),
            new Image()
        ];

// Create an AudioFiles object to hold the file paths of the audio resources.
const AudioFiles = {
  jump: new Audio ('./resources/audio/jump.mp3'), // The file path of the jump sound.
  collect: new Audio ('./resources/audio/collect.mp3'), // The file path of the collect sound.
  die: new Audio ('./resources/audio/frog.mp3')
};

// Set the source of the player image.
Images.player.src = './resources/images/player/frog.png'; // Update the image path

// Set the source of the enemy image.
EnemyImages[0].src = "./resources/images/enemy/run.png";
EnemyImages[1].src = "./resources/images/enemy/run1.png";
EnemyImages[2].src = "./resources/images/enemy/run2.png";
EnemyImages[3].src = "./resources/images/enemy/run3.png";
EnemyImages[4].src = "./resources/images/enemy/run4.png";
EnemyImages[5].src = "./resources/images/enemy/run5.png";
EnemyImages[6].src = "./resources/images/enemy/run6.png";

DeadlyImages[0].src = "./resources/images/collectible/slime.png";
DeadlyImages[1].src = "./resources/images/collectible/slime1.png";
DeadlyImages[2].src = "./resources/images/collectible/slime2.png";
DeadlyImages[3].src = "./resources/images/collectible/slime1.png";

Images.collectible.src = "./resources/images/collectible/snail.png";
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
export { Images, AudioFiles,RunImages, IdleImages, EnemyImages, DeadlyImages};
