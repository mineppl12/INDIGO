import { drawing } from './draw.js';
import { Anim } from './animation.js';

export class textGroup{
    constructor(ctx){
        this.ctx = ctx;

        this.draw = new drawing(this.ctx);
        this.anim = [];
        this.animId = [];
        this.animCount = 0;

        this.adr = false;
        this.isDoingAnim = false;
    }

    addText(font,pos,id = String(this.draw.dataCount),doAutoDraw = true){
        if (!(this.draw.dataId.includes(id))){
            id = String(id);
            this.draw.data[id] = {
                "font" : font,
                "pos" : pos,
                "animProg" : () => {},
                "isDrawn" : false
            };
            this.draw.dataId[this.draw.dataCount] = id;
            this.draw.dataCount++;
            if (doAutoDraw){
                this.draw.data[id].isDrawn = true;
                this.draw.draw(id);
            }
        } else throw new Error(`(Duplicated Text ID) ${id} already exits`);
    }

    setAnim(id,prog){
        if (this.draw.dataId.includes(id)){
            id = String(id);
            this.draw.data[id].animProg = prog;
        } else throw new Error(`${id} doesn't exit`);
    }

    doAnim(id){
        if (this.draw.dataId.includes(id)){
            (async () => {
                this.anim[id] = new Anim(this.draw);
                this.anim[id].crFcObj = id;
                this.animId[this.animCount] = id;
                this.animCount++;
                this.isDoingAnim = true;
                await this.draw.data[id].animProg();
                await (() => {
                    this.isDoingAnim = false;
                }).bind(this);
            }).bind(this)();
        } else throw new Error(`${id} doesn't exist`);
    }

    resize(stageWidth,stageHeight){
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;

        if (!this.isDoingAnim){
            this.draw.draw();
            for (let i = 0; i < this.animCount; i++){
                this.anim[this.animId[i]].resize(this.stageWidth,this.stageHeight);
            }
        }
    }
}