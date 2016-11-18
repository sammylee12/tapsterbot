core = require("./core.js");

delay = 0;
longDelay = 250;
shortDelay = 100;

xAr = 0;
yAr = 1;
zAr = 2;

homeButton = function() {
    var homeButton = {
        pressed:    [56, 22, -171],
        lifted:     [62, 22, -158]
    };

    positionPressLift(homeButton, 4);


    reset();
}


positionPressLift = function(key, length) {
    setTimeout(function(){ go(key.lifted[xAr],  key.lifted[yAr],    key.lifted[zAr]);   },increment(shortDelay));
    setTimeout(function(){ go(key.pressed[xAr], key.pressed[yAr],   key.pressed[zAr]);  },increment(3 * longDelay));
    setTimeout(function(){ go(key.lifted[xAr],  key.lifted[yAr],    key.lifted[zAr]);   },increment(2 * longDelay));
}

increment = function(incrementBy) {
    delay += incrementBy;
    return delay;
}

reset = function() {
    delay = 0;
    go(0,0,0);
}

