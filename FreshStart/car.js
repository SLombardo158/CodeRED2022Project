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
        this.maxSpeed=2;
        this.friction=0.05;
        this.angle=0;
        this.alert = false;
        
        this.batterylevel = 100;
        this.batterydegrade = .05;
        this.batteryalert = false;
        this.batteryincrease = .12;

        this.storagealert = false;
        this.storagelevel = 10;
        this.storageincrease = 0.05;
        this.storagedegrade = 0.005;

        this.sensor=new Sensor(this);
        this.controls = new controls();    
    }

    update(){
        this.#move();
        this.sensor.update();
        this.#adjust();
        
    }

    #move(){
        if(this.storagelevel > 1){
            this.storagelevel-=this.storagedegrade;}
            document.getElementById("ssd").innerText = Math.floor(this.storagelevel,-2);
            
        if(this.controls.forward){
            this.speed+=this.acceleration;
            document.getElementById("x").innerText = Math.floor(this.x,-2);
            document.getElementById("y").innerText = Math.floor(this.y,-2);
            if(this.batterylevel > 0){this.batterylevel-=this.batterydegrade;}
            document.getElementById("bp").innerText = Math.floor(this.batterylevel,-2);
            if(this.batterylevel == 0){
                this.maxSpeed=0;
                this.batterylevel=0; 
                this.batteryalert = true;
                this.alert = true;
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
                this.batteryalert = true;
                this.alert = true;
            }
        }

        if(this.batteryalert && this.alert){
            document.getElementById("warn").innerText = "No battery!";
            document.getElementById("warn").style="color: red;";
        } else if(this.storagealert && this.alert){
            document.getElementById("warn").innerText = "No storage left!";
            document.getElementById("warn").style="color: red;";
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

    #adjust(){
        //internet zones
        if(this.x > -1090 && this.x < -935 && this.y < 541 && this.y > 381 && this.storagelevel < 10) {
            console.log("In the zone");
            this.storagelevel+=this.storageincrease;
            document.getElementById("ssd").innerText = Math.floor(this.storagelevel,-2);
        }
        if(this.x > -515 && this.x < -439 && this.y < 108 && this.y > 22 && this.storagelevel < 10) {
            console.log("In the zone");
            this.storagelevel+=this.storageincrease;
            document.getElementById("ssd").innerText = Math.floor(this.storagelevel,-2);
        }
        if(this.x > 56 && this.x < 150 && this.y < 120 && this.y > 35 && this.storagelevel < 10) {
            console.log("In the storage zone");
            this.storagelevel+=this.storageincrease;
            document.getElementById("ssd").innerText = Math.floor(this.storagelevel,-2);
        }
        if(this.x > 145 && this.x < 207 && this.y < 469 && this.y > 399 && this.storagelevel < 10) {
            console.log("In the zone");
            this.storagelevel+=this.storageincrease;
            document.getElementById("ssd").innerText = Math.floor(this.storagelevel,-2);
        }
//check if rover is inside a zone, these are the battery zones
        if(this.x > -500 && this.x < -350 && this.y < 434 && this.y > 268 && this.batterylevel < 100) {
            console.log("In the zone");
            this.batterylevel+=this.batteryincrease;
            document.getElementById("bp").innerText = Math.floor(this.batterylevel,-2);
        }
        if(this.x > 189 && this.x < 245 && this.y < 269 && this.y > 204 && this.batterylevel < 100) {
            console.log("In the zone");
            this.batterylevel+=this.batteryincrease;
            document.getElementById("bp").innerText = Math.floor(this.batterylevel,-2);
        }
        if(this.x > -656 && this.x < -599 && this.y < 587 && this.y > 533 && this.batterylevel < 100) {
            console.log("In the zone");
            this.batterylevel+=this.batteryincrease;
            document.getElementById("bp").innerText = Math.floor(this.batterylevel,-2);
        }
        if(this.x > -1150 && this.x < -1082 && this.y < 136 && this.y > 69 && this.batterylevel < 100) {
            console.log("In the zone");
            this.batterylevel+=this.batteryincrease;
            document.getElementById("bp").innerText = Math.floor(this.batterylevel,-2);
        }
        
        /*if(zone.type == "battery"){

        }
        else{ //if zone is internet

        }*/
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