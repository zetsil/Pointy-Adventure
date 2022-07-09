
export default class Level{

    constructor(game,colision_map,map_png,entety_list,lvl_number){
      //  this.colision_map = colision_map;
        this.map_png = map_png;
        this.entety_list = [];
        this.game = game;
        this.lvl_number = lvl_number;

        
    }


    setTileWH(width,height){
      this.Twidth = width;
      this.Theight = height;
    }

    setSoundtrack(audio){
         this.soundtrack = audio;
    }

    pushEntety(entety)
    {
      this.entety_list.push(entety);
    }

    start(){
       // this.game.container.removeChild(  this.game.container.children[0]);
        //this.game.app.stage.removeChild(this.game.app.stage.children[0]);

       // this.game.loader.load(this.setup.bind(this));
       this.game.current_lvl = this.lvl_number;
       this.game.tile_width = this.Twidth;
       this.game.tile_height =  this.Theight ;

       this.entety_list.forEach(element => {
        this.game.container.addChild(element);
       });

     //  this.game.enemy_list.clear();
       this.game.enemy_list = this.entety_list;


        //var sprite = new PIXI.Sprite.from(this.game.loader.resources.lvl2.texture);
      //  this.game.background.setTexture(texture);
       // console.log(this.game.current_lvl);
        while(this.game.container.children[0])
        {
          this.game.container.removeChild(this.game.container.children[0]);
        }
         if(this.soundtrack)
         {
        this.soundtrack.volume = 0.3;  
        this.game.levelSoundtrack = this.soundtrack;

         }

        this.game.background.texture = this.game.loader.resources.lvl2.texture;
        this.game.container.addChild( this.game.background);
        //txt.texture = this.game.loader.resources.lvl2.texture;
    }



}

//colision



//assets_loader