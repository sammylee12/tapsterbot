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
    var max = 45;
    var min = 5;
    var range = max - min;
    servo1.to(min);
    servo2.to(min);
    servo3.to(min);

    var dance = function() {
      servo1.to(parseInt((Math.random() * range) + min, 10));
      servo2.to(parseInt((Math.random() * range) + min, 10));
      servo3.to(parseInt((Math.random() * range) + min, 10));
    };

    var dancer;

    start_dance = function() {
      if (!dancer) dancer = setInterval(dance, 250);
    }

    stop_dance = function() {
      if (dancer) {
        clearInterval(dancer);
        dancer = null;
      }
    }

    board.repl.inject({
      dance: start_dance,
      chill: stop_dance
    });


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

jb = function() {
    
    reset();
    eee();
    eee();
    egcd();
    e();
    ffff();
    feee();
    edde();
    dg();
    eee();
    eee();
    egcd();
    e();
    ffff();
    feee();
    ggfd();
    c();
    delay = 0;
}

eee = function () {
    quarterNote(0,12,-161);
    quarterNote(0,12,-161);
    halfNote(0,12,-161);
}

egcd = function() {
    quarterNote(0,      12, -161);
    setTimeout(function(){ go(-24,-5,lift);    },  shortIncrement());
    quarterNote(-23,    -4, -161);
    setTimeout(function(){ go(35,35,lift);    },  shortIncrement());
    quarterNote(27,     28, -162);
    quarterNote(15,     15, -162);
}

e = function() {
    wholeNote(0,12,-161);
}

ffff = function () {
    quarterNote(-10,7,-161);
    quarterNote(-10,7,-161);
    quarterNote(-10,7,-161);
    quarterNote(-10,7,-161);
}

feee = function () {
    quarterNote(-10,7,-161);
    quarterNote(0,12,-161);
    quarterNote(0,12,-161);
    quarterNote(0,12,-161);
}

edde = function () {
    quarterNote(0,12,-161);
    quarterNote(15,15,-163);
    quarterNote(15,15,-163);
    quarterNote(0,12,-161);
}

dg = function () {
    setTimeout(function(){ go(15,15,lift);    },  shortIncrement());
    halfNote(15,15,-163);
    setTimeout(function(){ go(-24,-5,lift);    },  shortIncrement());
    halfNote(-24,-5,-161);
}

ggfd = function () {
    quarterNote(-24,-5,-161);
    quarterNote(-24,-5,-161);
    quarterNote(-10,7,-161);
    quarterNote(15,15,-163);
}

c = function() {
    wholeNote(27,28,-163);
}

quarterNote = function(x, y, z) {
    setTimeout(function(){ go(x,y,z);       },  increment());
    setTimeout(function(){ go(x,y,lift);    },  increment());
}

halfNote = function(x, y, z) {
    setTimeout(function(){ go(x,y,z);       },  increment());
    increment();
    setTimeout(function(){ go(x,y,lift);    },  increment());
}

wholeNote = function(x, y, z) {
    setTimeout(function(){ go(x,y,z);       },  increment());
    increment();
    increment();
    increment();
    setTimeout(function(){ go(x,y,lift);    },  increment());
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
    go(0,0,0);
}

position = function() {
  return ik.forward(servo1.last.degrees, servo2.last.degrees, servo3.last.degrees);
}

