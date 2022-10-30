const canvas = document.getElementById("myCanvas")
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const ctx = canvas.getContext("2d");
const hotel = new Zone(1350, 150, 30, "battery"); //farthest right
const golf = new Zone(-30, 200, 40, "internet");
const foxtrot = new Zone(-600, -80, 80, "battery"); //middle
const echo = new Zone(-200, 200, 30, "battery");
const delta = new Zone(-400, -100, 80, "internet"); //most bottom
const charlie = new Zone(-100, -350, 30, "battery");
const beta = new Zone(640, -40, 45, "internet");
const alpha = new Zone(580, 10, 50, "internet");
const car = new Car(-850, 400, 20, 20);

const allBatteryZone = [hotel, foxtrot, echo, charlie];
const allInternetZone = [golf, delta, beta, alpha];

// Calculate the distance between the rover and an indecated zone
getDistance(zone, car) {
  return sqrt(pow(zone.getX() - rover.getX(), 2) + pow(zone.getY() - rover.getY(), 2));
}

//finding closest zone
getBestZone(zone, ca) {
  zoneLoc = 0;
  if (zone.type == "battery") {
    shortestDist = getDistance(allBatteryZone[0], car);
    for (i = 0; i < allBatteryZone.size(); i++) {
      if (getDistance(allBatteryZone[i], car) < shortestDist) {
        shortestDist = getDistance(allBatteryZone[i], car);
        zoneLoc = i;
      }
    }
    return allBatteryZone[zoneLoc];
  }

  if (zone.type == "internet") {
    shortestDist = getDistance(allInternetZone[0], car);
    for (i = 0; i < allInternetZone.size(); i++) {
      if (getDistance(allInternetZone[i], car) < shortestDist) {
        shortestDist = getDistance(allInternetZone[i], car);
        zoneLoc = i;
      }
    }
    return allInternetZone[zoneLoc];
  }
  return allBatteryZone[0]; //default zone to return
}

animate();

function animate() {
  car.update(hotel.borders);

  canvas.height = window.innerHeight;

  ctx.save();
  //ctx.translate(-car.x,-car.y);
  //ctx.restore();
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

// a custom clock made with C++
/* input = 'y';
while (input != 'q'){
    for (let h = 1; h <= 2; h++){ // hours
        for (let m = 1; m <= 3; m++){ // min
            for (let s = 1; s <= 4; s++){ // sec
                for (let t = 1; t <= 5; t++){} // delay
                cout << "sec: " << s << endl;
                // every sec that passes :
                // record a second
                reduceStorage(car);
                
                
                // if at internet zone: -10GB
              if(zone==){
                uploadStorage(car);
              }
                
            }
            // every min:
            // if at chargin station : +1% battery
          
            // check for nearest zone:
            
            
        }
        // Every hour:
        // if moving : -1% battery
        // if resting: -0.25% battery
        stateBatteryReduction(car);
        
    }
    cout << "input: ";
    cin >> input;
    cout << endl;
}*/