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

uQuery.prototype.attr = function (name, value) {
  if (value === undefined) {
    if (!this.nodes.length) return;
    return this.nodes[0].getAttribute(name);
  } else {
    each.call(this.nodes, function (el) {
      el.setAttribute(name, value);
    });

    return this;
  }
};

uQuery.prototype.class = function (value) {
  return this.attr('class', value);
};

uQuery.prototype.parent = function () {
  if (!nodes.length) return this;
  return new uQuery([nodes[0].parentNode]);
};

uQuery.prototype.children = function (selector) {
  if (!nodes.length) return new uQuery([]);

  if (selector === undefined) {
    return new uQuery(nodes[0].childNodes);
  } else {
    var matchingChildren = filter.call(nodes[0].childNodes, function (el) {
      return matches(el, selector);
    });
    return new uQuery(matchingChildren);
  }
};

uQuery.prototype.first = function (selector) {
  if (!nodes.length) return this;

  if (selector === undefined) {
    return new uQuery([nodes[0]]);
  } else {
    return this.parent().children(selector).first();
  }
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

uQuery.prototype.hasClass = function (name) {
  if (!nodes.length) return false;
  var classes = this.class();
  if (classes === undefined || classes === null) return false;
  return classes.indexOf(name) > -1;
};

uQuery.prototype.html = function (value) {
  if (value === undefined) {
    return nodes[0].innerHTML;
  } else {
    nodes[0].innerHTML = value;
    return this;
  }
};

uQuery.prototype.text = function (value) {
  if (value === undefined) {
    return nodes[0].textContent;
  } else {
    nodes[0].textContent = value;
    return this;
  }
};

//Siblings
//CSS
//addClass
//removeClass
//prepend
//append
//parent + use in first
//offset
//is (selector, other uQuery)
//empty
//remove
//clone
//before
//after
//show
//hide
//find
