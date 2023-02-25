export default class Pointy {

  constructor(pos_x, pos_y, app, game) {
    this.pos_x = pos_x;
    this.pos_y = pos_y;
    this.vx = 0;
    this.vy = 1;
    this.gravity = 0.2;
    this.app = app;
    this.on_ground = false;
    this.left_animation = [];
    this.right_animation = [];
    this.game = game;
    this.jump = false;
    this.is_in_jump = false;
    this.doble_jump = false;
    this.seconds = 0;
    this.jump_sound = new Audio("./assets/Retro Jump Classic 08.wav");
    this.jump_sound.volume = 0.2;

    this.timer_is_running = false;//check if coyote_timer_start is running
    this.coyote_timer_start = false; // set to false when you live the ground
    this.coyote_timer = 165 ;


    // Get the texture for rope.
    this.trailTexture = PIXI.Texture.from('./assets/trail.png');
    this.historyX = [];
    this.historyY = [];
    // historySize determines how long the trail will be.
    this.historySize = 40;
    // ropeSize determines how smooth the trail will be.
    this.ropeSize = 100;
    this.points = [];

    // Create history array.
    for (let i = 0; i < this.historySize; i++) {
      this.historyX.push(0);
      this.historyY.push(0);
    }
    // Create rope points.
    for (let i = 0; i < this.ropeSize; i++) {
      this.points.push(new PIXI.Point(0, 0));
    }




  }

  async updateTaile() {

    this.historyX.pop();
    this.historyX.unshift(this.pos_x+this.w/2);
    this.historyY.pop();
    this.historyY.unshift(this.pos_y + this.h/2);

    if(this.on_ground){

      this.historyX.pop();
      this.historyX.unshift(this.pos_x+this.w/2);
      this.historyY.pop();
      this.historyY.unshift(this.pos_y + this.h/2);

      this.historyX.pop();
      this.historyX.unshift(this.pos_x+this.w/2);
      this.historyY.pop();
      this.historyY.unshift(this.pos_y + this.h/2);


      this.historyX.pop();
      this.historyX.unshift(this.pos_x+this.w/2);
      this.historyY.pop();
      this.historyY.unshift(this.pos_y + this.h/2);


      this.historyX.pop();
      this.historyX.unshift(this.pos_x+this.w/2);
      this.historyY.pop();
      this.historyY.unshift(this.pos_y + this.h/2);

    }
      
    

    for (let i = 0; i < this.ropeSize ; i++) {
      const p = this.points[i];

      // Smooth the curve with cubic interpolation to prevent sharp edges.
      const ix = this.cubicInterpolation(this.historyX, i / this.ropeSize * this.historySize);
      const iy = this.cubicInterpolation(this.historyY, i / this.ropeSize * this.historySize);

      p.x = ix;
      p.y = iy;
     // console.log(ix);
    }
  }

  clipInput(k, arr) {
    if (k < 0) k = 0;
      if (k > arr.length - 1) k = arr.length - 1;
          return arr[k];
  }

  getTangent(k, factor, array) {
    return factor * (this.clipInput(k + 1, array) - this.clipInput(k - 1, array)) / 2;
  }

  cubicInterpolation(array, t, tangentFactor) {
    if (tangentFactor == null) tangentFactor = 1;

    const k = Math.floor(t);
    const m = [this.getTangent(k, tangentFactor, array), this.getTangent(k + 1, tangentFactor, array)];
    const p = [this.clipInput(k, array), this.clipInput(k + 1, array)];
    t -= k;
    const t2 = t * t;
    const t3 = t * t2;
    return (2 * t3 - 3 * t2 + 1) * p[0] + (t3 - 2 * t2 + t) * m[0] + (-2 * t3 + 3 * t2) * p[1] + (t3 - t2) * m[1];
  }



  animate_left() {
    this.sprite.textures = this.left_animation;
    this.sprite.play();
  }
  animate_right() {
    this.sprite.textures = this.right_animation;
    this.sprite.play();
  }animate_jump(){
    if(this.vy < -8){
      if(this.sprite.scale.y > 0.1)
         this.sprite.scale.y -= 0.039;
      if(this.sprite.scale.x > 0.20)  
         this.sprite.scale.x -= 0.02;

    }
    else {
      if(this.sprite.scale.y < 0.2)
        this.sprite.scale.y +=  0.019;
      else{
        this.sprite.scale.y =  0.2;
      }  
      if(this.sprite.scale.x < 0.2)  
        this.sprite.scale.x += 0.02;
      else{
         this.sprite.scale.x = 0.2;
      }  
    }
  }

  getBounds(params) {

    var bounds = {
      x: this.pos_x,
      y: this.pos_y,
      height: this.sprite.height,
      width: this.sprite.width,
    };
    return bounds;
  }


  render(texture) {
    this.sprite = new PIXI.AnimatedSprite(texture);
    this.sprite.scale.x = 0.2;
    this.sprite.scale.y = 0.2;
    //this.sprite.anchor.set(0,1)
    this.sprite.animationSpeed = 0.167;
    this.sprite.loop = false;
    this.sprite.play();
    this.sprite.x = this.pos_x;
    this.sprite.y = this.pos_y;
    this.h = this.sprite.height;
    this.w = this.sprite.width;
    // Create the rope
    this.rope = new PIXI.SimpleRope(this.trailTexture, this.points);

    // Set the blendmode
    this.rope.blendmode = PIXI.BLEND_MODES.ADD;
    this.app.stage.addChild(this.rope);
    this.app.stage.addChild(this.sprite);
  

  }
  update(deltaTime) {

    this.key_handle(); // handles key pressed and change theire position
    this.updateTaile();
    this.animate_jump();
    this.seconds += (1 / 60) * deltaTime;
   
    this.pos_x += this.vx;
    this.pos_y += this.vy;
    if (this.vy < 7)
      this.vy += this.gravity;


    if (this.vx > 0)
      this.vx -= 1;
    if (this.vx < 0)
      this.vx += 1;

    if ((this.pos_y + this.h) >= (this.game.tile_height * 20)) {
      this.game.levels_array[this.game.current_lvl - 1].start();
    } else{
      this.on_ground = false;
    

    }


    this.sprite.x = this.pos_x;
    this.sprite.y = this.pos_y;
    this.check_collision();
    this.game.enemy_list.forEach(element => {
      if (this.colison_with(element)) {
        if(element.type == 'balon')
        {
           element.destroy();
           this.doble_jump = true;
        }else if(element.type == 'door')
          element.go_throug();
        else if(element.type == 'platform')
          element.collision();          
        //  this.vy = 0;
        //this.game.enemy_list.splice(0,1); 
      }

    });



    if(this.on_ground == false){
      if (this.coyote_timer_start == false)
      {
        this.timer_is_running = true;
        setTimeout(() => {this.timer_is_running = false;},this.coyote_timer);
        this.coyote_timer_start = true;
      
      }
    }else{
      this.is_in_jump = false;
      this.timer_is_running = false;
      this.doble_jump = false;
      this.coyote_timer_start = false;
    }
    if(this.timer_is_running && this.is_in_jump  == false){
        this.vy = 0;
        this.on_ground = true;
    }

       


  }

  key_handle() {
    if (this.game.key.presed.z && (((this.on_ground ) && !this.jump))) {

      this.vy = -8.9;
      this.jump = true;
      this.is_in_jump = true;
      this.jump_sound.play();
     // this.animate_jump();

    } if (this.game.key.presed.z && this.doble_jump && !this.jump) {
      this.vy = -8.9;
      this.is_in_jump = true;
      this.jump_sound.play();
      this.doble_jump = false;
    }
    if (!this.game.key.presed.z) {
      this.jump = false;
    }
    if (this.game.key.presed.ArrowRight) {
      if (!this.sprite.playing)
        this.animate_right();
      this.vx = Math.min(5, this.vx + 2);
    }
    if (this.game.key.presed.ArrowLeft) {
      if (!this.sprite.playing)
        this.animate_left();
      this.vx = Math.max(-5, this.vx - 2);
    }


  }


  check_collision() {

    let pos_in_map_x = Math.floor((this.pos_x + this.w / 2) / 16);
    let pos_in_map_y = Math.floor((this.pos_y) / 16);
    this.testColision_up(pos_in_map_x, pos_in_map_y)



    pos_in_map_x = Math.floor((this.pos_x + this.w / 2) / 16);
    pos_in_map_y = Math.floor((this.pos_y + this.h) / 16);
    this.testColision_down(pos_in_map_x, pos_in_map_y);
for(var i = 1; i<4 ; i++)
{
    pos_in_map_x = Math.floor((this.pos_x) / 16);
    pos_in_map_y = Math.floor((this.pos_y + this.h - 16*i) / 16);
    this.testColision_left(pos_in_map_x, pos_in_map_y);

    pos_in_map_x = Math.floor((this.pos_x + this.w) / 16);
    pos_in_map_y = Math.floor((this.pos_y + this.h - 16*i) / 16);
    this.testColision_right(pos_in_map_x, pos_in_map_y);
  }


  }


  testColision_down(x, y) {

    if (this.game.levels_colision[this.game.current_lvl][(x + (y * this.game.tile_width))] == 1) {
      var bounds = {
        x: x * 16,
        y: y * 16,
        width: 16,
        height: 16,
      };

      this.pos_y = y * 16 - this.h;
      this.vy = 0;
      this.on_ground = true;



    } else
      this.on_ground = false;
  }


  testColision_left(x, y) {

    // console.log("x:" + x);
    if (this.game.levels_colision[this.game.current_lvl][(x + (y * this.game.tile_width))] == 1) {
      var bounds = {
        x: x * 16,
        y: y * 16,
        width: 16,
        height: 16,
      };

      //  this.pos_y = y*16 - this.h ;
      this.pos_x = (x + 1) * 16;
      this.vx = 0;

      // this.vy = 0;
      //this.on_ground = true;



    }
  }

  testColision_right(x, y) {

    // console.log("x:" + x);
    if (this.game.levels_colision[this.game.current_lvl][(x + (y * this.game.tile_width))] == 1) {
      var bounds = {
        x: x * 16,
        y: y * 16,
        width: 16,
        height: 16,
      };

      //  this.pos_y = y*16 - this.h ;
      this.pos_x = x * 16 - this.w;
      this.vx = 0;

      // this.vy = 0;
      //this.on_ground = true;



    }
  }

  testColision_up(x, y) {
    if (this.game.levels_colision[this.game.current_lvl][(x + (y * this.game.tile_width))] == 1) {
      var bounds = {
        x: x * 16,
        y: y * 16,
        width: 16,
        height: 16,
      };


      this.pos_y = this.pos_y + 2;
      this.vy = 0.5;
      this.on_ground = false;
      console.log("y:" + y);

    }
  }

  //test colision with object 
  colison_with(object) {
    if (this.pos_x < object.pos_x + object.w &&
      this.pos_x + this.w > object.pos_x &&
      this.pos_y < object.pos_y + object.h &&
      this.h + this.pos_y > object.pos_y) //{
      return true;
    else {
      return false;
    }
  }


}