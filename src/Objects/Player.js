export default class Player extends Phaser.GameObjects.Sprite {

    scene;

    spriteOffset = [16, 8];

    constructor(_scene, pos_x, pos_y){
        super(_scene)
        this.scene = _scene
        this.setTexture('piece')
        this.scene.add.existing(this)
        this.setPosition(pos_x, pos_y)
        this.scene.gameField[pos_y][pos_x] = this;
        this.scene.input.on('pointerdown', () => this.click());
    }

    getWorldPos(){
        return this.scene.screenToWorldPos(this.x, this.y+this.scene.TILE_HEIGHT)//Gott weiß warum man hier was draufrechnen muss
    }

    click(){
        //MousePosition wird auf dem Grid bestimmt
        var x = this.scene.game.input.mousePointer.worldX
        var y = this.scene.game.input.mousePointer.worldY+this.scene.TILE_HEIGHT//Gott weiß warum man hier was draufrechnen muss
        var pos = this.scene.screenToWorldPos(x, y);

        console.log(pos)

        //Bewegung
        if(this.scene.canIMoveThere(pos)){
            var worldPos = this.getWorldPos()
            this.scene.gameField[worldPos.y][worldPos.x] = null //alte position auf karte wird gelöscht
            this.setPosition(pos.x, pos.y)
            this.scene.gameField[pos.y][pos.x] = this; // neue position wird auf karte eingetragen
            this.scene.playerMoved()
        }
    }


    setPosition(x, y){
        //Javascript hält sich für witzig und ruft diese funktion automatisch auf bevor "spriteOffset"
        //existiert also verhindern wir das mit dem if statement
        if(this.spriteOffset == undefined) return

        var screenPos = this.scene.worldPosToScreenPos(x, y)
        this.x = screenPos.x + this.spriteOffset[0];
        this.y = screenPos.y + this.spriteOffset[1];

    }
}