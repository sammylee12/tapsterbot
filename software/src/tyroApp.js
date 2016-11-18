core = require("./core.js");

delay = 0;
longDelay = 250;
shortDelay = 100;

xAr = 0;
yAr = 1;
zAr = 2;

homeButton = function() {
    var homeButton = {
        pressed:    [48, 14, -168],
        lifted:     [48, 14, -150]
    };

    positionPressLift2(homeButton, 2);


    reset();
}


positionPressLift2 = function(key, length) {
    setTimeout(function(){ go(key.lifted[xAr],  key.lifted[yAr],    key.lifted[zAr]);   },increment(shortDelay));
    setTimeout(function(){ go(key.pressed[xAr], key.pressed[yAr],   key.pressed[zAr]);  },increment(length * shortDelay));
    setTimeout(function(){ go(key.lifted[xAr],  key.lifted[yAr],    key.lifted[zAr]);   },increment(shortDelay));
}

increment = function(incrementBy) {
    delay += incrementBy;
    return delay;
}

reset = function() {
    delay = 0;
    go(0,0,0);
}

