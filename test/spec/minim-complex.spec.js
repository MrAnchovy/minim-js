

describe("Minim.classes.Complex - complex number class", function() {

    var Complex = Minim.classes.Complex;

    beforeEach(function() {
    });

    it("can create a complex number equal to zero", function() {
      var a = new Complex();
      expect(a.value()).toEqual([0, 0]);
    });

    it("can create a complex number from an array", function() {
      var a = new Complex([1, 2]);
      expect(a.value()).toEqual([1, 2]);
    });

    it("can create a complex number from a real and imaginary part", function() {
      var a = new Complex(1);
      expect(a.value()).toEqual([1, 0]);
      var a = new Complex(1, 2);
      expect(a.value()).toEqual([1, 2]);
    });

    it("can set the value of a complex number", function() {
      var a = new Complex();
      a.value([1, 2]);
      expect(a.value()).toEqual([1, 2]);
    });

    it("can add complex numbers", function() {
      var a = new Complex(1, 2);
      var b = new Complex(3, 4);
      var x = a.add(b);
      expect(x.value()).toEqual([4, 6]);
    });

    it("can subtract complex numbers", function() {
      var a = new Complex(1, 2);
      var b = new Complex(3, 4);
      var x = a.subtract(b);
      expect(x.value()).toEqual([-2, -2]);
    });

    it("can multiply complex numbers", function() {
      var a = new Complex(2, 3);
      var b = new Complex(4, 5);
      var x = a.multiply(b);
      expect(x.value()).toEqual([-7, 22]);
    });

    it("can divide complex numbers", function() {
      var a = new Complex(-7, 22);
      var b = new Complex(4, 5);
      var x = a.divide(b);
      expect(x.value()).toEqual([2, 3]);
    });

    it("does not implement modular arithmetic", function() {
      var a = new Complex();
      expect(function () {
          a.div(2);
      }).toThrowError("The requested function is not defined for complex numbers.");
      expect(function () {
          a.mod(2);
      }).toThrowError("The requested function is not defined for complex numbers.");
      expect(function () {
          a.divmod(2);
      }).toThrowError("The requested function is not defined for complex numbers.");
    });

});
