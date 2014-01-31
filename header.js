(function (exports) {

"use strict";

var each    = Array.prototype.forEach,
    filter  = Array.prototype.filter,
    every   = Array.prototype.every;

var nil = function (object) {
  return object === undefined;
};

var matches = function(el, selector) {
  var fun = (
    el.matches || el.matchesSelector || el.msMatchesSelector ||
    el.mozMatchesSelector || el.webkitMatchesSelector ||
  el.oMatchesSelector);

  return fun.call(el, selector);
};

var uQuery = function (nodes) {
  this.nodes = nodes;
};

