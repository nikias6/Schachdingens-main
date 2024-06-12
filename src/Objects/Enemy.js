export default class Enemy extends Phaser.GameObjects.Sprite {

    scene;
    spriteOffset = [16, 8];
    movement = [
        [0,0,0,0,0],
        [0,1,1,1,0],
        [0,1,1,1,0],
        [0,1,1,1,0],
        [0,0,0,0,0],
    ]

    constructor(_scene, pos_x, pos_y){
        super(_scene)
        this.scene = _scene
        this.setTexture('piece')
        this.scene.add.existing(this)
        this.setPosition(pos_x, pos_y)
        this.scene.gameField[pos_y][pos_x] = this;
    }

    //wird nach einem spielerzug gerufen
    //berechnet den abstand zum spieler für jeden möglichen zug und geht dann dahin wo er am nächsten kommt
    move(){
        var playerPos = this.scene.player.getWorldPos()
        var worldPos = this.getWorldPos()
        var bestMove = [worldPos.x, worldPos.y]
        var bestDistance = 9999999

        for(var x = 0; x < 5; x++){
            for(var y = 0; y < 5; y++){
                if(this.movement[y][x] == 0) continue;
                var checkingPos = [worldPos.x + x-2, worldPos.y + y-2]

                console.log(checkingPos)
                //If there is no Tile we cant move there
                if(this.scene.layer.getTileAt(checkingPos[0], checkingPos[1]) == null) continue;
                //If there is already a piece there we cant move there
                if(this.scene.gameField[checkingPos[1]][checkingPos[0]] != null) continue;

                var distance = Math.pow(checkingPos[0] - playerPos.x, 2)
                +  Math.pow(checkingPos[1] - playerPos.y, 2)
                if (distance < bestDistance){
                    bestDistance = distance;
                    bestMove = [checkingPos[0], checkingPos[1]]
                }
            }
        }


        //Bewegung
        this.scene.gameField[worldPos.y][worldPos.x] = null //alte position auf karte wird gelöscht
        this.setPosition(bestMove[0], bestMove[1])
        this.scene.gameField[bestMove[1]][bestMove[0]] = this; // neue position wird auf karte eingetragen
    }

    getWorldPos(){
        return this.scene.screenToWorldPos(this.x, this.y+this.scene.TILE_HEIGHT)//Gott weiß warum man hier was draufrechnen muss
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