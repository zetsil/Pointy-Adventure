export default class Enemy{

    constructor(pos_x,pos_y,game){
        this.pos_x = pos_x;
        this.pos_y = pos_y;
        this.original_pos_x = pos_x;
        this.original_pos_y = pos_y;

        this.type = 'balon';

        this.speed = -0.09;
        this.game = game;
        const texture = new PIXI.Texture.from("./assets/ballon_16x16.png");
        this.sprite = new PIXI.Sprite(texture);
        this.sprite.x = this.pos_x;
        this.sprite.y = this.pos_y;
        this.w = this.sprite.width;
        this.h = this.sprite.height;
       // this.game.container.addChild(this.sprite);
        this.destroyed = false;
        this.patrol = 0;

       }


       update(deltaTime){
         if(this.destroyed)
            return;
        // this.pos_x += this.speed;
         this.sprite.x = this.pos_x;
         this.sprite.y = this.pos_y;
         this.pos_y -= this.speed ;
         this.patrol += 1;
         if(this.patrol > 45)
         {
            this.speed = this.speed * -1;
            this.patrol= 0;

         }
         // if(this.pos_x > (this.app.view.width - 10))
         //    this.speed = -2;
         // if(this.pos_x <= 0)  
         //    this.speed = 2; 
       //  console.log("heloo");
       }


      destroy(){
         this.destroyed = true;
         this.pos_x = -40;
         this.pos_y = -40;
         this.sprite.x = this.pos_x;
         this.sprite.y = this.pos_y;
         setTimeout(() => {this.destroyed = false;this.pos_x = this.original_pos_x;this.pos_y = this.original_pos_y;},5000);

        // this.sprite.destroy();
      }  


     
}