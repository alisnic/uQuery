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
  return some.call(nodes, function (n) { return n === el; });
};

var toArray = function (source) {
  if (source.forEach) return source;

  return reduce.call(source, function (acc, el) {
    acc.push(el);
    return acc;
  }, []);
};

var uQuerySet = function (nodes) {
  this.nodes = nodes;
  this.length = nodes.length;
};

var uQuery = function (selector) {
  if (typeof selector === 'string') {
    if (/<[a-z][\s\S]*>/i.test(selector)) {
      var div = document.createElement('div');
      div.innerHTML = selector;
      return new uQuerySet(div.childNodes);
    } else {
      return new uQuerySet(document.querySelectorAll(selector));
    }
  } else if (selector.tagName) {
    return new uQuerySet([selector]);
  } else if (selector instanceof NodeList) {
    return new uQuerySet(selector);
  } else if (selector instanceof uQuerySet) {
    return selector;
  } else {
    return new uQuerySet([]);
  }
};

exports.$ = uQuery;
