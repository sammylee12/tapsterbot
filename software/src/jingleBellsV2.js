five = require("johnny-five");
ik = require("./ik");
board = new five.Board({
  debug: false
});

board.on("ready", function() {
    // Setup
    servo1 = five.Servo({
        pin: 9,
        range: [0,90]
    });
    servo2 = five.Servo({
        pin: 10,
        range: [0,90]
    });
    servo3 = five.Servo({
        pin: 11,
        range: [0, 90]
    });

    board.repl.inject({
      servo1: servo1,
      s1: servo1,
      servo2: servo2,
      s2: servo2,
      servo3: servo3,
      s3: servo3,
    });

    // Move to starting point
    var min = 5;
    servo1.to(min);
    servo2.to(min);
    servo3.to(min);

});


Number.prototype.map = function ( in_min , in_max , out_min , out_max ) {
  return ( this - in_min ) * ( out_max - out_min ) / ( in_max - in_min ) + out_min;
}

rotate = function(x,y) {
    var theta = -60;
    x1 = x * cos(theta) - y * sin(theta);
    y1 = y * cos(theta) + x * sin(theta);
    return [x1,y1]
}

reflect = function(x,y) {
    var theta = 0;
    x1 = x;
    y1 = x * sin(2*theta) - y * cos(2*theta);
    return [x1,y1]
}


// A sine function for working with degrees, not radians
sin = function(degree) {
    return Math.sin(Math.PI * (degree/180));
}

// A cosine function for working with degrees, not radians
cos = function(degree) {
    return Math.cos(Math.PI * (degree/180));
}


// TODO: pull out map values to config file or some other solution.
go = function(x, y, z) {
  reflected = reflect(x,y);
  rotated = rotate(reflected[0],reflected[1]);

  angles = ik.inverse(rotated[0], rotated[1], z);
  servo1.to((angles[1]).map( 0 , 90 , 8 , 90 ));
  servo2.to((angles[2]).map( 0 , 90 , 8 , 90 ));
  servo3.to((angles[3]).map( 0 , 90 , 8 , 90 ));
  console.log(angles);
}


delay = 0;
lift = -140;
incDelay = 250;
shortIncDelay = 100;

xAr = 0
yAr = 1
zAr = 2


jb = function() {
var c = {
    pressed: [24, 27, -164],
    lifted: [24, 27,-150]
};

var d = {
    pressed: [11, 22, -163],
    lifted: [11, 22,-149]
};

var e = {
    pressed: [-1, 15, -162],
    lifted: [-1, 15,-148]
};

var f = {
    pressed: [-13, 7, -161],
    lifted: [-13, 7,-147]
};

var g = {
    pressed: [-26, 0, -160],
    lifted: [-26, 0,-146]
};

var a = {
    pressed: [-38, -8, -158],
    lifted: [-38, -8,-145]
};
        
    reset();
    
    qtr(e);
    qtr(e);
    hlf(e);

    qtr(e);
    qtr(e);
    hlf(e);
    
    qtr(e);
    qtr(g);
    qtr(c);
    qtr(d);
    
    whl(e);

    qtr(f);
    qtr(f);
    qtr(f);
    qtr(f);

    qtr(f);
    qtr(e);
    qtr(e);
    qtr(e);

    qtr(e);
    qtr(d);
    qtr(d);
    qtr(e);
    
    hlf(d);
    hlf(g);
    
    qtr(e);
    qtr(e);
    hlf(e);

    qtr(e);
    qtr(e);
    hlf(e);
    
    qtr(e);
    qtr(g);
    qtr(c);
    qtr(d);
    
    whl(e);

    qtr(f);
    qtr(f);
    qtr(f);
    qtr(f);

    qtr(f);
    qtr(e);
    qtr(e);
    qtr(e);

    qtr(g);
    qtr(g);
    qtr(f);
    qtr(d);

    whl(c);
}

qtr = function(key) {
    positionPressLift(key)
}

hlf = function(key) {
    positionPressLift(key)
    increment();
}

whl = function(key) {
    positionPressLift(key)    
    increment();
    increment();
    increment();
}

positionPressLift = function(key) {
    setTimeout(function(){ go(key.lifted[xAr],  key.lifted[yAr],    key.lifted[zAr]);   },shortIncrement());
    setTimeout(function(){ go(key.pressed[xAr], key.pressed[yAr],   key.pressed[zAr]);  },increment());
    setTimeout(function(){ go(key.lifted[xAr],  key.lifted[yAr],    key.lifted[zAr]);   },shortIncrement());
}

increment = function() {
    delay += incDelay;
    return delay;
}

shortIncrement = function() {
    delay += shortIncDelay;
    return delay;
}

reset = function() {
    delay = 0;
    go(0,0,0);
}

position = function() {
  return ik.forward(servo1.last.degrees, servo2.last.degrees, servo3.last.degrees);
}

