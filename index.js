const { assign } = Object;

function PrivateStore(store = {}) {
  return {
    set(key, val) {
      store[key] = val;
    },
    get(key) {
      return store[key];
    }
  }
}

const makeIterable = function(array) {
  let index = 0;

  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      if (index < array.length) {
        return {
          value: array[index++]
        };
      }
      return {
        done: true
      }
    }
  }
}

const makeIterator = function(array) {
  let index = 0;

  return {
    next() {
      return {
        value: array[index++],
        done: index >= array.length
      }
    }
  }
}

const coroutine = (generatorFunction) => {
  return function(...args) {
    const generatorObj = generatorFunction(...args);
    generatorObj.next();
    return generatorObj;
  }
}

const compose = (...methods) => {
  return (initialValue) => {
    return methods.reduceRight((value, method) => {
      return method(value);
    }, initialValue);
  }
}

const pipe = (...methods) => {
  return (initialValue) => {
    return methods.reduce((value, method) => {
      return method(value);
    }, initialValue);
  }
}

const inherit = (base, ...constructors) => {
  constructors.forEach(fn => assign(base.prototype, fn.prototype));
}
const mix = (base = {}, ...mixins) => {
  mixins.forEach(mixin => assign(base, mixin));
}

module.exports = {
  makeIterable,
  makeIterator,
  coroutine,
  compose,
  pipe,
  PrivateStore,
  inherit
}
