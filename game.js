import Pointy from "./pointy.js";
import Enemy from "./enemy.js";
import lvl_1 from "./colision_lvls.js"



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
   this.pointy_character = new Pointy(40,this.app.view.height - 400,this.app,this);
   this.levels_colision = [];
   this.levels_colision.push(lvl_1);
   this.key = new Keyboard();



  }


start()
{
  document.body.appendChild(this.app.view);
    this.loader = PIXI.Loader.shared;
this.loader.add('lvl1','./assets/lvl1_map.png')
.add('pointy','./assets/pointy_animation.png')
.add('pointy_animation','./assets/pointy_animation.json')
.add('pointy_animation_left','./assets/pointy_animation_left.json')
.add('alien' , 'assets/pointy_enemy.png')

;
this.loader.load(this.setup.bind(this));
this.loader.onComplete.add(() => {this.app.ticker.add(delta => this.loop(delta));}); // called once when the queued resources all load.

}

setup(loader,resorces){
  const background = new PIXI.Sprite(
      resorces.lvl1.texture
  );


  this.app.view.setAttribute('tabindex',0);
  this.key.watch(this.app.view);
 // character_sprite.addChild(pointy);
  this.app.stage.addChild(background);
  const pointy_texture_right = [];
  const pointy_texture_left = [];

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
  this.drawCollision();


}

 loop(delta){
   this.pointy_character.update(delta);
}

drawCollision() // draw current lvl collisions !
{
    for(var i = 0 ;i<2000;i++)
    {
      var graphics = new PIXI.Graphics();

    // Set the fill color
      if( this.levels_colision[0][i] == 1)
      {   
        graphics.beginFill(0xe74c3c); // Red

        // Draw a circle
        //console.log(Math.floor(i/40));
        graphics.drawCircle((i % 50 ) * 16 , Math.floor(i/50) * 16  , 5); // drawCircle(x, y, radius)

        // Applies fill to lines and shapes since the last call to beginFill.
       graphics.endFill();
       this.app.stage.addChild(graphics);
      }
}

}

}


var game = new Game();
game.start();

// const Application = PIXI.Application;
// const app = new Application({
//     width: 800,
//     height: 640,
//     transparent: false,
//     antiallas: true,
// });


// var pointy_character = new Pointy(40,app.view.height - 400,app);




// function testForAABB(object1, object2) {
//     const bounds1 = object1.getBounds();
//     const bounds2 = object2;
//    // console.log(bounds1.x);

//     return bounds1.x < bounds2.x + bounds2.width
//         && bounds1.x + bounds1.width > bounds2.x
//         && bounds1.y < bounds2.y + bounds2.height
//         && bounds1.y + bounds1.height > bounds2.y;



// }

// var colision_map = [
//     1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
//     1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
//     1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
//     1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
//     1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
//     1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
//     1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
//     1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
//     1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
//     1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
//     1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
//     1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
//     1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
//     1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
//     1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
//     1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
//     1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
//     1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
//     1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
//     1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
//     1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
//     1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
//     1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
//     1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
//     1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
//     1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
//     1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
//     1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
//     1,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
//     1,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
//     1,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
//     1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
//     1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
//     1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
//     1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
//     1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
//     1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
//     1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
//     1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,
//     1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];

// // var string = "["
// // for(var i = 0; i<40 ;i++){
// //     string += '\n'
// //    for(var j = 0; j<50;j++)
// //       string += '0,'}
// // console.log(string);    


        
// //console.log(colision_map[1699]);

// function testColision(x,y)
// {

//   //console.log(Math.round(x + (y* 50)));
//   if(colision_map[(x + (y* 50))+1] == 1){
//     var bounds = {
//         x: x*16,
//         y : y*16,
//         width : 16,
//         height: 16,
//     };

//     let adevarat = testForAABB(pointy_character,bounds);
//     //console.log(adevarat);
//     pointy_character.pos_y = y*16  ;
//     pointy_character.vy = 0;
//     pointy_character.on_ground = true;
    

//   }else
//       pointy_character.on_ground = false;
// }

// function testColision_up(x,y)
// {

//   //console.log(Math.round(x + (y* 50)));
//   if(colision_map[(x + (y* 50))+1] == 1){
//     var bounds = {
//         x: x*16,
//         y : y*16,
//         width : 16,
//         height: 16,
//     };

//     let adevarat = testForAABB(pointy_character,bounds);
//     console.log(adevarat);
//     pointy_character.pos_y =  pointy_character.pos_y + 2 ;
//     pointy_character.vy = 0.5;
//     pointy_character.on_ground = false;
    
//   }
// }


// // let pointy = {
// //     pos_x : 10,
// //     pos_y :  app.view.height - 78,
// // }


// document.body.appendChild(app.view);
// const loader = PIXI.Loader.shared;
// loader.add('lvl1','./assets/lvl1_map.png')
// .add('pointy','./assets/pointy_animation.png')
// .add('pointy_animation','./assets/pointy_animation.json')
// .add('pointy_animation_left','./assets/pointy_animation_left.json')
// .add('alien' , 'assets/pointy_enemy.png')

// ;
// loader.load(setup);
// var sprtes = {};
// var key = new Keyboard();
// var space_en = {};
// var space_en_1 = {};
// var space_en_2 = {};


// function setup(loader,resorces){
//     const background = new PIXI.Sprite(
//         resorces.lvl1.texture
//     );


//     app.view.setAttribute('tabindex',0);
//     key.watch(app.view);
//    // character_sprite.addChild(pointy);
//     app.stage.addChild(background);
//     const pointy_texture_right = [];
//     const pointy_texture_left = [];
//      space_en = new Enemy(30,300,app);
//      space_en_1 = new Enemy(100,300,app);
//      space_en_2 = new Enemy(200,300,app);


//     for(let i = 1; i<5;i++){
//      const texture = new PIXI.Texture.from(`ponty_walk_right_${i}.png`);
//      pointy_texture_right.push(texture);
//      const texture2 = new PIXI.Texture.from(`ponty_walk_left_${i}.png`);
//       pointy_texture_left.push(texture2);


//     }


//   //  app.stage.addChild(character_sprite);
//   pointy_character.left_animation = pointy_texture_left;
//   pointy_character.right_animation = pointy_texture_right;



//   pointy_character.render(pointy_texture_right);


// //   for(var i = 0 ;i<2000;i++){
// //     var graphics = new PIXI.Graphics();

// //     // Set the fill color
// //  if(colision_map[i] == 1){   
// // graphics.beginFill(0xe74c3c); // Red

// // // Draw a circle
// // //console.log(Math.floor(i/40));
// // graphics.drawCircle((i % 50 ) * 16 , Math.floor(i/50) * 16  , 5); // drawCircle(x, y, radius)

// // // Applies fill to lines and shapes since the last call to beginFill.
// // graphics.endFill();
// // app.stage.addChild(graphics);}
// // }


// }







// loader.onComplete.add(() => {app.ticker.add(delta => loop(delta));}); // called once when the queued resources all load.
// var jump = false;

// function loop(delta){
//   pointy_character.update(delta);
//   space_en.update(delta);
//   space_en_1.update(delta);
//   space_en_2.update(delta);

  
//   if(key.presed.ArrowUp && pointy_character.on_ground && !jump){
//         pointy_character.vy -= 9.9; 
//      //   pointy_character.gravity = 0;
//        jump = true; 
//         pointy_character.update(delta); 
//   }if(!key.presed.ArrowUp){
//     jump = false;
//   } 
//     if (key.presed.ArrowRight){
//         if(!pointy_character.sprite.playing)
//       pointy_character.animate_right();  
//       pointy_character.vx += Math.min(3,pointy_character.vx + 2) ;
//     }
//      if(key.presed.ArrowLeft){
//       if(!pointy_character.sprite.playing)
//            pointy_character.animate_left();
//       pointy_character.vx += Math.max(-3,pointy_character.vx - 2) ;
//     }

//     let pos_in_map_x = Math.round(pointy_character.pos_x / 16) ;
//     let pos_in_map_y = Math.round((pointy_character.pos_y - pointy_character.sprite.height) /16);
//     testColision_up(pos_in_map_x,pos_in_map_y)

//      pos_in_map_x = Math.round(pointy_character.pos_x / 16) ;
//      pos_in_map_y = Math.round(pointy_character.pos_y /16);
//     testColision(pos_in_map_x,pos_in_map_y);

   

//     pointy_character.update(delta);






// }

// document.addEventListener("keydown",arrowPress);


// function arrowPress(e){

//     // if(e.code === 'Space' && pointy_character.on_ground)
//     //     pointy_character.vy -= 5;   
//     // if (e.key === 'ArrowRight'){
//     //     if(!pointy_character.sprite.playing)
//     //   pointy_character.animate_right();  
//     //   pointy_character.vx += Math.min(2,pointy_character.vx + 2);
//     // }
//     //  if(e.key === 'ArrowLeft'){
//     //   if(!pointy_character.sprite.playing)
//     //        pointy_character.animate_left();
//     //   pointy_character.vx += Math.max(-2,pointy_character.vx - 2);
//     // }


// }


