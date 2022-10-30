class Car{
    constructor(x,y,width,height){
        this.x=x;
        document.getElementById("x").innerText = this.x;
        this.y=y;
        document.getElementById("y").innerText = this.y;
        this.width=width;
        this.height=height;
        this.speed=0;
        this.acceleration=0.2;
        this.maxSpeed=.5;
        this.friction=0.05;
        this.angle=0;
        this.batterylevel = 100;
        this.batterydegrade = 2;

        this.sensor=new Sensor(this);
        this.controls = new controls();    
    }

    update(){
        this.#move();
        this.sensor.update();
        
    }

    #move(){
        if(this.controls.forward){
            this.speed+=this.acceleration;
            document.getElementById("x").innerText = Math.floor(this.x,-2);
            document.getElementById("y").innerText = Math.floor(this.y,-2);
            if(this.batterylevel > 0){this.batterylevel-=this.batterydegrade;}
            document.getElementById("bp").innerText = Math.floor(this.batterylevel,-2);
            if(this.batterylevel == 0){
                this.maxSpeed=0;
                this.batterylevel=0;
                alert("We're out of juice captain!");
            }
        }
        if(this.controls.reverse){
            this.speed-=this.acceleration;
            document.getElementById("x").innerText = Math.floor(this.x,-2);
            document.getElementById("y").innerText = Math.floor(this.y,-2);
            if(this.batterylevel > 0){this.batterylevel-=this.batterydegrade;}
            document.getElementById("bp").innerText = Math.floor(this.batterylevel,-2);
            if(this.batterylevel == 0){
                this.maxSpeed=0;
                this.batterylevel=0;
                alert("We're out of juice captain!");
            }
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
            if(this.batterylevel == 0){
                this.angle=0;
            }
        }
        if(this.controls.right){
            this.angle-=0.03;
            if(this.batterylevel == 0){
                this.angle=0;
            }
        } 
        this.x-=Math.sin(this.angle)*this.speed;
        this.y-=Math.cos(this.angle)*this.speed;
    }

    draw(ctx){
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

        this.sensor.draw(ctx);
    }
}