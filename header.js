(function (exports) {

"use strict";

var each    = Array.prototype.forEach,
    filter  = Array.prototype.filter,
    every   = Array.prototype.every,
    some    = Array.prototype.some,
    map     = Array.prototype.map,
    reduce  = Array.prototype.reduce;

var nil = function (object) {
  return object === undefined || object === null;
};

var matches = function(el, selector) {
  return (el.matches || el.matchesSelector || el.msMatchesSelector ||
    el.mozMatchesSelector || el.webkitMatchesSelector ||
    el.oMatchesSelector).call(el, selector);
};

var include = function (nodes, el) {
  return some.call(nodes, function (n) { return n == el; });
};

var toArray = function (source) {
  return reduce.call(source, function (acc, el) {
    acc.push(el);
    return acc;
  }, []);
};

var uQuery = function (nodes) {
  this.nodes = nodes;
  this.length = nodes.length;
};

