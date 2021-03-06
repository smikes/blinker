'use strict';

var blinker = require('..');

var Code = require('code');
var Lab = require('lab');
var lab = Lab.script();
exports.lab = lab;

var describe = lab.describe;
var it = lab.it;
var before = lab.before;
var after = lab.after;
var expect = Code.expect;

describe('blinker exports', function () {
    it('exports an object', function (done) {
        expect(blinker).to.be.instanceOf(Object);
        done();
    });

    it('exports an object with method "use"', function (done) {
        expect(blinker.use).to.be.instanceOf(Function);
        done();
    });

    it('wraps LEDs', function (done) {
        function mockLED() {
            return {
                state: 0,
                setCount: 0,
                output: function (state) {
                    this.state = state;
                    this.setCount += 1;
                },
                toggle: function () {
                    this.output(!this.state);
                }
            };
        }

        var mock = {
            led: [
                mockLED(),
                mockLED(),
                mockLED(),
                mockLED()
            ]
        }, blink;

        mock.led[0].output('foo');
        expect(mock.led[0].state).to.equal('foo');

        blink = blinker.use(mock);

        blink.green.on();
        expect(mock.led[0].state).to.equal(1);
        blink.green.off();
        expect(mock.led[0].state).to.equal(0);

        blink.red.blink(1, 10);

        setTimeout(function () {
            expect(mock.led[0].setCount).to.equal(3);
            expect(mock.led[1].setCount).to.equal(0);
            expect(mock.led[2].setCount).to.equal(2);
            done();
        }, 50);

    });
});
