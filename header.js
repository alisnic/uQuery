(function (exports) {

"use strict";

var each    = Array.prototype.forEach,
    filter  = Array.prototype.filter,
    every   = Array.prototype.every,
    some    = Array.prototype.some;

var nil = function (object) {
  return object === undefined || object === null;
};

var matches = function(el, selector) {
  var fun = (
    el.matches || el.matchesSelector || el.msMatchesSelector ||
    el.mozMatchesSelector || el.webkitMatchesSelector ||
  el.oMatchesSelector);

  return fun.call(el, selector);
};

var include = function (nodes, el) {
  return some.call(nodes, function (n) { return n == el; });
};

var uQuery = function (nodes) {
  this.nodes = nodes;
};

