/**
 * Minim core tests
 *
 * @copyright  Copyright © MrAnchovy  http://www.mranchovy.com/
 * @license    MIT                    http://opensource.org/licenses/MIT
 * @package    minim
**/

describe('Minim', function() {

  it('is version ' + Minim.VERSION, function() {
    // expect(true).toBe(true);
  });

  describe('Array.isArray', function() {
      it('is implemented if it does not already exist', function() {
        expect(Array.isArray([])).toBe(true);
      });
  });

  describe('Minim.almostEqual', function() {
    it('recognises numbers that differ by less than 1e-305 as almost equal', function() {
      expect(Minim.almostEqual(0.49e-305, -0.49e-305)).toBe(true);
      expect(Minim.almostEqual(0.5e-305, -0.5e-305)).toBe(false);
      expect(Minim.almostEqual(0.99e-305, 0)).toBe(true);
      expect(Minim.almostEqual(1e-305, 0)).toBe(false);
      expect(Minim.almostEqual(0, 0)).toBe(true);
    });

    it('recognises numbers that differ by a factor of less than 1e-12 as almost equal', function() {
      expect(Minim.almostEqual(1000000000000000, 999999999999001)).toBe(true);
      expect(Minim.almostEqual(1000000000000000, 999999999999000)).toBe(false);
      expect(Minim.almostEqual(1e100, 1.000000000001e100)).toBe(true);
      expect(Minim.almostEqual(1e100, 1.00000000001e100)).toBe(false);
    });

  });

  describe('Minim.extend', function() {
    it('can extend an object', function() {
      var obj = {property: 'value'};
      Minim.extend(obj, {self: obj}, {another: 'another'});
      expect(obj).toEqual({property: 'value', self: obj, another: 'another'});
    });
  });

});
