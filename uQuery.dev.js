(function (exports) {

var each    = Array.prototype.forEach,
    filter  = Array.prototype.filter;

var uQuery = function (nodes) {
  var self = {nodes: nodes};

  self.attr = function (name, value) {
    if (value === undefined) {
      return nodes[0].getAttribute(name);
    } else {
      each.call(nodes, function (el) {
        el.setAttribute(name, value);
      });

      return self;
    }
  };

  self.class = function (value) {
    return self.attr('class', value);
  };

  self.children = function (selector) {
    if (!nodes.length) return new uQuery([]);

    if (selector === undefined) {
      return new uQuery(nodes[0].childNodes);
    } else {
      return new uQuery(nodes[0].querySelectorAll(selector));
    }
  };

  self.first = function (selector) {
    if (!nodes.length) return self;

    if (selector === undefined) {
      return new uQuery([nodes[0]]);
    } else {
      return new uQuery([nodes[0].parentNode]).children(selector).first();
    }
  };

  self.each = function (callback) {
    each.call(nodes, callback);
    return self;
  };

  self.filter = function (callback) {
    return new uQuery(filter.call(nodes, callback));
  };

  self.hasClass = function (name) {
    if (!nodes.length) return false;
    var classes = self.class();
    if (classes === undefined || classes === null) return false;
    return classes.indexOf(name) > -1;
  };

  self.html = function (value) {
    if (value === undefined) {
      return nodes[0].innerHTML;
    } else {
      nodes[0].innerHTML = value;
      return self;
    }
  };

  self.text = function (value) {
    if (value === undefined) {
      return nodes[0].textContent;
    } else {
      nodes[0].textContent = value;
      return self;
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