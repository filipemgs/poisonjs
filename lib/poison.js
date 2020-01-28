var _global = typeof window === 'object' ? window : global; //fixme

var cached = {
  alert: _global.alert.bind(_global),
  eval: _global.eval.bind(_global),
  Function: _global.Function.prototype.constructor.bind(_global),
  postMessage: _global.postMessage.bind(_global),
  setTimeout: _global.setTimeout.bind(_global),
  setInterval: _global.setInterval.bind(_global)
};

function _poison(o) {
  o.replace({
    name: o.name,
    arguments: o.args
  });
  return o.cached.apply(_global, o.args);
}

function poison(name, cb) {
  return function (fn) {
    _global[name] = function () {
      return _poison({
        name: name, 
        cached: cached[name],
        replace: typeof fn === 'undefined' ? 
          console.dir.bind(console) : //fallback
          fn, 
        args: arguments
      });
    };
    cb && cb();
  }
}

module.exports = {
  alert: poison('alert'),
  eval: poison('eval'),
  Function: poison('Function', function () {
    []["filter"]["constructor"] = Function;
  }),
  postMessage: poison('postMessage'),
  setTimeout: poison('setTimeout'),
  setInterval: poison('setInterval')
};
