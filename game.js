import Pointy from "./pointy.js";
import Enemy from "./enemy.js";
import lvl_1 ,{lvl_2} from "./colision_lvls.js"
//import lvl_2 from "./colision_lvls.js"
import Turtle from "./turtle.js";
import Portal from "./portal.js";
import Level from "./level.js";


var edite_mode = false;

class Keyboard {
  constructor(){
  this.presed = {};
  }
  watch(ev){
      ev.addEventListener('keydown' ,(e) => {
          this.presed[e.key] = true;
      });
      ev.addEventListener('keyup' ,(e) =>{
          this.presed[e.key] = false;
      });
  }
};


class Game{

  constructor(){

     const Application = PIXI.Application;
     this.app = new Application({
    width: 800,
    height: 640,
    transparent: false,
    antiallas: true,
});

   this.enemy_list = [];
   this.tile_width = 177;
   this.tile_height = 45;




   this.pointy_character = new Pointy(40,this.app.view.height - 400,this.app,this);
   this.levels_colision = [];
   this.current_lvl = 0;
   this.levels_colision.push(lvl_1);
   this.levels_colision.push(lvl_2);
   this.levelSoundtrack = new Audio("./assets/High End Party.ogg");
   this.levelSoundtrack .volume = 0.4;
   if(edite_mode)
    this.enter_pressed = document.addEventListener('keypress', e =>{
    if (e.key === 'Enter') {
        let string = '['
        for(var i =0; i < 40 ;i++){
          string += '\n';
          for(var j=0;j<this.tile_width;j++)
             string+= this.levels_colision[this.current_lvl][i*this.tile_width + j] + ',';
        }string += ']';
        console.log(string);
    }
});

   this.key = new Keyboard();




  }


start()
{
  document.body.appendChild(this.app.view);
    this.loader = PIXI.Loader.shared;
this.loader.add('lvl','./assets/lvl_2.png')
.add('pointy','./assets/pointy_animation.png')
.add('pointy_animation','./assets/pointy_animation.json')
.add('pointy_animation_left','./assets/pointy_animation_left.json')
.add('alien' , 'assets/pointy_enemy.png')
.add('trail','assets/trail.png')
.add('cer','./assets/cer_instelat_bg.png')
.add('lvl2','./assets/lvl1_map.png')


;
this.loader.load(this.setup.bind(this));
this.loader.onComplete.add(() => {this.app.ticker.add(delta => this.loop(delta));}); // called once when the queued resources all load.

}

setup(loader,resorces){
  this.container = new PIXI.Container();
   this.background = new PIXI.Sprite(
      resorces.lvl.texture
  );

  

  this.background.interactive = true;
  this.background.buttonMode = true;
  this.tilling = new PIXI.TilingSprite(resorces.cer.texture,2856,640);
  this.app.stage.addChild(this.tilling);
  this.container.addChild(this.background);

  this.background.on('pointertap', () => {
   this.mousePosition = this.app.renderer.plugins.interaction.mouse.getLocalPosition(this.background);

  console.log("x:" + this.mousePosition.x);
  console.log("y:" + this.mousePosition.y);
  if(edite_mode)
   {
   this.addColision(this.mousePosition.x,this.mousePosition.y);
   this.drawCollision();
   }
  });



  this.app.view.setAttribute('tabindex',0);
  this.key.watch(this.app.view);

 // character_sprite.addChild(pointy);
  this.app.stage.addChild(this.container);
  //console.log(this.container.width);
  const pointy_texture_right = [];
  const pointy_texture_left = [];
  const tailTexture = new PIXI.Texture.from('trail');

  for(let i = 1; i<5;i++){
   const texture = new PIXI.Texture.from(`ponty_walk_right_${i}.png`);
   pointy_texture_right.push(texture);
   const texture2 = new PIXI.Texture.from(`ponty_walk_left_${i}.png`);
    pointy_texture_left.push(texture2);
  }

    //  app.stage.addChild(character_sprite);
  this.pointy_character.left_animation = pointy_texture_left;
  this.pointy_character.right_animation = pointy_texture_right;



  this.pointy_character.render(pointy_texture_right);
  if(edite_mode)
    this.drawCollision();
  this.spce_enemy = new Enemy(1346, 434,this);
  this.spce_enemy1 = new Enemy(1101,420,this);
  this.spce_enemy2 = new Enemy(1101,231,this);
  this.spce_enemy3 = new Enemy(1851,263,this);
  this.spce_enemy4 = new Enemy(2334,294,this);
  this.spce_enemy5 = new Enemy(1164,420,this);
  this.spce_enemy6 = new Enemy(1164,231,this);





  this.turtle1 = new Turtle(19,593,this,16,592);
  this.portal = new Portal(2574,336,this);
  // this.spce_enemy2 = new Enemy(1107,231,this);
  // this.spce_enemy1 = new Enemy(1101,420,this);
  // this.spce_enemy2 = new Enemy(1107,231,this);

  this.enemy_list.push(this.spce_enemy);
  this.enemy_list.push(this.spce_enemy1);
  this.enemy_list.push(this.spce_enemy2);
  this.enemy_list.push(this.spce_enemy3);
  this.enemy_list.push(this.spce_enemy4);
  this.enemy_list.push(this.spce_enemy5);
  this.enemy_list.push(this.spce_enemy6);



  this.enemy_list.push(this.turtle1);
  this.enemy_list.push(this.portal);


  var level = new Level(this,lvl_2,0,0,1);
  level.setTileWH(50,40);
  level.setSoundtrack(new Audio("./assets/Magical Forest.ogg"));
  level.start();



}

 loop(delta){
   
   this.pointy_character.update(delta);

   if(this.levelSoundtrack.paused)
       this.levelSoundtrack.play();
   this.enemy_list.forEach(element => { element.update(delta);




    var camer_pos_y = this.pointy_character.pos_y ;
    var camers_pos_x = this.pointy_character.pos_x;
   // console.log(camers_pos_x);
    camer_pos_y = 550;
    if (this.pointy_character.pos_x < 199 )
    camers_pos_x = 200;
    if (this.pointy_character.pos_x > 2250 )
    camers_pos_x = 2250;
   this.app.stage.pivot.x = camers_pos_x;
   this.tilling.tilePosition.x = camers_pos_x / 4;
   this.app.stage.pivot.y = camer_pos_y;
   this.app.stage.position.x = 200;
    this.app.stage.position.y = 550;
  //  this.app.stage.removeChildren();
    //console.log("helooo");
    
   });
}

drawCollision() // draw current lvl collisions !
{
    for(var i = 0 ;i<this.tile_height* this.tile_width;i++)
    {
      var graphics = new PIXI.Graphics();

    // Set the fill color
      if( this.levels_colision[this.current_lvl][i] == 1)
      {   
       // graphics.beginFill(0xe74c3c); // Red

        // Draw a circle
        //console.log(Math.floor(i/40));
        graphics.lineStyle(2, 0xFF0000);
        graphics.drawRect((i % this.tile_width ) * 16 , Math.floor(i/this.tile_width) * 16  , 16,16); // drawCircle(x, y, radius)

        // Applies fill to lines and shapes since the last call to beginFill.
       //graphics.endFill();
       this.container.addChild(graphics);
      }
}

}

addColision(x,y)// add colision on click
{
  let pos_in_map_x = Math.floor(x / 16) ;
  let pos_in_map_y = Math.floor(y  /16);
  console.log('x:' +pos_in_map_x);
 // if(this.levels_colision[0][(pos_in_map_x + (pos_in_map_y* this.tile_width ))] == 1)
 //   this.levels_colision[0][(pos_in_map_x + (pos_in_map_y* this.tile_width ))] = 0;
 // else
    this.levels_colision[this.current_lvl][(pos_in_map_x + (pos_in_map_y* this.tile_width ))] = 1; 
}


}






// var colision_string  = "["
// for(var i = 0; i< 40;i++){
//   colision_string += '\n'
//   for(var j = 0; i <400;j++)
//     colision_string += '0,'
    

// }colision_string += ']'
// console.log(colision_string);


var game = new Game();
game.start();



