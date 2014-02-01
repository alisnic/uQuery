uQuerySet.prototype.push = function (el) {
  this.nodes = toArray(this.nodes);
  this.nodes.push(el);
  this.length++;
  return this;
};

uQuerySet.prototype.append = function () {
  var args = arguments;

  this.each(function (el) {
    each.call(args, function (target) {
      if (typeof target === 'string') {
        el.insertAdjacentHTML('beforeend', target);
      } else {
        var $target = $(target);

        $target.each(function (tel) {
          var node = tel;

          if (tel.parentNode) {
            node = tel.cloneNode(true);
            $target.push(node);
          }

          el.appendChild(node);
        });
      }
    });
  });

  return this;
};

uQuerySet.prototype.appendTo = function (target) {
  if (nil(target)) return this;
  var $target = $(target);
  return this.each(function (el) { $target.append(el); });
};

uQuerySet.prototype.attr = function (name, value) {
  if (nil(value)) {
    if (!this.length) return;
    return this.nodes[0].getAttribute(name);
  } else {
    return this.each(function (el) {
      el.setAttribute(name, value);
    });
  }
};

uQuerySet.prototype.children = function (selector) {
  if (!this.length) return new uQuerySet([]);

  var matchingChildren = filter.call(this.nodes[0].childNodes, function (el) {
    return el.nodeName !== '#text' && (nil(selector) || matches(el, selector));
  });

  return new uQuerySet(matchingChildren);
};

uQuerySet.prototype.class = function (value) {
  return this.attr('class', value);
};

uQuerySet.prototype.clone = function () {
  return new uQuerySet(map.call(this.nodes, function (el) {
    return el.cloneNode(true);
  }));
};

uQuerySet.prototype.each = function (callback) {
  each.call(this.nodes, callback);
  return this;
};

uQuerySet.prototype.empty = function () {
  return this.each(function (el) {
    el.innerHTML = '';
  });
};

uQuerySet.prototype.filter = function (query) {
  if (typeof query === 'string' ) {
    return new uQuerySet(filter.call(this.nodes, function (el) {
      return matches(el, query);
    }));
  } else if (typeof query === 'function') {
    return new uQuerySet(filter.call(this.nodes, query));
  } else {
    return this;
  }
};

uQuerySet.prototype.find = function (selector) {
  if (nil(selector)) return new uQuerySet([]);
  var elements = reduce.call(this.nodes, function (acc, el) {
    return acc.concat(toArray(el.querySelectorAll(selector)));
  }, []);
  return new uQuerySet(elements);
};

uQuerySet.prototype.first = function (selector) {
  if (!this.length) return this;
  return new uQuerySet([this.nodes[0]]);
};

uQuerySet.prototype.hasClass = function (name) {
  if (!nodes.length) return false;
  var classes = this.class();
  if (nil(classes)) return false;
  return classes.indexOf(name) > -1;
};

uQuerySet.prototype.html = function (value) {
  if (nil(value)) {
    return this.nodes[0].innerHTML;
  } else {
    this.nodes[0].innerHTML = value;
    return this;
  }
};

uQuerySet.prototype.is = function (target) {
  if (typeof target === 'string') {
    return every.call(this.nodes, function (el) {
      return matches(el, target);
    });
  } else {
    if (target instanceof uQuerySet) {
      if (this.length !== target.nodes.length) return false;

      return every.call(this.nodes, function (el, i) {
        return el === target.nodes[i];
      });
    } else {
      return false;
    }
  }
};
uQuerySet.prototype.are = uQuerySet.prototype.is;

uQuerySet.prototype.hide = function () {
  this.each(function (el) { el.style.display = 'none'; });
  return this;
};

uQuerySet.prototype.isnt = function (target) {
  return !this.is(target);
};
uQuerySet.prototype.arent = uQuerySet.prototype.isnt;

uQuerySet.prototype.last = function (selector) {
  if (!this.length) return this;
  return new uQuerySet([this.nodes[this.length-1]]);
};

uQuerySet.prototype.parent = function () {
  if (!this.length) return this;
  return new uQuerySet([this.nodes[0].parentNode]);
};

uQuerySet.prototype.remove = function (selector) {
  return this.each(function (el) {
    if (nil(selector) || matches(el, selector)) {
      el.parentNode.removeChild(el);
    }
  });
};

uQuerySet.prototype.siblings = function (selector) {
  var self = this, acc = [];

  this.each(function (el) {
    var elems = new uQuerySet(el.parentNode).children().filter(function (el) {
      return !include(self.nodes, el) && (nil(selector) || $el.is(selector));
    });

    acc = acc.concat(elems);
  });

  return new uQuerySet(acc);
};

uQuerySet.prototype.show = function () {
  return this.each(function (el) { el.style.display = ''; });
};

uQuerySet.prototype.text = function (value) {
  if (nil(value)) {
    return this.nodes[0].textContent;
  } else {
    return this.each(function (el) { el.textContent = value; });
  }
};

//CSS
//addClass
//removeClass
//prepend
//prependTo
//offset
//before
//after
