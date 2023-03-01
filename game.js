import Pointy from "./pointy.js";
import Enemy from "./enemy.js";
import MovingPlatform from "./movingplatform.js";
import lvl_1 ,{lvl_2,lvl_3,lvl_4,lvl_5,lvl_6,lvl_7,lvl_8,lvl_9,lvl_10,lvl_11,lvl_12} from "./colision_lvls.js"
//import lvl_2 from "./colision_lvls.js"
import Turtle from "./turtle.js";
import Portal from "./portal.js";
import Level from "./level.js";
import Door from "./door.js";
import Tun from "./tun.js";
import Lever from "./lever.js";

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
this.app.stage = new PIXI.display.Stage();

   this.enemy_list = [];
   this.tile_width = 177;
   this.tile_height = 45;




   this.pointy_character = new Pointy(40,this.app.view.height - 400,this.app,this);
   this.levels_colision = [];
   this.current_lvl = 0;
   this.levels_colision.push(lvl_1);
   this.levels_colision.push(lvl_2);
   this.levels_colision.push(lvl_3);
   this.levels_colision.push(lvl_4);
   this.levels_colision.push(lvl_5);
   this.levels_colision.push(lvl_6);
   this.levels_colision.push(lvl_7);
   this.levels_colision.push(lvl_8);
   this.levels_colision.push(lvl_9);
   this.levels_colision.push(lvl_10);
   this.levels_colision.push(lvl_11);
   this.levels_colision.push(lvl_12);










   this.levels_array = [];
   this.levelSoundtrack = new Audio("./assets/High End Party.ogg");
   this.levelSoundtrack .volume = 0.4;
   if(edite_mode)
    this.enter_pressed = document.addEventListener('keypress', e =>{
    if (e.key === 'Enter') {
        let string = '['
        for(var i =0; i < this.tile_height ;i++){
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
.add('lvl3','./assets/lvl3_map.png')
.add('lvl4','./assets/lvl4_map.png')
.add('lvl5','./assets/lvl5_map.png')
.add('lvl6','./assets/lvl6_map.png')
.add('lvl7','./assets/lvl7_map.png')
.add('lvl8','./assets/lvl8_map.png')
.add('lvl9','./assets/lvl9_map.png')
.add('lvl10','./assets/lvl10_map.png')
.add('lvl11','./assets/lvl11_map.png')
.add('lvl12','./assets/lvl12_map.png')








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
  this.tilling = new PIXI.TilingSprite(resorces.cer.texture,4000,900);

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


  this.createLVLs();




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
  this.platform = new MovingPlatform(19,500,this,16,500)
  this.platform2 = new MovingPlatform(670,431,this,670,1103)

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
  var lvl_2_door = new Door(this,2553,572, this.levels_array[0]);
  this.enemy_list.push(lvl_2_door);





  this.enemy_list.push(this.turtle1);
  // this.enemy_list.push(this.platform);
  // this.enemy_list.push(this.platform2);


  this.enemy_list.push(this.portal);

  
  this.enemy_list.forEach(element => {
    if(element.type == 'balon' || element.type == "platform")
      this.container.addChild(element.sprite);
    else if(element.type == 'tun')  
      this.container.addChild(element.tunContainer);

   });

}

 loop(delta){
   
   this.pointy_character.update(delta);

  //  if(this.levelSoundtrack.paused)
  //      this.levelSoundtrack.play();
       
   this.enemy_list.forEach(element => { 
    if(element.type == 'balon' || element.type == 'platform' || element.type == 'tun' || element.type == 'portal' || element.type == "platform") 
       element.update(delta);
      }

   );

  if((this.tile_width * 16) > 850)
  {
   var camer_pos_y = this.pointy_character.pos_y ;
   var camers_pos_x = this.pointy_character.pos_x;
  // console.log(camers_pos_x);
   if((this.tile_height * 16) < 750)
     camer_pos_y = 550;
   else{
    camer_pos_y = this.pointy_character.pos_y + 100 ;
     if((this.pointy_character.pos_y  - 550) < 0)
          camer_pos_y =    550 + 100;
        
   }  

   if (this.pointy_character.pos_x < 199 )
     camers_pos_x = 200;
   if (this.pointy_character.pos_x > (this.tile_width * 16) - 600 && (this.tile_width * 16) > 800  )
     camers_pos_x = (this.tile_width * 16 - 600);
     


   this.app.stage.pivot.x = camers_pos_x;
   this.tilling.tilePosition.x = camers_pos_x / 4;
   this.app.stage.pivot.y = camer_pos_y;
   this.app.stage.position.x = 200;
   this.app.stage.position.y = 550;

  }
  else{
    this.app.stage.pivot.x = 0;
    this.app.stage.pivot.y = 0;
    this.app.stage.position.x = 0;
    this.app.stage.position.y = 0;

  }

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


createLVLs(){

  var level2 = new Level(this,lvl_2,this.loader.resources.lvl2.texture,0,1,0);
  level2.setTileWH(50,40);
  level2.setSoundtrack(new Audio("./assets/Magical Forest.ogg"));
  level2.setStartPoint(150,57);

  var level3 = new Level(this,lvl_3,this.loader.resources.lvl3.texture,0,2,0);
  level3.setTileWH(50,40);
  //level3.setSoundtrack(new Audio("./assets/Magical Forest.ogg"));
  level3.setStartPoint(4,395);
 // level3.start();

 var level4 = new Level(this,lvl_4,this.loader.resources.lvl4.texture,0,3,0);
 level4.setTileWH(200,40);
 //level4.setSoundtrack(new Audio("./assets/Magical Forest.ogg"));
 level4.setStartPoint(0,322);
 var balon_4 = new Enemy(1051,298,this);
 var balon_4_2 = new Enemy(2635,268,this);
 var balon_4_3 = new Enemy(1796,244,this);


 level4.pushEntety(balon_4);
 level4.pushEntety(balon_4_2);
 level4.pushEntety(balon_4_3);


 var balon_5 = new Enemy(211,499,this);
 var balon_5_2 = new Enemy(545,281,this);
 var balon_5_3 = new Enemy(924,300,this);


 var level5 = new Level(this,lvl_5,this.loader.resources.lvl5.texture,0,4,0);
 level5.setTileWH(79,50);
 level5.pushEntety(balon_5);
 level5.pushEntety(balon_5_2);
 level5.pushEntety(balon_5_3);
 level5.setStartPoint(0,322);




 var level6 = new Level(this,lvl_6,this.loader.resources.lvl6.texture,0,5,0);
 level6.setTileWH(50,40);
 level6.setStartPoint(0,30);


 var balon_6 = new Enemy(164,248,this);
 var balon_6_2 = new Enemy(335,305,this);
 var balon_6_3 = new Enemy(295,169,this);

 level6.pushEntety(balon_6);
 level6.pushEntety(balon_6_2);
 level6.pushEntety(balon_6_3);



 var level7 = new Level(this,lvl_7,this.loader.resources.lvl7.texture,0,6,0);
 level7.setTileWH(50,40);
 level7.setStartPoint(0,-10);


 var balon_7 = new Enemy(81,163,this);
 var balon_7_2 = new Enemy(146,345,this);
 var balon_7_3 = new Enemy(150,144,this);
 var balon_7_4 = new Enemy(226,156,this);
 var balon_7_5 = new Enemy(304,343,this);
 var balon_7_6 = new Enemy(375,220,this);
 var balon_7_7 = new Enemy(482,220,this);
 var balon_7_8 = new Enemy(482,376,this);
 
 //level7.start();


 level7.pushEntety(balon_7);
 level7.pushEntety(balon_7_2);
 level7.pushEntety(balon_7_3);
 level7.pushEntety(balon_7_4);
 level7.pushEntety(balon_7_5);
 level7.pushEntety(balon_7_6);
 level7.pushEntety(balon_7_7);
 level7.pushEntety(balon_7_8);



 var level8 = new Level(this,lvl_8,this.loader.resources.lvl8.texture,0,7,0);
 level8.setTileWH(50,40);
 level8.setStartPoint(19,434);
 var level8_platform = new MovingPlatform(300,446,this,16,500);
 var level8_platform_2 = new MovingPlatform(303,242,this,16,600);
 level8_platform.setSpeed(4);
 level8_platform_2.setSpeed(4);
 level8.pushEntety(level8_platform);
 level8.pushEntety(level8_platform_2);

 var level9 = new Level(this,lvl_9,this.loader.resources.lvl9.texture,0,8,0);
 level9.setTileWH(100,40);
 level9.setStartPoint(27,494);
 //level9.setSoundtrack(new Audio("./assets/Magical Forest.ogg"));
 var balon_9_1 = new Enemy(436,338,this);
 level9.pushEntety(balon_9_1);
 var tun_9_1 = new Tun(1564,43,this);
 var tun_9_2 = new Tun(500,43,this);
 var tun_9_3 = new Tun(61,29,this);
 var tun_9_4 = new Tun(661,512,this);




 level9.pushEntety(tun_9_1);
 level9.pushEntety(tun_9_2);
 level9.pushEntety(tun_9_3);
 level9.pushEntety(tun_9_4);


 var level10 = new Level(this,lvl_10,this.loader.resources.lvl10.texture,0,9,0);
 level10.setTileWH(50,40);
 level10.setStartPoint(27,494);
 var level10_platform = new MovingPlatform(138,599,this,94,500);
 var level10_platform_2 = new MovingPlatform(385,154,this,16,600);
 var level10_platform_3 = new MovingPlatform(483,350,this,350,600);
 var balon_10_1 = new Enemy(764,437,this);

 var level10_tun = new Tun(25,33,this);
 var level10_tun2 = new Tun(7,11,this);
 var level10_tun3 = new Tun(7,50,this);

 level10_tun2.setTarget(level10_platform_2);
 level10_tun.setTarget(level10_platform_3);
 level10_tun3.setTarget(level10_platform);


 level10_tun.proiectil.speed = 7;
 level10_tun.proiectil.recharge = 150;

 level10_tun2.proiectil.speed = 7;
 level10_tun2.proiectil.recharge = 156;

 level10_tun3.proiectil.speed = 10;
 level10_tun3.proiectil.recharge = 123;

 level10_platform.setSpeed(4);
 level10_platform_2.setSpeed(4);
 level10_platform_3.setSpeed(5);


 level10.pushEntety(level10_platform);
 level10.pushEntety(level10_platform_2);
 level10.pushEntety(level10_platform_3);
 level10.pushEntety(level10_tun);
 level10.pushEntety(balon_10_1);
 level10.pushEntety(level10_tun2);
 level10.pushEntety(level10_tun3);


 var level11 = new Level(this,lvl_11,this.loader.resources.lvl11.texture,0,10,0);
 level11.setTileWH(150,45);
 level11.setStartPoint(18,24);
 var balon_11 = new Enemy(392,568,this);
 var balon_11_3 = new Enemy(150,144,this);
 var balon_11_4 = new Enemy(843,584,this);
 var balon_11_5 = new Enemy(943,387,this);
 var balon_11_6 = new Enemy(1095,250,this);
 var level11_tun2 = new Tun(1815,515,this);

 level11.pushEntety(balon_11);
 level11.pushEntety(balon_11_3);
 level11.pushEntety(balon_11_4);
 level11.pushEntety(balon_11_4);
 level11.pushEntety(balon_11_5);
 level11.pushEntety(level11_tun2);
 level11.pushEntety(balon_11_6);


 var level12 = new Level(this,lvl_12,this.loader.resources.lvl12.texture,0,11,0);
 level12.setTileWH(70,45);
 level12.setStartPoint(27,38);
 var balon_12 = new Enemy(353,207,this);
 var balon_12_2 = new Enemy(170,132,this);
 var balon_12_3 = new Enemy(650,475,this);
 var balon_12_4 = new Enemy(840,460,this);
 var lever_12 = new Lever(562,98,this);

 var level_12_tun = new Tun(289,65,this);
 var level_12_tun_2 = new Tun(762,65,this);
 level12.pushEntety(balon_12);
 level12.pushEntety(balon_12_2);
 level12.pushEntety(level_12_tun);
 level12.pushEntety(level_12_tun_2);
 level12.pushEntety(balon_12_3);
 level12.pushEntety(balon_12_4);
 level12.pushEntety(lever_12);


 level_12_tun.setTarget(level_12_tun_2);
 level_12_tun_2.setTarget(level_12_tun);




  var door_lvl_2 = new Door(this,763,462,level3);
  level2.pushEntety(door_lvl_2);


  var door_lvl_3 = new Door(this,757,421,level4);
  level3.pushEntety(door_lvl_3);

  var door_lvl_4 = new Door(this,3169,283,level5);
  level4.pushEntety(door_lvl_4);

  var door_lvl_5 = new Door(this,1227,475,level6);
  level5.pushEntety(door_lvl_5);

  var door_lvl_6 = new Door(this,760,210,level7);
  level6.pushEntety(door_lvl_6);

  var door_lvl_7 = new Door(this,772,415,level8);
  level7.pushEntety(door_lvl_7)

  var door_lvl_8 = new Door(this,772,125,level9);
  level8.pushEntety(door_lvl_8)


  var door_lvl_9 = new Door(this,1565,535,level10);
  level9.pushEntety(door_lvl_9)


  //level.start();
  this.levels_array.push(level2);
  this.levels_array.push(level3);
  this.levels_array.push(level4);
  this.levels_array.push(level5);
  this.levels_array.push(level6);
  this.levels_array.push(level7);
  this.levels_array.push(level8);
  this.levels_array.push(level9);
  this.levels_array.push(level10);
  this.levels_array.push(level11);
  this.levels_array.push(level12);


  level12.start();









  
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





