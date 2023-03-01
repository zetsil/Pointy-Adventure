export default class Lever{

    constructor(pos_x,pos_y,game){
        this.pos_x = pos_x;
        this.pos_y = pos_y -  32;
        this.original_pos_x = pos_x;
        this.original_pos_y = pos_y;

        this.type = 'lever';

        this.game = game;
        const texture = new PIXI.Texture.from("./assets/lever.png");
        this.sprite = new PIXI.Sprite(texture);
        const texture_lever = new PIXI.Texture.from("./assets/lever_handle.png");
        this.sprite_handle = new PIXI.Sprite(texture_lever);
        this.sprite.addChild(this.sprite_handle);
        this.sprite_handle.x += 5;
        //this.sprite.position.set(0, 800);
        this.w = this.sprite.width;
        this.h = this.sprite.height;
        this.sprite.x = this.pos_x;
        this.sprite.y = this.pos_y;
        this.destroyed = false;
        this.patrol = 0;
       }



      destroy(){
        if(this.destroyed)
           return;
        this.destroyed = true;
        this.sprite_handle.x = 29;
        this.sprite_handle.y = 10;
        this.sprite_handle.rotation += 1;
      }  


     
}