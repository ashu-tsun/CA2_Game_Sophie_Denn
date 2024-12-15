// Create an Images object to hold the Image instances for the player and the enemy.
const Images = {
  collectible: new Image(), //Image instance for collectable
  background: new Image(), //Image instance for the background
  tiles: new Image() //Image instance for the tiles
};

const RunImages = //This is for the player running
        [
            new Image(), 
            new Image(),
            new Image(),
            new Image(),
            new Image()
        ];
        
const IdleImages = //This is for the player being idle
        [
            new Image(),
            new Image(),
            new Image(),
            new Image(),
            new Image(),
            new Image(),
            new Image(),
            new Image()
         ];
        
        const EnemyImages = //This is for the enemy
        [
            new Image(),
            new Image(),
            new Image(),
            new Image(),
            new Image(),
            new Image(),
            new Image()
        ];
        
        const DeadlyImages = //This is for the slimes
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
  die: new Audio ('./resources/audio/frog.mp3'), // The file path of the death sound.
  bgm: new Audio ('./resources/audio/bgm.mp3') // The file path of the background music.
};


// Set the source of the enemy images.
EnemyImages[0].src = "./resources/images/enemy/run.png";
EnemyImages[1].src = "./resources/images/enemy/run1.png";
EnemyImages[2].src = "./resources/images/enemy/run2.png";
EnemyImages[3].src = "./resources/images/enemy/run3.png";
EnemyImages[4].src = "./resources/images/enemy/run4.png";
EnemyImages[5].src = "./resources/images/enemy/run5.png";
EnemyImages[6].src = "./resources/images/enemy/run6.png";

// Set the source of the slime images.
DeadlyImages[0].src = "./resources/images/collectible/slime.png";
DeadlyImages[1].src = "./resources/images/collectible/slime1.png";
DeadlyImages[2].src = "./resources/images/collectible/slime2.png";
DeadlyImages[3].src = "./resources/images/collectible/slime1.png";


// Set the source of the collectable, background and tile images.
Images.collectible.src = "./resources/images/collectible/snail.png";
Images.background.src = "./resources/images/background/Background.png";
Images.tiles.src = "./resources/images/tiles/grass.png";

//Player Images
//// Set the source of the running images.
RunImages[0].src = "./resources/images/player/Run1.png";
RunImages[1].src = "./resources/images/player/Run2.png";
//This icludes the jump image used
RunImages[2].src = "./resources/images/player/jump.png";
RunImages[3].src = "./resources/images/player/Run3.png";
RunImages[4].src = "./resources/images/player/Run2.png";

// Set the source of the idle images.
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
