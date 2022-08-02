export default class Door{


    constructor(game,pos_x,pos_y,lvl){
        this.game = game;
        this.pos_x = pos_x;
        this.pos_y = pos_y;

        this.type = 'door';

        this.w = 100;
        this.h = 100;

        this.lvl = lvl;
    }

    go_throug(){
        this.lvl.start();
    }


}