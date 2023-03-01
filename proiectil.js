export default class Proiectil {

    constructor(parent,pos_x, pos_y, game, target) {
      this.pos_x = 0;
      this.pos_y = 0;
      this.game = game;
      this.target = target;
      this.target_x = this.target.pos_x;
      this.target_y = this.target.pos_y;

      this.type = 'proiectil';
      const texture = new PIXI.Texture.from("./assets/proiectil.png");
      this.sprite = new PIXI.Sprite(texture);
      this.sprite.x = this.pos_x;
      this.sprite.y = this.pos_y;
      this.sprite.anchor.set(0.5, 0.5);
      this.frame_counter = 0;

      this.w = this.sprite.width;
      this.h = this.sprite.height;
      parent.tunContainer.addChild(this.sprite);
      this.parent = parent;
      this.parentContainer = game.container;
      this.targetLocalPos = this.parent.tunContainer.toLocal(new PIXI.Point(this.target_x,this.target_y));
      this.speed = 4;
      this.destroyed = false;
      this.sprite.rotation = -parent.rotation
      this.recharge = 600;

  
    }

  
    update(deltaTime) {
      this.frame_counter++
      if(this.frame_counter > this.recharge)
      {
        this.pos_x =0 ;
        this.pos_y =0 ;
        this.frame_counter = 0;
        this.target_x = this.target.pos_x;
        this.target_y = this.target.pos_y;

        this.globalTargetPos = this.parentContainer.toGlobal(new PIXI.Point(this.target_x, this.target_y));
        this.targetLocalPos = this.parent.tunContainer.toLocal(this.globalTargetPos);
        
      }
      this.move(deltaTime);
      this.hitTest();
    }
  
    move(deltaTime) {  
      const dx = this.targetLocalPos.x;
      const dy = this.targetLocalPos.y;
      const angle = Math.atan2(dy, dx);
      this.sprite.rotation = angle;

      this.pos_x += Math.cos(angle) * this.speed;
      this.pos_y += Math.sin(angle) * this.speed;

     this.sprite.x = this.pos_x;
     this.sprite.y = this.pos_y;
    }
  
    hitTest() 
    {
      var globalTargetPos = this.parentContainer.toGlobal(new PIXI.Point(this.game.pointy_character.pos_x, this.game.pointy_character.pos_y));
      var pointy = this.parent.tunContainer.toLocal(globalTargetPos);
      if(this.colison_with(pointy))
          this.game.levels_array[this.game.current_lvl - 1].start();

    }
  
    destroy() {
      this.destroyed = true;
      this.pos_x = -1;
      this.pos_y = -1;
  
  //    this.sprite.destroy();
    }

    colison_with(pointy) {
      if (this.pos_x < pointy.x + this.game.pointy_character.w &&
        this.pos_x + this.w > pointy.x &&
        this.pos_y < pointy.y + this.game.pointy_character.h &&
        this.h + this.pos_y > pointy.y) //{
        return true;
      else {
        return false;
      }
    }


  }
  