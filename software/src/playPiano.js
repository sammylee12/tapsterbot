core = require("./core.js");

delay = 0;
longDelay = 250;
shortDelay = 100;
oneSixteenth = 250;

xAr = 0;
yAr = 1;
zAr = 2;

tap = function(key, length) {
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

    var map = {
        "c"     : c,
        "d"     : d,
        "e"     : e,
        "f"     : f,
        "g"     : g,
        "a"     : a
    }
    
    if (typeof length == 'undefined') {
        reset();
        qtr(map[key])
    } else if (length == 1) {
        qtr(map[key])
    } else if (length == 2) {
        hlf(map[key])
    } else if (length == 3) {
        threeQtr(map[key])
    } else {
        whl(map[key])
    }

}

playAdv = function(inputString) {
    if(inputString === undefined) {
        darth();
    } else {
        notes = inputString.split(" ");
        notes.forEach(playNoteAdv);
    }
    reset();
}

play = function(inputString) {
    if(inputString === undefined) {
        jingleBells();
    } else {
        notes = inputString.split(" ");
        notes.forEach(playNote);
    }
    reset();
}

playNote = function(note) {
    key = note[0];
    tap(key, note.length);
}

playNoteAdv = function(note) {

    var c3 = {
        pressed:    [36, 36, -164],
        lifted:     [36, 36, -150]
    };

    var c3s = {
        pressed:    [47, 15, -164],
        lifted:     [47, 15, -150]
    };
  
    var d3 = {
        pressed:    [27, 31, -164],
        lifted:     [27, 31, -150]
    };

    var d3s = {
        pressed:    [36, 7, -163],
        lifted:     [36, 7, -149]
    };


    var e3 = {
        pressed:    [18, 26, -163],
        lifted:     [18, 26, -149]
    };

    var f3 = {
        pressed:    [9, 21, -163],
        lifted:     [9, 21, -149]
    };

    var f3s = {
        pressed:    [22, 2, -163],
        lifted:     [22, 2, -149]
    };

    var g3 = {
        pressed:    [0, 16, -163],
        lifted:     [0, 16, -149]
    };

    var g3s = {
        pressed:    [11, -4, -163],
        lifted:     [11, -4, -149]
    };

    var a3 = {
        pressed:    [-7, 11, -162],
        lifted:     [-7, 11, -149]
    };

    var a3s = {
        pressed:    [1, -10, -163],
        lifted:     [1, -10, -149]
    };
    
    var b3 = {
        pressed:    [-14, 6, -162],
        lifted:     [-14, 6, -149]
    };

    var c4 = {
        pressed:    [-22, 0, -160],
        lifted:     [-22, 0, -149]
    };

    var c4s = {
        pressed:    [-15, -22, -163],
        lifted:     [-15, -22, -149]
    };

    var d4 = {
        pressed:    [-32, -6, -160],
        lifted:     [-32, -6, -149]
    };

    var d4s = {
        pressed:    [-25, -28, -163],
        lifted:     [-25, -28, -149]
    };

    var e4 = {
        pressed:    [-42, -12, -160],
        lifted:     [-42, -12, -149]
    };

    var f4 = {
        pressed:    [-51, -17, -160],
        lifted:     [-51, -17, -149]
    };

    var map = {
        "c3"    : c3,
        "c3s"   : c3s,
        "d3"    : d3,
        "d3s"   : d3s,
        "e3"    : e3,
        "f3"    : f3,
        "f3s"   : f3s,
        "g3"    : g3,
        "g3s"   : g3s,
        "a3"    : a3,
        "a3s"   : a3s,
        "b3"    : b3,
        "c4"    : c4,
        "c4s"   : c4s,
        "d4"    : d4,
        "d4s"   : d4s,
        "e4"    : e4,
        "f4"    : f4
    }

    noteRegex = /^(\d*)(.*)$/g;
    match = noteRegex.exec(note);
    console.log(note);
    console.log(match);

    length = match[1];
    key = match[2];

    positionPressLift2(map[key], length);
}

jingleBells = function() {
    play("e e ee e e ee e g c d eeee f f f f f e e e e d d e dd gg e e ee e e ee e g c d eeee f f f f f e e e g g f d cccc");
}

jingleBells16 = function() {
    playAdv("2e3 2e3 4e3 2e3 2e3 4e3 2e3 2g3 2c3 2d3 8e3 2f3 2f3 2f3 2f3 2f3 2e3 2e3 2e3 2e3 2d3 2d3 2e3 4d3 4g3 2e3 2e3 4e3 2e3 2e3 4e3 2e3 2g3 2c3 2d3 8e3 2f3 2f3 2f3 2f3 2f3 2e3 2e3 2e3 2g3 2g3 2f3 2d3 8c3");
}

testAdv = function() {
    playAdv("1d3 2d3s 3e3 4f3 5f3s 6g3 7g3s 8a3 9a3s 10b3 11c4 12c4s 13d4 14d4s 15e4 16f4");
}

mary = function() {
    play("e d c d e e ee d d dd e g gg e d c d e e e c d d e d cccc");
}

darth = function() {
    playAdv("4f3 4f3 4f3 3c3s 1g3s 4f3 3c3s 1g3s 8f3 4c4 4c4 4c4 3c4s 1g3s 4e3 3c3s 1g3s 8f3 4f4 3f3 1f3 4f4 3e4 1d4s 1d4 1c4s 2d4 4f3s 4b3 3a3s 1a3 1g3s 1g3 2g3s 4c3s 4e3 3c3s 1e3 4g3s 3f3 1g3s 8c4 4f4 3f3 1f3 4f4 3e4 1d4s 1d4 1c4s 2d4 4f3s 4b3 3a3s 1a3 1g3s 1g3 2g3s 4c3s 4e3 3c3s 1g3s 4f3 3c3s 1g3s 8f3");
}

merryXmas = function() {
    playAdv("2d3 2g3 1g3 1a3 1g3 1f3s 2e3 2e3 2e3 2a3 1a3 1b3 1a3 1g3 2f3s 2d3 2d3 2b3 1b3 1c4 1b3 1a3 2g3 2e3 1d3 1d3 2e3 2a3 2f3s 4g3 2d3 2g3 2g3 2g3 4f3s 2f3s 2g3 2f3s 2e3 4d3 2a3 2b3 2a3 2g3 2d4 2d3 1d3 1d3 2e3 2a3 2f3s 4g3");
}

silentNight = function() {
    playAdv("6g3 2a3 4g3 10e3 6g3 2a3 4g3 10e3 8d4 4d4 8b3 8c4 4c4 8g3 8a3 4a3 6c4 2b3 4a3 6g3 2a3 4g3 10e3 8a3 2a3 6c4 2b3 4a3 6g3 2a3 4g3 10e3 6d4 2d4 4d4 6f4 2d4 4b3 12c4 10e4 6c4 2g3 4e3 6g3 2f3 4d3 16c3");
}

qtr = function(key) {
    positionPressLift(key);
}

hlf = function(key) {
    positionPressLift(key);
    increment(longDelay);
}

threeQtr = function(key) {
    positionPressLift(key);
    increment(longDelay);
    increment(longDelay);
}

whl = function(key) {
    positionPressLift(key);
    increment(longDelay);
    increment(longDelay);
    increment(longDelay);
}

positionPressLift = function(key) {
    setTimeout(function(){ go(key.lifted[xAr],  key.lifted[yAr],    key.lifted[zAr]);   },increment(shortDelay));
    
    setTimeout(function(){ go(key.pressed[xAr], key.pressed[yAr],   key.pressed[zAr]);  },increment(longDelay));
    setTimeout(function(){ ledOff();  },delay);

    setTimeout(function(){ go(key.lifted[xAr],  key.lifted[yAr],    key.lifted[zAr]);   },increment(shortDelay));
    setTimeout(function(){ ledOn();   },delay);
}

positionPressLift2 = function(key, length) {

    setTimeout(function(){ go(key.lifted[xAr],  key.lifted[yAr],    key.lifted[zAr]);   },increment(shortDelay));

    setTimeout(function(){ go(key.pressed[xAr], key.pressed[yAr],   key.pressed[zAr]);  },increment(length * shortDelay));
    setTimeout(function(){ ledOff();  },delay);

    setTimeout(function(){ go(key.lifted[xAr],  key.lifted[yAr],    key.lifted[zAr]);   },increment(shortDelay));
    setTimeout(function(){ ledOn();   },delay);
}

getDelay = function(length) {
    return oneSixteenth * length - shortDelay * 2;
}

increment = function(incrementBy) {
    delay += incrementBy;
    return delay;
}

reset = function() {
    delay = 0;
    go(0,0,0);
}

