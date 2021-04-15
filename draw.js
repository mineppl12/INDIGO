export class drawing{
    constructor(ctx){
        this.ctx = ctx;

        this.data = [];
        this.dataId = [];
        this.dataCount = 0;
    }

    draw(obj = "all"){
        if (obj == "all"){
            this.ctx.clearRect(0,0,document.body.clientWidth,document.body.clientHeight);
            for (let i = 0; i < this.dataCount; i++){
                if (this.data[this.dataId[i]].isDrawn){
                    this.ctx.fillStyle = this.data[this.dataId[i]].font.color;
                    this.ctx.font = `${this.data[this.dataId[i]].font.size}px ${this.data[this.dataId[i]].font.family}`;
                    this.ctx.globalAlpha = Number(this.data[this.dataId[i]].font.opac);
                    this.ctx.fillText(this.data[this.dataId[i]].font.ctn,posMa.bind(this)(this.dataId[i]).x,posMa.bind(this)(this.dataId[i]).y);
                }
            }
        }
        else{
            if (this.dataId.includes(obj)){
                this.ctx.fillStyle = this.data[obj].font.color;
                this.ctx.font = `${this.data[obj].font.size}px ${this.data[obj].font.family}`;
                this.ctx.globalAlpha = Number(this.data[obj].font.opac);
                this.ctx.fillText(this.data[obj].font.ctn,posMa.bind(this)(obj).x,posMa.bind(this)(obj).y);
                this.data[obj].isDrawn = 1;
            } else throw new Error(`Undefinded ID : ${obj}`);
        }

        function posMa(obj){
            const width = this.ctx.measureText(this.data[obj].font.ctn).width;
            const height = this.ctx.measureText(this.data[obj].font.ctn).fontBoundingBoxAscent;
            const x = Number(this.data[obj].pos.x);
            const y = Number(this.data[obj].pos.y);

            return {"x" : x - width / 2,"y" : y + height / 4};
        }
    }
}