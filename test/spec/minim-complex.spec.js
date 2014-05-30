

describe("Minim.classes.Complex - complex number class", function() {

    var Complex = Minim.classes.Complex;

    beforeEach(function() {
    });

    it("can create a complex number", function() {
      var a = new Complex([0, 0]);
      expect(a.value).toEqual([0, 0]);
    });

    it("can add complex numbers", function() {
      var a = new Complex([1, 2]);
      var b = new Complex([3, 4]);
      var x = a.add(b);
      expect(x.value).toEqual([4, 6]);
    });

    it("can subtract complex numbers", function() {
      var a = new Complex([1, 2]);
      var b = new Complex([3, 4]);
      var x = a.subtract(b);
      expect(x.value).toEqual([-2, -2]);
    });

    it("can multiply complex numbers", function() {
      var a = new Complex([2, 3]);
      var b = new Complex([4, 5]);
      var x = a.multiply(b);
      expect(x.value).toEqual([-7, 22]);
    });

    it("can divide complex numbers", function() {
      var a = new Complex([-7, 22]);
      var b = new Complex([4, 5]);
      var x = a.divide(b);
      expect(x.value).toEqual([2, 3]);
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

describe("Minim.Complex - static complex number operations", function() {

    beforeEach(function() {
    });

    it("Minim.Complex.add(a, b) gives the sum of two complex numbers", function() {
        var a = [1, 2];
        var b = [3, 4];
        var x = Minim.Complex.add(a, b);
        expect(x).toEqual([4, 6]);
    });

    it("Minim.Complex.subtract(a, b) gives the difference of two complex numbers", function() {
        var a = [1, 2];
        var b = [3, 4];
        var x = Minim.Complex.subtract(a, b);
        expect(x).toEqual([-2, -2]);
    });

    it("Minim.Complex.subtract(a, b) gives the product of two complex numbers", function() {
        var a = [2, 3];
        var b = [4, 5];
        var x = Minim.Complex.multiply(a, b);
        expect(x).toEqual([-7, 22]);
    });

    it("can divide complex numbers", function() {
        var a = [-7, 22];
        var b = [4, 5];
        var x = Minim.Complex.divide(a, b);
        expect(x).toEqual([2, 3]);
    });

    it("does not implement modular arithmetic", function() {
      expect(function () {
          Minim.Complex.div();
      }).toThrowError("The requested function is not defined for complex numbers.");
      expect(function () {
          Minim.Complex.mod();
      }).toThrowError("The requested function is not defined for complex numbers.");
      expect(function () {
          Minim.Complex.divmod();
      }).toThrowError("The requested function is not defined for complex numbers.");
    });

});
