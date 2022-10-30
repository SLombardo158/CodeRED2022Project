class Zone{
    constructor(x,y,size,type){
        this.x=x;
        this.y=y;
        this.size=size;
        this.type=type;
        this.width=size;
        this.height=size;
        //this.length=size;
        /*this.left=x-size;
        this.right=x+size;
        this.top=y+size;
        this.bottom=y-size;*/

        const topLeft={x:this+50,y:this+0}
        const topRight={x:this.right,y:this.top}
        const bottomLeft={x:this.left,y:this.bottom}
        const bottomRight={x:this.right,y:this.bottom}
        this.borders=[
            [topLeft,bottomLeft],
            [topRight,bottomRight]
        ];
        this.sensor=new Sensor(this);
    }//1:52:23

    draw(ctx){
        ctx.save();
        ctx.translate(this.x,this.y);
        ctx.rotate(-this.angle);
        const img = new Image();   // Create new img element
        
        /*for(let i=0;i<this.laneCount;i++){
            const x=lerp(
                this.left,this.right, i/this.laneCount
            );
        }*/

        if(this.type == "battery"){
            ctx.strokeStyle="yellow";
            /*img.addEventListener('load', () => {
                ctx.drawImage(img, 50,50)// execute drawImage statements here
            }, false);
            img.src = 'charge.png'; // Set source path
            src.appendChild(img);*/
        }
        else {
            ctx.strokeStyle="white";
            /*img.addEventListener('load', () => {
                ctx.drawImage(img, 50, 50)// execute drawImage statements here
            }, false);
            img.src = 'wifi.png'; // Set source path
            src.appendChild(img);*/
        }
        ctx.beginPath();
        ctx.arc(
           100, 75, this.size, 0, 2*Math.PI
        );
        ctx.stroke();
        //ctx.restore();
        this.borders.forEach(border=>{
            ctx.beginPath();
            ctx.moveTo(border[0].x,border[0].y)
            ctx.lineTo(border[1].x, border[1].y);
            ctx.stroke();
        });
    }
}