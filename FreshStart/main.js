const canvas=document.getElementById("myCanvas")
canvas.height=(window.innerHeight);
canvas.width=(window.innerWidth);

const ctx = canvas.getContext("2d");
const hotel = new Zone(1350,150,30,"battery"); //farthest right
const golf = new Zone(-30,200,40,"internet");
const foxtrot = new Zone(-600,-80,80,"battery"); //middle
const echo = new Zone(-200,200,30,"battery");
const delta = new Zone(-400,-100,80,"internet"); //most bottom
const charlie = new Zone(-100,-350,30,"battery");
const beta = new Zone(640,-40,45,"internet");
const alpha = new Zone(580,10,50,"internet");
const car = new Car(-850,400,20,20);

const alert = true;

animate();

function animate(){
    car.update();

    canvas.height=window.innerHeight;

    ctx.save();
    //ctx.translate(0,-car.y+canvas.height*0.5); 1:01:37
    /*img.addEventListener('load', () => {
        ctx.drawImage(img)// execute drawImage statements here
    }, false);
    img.src = 'charge.png'; // Set source path*/
    hotel.draw(ctx);
   
    golf.draw(ctx);
    foxtrot.draw(ctx);
    echo.draw(ctx);
    delta.draw(ctx);
    charlie.draw(ctx);
    beta.draw(ctx);
    alpha.draw(ctx);
    car.draw(ctx);

    ctx.restore();
    requestAnimationFrame(animate);
}

