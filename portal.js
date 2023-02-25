export default class Portal{

    constructor(pos_x,pos_y,game){
        this.pos_x = pos_x;
        this.pos_y = pos_y;
        this.game = game;
        this.type = 'portal';
        const texture = new PIXI.Texture.from("./assets/portal.png");
        this.sprite = new PIXI.Sprite(texture);
        this.sprite.x = this.pos_x;
        this.sprite.y = this.pos_y;
        this.sprite.anchor.set(0.5,0.5)

       // this.sprite.scale.x = -1;
        this.w = this.sprite.width;
        this.h = this.sprite.height;
        this.game.container.addChild(this.sprite);
        this.speed = 0.1;
        this.destroyed = false;

       }


       update(deltaTime){
         this.sprite.rotation += this.speed *deltaTime ;       
       }


      destroy(){
        //  this.destroyed = true;
        //  this.pos_x = -1;
        //  this.pos_y = -1;

        //  this.sprite.destroy();
      }  


     
}