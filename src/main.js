import Game from './game.js'

const config = {
    type: Phaser.AUTO,
    width: 600,
    height: 400,
    scene: Game,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    }
};

const game = new Phaser.Game(config);


