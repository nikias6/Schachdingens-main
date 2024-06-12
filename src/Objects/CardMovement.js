//eine eigene klasse für die preview der bewegung einer karte
export default class CardMovement extends Phaser.GameObjects.Container {

    scene;
    movement = [];

    constructor(_scene, movement){
        super(_scene)
        this.scene = _scene

        //movement wird quasi kopiert, nur mit sprite und null statt mit 1 und 0
        for(var x = 0; x < 5; x++){
            this.movement.push([])
                for(var y = 0; y < 5; y++){
                if(movement[y][x] == 1)
                    this.movement[x].push(this.scene.add.sprite(0,0,'square'))
                else
                    this.movement[x].push(null)
            }
        }
        this.scene.add.existing(this)
    }

    //wird von card gerufen, sorgt dafür dass sich die sprites mit der karte mitbewegen
    setPos(newX, newY){
        //einzelne sprites werden abhängig von ihren indexen positioniert
        for(var y = 0; y < 5; y++){
            this.movement.push([])
            for(var x = 0; x < 5; x++){
                if(this.movement[y][x] == null) continue
                this.movement[y][x].x = newX + (5-x)*8 //x muss gespiegelt werden, damit es richtig angezeigt wird
                this.movement[y][x].y = newY + y*8
            }
        }
    }
    //löscht alle sprites und dann sich selbst
    delete(){
        for(var y = 0; y < 5; y++){
            this.movement.push([])
            for(var x = 0; x < 5; x++){
                if(this.movement[y][x] == null) continue
                this.movement[y][x].destroy()
            }
        }
        this.destroy()
    }
}