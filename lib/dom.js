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
  if (!this.nodes.length) return this;
  return new uQuery([this.nodes[0].parentNode]);
};

uQuery.prototype.siblings = function (selector) {
  var self = this;

  return this.parent().children().filter(function (el) {
    var $el = $(el);
    console.log(el, $el.isnt(self));
    return $el.isnt(self) && (nil(selector) || $el.is(selector));
  });
};

uQuery.prototype.children = function (selector) {
  if (!this.nodes.length) return new uQuery([]);

  var matchingChildren = filter.call(this.nodes[0].childNodes, function (el) {
    return (nil(selector) || matches(el, selector)) && el.nodeName !== '#text';
  });

  return new uQuery(matchingChildren);
};

uQuery.prototype.first = function (selector) {
  if (!this.nodes.length) return this;

  if (nil(selector)) {
    return new uQuery([this.nodes[0]]);
  } else {
    return this.parent().children(selector).first();
  }
};

uQuery.prototype.last = function (selector) {
  if (!this.nodes.length) return this;

  if (nil(selector)) {
    return new uQuery([this.nodes[this.nodes.length-1]]);
  } else {
    return this.parent().children(selector).last();
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
  if (nil(value)) {
    return this.nodes[0].innerHTML;
  } else {
    this.nodes[0].innerHTML = value;
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
//offset
//empty
//remove
//clone
//before
//after
//show
//hide
//find
