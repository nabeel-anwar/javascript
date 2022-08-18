'use strict';

/* Your tasks:
1. Re-create Challenge #3, but this time using ES6 classes: create an 'EVCl'
child class of the 'CarCl' class
2. Make the 'charge' property private
3. Implement the ability to chain the 'accelerate' and 'chargeBattery'
methods of this class, and also update the 'brake' method in the 'CarCl'
class. Then experiment with chaining!
Test data:
§ Data car 1: 'Rivian' going at 120 km/h, with a charge of 23%
GOOD LUCK �
 */

const Car = function (make, speed) {
    this.make = make;
    this.speed = speed;
}

const EV = function (make, speed, charge) {
    Car.call(this, make, speed);
    this.charge = charge;
}

EV.prototype = Object.create(Car.prototype);

Car.prototype.accelerate = function () {
    this.speed += 10;
    console.log(`'${this.make}' going at ${this.speed} km/h`);
}

Car.prototype.brake = function () {
    this.speed -= 5;
    return this.speed;
}

EV.prototype.chargeBattery = function (chargeTo) {
    this.charge = chargeTo;
}

EV.prototype.accelerate = function () {
    this.speed += 20;
    this.charge--;
    console.log(`${this.make} going at ${this.speed} km/h, with a charge of ${this.charge}%`);
}

const tesla = new EV('Tesla', 120, 20);

console.log(tesla);
tesla.accelerate();
tesla.accelerate();
tesla.accelerate();