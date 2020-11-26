"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var A =
/*#__PURE__*/
function () {
  function A() {
    _classCallCheck(this, A);
  }

  _createClass(A, [{
    key: "plus",
    value: function plus(a, b) {
      window.enoDebug = function () {};

      enoDebug();
      var c = 1;
      window.a = 1;
      console.log(a, b);
      return a + b;
    }
  }]);

  return A;
}();

function plus(a, b) {
  var c = 1;
  window.a = 1;
  console.log(a, b);
  new A().plus(1, 2);
  return a + b;
}

plus(1, 2); // debug(plus)

function sum(a, b) {
  var result = a + b; // DevTools pauses on this line.

  return result;
} // debug(sum); // Pass the function object, not a string.


sum();
console.trace('');