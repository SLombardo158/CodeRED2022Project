class Zone{
    constructor(x,y,width,height){
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;

        this.sensor=new Sensor(this);
    }

    draw(ctx){
        ctx.save();
        ctx.translate(this.x,this.y);
        ctx.rotate(-this.angle);
        //ctx.strokeStyle="yellow";
        ctx.beginPath();
        ctx.arc(
            -this.width/2,
            -this.height/2,
            this.width,
            this.height, 2*Math.PI
        );
        ctx.stroke();
        ctx.restore();

    }
}