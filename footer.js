
  return self;
};

exports.$ = function (selector) {
  if (typeof selector === 'string') {
    return new uQuery(document.querySelectorAll(selector));
  } else {
    return new uQuery([selector]);
  }
};
})(window);