class Zone {
  constructor(x, y, size, type) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.type = type;
    this.width = size;
    this.height = size;
    //this.length=size;
    /*this.left=x-size;
    this.right=x+size;
    this.top=y+size;
    this.bottom=y-size;*/

    const topLeft = { x: this + 50, y: this + 0 }
    const topRight = { x: this.right, y: this.top }
    const bottomLeft = { x: this.left, y: this.bottom }
    const bottomRight = { x: this.right, y: this.bottom }
    this.borders = [
      [topLeft, bottomLeft],
      [topRight, bottomRight]
    ];
    this.sensor = new Sensor(this);
  }//1:52:23
  // battery functions:
  chargeBattery(car) {
    while (car.getBattery() <= 100) {
      car.setBattery(car.getBattery() + (car.getBattery() * 0.01));
    }
    if (car.getBattery() > 100) {
      car.setBattery(100);
    }
  }

  reduceBattery(car) {
    car.setBattery(car.getBattery() - (car.getBatteryUsage() * car.getBattery()));
  }

  //storage
  reduceStorage(car) {
    while (storage > 0) {
      //75 Mbps, 8,000,000 Mbps every TB/sec
      car.setStorage(car.getStorage() - (75 / 8000000));
    }
    if (storage < 0) {
      car.setStorage(0);
    }
    //if (storage <= 2) //if storage is at 20% or less capacity{
    //cout << "WARNING: Storage is low. Finding nearest internet zone..." << endl;
    //cout << "Best zone to go to is " << getBestZone(2, car);
    // }
  }

  uploadStorage(car) {
    //8,000 Gigabits per second in a Terabyte per second.
    while (storage < 10) {
      car.setStorage(car.getStorage() + (1 / 8000));
    }
    if (storage > 10)
      car.setStorage(10);
  }
}

draw(ctx) 
{
  ctx.save();
  ctx.translate(this.x, this.y);
  ctx.rotate(-this.angle);
  const img = new Image();   // Create new img element
        
      (let i = 0; i < this.laneCount; i++) {
    const x = lerp(
      this.left, this.right, i / this.laneCount
    );
  }

  if (this.type == "battery") {
    ctx.strokeStyle = "yellow";
    // charging the car
    chargeBattery(car);
  }
  else {
    ctx.strokeStyle = "white";
    reduceBattery(car);
  }

  if (this.type == "internet") {
    ctx.strokeStyle = "yellow";
    // reduce storage
    reduceStorage(car);
  }
  else {
    ctx.strokeStyle = "white";
    // increase storage
    uploadStorage(car);
  }

  ctx.beginPath();
  ctx.arc(
    100, 75, this.size, 0, 2 * Math.PI
  );
  ctx.stroke();
  //ctx.restore();
  this.borders.forEach(border => {
    ctx.beginPath();
    ctx.moveTo(border[0].x, border[0].y)
    ctx.lineTo(border[1].x, border[1].y);
    ctx.stroke();
  });
}
