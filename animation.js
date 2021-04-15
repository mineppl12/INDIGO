import  { drawing } from './draw.js';

export class Anim{
    constructor(draw){
        this.info = 'animation.js';

        this.draw = draw;
        
        this.crFcObj = '';
    }

    async moveTo(x,y){
        this.draw.data[this.crFcObj].pos.x = x;
        this.draw.data[this.crFcObj].pos.y = y;

        this.draw.draw();
    }

    async fmoveTo(x,y,dur,tf = "linear"){
        let startTime = null;
        const fx = this.draw.data[this.crFcObj].pos.x;
        const fy = this.draw.data[this.crFcObj].pos.y;

        function _fmoveTo(time){
            if (!startTime) startTime = time;

            const delta = Math.min(1, (time - startTime) / (dur * 1000));
            const dx = (x - fx) / 100 * (100 * this.TF(delta,tf));
            const dy = (y - fy) / 100 * (100 * this.TF(delta,tf));

            this.draw.data[this.crFcObj].pos.x = dx + fx;
            this.draw.data[this.crFcObj].pos.y = dy + fy;

            this.draw.draw("all");

            if (delta < 1){
                requestAnimationFrame(_fmoveTo.bind(this));
            } else{
                startTime = null;
            }
        }

        requestAnimationFrame(_fmoveTo.bind(this));
    }

    async setOpacity(op){
        this.draw.data[this.crFcObj].font.opac = op;

        this.draw.draw("all");
    }

    async fsetOpacity(op,dur,tf = "linear"){
        let startTime = null;
        const fop = this.draw.data[this.crFcObj].font.opac;

        function _fsetOpacity(time){
            if (!startTime) startTime = time;

            const delta = Math.min(1, (time - startTime) / (dur * 1000));
            const dop = (op - fop) / 100 * (100 * this.TF(delta,tf));

            this.draw.data[this.crFcObj].font.opac = dop + fop;

            this.draw.draw("all");

            if (delta < 1){
                requestAnimationFrame(_fsetOpacity.bind(this));
            } else{
                startTime = null;
            }
        }

        requestAnimationFrame(_fsetOpacity.bind(this));
    }

    async typing(snt,dur){
        const perDur = dur / (snt.length - 1);
        const x = setInterval(_typing.bind(this),perDur * 1000);
        let i = 0;

        function _typing(){
            this.draw.data[this.crFcObj].font.ctn += snt[i];

            this.draw.draw("all");

            i++;

            if (i >= snt.length) clearInterval(x);
        }

        return this.delay(dur * 1000);
    }

    async unTyping(dur){
        const cur = this.draw.data[this.crFcObj].font.ctn;
        const perDur = dur / (cur.length - 1);
        const x = setInterval(_unTyping.bind(this),perDur * 1000);
        let i = 0;

        function _unTyping(){
            this.draw.data[this.crFcObj].font.ctn = this.draw.data[this.crFcObj].font.ctn.slice(0,-1);

            this.draw.draw("all");

            i++;

            if (i >= cur.length) clearInterval(x);
        }

        return this.delay(dur * 1000);
    }

    async do(prog){
        prog();
    }

    async delay(ms){
        return new Promise(resolve => setTimeout(resolve,ms));
    }

    async hide(){
        this.draw.data[this.crFcObj].isDrawn = false;
    }

    resize(stageWidth,stageHeight){
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;
    }

    TF(t,tf){
        if (tf == "linear") return t;
        else if (tf == "ease") return 1 - (--t) * t * t * t;
    }
}