(function (exports) {

var each    = Array.prototype.forEach,
    filter  = Array.prototype.filter;

var uQuery = function (nodes) {
  var self = {nodes: nodes};

  self.attr = function (name, value) {
    if (!nodes.length) return;

    if (value === undefined) {
      return nodes[0].getAttribute(name);
    } else {
      return each.call(nodes, function (el) {
        el.setAttribute(name, value);
      });
    }
  };

  self.class = function (value) {
    return self.attr('class', value);
  };

  self.children = function (selector) {
    if (!nodes.length) return [];

    if (selector === undefined) {
      return new uQuery(nodes[0].childNodes);
    } else {
      return new uQuery(nodes[0].querySelectorAll(selector));
    }
  };

  self.first = function (selector) {
    if (selector === undefined) {
      return new uQuery([nodes[0]]);
    } else {
      return new uQuery([nodes[0].parentNode]).children(selector).first();
    }
  };

  self.each = function (callback) {
    return each.call(nodes, callback);
  };

  self.filter = function (callback) {
    return new uQuery(filter.call(nodes, callback));
  };

  self.hasClass = function (name) {
    var classes = self.class();
    if (classes === undefined || classes === null) return false;
    return classes.indexOf(name) > -1;
  };

  self.html = function (value) {
    if (value === undefined) {
      return nodes[0].innerHTML;
    } else {
      nodes[0].innerHTML = value;
    }
  };

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