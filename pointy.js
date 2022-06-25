export default class Pointy{

   constructor(pos_x,pos_y,app,game){
    this.pos_x = pos_x;
    this.pos_y = pos_y;
    this.vx = 0;
    this.vy =1;
    this.gravity = 0.2;
    this.app = app;
    this.on_ground = false;
    this.left_animation = [];
    this.right_animation = [];
    this.game = game;
    this.jump = false;
    this.seconds = 0;
   }



   animate_left(){
    this.sprite.textures = this.left_animation;
    this.sprite.play();
   }
   animate_right(){
    this.sprite.textures = this.right_animation;
    this.sprite.play();
   }

    getBounds(params) {

       var  bounds = {
         x : this.pos_x,
         y: this.pos_y,
         height : this.sprite.height,
         width : this.sprite.width,
      };
      return bounds;
   }


   render(texture)
   {
    this.sprite = new PIXI.AnimatedSprite(texture);
    this.sprite.scale.x = 0.2;
    this.sprite.scale.y = 0.2;
    this.sprite.anchor.set(0,1)
    this.sprite.animationSpeed = 0.167; 
    this.sprite.loop = false;
    this.sprite.play();
    this.sprite.x = this.pos_x;
    this.sprite.y = this.pos_y;
    this.app.stage.addChild(this.sprite);
   }
   update(deltaTime){

   this.key_handle(); // handles key pressed and change theire position
   this.seconds += (1 / 60) * deltaTime;

    this.pos_x += this.vx ;
    this.pos_y +=this.vy;
    if(this.vy < 7)
      this.vy += this.gravity ;
    

    if(this.vx > 0)
       this.vx -= 1;
    if(this.vx < 0)
       this.vx += 1;   
    
    if(this.pos_y  >= (this.app.view.height - 16)){
       this.pos_y = (this.app.view.height - 16);
       this.vy = 0;
       this.on_ground = true;
    }else
       this.on_ground = false;

    this.sprite.x = this.pos_x;
    this.sprite.y = this.pos_y;
    this.check_collision();
    

   }

   key_handle(){
      if(this.game.key.presed.ArrowUp && this.on_ground && !this.jump)
      {
        this.vy -= 8.9; 
        this.jump = true; 
        
      }
        if(!this.game.key.presed.ArrowUp)
      {
         this.jump = false;
      } 
      if (this.game.key.presed.ArrowRight)
     {
        if(!this.sprite.playing)
          this.animate_right();  
        this.vx = Math.min(5,this.vx + 2) ;
     }
      if(this.game.key.presed.ArrowLeft)
     {
      if(!this.sprite.playing)
         this.animate_left();
         this.vx = Math.max(-5,this.vx - 2) ;
    }


   //  let pos_in_map_x = Math.round(this.pos_x / 16) ;
   //  let pos_in_map_y = Math.round((this.pos_y - this.sprite.height) /16);
   //  testColision_up(pos_in_map_x,pos_in_map_y)

   //   pos_in_map_x = Math.round(this.pos_x / 16) ;
   //   pos_in_map_y = Math.round(this.pos_y /16);
   //  testColision(pos_in_map_x,pos_in_map_y);
   }


   check_collision()
   {

    let pos_in_map_x = Math.round(this.pos_x / 16) ;
    let pos_in_map_y = Math.round((this.pos_y - this.sprite.height) /16);
    this.testColision_up(pos_in_map_x,pos_in_map_y)

     pos_in_map_x = Math.round(this.pos_x / 16) ;
     pos_in_map_y = Math.round(this.pos_y /16);
    this.testColision_down(pos_in_map_x,pos_in_map_y);

   }


   testColision_down(x,y)
  {

  //console.log(Math.round(x + (y* 50)));
  if(this.game.levels_colision[0][(x + (y* 50))+1] == 1){
    var bounds = {
        x: x*16,
        y : y*16,
        width : 16,
        height: 16,
    };

    //console.log(adevarat);
    this.pos_y = y*16  ;
    this.vy = 0;
    this.on_ground = true;
    

  }else
      this.on_ground = false;
  }

 testColision_up(x,y)
  {

  if(this.game.levels_colision[0][(x + (y* 50))+1] == 1)
  {
    var bounds = {
        x: x*16,
        y : y*16,
        width : 16,
        height: 16,
    };

    this.pos_y =  this.pos_y + 2 ;
    this.vy = 0.5;
    this.on_ground = false;   
   }
  }



}