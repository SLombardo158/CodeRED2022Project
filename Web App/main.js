const canvas=document.getElementById("myCanvas")
canvas.height=window.innerHeight;
canvas.width=window.innerWidth;

const ctx = canvas.getContext("2d");
const car = new Car(100,100,30,30);
const zone = new Zone(200,200,50,50);

animate();

function animate(){
    car.update();

    canvas.height=window.innerHeight;

    ctx.save();
    //ctx.translate(0,-car.y+canvas.height*0.5);

    car.draw(ctx);
    zone.draw(ctx);

    ctx.restore();
    requestAnimationFrame(animate);
}