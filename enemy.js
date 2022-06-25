export default class Enemy{

    constructor(pos_x,pos_y,app){
        this.pos_x = pos_x;
        this.pos_y = pos_y;
        this.app = app;
        const texture = new PIXI.Texture.from("./assets/pointy_enemy.png");
        this.sprite = new PIXI.Sprite(texture);
        this.sprite.x = this.pos_x;
        this.sprite.y = this.pos_y;
        this.app.stage.addChild(this.sprite);
        this.speed = 2;

       }


       update(deltaTime){
         this.pos_x += this.speed;
         this.sprite.x = this.pos_x;
         this.sprite.y = this.pos_y;
         if(this.pos_x > (this.app.view.width - 10))
            this.speed = -2;
         if(this.pos_x <= 0)  
            this.speed = 2; 
         
       }

}