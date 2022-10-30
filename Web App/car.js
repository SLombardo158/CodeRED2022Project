class Car{
    constructor(x,y,width,height){
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;
        this.speed=0;
        this.acceleration=0.2;
        this.maxSpeed=3;
        this.friction=0.05;
        this.angle=0;
        this.storageleft=100; //max is 100
        this.battery=100; //min is 0

        //if(controlType!="DUMMY"){
            this.sensor=new Sensor(this);
            /*this.brain=new NeuralNetwork(
                [this.sensor.rayCount,6,4]
            );*/
        //}
        this.controls = new controls();//controlType);    
    }

    update(zoneBorders){
        this.#move();
        this.polygon=this.#createPolygon;
        this.sensor.update(zoneBorders);
    }

    #createPolygon(){ //keeps tracks of corners of rover
        const points=[];
        const rad=Math.hypot(this.width, this.height)/2;
        const alpha=Math.atan2(this.width, this.height);
        points.push({ //topright point
            x:this.x-Math.sin(this.angle-alpha)*rad,
            y:this.y-Math.cos(this.angle-alpha)*rad
        });
        points.push({
            x:this.x-Math.sin(this.angle+alpha)*rad,
            y:this.y-Math.cos(this.angle+alpha)*rad
        });
        points.push({
            x:this.x-Math.sin(Math.PI+this.angle-alpha)*rad,
            y:this.y-Math.cos(Math.PI+this.angle-alpha)*rad
        });
        points.push({
            x:this.x-Math.sin(Math.PI+this.angle+alpha)*rad,
            y:this.y-Math.cos(Math.PI+this.angle+alpha)*rad
        });
        return points;
    }

    #move(){
        if(this.controls.forward){
            this.speed+=this.acceleration;
        }
        if(this.controls.reverse){
            this.speed-=this.acceleration;
        }

        if(this.speed>this.maxSpeed){
            this.speed=this.maxSpeed;
        }
        if(this.speed<-this.maxSpeed/2){
            this.speed=-this.maxSpeed/2;
        }

        if(this.speed>0){
            this.speed-=this.friction;
        }
        if(this.speed<0){
            this.speed+=this.friction;
        }
        if(Math.abs(this.speed)<this.friction){
            this.speed=0;
        }

        if(this.controls.left){
            this.angle+=0.03;
        }
        if(this.controls.right){
            this.angle-=0.03;
        } 
        this.x-=Math.sin(this.angle)*this.speed;
        this.y-=Math.cos(this.angle)*this.speed;
    }

    draw(ctx){
        // we removed all of this because of the create Polygon object instead
        ctx.save();
        ctx.translate(this.x,this.y);
        ctx.rotate(-this.angle);
        //ctx.strokeStyle="yellow";
        ctx.beginPath();
        ctx.rect(
            -this.width/2,
            -this.height/2,
            this.width,
            this.height
        );
        ctx.fill();
        ctx.restore();
        /*ctx.beginPath();
        ctx.moveTo(this.polygon[0].x, this.polygon[0].y);
        for(let i=1; i<this.polygon.length; i++){
            ctx.lineTo(this.polygon[i].x, this.polygon[i].y);
        }*/


        this.sensor.draw(ctx);
    }
}