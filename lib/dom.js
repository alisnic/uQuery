uQuery.prototype.attr = function (name, value) {
  if (nil(value)) {
    if (!this.nodes.length) return;
    return this.nodes[0].getAttribute(name);
  } else {
    each.call(this.nodes, function (el) {
      el.setAttribute(name, value);
    });

    return this;
  }
};

uQuery.prototype.children = function (selector) {
  if (!this.nodes.length) return new uQuery([]);

  var matchingChildren = filter.call(this.nodes[0].childNodes, function (el) {
    return el.nodeName !== '#text' && (nil(selector) || matches(el, selector));
  });

  return new uQuery(matchingChildren);
};

uQuery.prototype.class = function (value) {
  return this.attr('class', value);
};

uQuery.prototype.clone = function () {
  return new uQuery(map.call(this.nodes, function (el) {
    return el.cloneNode(true);
  }));
};

uQuery.prototype.each = function (callback) {
  each.call(nodes, callback);
  return this;
};

uQuery.prototype.filter = function (query) {
  if (typeof query === 'string' ) {
    return new uQuery(filter.call(this.nodes, function (el) {
      return matches(el, query);
    }));
  } else if (typeof query === 'function') {
    return new uQuery(filter.call(this.nodes, query));
  } else {
    return this;
  }
};

uQuery.prototype.first = function (selector) {
  if (!this.nodes.length) return this;
  return new uQuery([this.nodes[0]]);
};

uQuery.prototype.hasClass = function (name) {
  if (!nodes.length) return false;
  var classes = this.class();
  if (nil(classes)) return false;
  return classes.indexOf(name) > -1;
};

uQuery.prototype.html = function (value) {
  if (nil(value)) {
    return this.nodes[0].innerHTML;
  } else {
    this.nodes[0].innerHTML = value;
    return this;
  }
};

uQuery.prototype.is = function (target) {
  if (typeof target === 'string') {
    return every.call(this.nodes, function (el) {
      return matches(el, target);
    });
  } else {
    if (target instanceof uQuery) {
      if (this.nodes.length !== target.nodes.length) return false;

      return every.call(this.nodes, function (el, i) {
        return el === target.nodes[i];
      });
    } else {
      return false;
    }
  }
};
uQuery.prototype.are = uQuery.prototype.is;

uQuery.prototype.isnt = function (target) {
  return !this.is(target);
};
uQuery.prototype.arent = uQuery.prototype.isnt;

uQuery.prototype.last = function (selector) {
  if (!this.nodes.length) return this;
  return new uQuery([this.nodes[this.nodes.length-1]]);
};

uQuery.prototype.parent = function () {
  if (!this.nodes.length) return this;
  return new uQuery([this.nodes[0].parentNode]);
};

uQuery.prototype.siblings = function (selector) {
  var self = this;

  return this.parent().children().filter(function (el) {
    return !include(self.nodes, el) && (nil(selector) || $el.is(selector));
  });
};

uQuery.prototype.text = function (value) {
  if (nil(value)) {
    return nodes[0].textContent;
  } else {
    nodes[0].textContent = value;
    return this;
  }
};

//CSS
//addClass
//removeClass
//prepend
//prependTo
//append
//appendTo
//offset
//empty
//remove
//before
//after
//show
//hide
//find
