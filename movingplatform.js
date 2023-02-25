import Turtle from "./turtle.js";

export default class MovingPlatform extends Turtle {

    constructor(pos_x, pos_y, game, patrol_start, patrol_end) {
        super(pos_x, pos_y, game, patrol_start, patrol_end);
        this.type = "platform";
        const texture = new PIXI.Texture.from("./assets/platforma.png");
        this.sprite.texture = texture;
        this.sprite.scale.x = 1;
        this.w = 39;
        this.h = 16;
        console.log(this.h);
    }


    collision() {
        var playerHalfW = 40 / 2
        var playerHalfH = this.game.pointy_character.h / 2
        var enemyHalfW = this.w / 2 
        var enemyHalfH = this.h / 2
        var playerCenterX = this.game.pointy_character.pos_x + 40 / 2 
        var playerCenterY = this.game.pointy_character.pos_y + this.game.pointy_character.h / 2 
        var enemyCenterX = this.pos_x + this.w / 2
        var enemyCenterY = this.pos_y + this.h / 2

        // Calculate the distance between centers
        var diffX = playerCenterX - enemyCenterX
        var diffY = playerCenterY - enemyCenterY

        // Calculate the minimum distance to separate along X and Y
        var minXDist = playerHalfW + enemyHalfW
        var minYDist = playerHalfH + enemyHalfH

        // Calculate the depth of collision for both the X and Y axis
        var depthX = diffX > 0 ? minXDist - diffX : -minXDist - diffX
        var depthY = diffY > 0 ? minYDist - diffY : -minYDist - diffY

        // Now that you have the depth, you can pick the smaller depth and move
        // along that axis.
        if (depthX != 0 && depthY != 0) {
            if (Math.abs(depthX) < Math.abs(depthY)) {
                // Collision along the X axis. React accordingly
                if (depthX > 0) {
                    console.log( "left side collision");
                    //this.game.pointy_character.pos_x = this.pos_x  + 40;
                    if(this.game.pointy_character.vx > 0 && !this.game.pointy_character.on_ground)
                      this.game.pointy_character.vx = 0;
              
                } else {
                 //   console.log( "right side collision");
                   //  this.game.pointy_character.pos_x = this.pos_x  - 40;
                    this.game.pointy_character.vx = 0;
                }
            } else {
                // Collision along the Y axis.
                if (depthY > 0) {
                 //   console.log( "top side collision");
                 if(this.game.pointy_character.vy <  0){

                    this.game.pointy_character.pos_y = this.pos_y + 16 ;
                    this.game.pointy_character.vy = 0.5;
                 }
                } else {
                 //   console.log( "bottom side collision");
                    if(this.game.pointy_character.vy >  0){
                    this.game.pointy_character.pos_y = this.pos_y - this.game.pointy_character.h ;
                    this.vy = 0;
                    this.game.pointy_character.on_ground = true;
                    this.game.pointy_character.pos_x += this.speed ;
                    }

                }
            }
        }

    }


    update(deltaTime){
        //  if(this.destroyed)
        //     return;
         this.pos_x += this.speed;

         this.sprite.x = this.pos_x;
         this.sprite.y = this.pos_y;
         if(this.pos_x > this.patrol_end){
          //  this.pos_x = this.patrol_end ;
            this.speed *= -1;
          //  this.sprite.scale.x = 1;

         }
         if(this.pos_x <= this.patrol_start){  
            this.speed *= -1; 
          //  this.sprite.scale.x = -1;
         }
       }



}