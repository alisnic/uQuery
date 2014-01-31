
exports.$ = function (selector) {
  if (typeof selector === 'string') {
    return new uQuery(document.querySelectorAll(selector));
  } else if (selector.tagName) {
    return new uQuery([selector])
  } else if (selector instanceof uQuery){
    return selector;
  } else {
    return new uQuery([]);
  }
};

})(window);