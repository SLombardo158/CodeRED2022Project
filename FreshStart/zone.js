class Zone{
    constructor(x,y,size,type){
        this.x=x;
        this.y=y;
        this.size=size;
        this.type=type;


        //this.sensor=new Sensor(this);
    }

    draw(ctx){
        ctx.save();
        ctx.translate(this.x,this.y);
        ctx.rotate(-this.angle);
        const img = new Image();   // Create new img element
        
        if(this.type == "battery"){
            ctx.strokeStyle="yellow";
            /*img.addEventListener('load', () => {
                ctx.drawImage(img, 0,0)// execute drawImage statements here
            }, false);
            img.src = 'charge.png'; // Set source path*/
        }
        else {
            ctx.strokeStyle="white";
            /*img.addEventListener('load', () => {
                ctx.drawImage(img, 0, 0)// execute drawImage statements here
            }, false);
            img.src = 'wifi.png'; // Set source path*/
        }
        ctx.beginPath();
        ctx.arc(
           100, 75, this.size, 0, 2*Math.PI
        );
        ctx.stroke();
        //ctx.restore();
        
    }
}