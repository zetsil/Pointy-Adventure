import Proiectil  from "./proiectil.js"

export default class Tun{

    constructor(pos_x,pos_y,game){

        this.tunContainer = new PIXI.Container();
        this.pos_x = pos_x;
        this.pos_y = pos_y;
        this.game = game;
        this.type = 'tun';
        this.tunContainer.position.set(pos_x, pos_y);    
        const texture = new PIXI.Texture.from("./assets/tun.png");
        this.sprite = new PIXI.Sprite(texture);
        this.sprite.x = 0;
        this.sprite.y = 0;
        this.tunContainer.addChild(this.sprite);
        this.sprite.anchor.set(0.5,0.5);
        this.sprite.scale.x = -1;
        this.rotationSpeed = 0.1; 
        this.frameCounter = 0;
        this.proiectil = new Proiectil(this,this.pos_x,this.pos_y,this.game,this.game.pointy_character);

        this.sprite.scale.x = -1;
        this.w = this.sprite.width;
        this.h = this.sprite.height;
        this.speed = 0.1;
        this.destroyed = false;


        this.sprite.pivot.set(this.sprite.width / 2, this.sprite.height / 2);


        const tip = new PIXI.Point(0, this.w / 2);
        this.sprite.pivot.copyFrom(tip);

       }


       update(deltaTime){
        const dx = this.game.pointy_character.pos_x - this.game.pointy_character.w - this.pos_x ;
        const dy = this.game.pointy_character.pos_y + this.game.pointy_character.h + 13 - this.pos_y;
        const angle = Math.atan2(dy, dx) ;
        this.sprite.rotation = angle;
        this.proiectil.update();


     //   this.frameCounter++;
        // Verificam daca au trecut 10 secunde
    //     if (this.frameCounter > 10 * 20) {
    //       // Aici puteti adauga codul care se executa dupa ce au trecut 2 minute
    //  //     this.proiectil = new Proiectil(this.pos_x,this.pos_y,this.game,this.game.pointy_character);
    //       this.frameCounter = 0; // Reseteaza contorul
    //     }
        
       }


      destroy(){
        //  this.destroyed = true;
        //  this.pos_x = -1;
        //  this.pos_y = -1;

        //  this.sprite.destroy();
      }  


     
}