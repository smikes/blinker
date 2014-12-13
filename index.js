'use strict';

function makeBlinker(tessel) {

    function blink(count, duration) {
        var led = this.led,
            times = [],
            i;

        for (i = 0; i < 2 * count; i += 1) {
            times[i] = duration * i;
        }
        console.log(times);

        times.map(function (t) {
            setTimeout(function () {
                led.toggle();
            }, t);
        });
    }

    function wrapLed(i) {
        return {
            led: tessel.led[i],
            on: function () {
                return this.led.output(1);
            },
            off: function () {
                return this.led.output(0);
            },
            blink: blink
        };
    }

    return {
        green:  wrapLed(0),
        blue:   wrapLed(1),
        red:    wrapLed(2),
        yellow: wrapLed(3)
    };
}

module.exports = {
    use: makeBlinker
};

/*

# blinker 

Blink LEDs on a tessel

## Usage

```
var blinkerlib = require('blinker');
var blinker = blinkerlib.use(tessel);

// turn blue on, then off
blinker.blue.on();
blinker.blue.off();

// blink 3 times default duratoion (100 ms)
blinker.red.blink(3);
// blink 3 times default duration (50 ms)
blinker.red.blink(6, 50);
```

*/
