export default class Turtle{

    constructor(pos_x,pos_y,game,patrol_start,patrol_end){
        this.pos_x = pos_x;
        this.pos_y = pos_y;
        this.patrol_start = patrol_start;
        this.patrol_end = patrol_end;
        this.game = game;
        const texture = new PIXI.Texture.from("./assets/turtle.png");
        this.sprite = new PIXI.Sprite(texture);
        this.sprite.x = this.pos_x;
        this.sprite.y = this.pos_y;
        this.sprite.scale.x = -1;
        this.w = this.sprite.width;
        this.h = this.sprite.height;
        this.game.container.addChild(this.sprite);
        this.speed = 0.5;
        this.destroyed = false;

       }


       update(deltaTime){
        //  if(this.destroyed)
        //     return;
         this.pos_x += this.speed;
         this.sprite.x = this.pos_x;
         this.sprite.y = this.pos_y;
         if(this.pos_x > this.patrol_end){
            this.pos_x = this.patrol_end - 5;
            this.speed = -0.5;
            this.sprite.scale.x = 1;

         }
         if(this.pos_x <= this.patrol_start){  
            this.speed = 0.5; 
            this.sprite.scale.x = -1;
         }
       }


      destroy(){
        //  this.destroyed = true;
        //  this.pos_x = -1;
        //  this.pos_y = -1;

        //  this.sprite.destroy();
      }  


     
}