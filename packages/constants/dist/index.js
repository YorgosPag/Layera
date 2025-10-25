"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

// ../../node_modules/.pnpm/react@19.2.0/node_modules/react/cjs/react.production.js
var require_react_production = __commonJS({
  "../../node_modules/.pnpm/react@19.2.0/node_modules/react/cjs/react.production.js"(exports2) {
    "use strict";
    var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element");
    var REACT_PORTAL_TYPE = Symbol.for("react.portal");
    var REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
    var REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode");
    var REACT_PROFILER_TYPE = Symbol.for("react.profiler");
    var REACT_CONSUMER_TYPE = Symbol.for("react.consumer");
    var REACT_CONTEXT_TYPE = Symbol.for("react.context");
    var REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref");
    var REACT_SUSPENSE_TYPE = Symbol.for("react.suspense");
    var REACT_MEMO_TYPE = Symbol.for("react.memo");
    var REACT_LAZY_TYPE = Symbol.for("react.lazy");
    var REACT_ACTIVITY_TYPE = Symbol.for("react.activity");
    var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
    function getIteratorFn(maybeIterable) {
      if (null === maybeIterable || "object" !== typeof maybeIterable) return null;
      maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
      return "function" === typeof maybeIterable ? maybeIterable : null;
    }
    var ReactNoopUpdateQueue = {
      isMounted: function() {
        return false;
      },
      enqueueForceUpdate: function() {
      },
      enqueueReplaceState: function() {
      },
      enqueueSetState: function() {
      }
    };
    var assign = Object.assign;
    var emptyObject = {};
    function Component(props, context, updater) {
      this.props = props;
      this.context = context;
      this.refs = emptyObject;
      this.updater = updater || ReactNoopUpdateQueue;
    }
    Component.prototype.isReactComponent = {};
    Component.prototype.setState = function(partialState, callback) {
      if ("object" !== typeof partialState && "function" !== typeof partialState && null != partialState)
        throw Error(
          "takes an object of state variables to update or a function which returns an object of state variables."
        );
      this.updater.enqueueSetState(this, partialState, callback, "setState");
    };
    Component.prototype.forceUpdate = function(callback) {
      this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
    };
    function ComponentDummy() {
    }
    ComponentDummy.prototype = Component.prototype;
    function PureComponent(props, context, updater) {
      this.props = props;
      this.context = context;
      this.refs = emptyObject;
      this.updater = updater || ReactNoopUpdateQueue;
    }
    var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
    pureComponentPrototype.constructor = PureComponent;
    assign(pureComponentPrototype, Component.prototype);
    pureComponentPrototype.isPureReactComponent = true;
    var isArrayImpl = Array.isArray;
    function noop() {
    }
    var ReactSharedInternals = { H: null, A: null, T: null, S: null };
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    function ReactElement(type, key, props) {
      var refProp = props.ref;
      return {
        $$typeof: REACT_ELEMENT_TYPE,
        type,
        key,
        ref: void 0 !== refProp ? refProp : null,
        props
      };
    }
    function cloneAndReplaceKey(oldElement, newKey) {
      return ReactElement(oldElement.type, newKey, oldElement.props);
    }
    function isValidElement(object) {
      return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    function escape(key) {
      var escaperLookup = { "=": "=0", ":": "=2" };
      return "$" + key.replace(/[=:]/g, function(match) {
        return escaperLookup[match];
      });
    }
    var userProvidedKeyEscapeRegex = /\/+/g;
    function getElementKey(element, index) {
      return "object" === typeof element && null !== element && null != element.key ? escape("" + element.key) : index.toString(36);
    }
    function resolveThenable(thenable) {
      switch (thenable.status) {
        case "fulfilled":
          return thenable.value;
        case "rejected":
          throw thenable.reason;
        default:
          switch ("string" === typeof thenable.status ? thenable.then(noop, noop) : (thenable.status = "pending", thenable.then(
            function(fulfilledValue) {
              "pending" === thenable.status && (thenable.status = "fulfilled", thenable.value = fulfilledValue);
            },
            function(error) {
              "pending" === thenable.status && (thenable.status = "rejected", thenable.reason = error);
            }
          )), thenable.status) {
            case "fulfilled":
              return thenable.value;
            case "rejected":
              throw thenable.reason;
          }
      }
      throw thenable;
    }
    function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
      var type = typeof children;
      if ("undefined" === type || "boolean" === type) children = null;
      var invokeCallback = false;
      if (null === children) invokeCallback = true;
      else
        switch (type) {
          case "bigint":
          case "string":
          case "number":
            invokeCallback = true;
            break;
          case "object":
            switch (children.$$typeof) {
              case REACT_ELEMENT_TYPE:
              case REACT_PORTAL_TYPE:
                invokeCallback = true;
                break;
              case REACT_LAZY_TYPE:
                return invokeCallback = children._init, mapIntoArray(
                  invokeCallback(children._payload),
                  array,
                  escapedPrefix,
                  nameSoFar,
                  callback
                );
            }
        }
      if (invokeCallback)
        return callback = callback(children), invokeCallback = "" === nameSoFar ? "." + getElementKey(children, 0) : nameSoFar, isArrayImpl(callback) ? (escapedPrefix = "", null != invokeCallback && (escapedPrefix = invokeCallback.replace(userProvidedKeyEscapeRegex, "$&/") + "/"), mapIntoArray(callback, array, escapedPrefix, "", function(c) {
          return c;
        })) : null != callback && (isValidElement(callback) && (callback = cloneAndReplaceKey(
          callback,
          escapedPrefix + (null == callback.key || children && children.key === callback.key ? "" : ("" + callback.key).replace(
            userProvidedKeyEscapeRegex,
            "$&/"
          ) + "/") + invokeCallback
        )), array.push(callback)), 1;
      invokeCallback = 0;
      var nextNamePrefix = "" === nameSoFar ? "." : nameSoFar + ":";
      if (isArrayImpl(children))
        for (var i = 0; i < children.length; i++)
          nameSoFar = children[i], type = nextNamePrefix + getElementKey(nameSoFar, i), invokeCallback += mapIntoArray(
            nameSoFar,
            array,
            escapedPrefix,
            type,
            callback
          );
      else if (i = getIteratorFn(children), "function" === typeof i)
        for (children = i.call(children), i = 0; !(nameSoFar = children.next()).done; )
          nameSoFar = nameSoFar.value, type = nextNamePrefix + getElementKey(nameSoFar, i++), invokeCallback += mapIntoArray(
            nameSoFar,
            array,
            escapedPrefix,
            type,
            callback
          );
      else if ("object" === type) {
        if ("function" === typeof children.then)
          return mapIntoArray(
            resolveThenable(children),
            array,
            escapedPrefix,
            nameSoFar,
            callback
          );
        array = String(children);
        throw Error(
          "Objects are not valid as a React child (found: " + ("[object Object]" === array ? "object with keys {" + Object.keys(children).join(", ") + "}" : array) + "). If you meant to render a collection of children, use an array instead."
        );
      }
      return invokeCallback;
    }
    function mapChildren(children, func, context) {
      if (null == children) return children;
      var result = [], count = 0;
      mapIntoArray(children, result, "", "", function(child) {
        return func.call(context, child, count++);
      });
      return result;
    }
    function lazyInitializer(payload) {
      if (-1 === payload._status) {
        var ctor = payload._result;
        ctor = ctor();
        ctor.then(
          function(moduleObject) {
            if (0 === payload._status || -1 === payload._status)
              payload._status = 1, payload._result = moduleObject;
          },
          function(error) {
            if (0 === payload._status || -1 === payload._status)
              payload._status = 2, payload._result = error;
          }
        );
        -1 === payload._status && (payload._status = 0, payload._result = ctor);
      }
      if (1 === payload._status) return payload._result.default;
      throw payload._result;
    }
    var reportGlobalError = "function" === typeof reportError ? reportError : function(error) {
      if ("object" === typeof window && "function" === typeof window.ErrorEvent) {
        var event = new window.ErrorEvent("error", {
          bubbles: true,
          cancelable: true,
          message: "object" === typeof error && null !== error && "string" === typeof error.message ? String(error.message) : String(error),
          error
        });
        if (!window.dispatchEvent(event)) return;
      } else if ("object" === typeof process && "function" === typeof process.emit) {
        process.emit("uncaughtException", error);
        return;
      }
      console.error(error);
    };
    var Children = {
      map: mapChildren,
      forEach: function(children, forEachFunc, forEachContext) {
        mapChildren(
          children,
          function() {
            forEachFunc.apply(this, arguments);
          },
          forEachContext
        );
      },
      count: function(children) {
        var n = 0;
        mapChildren(children, function() {
          n++;
        });
        return n;
      },
      toArray: function(children) {
        return mapChildren(children, function(child) {
          return child;
        }) || [];
      },
      only: function(children) {
        if (!isValidElement(children))
          throw Error(
            "React.Children.only expected to receive a single React element child."
          );
        return children;
      }
    };
    exports2.Activity = REACT_ACTIVITY_TYPE;
    exports2.Children = Children;
    exports2.Component = Component;
    exports2.Fragment = REACT_FRAGMENT_TYPE;
    exports2.Profiler = REACT_PROFILER_TYPE;
    exports2.PureComponent = PureComponent;
    exports2.StrictMode = REACT_STRICT_MODE_TYPE;
    exports2.Suspense = REACT_SUSPENSE_TYPE;
    exports2.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ReactSharedInternals;
    exports2.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function(size) {
        return ReactSharedInternals.H.useMemoCache(size);
      }
    };
    exports2.cache = function(fn) {
      return function() {
        return fn.apply(null, arguments);
      };
    };
    exports2.cacheSignal = function() {
      return null;
    };
    exports2.cloneElement = function(element, config, children) {
      if (null === element || void 0 === element)
        throw Error(
          "The argument must be a React element, but you passed " + element + "."
        );
      var props = assign({}, element.props), key = element.key;
      if (null != config)
        for (propName in void 0 !== config.key && (key = "" + config.key), config)
          !hasOwnProperty.call(config, propName) || "key" === propName || "__self" === propName || "__source" === propName || "ref" === propName && void 0 === config.ref || (props[propName] = config[propName]);
      var propName = arguments.length - 2;
      if (1 === propName) props.children = children;
      else if (1 < propName) {
        for (var childArray = Array(propName), i = 0; i < propName; i++)
          childArray[i] = arguments[i + 2];
        props.children = childArray;
      }
      return ReactElement(element.type, key, props);
    };
    exports2.createContext = function(defaultValue) {
      defaultValue = {
        $$typeof: REACT_CONTEXT_TYPE,
        _currentValue: defaultValue,
        _currentValue2: defaultValue,
        _threadCount: 0,
        Provider: null,
        Consumer: null
      };
      defaultValue.Provider = defaultValue;
      defaultValue.Consumer = {
        $$typeof: REACT_CONSUMER_TYPE,
        _context: defaultValue
      };
      return defaultValue;
    };
    exports2.createElement = function(type, config, children) {
      var propName, props = {}, key = null;
      if (null != config)
        for (propName in void 0 !== config.key && (key = "" + config.key), config)
          hasOwnProperty.call(config, propName) && "key" !== propName && "__self" !== propName && "__source" !== propName && (props[propName] = config[propName]);
      var childrenLength = arguments.length - 2;
      if (1 === childrenLength) props.children = children;
      else if (1 < childrenLength) {
        for (var childArray = Array(childrenLength), i = 0; i < childrenLength; i++)
          childArray[i] = arguments[i + 2];
        props.children = childArray;
      }
      if (type && type.defaultProps)
        for (propName in childrenLength = type.defaultProps, childrenLength)
          void 0 === props[propName] && (props[propName] = childrenLength[propName]);
      return ReactElement(type, key, props);
    };
    exports2.createRef = function() {
      return { current: null };
    };
    exports2.forwardRef = function(render) {
      return { $$typeof: REACT_FORWARD_REF_TYPE, render };
    };
    exports2.isValidElement = isValidElement;
    exports2.lazy = function(ctor) {
      return {
        $$typeof: REACT_LAZY_TYPE,
        _payload: { _status: -1, _result: ctor },
        _init: lazyInitializer
      };
    };
    exports2.memo = function(type, compare) {
      return {
        $$typeof: REACT_MEMO_TYPE,
        type,
        compare: void 0 === compare ? null : compare
      };
    };
    exports2.startTransition = function(scope) {
      var prevTransition = ReactSharedInternals.T, currentTransition = {};
      ReactSharedInternals.T = currentTransition;
      try {
        var returnValue = scope(), onStartTransitionFinish = ReactSharedInternals.S;
        null !== onStartTransitionFinish && onStartTransitionFinish(currentTransition, returnValue);
        "object" === typeof returnValue && null !== returnValue && "function" === typeof returnValue.then && returnValue.then(noop, reportGlobalError);
      } catch (error) {
        reportGlobalError(error);
      } finally {
        null !== prevTransition && null !== currentTransition.types && (prevTransition.types = currentTransition.types), ReactSharedInternals.T = prevTransition;
      }
    };
    exports2.unstable_useCacheRefresh = function() {
      return ReactSharedInternals.H.useCacheRefresh();
    };
    exports2.use = function(usable) {
      return ReactSharedInternals.H.use(usable);
    };
    exports2.useActionState = function(action, initialState, permalink) {
      return ReactSharedInternals.H.useActionState(action, initialState, permalink);
    };
    exports2.useCallback = function(callback, deps) {
      return ReactSharedInternals.H.useCallback(callback, deps);
    };
    exports2.useContext = function(Context) {
      return ReactSharedInternals.H.useContext(Context);
    };
    exports2.useDebugValue = function() {
    };
    exports2.useDeferredValue = function(value, initialValue) {
      return ReactSharedInternals.H.useDeferredValue(value, initialValue);
    };
    exports2.useEffect = function(create, deps) {
      return ReactSharedInternals.H.useEffect(create, deps);
    };
    exports2.useEffectEvent = function(callback) {
      return ReactSharedInternals.H.useEffectEvent(callback);
    };
    exports2.useId = function() {
      return ReactSharedInternals.H.useId();
    };
    exports2.useImperativeHandle = function(ref, create, deps) {
      return ReactSharedInternals.H.useImperativeHandle(ref, create, deps);
    };
    exports2.useInsertionEffect = function(create, deps) {
      return ReactSharedInternals.H.useInsertionEffect(create, deps);
    };
    exports2.useLayoutEffect = function(create, deps) {
      return ReactSharedInternals.H.useLayoutEffect(create, deps);
    };
    exports2.useMemo = function(create, deps) {
      return ReactSharedInternals.H.useMemo(create, deps);
    };
    exports2.useOptimistic = function(passthrough, reducer) {
      return ReactSharedInternals.H.useOptimistic(passthrough, reducer);
    };
    exports2.useReducer = function(reducer, initialArg, init) {
      return ReactSharedInternals.H.useReducer(reducer, initialArg, init);
    };
    exports2.useRef = function(initialValue) {
      return ReactSharedInternals.H.useRef(initialValue);
    };
    exports2.useState = function(initialState) {
      return ReactSharedInternals.H.useState(initialState);
    };
    exports2.useSyncExternalStore = function(subscribe, getSnapshot, getServerSnapshot) {
      return ReactSharedInternals.H.useSyncExternalStore(
        subscribe,
        getSnapshot,
        getServerSnapshot
      );
    };
    exports2.useTransition = function() {
      return ReactSharedInternals.H.useTransition();
    };
    exports2.version = "19.2.0";
  }
});

// ../../node_modules/.pnpm/react@19.2.0/node_modules/react/cjs/react.development.js
var require_react_development = __commonJS({
  "../../node_modules/.pnpm/react@19.2.0/node_modules/react/cjs/react.development.js"(exports2, module2) {
    "use strict";
    "production" !== process.env.NODE_ENV && (function() {
      function defineDeprecationWarning(methodName, info) {
        Object.defineProperty(Component.prototype, methodName, {
          get: function() {
            console.warn(
              "%s(...) is deprecated in plain JavaScript React classes. %s",
              info[0],
              info[1]
            );
          }
        });
      }
      function getIteratorFn(maybeIterable) {
        if (null === maybeIterable || "object" !== typeof maybeIterable)
          return null;
        maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
        return "function" === typeof maybeIterable ? maybeIterable : null;
      }
      function warnNoop(publicInstance, callerName) {
        publicInstance = (publicInstance = publicInstance.constructor) && (publicInstance.displayName || publicInstance.name) || "ReactClass";
        var warningKey = publicInstance + "." + callerName;
        didWarnStateUpdateForUnmountedComponent[warningKey] || (console.error(
          "Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.",
          callerName,
          publicInstance
        ), didWarnStateUpdateForUnmountedComponent[warningKey] = true);
      }
      function Component(props, context, updater) {
        this.props = props;
        this.context = context;
        this.refs = emptyObject;
        this.updater = updater || ReactNoopUpdateQueue;
      }
      function ComponentDummy() {
      }
      function PureComponent(props, context, updater) {
        this.props = props;
        this.context = context;
        this.refs = emptyObject;
        this.updater = updater || ReactNoopUpdateQueue;
      }
      function noop() {
      }
      function testStringCoercion(value) {
        return "" + value;
      }
      function checkKeyStringCoercion(value) {
        try {
          testStringCoercion(value);
          var JSCompiler_inline_result = false;
        } catch (e) {
          JSCompiler_inline_result = true;
        }
        if (JSCompiler_inline_result) {
          JSCompiler_inline_result = console;
          var JSCompiler_temp_const = JSCompiler_inline_result.error;
          var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
          JSCompiler_temp_const.call(
            JSCompiler_inline_result,
            "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
            JSCompiler_inline_result$jscomp$0
          );
          return testStringCoercion(value);
        }
      }
      function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type)
          return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch (type) {
          case REACT_FRAGMENT_TYPE:
            return "Fragment";
          case REACT_PROFILER_TYPE:
            return "Profiler";
          case REACT_STRICT_MODE_TYPE:
            return "StrictMode";
          case REACT_SUSPENSE_TYPE:
            return "Suspense";
          case REACT_SUSPENSE_LIST_TYPE:
            return "SuspenseList";
          case REACT_ACTIVITY_TYPE:
            return "Activity";
        }
        if ("object" === typeof type)
          switch ("number" === typeof type.tag && console.error(
            "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
          ), type.$$typeof) {
            case REACT_PORTAL_TYPE:
              return "Portal";
            case REACT_CONTEXT_TYPE:
              return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
              return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
              var innerType = type.render;
              type = type.displayName;
              type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
              return type;
            case REACT_MEMO_TYPE:
              return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
              innerType = type._payload;
              type = type._init;
              try {
                return getComponentNameFromType(type(innerType));
              } catch (x) {
              }
          }
        return null;
      }
      function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE)
          return "<...>";
        try {
          var name = getComponentNameFromType(type);
          return name ? "<" + name + ">" : "<...>";
        } catch (x) {
          return "<...>";
        }
      }
      function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
      }
      function UnknownOwner() {
        return Error("react-stack-top-frame");
      }
      function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
          var getter = Object.getOwnPropertyDescriptor(config, "key").get;
          if (getter && getter.isReactWarning) return false;
        }
        return void 0 !== config.key;
      }
      function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
          specialPropKeyWarningShown || (specialPropKeyWarningShown = true, console.error(
            "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
            displayName
          ));
        }
        warnAboutAccessingKey.isReactWarning = true;
        Object.defineProperty(props, "key", {
          get: warnAboutAccessingKey,
          configurable: true
        });
      }
      function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = true, console.error(
          "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
        ));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
      }
      function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
          $$typeof: REACT_ELEMENT_TYPE,
          type,
          key,
          props,
          _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
          enumerable: false,
          get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", { enumerable: false, value: null });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
          configurable: false,
          enumerable: false,
          writable: true,
          value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
          configurable: false,
          enumerable: false,
          writable: true,
          value: null
        });
        Object.defineProperty(type, "_debugStack", {
          configurable: false,
          enumerable: false,
          writable: true,
          value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
          configurable: false,
          enumerable: false,
          writable: true,
          value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
      }
      function cloneAndReplaceKey(oldElement, newKey) {
        newKey = ReactElement(
          oldElement.type,
          newKey,
          oldElement.props,
          oldElement._owner,
          oldElement._debugStack,
          oldElement._debugTask
        );
        oldElement._store && (newKey._store.validated = oldElement._store.validated);
        return newKey;
      }
      function validateChildKeys(node) {
        isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
      }
      function isValidElement(object) {
        return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
      }
      function escape(key) {
        var escaperLookup = { "=": "=0", ":": "=2" };
        return "$" + key.replace(/[=:]/g, function(match) {
          return escaperLookup[match];
        });
      }
      function getElementKey(element, index) {
        return "object" === typeof element && null !== element && null != element.key ? (checkKeyStringCoercion(element.key), escape("" + element.key)) : index.toString(36);
      }
      function resolveThenable(thenable) {
        switch (thenable.status) {
          case "fulfilled":
            return thenable.value;
          case "rejected":
            throw thenable.reason;
          default:
            switch ("string" === typeof thenable.status ? thenable.then(noop, noop) : (thenable.status = "pending", thenable.then(
              function(fulfilledValue) {
                "pending" === thenable.status && (thenable.status = "fulfilled", thenable.value = fulfilledValue);
              },
              function(error) {
                "pending" === thenable.status && (thenable.status = "rejected", thenable.reason = error);
              }
            )), thenable.status) {
              case "fulfilled":
                return thenable.value;
              case "rejected":
                throw thenable.reason;
            }
        }
        throw thenable;
      }
      function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
        var type = typeof children;
        if ("undefined" === type || "boolean" === type) children = null;
        var invokeCallback = false;
        if (null === children) invokeCallback = true;
        else
          switch (type) {
            case "bigint":
            case "string":
            case "number":
              invokeCallback = true;
              break;
            case "object":
              switch (children.$$typeof) {
                case REACT_ELEMENT_TYPE:
                case REACT_PORTAL_TYPE:
                  invokeCallback = true;
                  break;
                case REACT_LAZY_TYPE:
                  return invokeCallback = children._init, mapIntoArray(
                    invokeCallback(children._payload),
                    array,
                    escapedPrefix,
                    nameSoFar,
                    callback
                  );
              }
          }
        if (invokeCallback) {
          invokeCallback = children;
          callback = callback(invokeCallback);
          var childKey = "" === nameSoFar ? "." + getElementKey(invokeCallback, 0) : nameSoFar;
          isArrayImpl(callback) ? (escapedPrefix = "", null != childKey && (escapedPrefix = childKey.replace(userProvidedKeyEscapeRegex, "$&/") + "/"), mapIntoArray(callback, array, escapedPrefix, "", function(c) {
            return c;
          })) : null != callback && (isValidElement(callback) && (null != callback.key && (invokeCallback && invokeCallback.key === callback.key || checkKeyStringCoercion(callback.key)), escapedPrefix = cloneAndReplaceKey(
            callback,
            escapedPrefix + (null == callback.key || invokeCallback && invokeCallback.key === callback.key ? "" : ("" + callback.key).replace(
              userProvidedKeyEscapeRegex,
              "$&/"
            ) + "/") + childKey
          ), "" !== nameSoFar && null != invokeCallback && isValidElement(invokeCallback) && null == invokeCallback.key && invokeCallback._store && !invokeCallback._store.validated && (escapedPrefix._store.validated = 2), callback = escapedPrefix), array.push(callback));
          return 1;
        }
        invokeCallback = 0;
        childKey = "" === nameSoFar ? "." : nameSoFar + ":";
        if (isArrayImpl(children))
          for (var i = 0; i < children.length; i++)
            nameSoFar = children[i], type = childKey + getElementKey(nameSoFar, i), invokeCallback += mapIntoArray(
              nameSoFar,
              array,
              escapedPrefix,
              type,
              callback
            );
        else if (i = getIteratorFn(children), "function" === typeof i)
          for (i === children.entries && (didWarnAboutMaps || console.warn(
            "Using Maps as children is not supported. Use an array of keyed ReactElements instead."
          ), didWarnAboutMaps = true), children = i.call(children), i = 0; !(nameSoFar = children.next()).done; )
            nameSoFar = nameSoFar.value, type = childKey + getElementKey(nameSoFar, i++), invokeCallback += mapIntoArray(
              nameSoFar,
              array,
              escapedPrefix,
              type,
              callback
            );
        else if ("object" === type) {
          if ("function" === typeof children.then)
            return mapIntoArray(
              resolveThenable(children),
              array,
              escapedPrefix,
              nameSoFar,
              callback
            );
          array = String(children);
          throw Error(
            "Objects are not valid as a React child (found: " + ("[object Object]" === array ? "object with keys {" + Object.keys(children).join(", ") + "}" : array) + "). If you meant to render a collection of children, use an array instead."
          );
        }
        return invokeCallback;
      }
      function mapChildren(children, func, context) {
        if (null == children) return children;
        var result = [], count = 0;
        mapIntoArray(children, result, "", "", function(child) {
          return func.call(context, child, count++);
        });
        return result;
      }
      function lazyInitializer(payload) {
        if (-1 === payload._status) {
          var ioInfo = payload._ioInfo;
          null != ioInfo && (ioInfo.start = ioInfo.end = performance.now());
          ioInfo = payload._result;
          var thenable = ioInfo();
          thenable.then(
            function(moduleObject) {
              if (0 === payload._status || -1 === payload._status) {
                payload._status = 1;
                payload._result = moduleObject;
                var _ioInfo = payload._ioInfo;
                null != _ioInfo && (_ioInfo.end = performance.now());
                void 0 === thenable.status && (thenable.status = "fulfilled", thenable.value = moduleObject);
              }
            },
            function(error) {
              if (0 === payload._status || -1 === payload._status) {
                payload._status = 2;
                payload._result = error;
                var _ioInfo2 = payload._ioInfo;
                null != _ioInfo2 && (_ioInfo2.end = performance.now());
                void 0 === thenable.status && (thenable.status = "rejected", thenable.reason = error);
              }
            }
          );
          ioInfo = payload._ioInfo;
          if (null != ioInfo) {
            ioInfo.value = thenable;
            var displayName = thenable.displayName;
            "string" === typeof displayName && (ioInfo.name = displayName);
          }
          -1 === payload._status && (payload._status = 0, payload._result = thenable);
        }
        if (1 === payload._status)
          return ioInfo = payload._result, void 0 === ioInfo && console.error(
            "lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))\n\nDid you accidentally put curly braces around the import?",
            ioInfo
          ), "default" in ioInfo || console.error(
            "lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))",
            ioInfo
          ), ioInfo.default;
        throw payload._result;
      }
      function resolveDispatcher() {
        var dispatcher = ReactSharedInternals.H;
        null === dispatcher && console.error(
          "Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem."
        );
        return dispatcher;
      }
      function releaseAsyncTransition() {
        ReactSharedInternals.asyncTransitions--;
      }
      function enqueueTask(task) {
        if (null === enqueueTaskImpl)
          try {
            var requireString = ("require" + Math.random()).slice(0, 7);
            enqueueTaskImpl = (module2 && module2[requireString]).call(
              module2,
              "timers"
            ).setImmediate;
          } catch (_err) {
            enqueueTaskImpl = function(callback) {
              false === didWarnAboutMessageChannel && (didWarnAboutMessageChannel = true, "undefined" === typeof MessageChannel && console.error(
                "This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."
              ));
              var channel = new MessageChannel();
              channel.port1.onmessage = callback;
              channel.port2.postMessage(void 0);
            };
          }
        return enqueueTaskImpl(task);
      }
      function aggregateErrors(errors) {
        return 1 < errors.length && "function" === typeof AggregateError ? new AggregateError(errors) : errors[0];
      }
      function popActScope(prevActQueue, prevActScopeDepth) {
        prevActScopeDepth !== actScopeDepth - 1 && console.error(
          "You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "
        );
        actScopeDepth = prevActScopeDepth;
      }
      function recursivelyFlushAsyncActWork(returnValue, resolve, reject) {
        var queue = ReactSharedInternals.actQueue;
        if (null !== queue)
          if (0 !== queue.length)
            try {
              flushActQueue(queue);
              enqueueTask(function() {
                return recursivelyFlushAsyncActWork(returnValue, resolve, reject);
              });
              return;
            } catch (error) {
              ReactSharedInternals.thrownErrors.push(error);
            }
          else ReactSharedInternals.actQueue = null;
        0 < ReactSharedInternals.thrownErrors.length ? (queue = aggregateErrors(ReactSharedInternals.thrownErrors), ReactSharedInternals.thrownErrors.length = 0, reject(queue)) : resolve(returnValue);
      }
      function flushActQueue(queue) {
        if (!isFlushing) {
          isFlushing = true;
          var i = 0;
          try {
            for (; i < queue.length; i++) {
              var callback = queue[i];
              do {
                ReactSharedInternals.didUsePromise = false;
                var continuation = callback(false);
                if (null !== continuation) {
                  if (ReactSharedInternals.didUsePromise) {
                    queue[i] = callback;
                    queue.splice(0, i);
                    return;
                  }
                  callback = continuation;
                } else break;
              } while (1);
            }
            queue.length = 0;
          } catch (error) {
            queue.splice(0, i + 1), ReactSharedInternals.thrownErrors.push(error);
          } finally {
            isFlushing = false;
          }
        }
      }
      "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
      var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), MAYBE_ITERATOR_SYMBOL = Symbol.iterator, didWarnStateUpdateForUnmountedComponent = {}, ReactNoopUpdateQueue = {
        isMounted: function() {
          return false;
        },
        enqueueForceUpdate: function(publicInstance) {
          warnNoop(publicInstance, "forceUpdate");
        },
        enqueueReplaceState: function(publicInstance) {
          warnNoop(publicInstance, "replaceState");
        },
        enqueueSetState: function(publicInstance) {
          warnNoop(publicInstance, "setState");
        }
      }, assign = Object.assign, emptyObject = {};
      Object.freeze(emptyObject);
      Component.prototype.isReactComponent = {};
      Component.prototype.setState = function(partialState, callback) {
        if ("object" !== typeof partialState && "function" !== typeof partialState && null != partialState)
          throw Error(
            "takes an object of state variables to update or a function which returns an object of state variables."
          );
        this.updater.enqueueSetState(this, partialState, callback, "setState");
      };
      Component.prototype.forceUpdate = function(callback) {
        this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
      };
      var deprecatedAPIs = {
        isMounted: [
          "isMounted",
          "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."
        ],
        replaceState: [
          "replaceState",
          "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."
        ]
      };
      for (fnName in deprecatedAPIs)
        deprecatedAPIs.hasOwnProperty(fnName) && defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
      ComponentDummy.prototype = Component.prototype;
      deprecatedAPIs = PureComponent.prototype = new ComponentDummy();
      deprecatedAPIs.constructor = PureComponent;
      assign(deprecatedAPIs, Component.prototype);
      deprecatedAPIs.isPureReactComponent = true;
      var isArrayImpl = Array.isArray, REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = {
        H: null,
        A: null,
        T: null,
        S: null,
        actQueue: null,
        asyncTransitions: 0,
        isBatchingLegacy: false,
        didScheduleLegacyUpdate: false,
        didUsePromise: false,
        thrownErrors: [],
        getCurrentStack: null,
        recentlyCreatedOwnerStacks: 0
      }, hasOwnProperty = Object.prototype.hasOwnProperty, createTask = console.createTask ? console.createTask : function() {
        return null;
      };
      deprecatedAPIs = {
        react_stack_bottom_frame: function(callStackForError) {
          return callStackForError();
        }
      };
      var specialPropKeyWarningShown, didWarnAboutOldJSXRuntime;
      var didWarnAboutElementRef = {};
      var unknownOwnerDebugStack = deprecatedAPIs.react_stack_bottom_frame.bind(
        deprecatedAPIs,
        UnknownOwner
      )();
      var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
      var didWarnAboutMaps = false, userProvidedKeyEscapeRegex = /\/+/g, reportGlobalError = "function" === typeof reportError ? reportError : function(error) {
        if ("object" === typeof window && "function" === typeof window.ErrorEvent) {
          var event = new window.ErrorEvent("error", {
            bubbles: true,
            cancelable: true,
            message: "object" === typeof error && null !== error && "string" === typeof error.message ? String(error.message) : String(error),
            error
          });
          if (!window.dispatchEvent(event)) return;
        } else if ("object" === typeof process && "function" === typeof process.emit) {
          process.emit("uncaughtException", error);
          return;
        }
        console.error(error);
      }, didWarnAboutMessageChannel = false, enqueueTaskImpl = null, actScopeDepth = 0, didWarnNoAwaitAct = false, isFlushing = false, queueSeveralMicrotasks = "function" === typeof queueMicrotask ? function(callback) {
        queueMicrotask(function() {
          return queueMicrotask(callback);
        });
      } : enqueueTask;
      deprecatedAPIs = Object.freeze({
        __proto__: null,
        c: function(size) {
          return resolveDispatcher().useMemoCache(size);
        }
      });
      var fnName = {
        map: mapChildren,
        forEach: function(children, forEachFunc, forEachContext) {
          mapChildren(
            children,
            function() {
              forEachFunc.apply(this, arguments);
            },
            forEachContext
          );
        },
        count: function(children) {
          var n = 0;
          mapChildren(children, function() {
            n++;
          });
          return n;
        },
        toArray: function(children) {
          return mapChildren(children, function(child) {
            return child;
          }) || [];
        },
        only: function(children) {
          if (!isValidElement(children))
            throw Error(
              "React.Children.only expected to receive a single React element child."
            );
          return children;
        }
      };
      exports2.Activity = REACT_ACTIVITY_TYPE;
      exports2.Children = fnName;
      exports2.Component = Component;
      exports2.Fragment = REACT_FRAGMENT_TYPE;
      exports2.Profiler = REACT_PROFILER_TYPE;
      exports2.PureComponent = PureComponent;
      exports2.StrictMode = REACT_STRICT_MODE_TYPE;
      exports2.Suspense = REACT_SUSPENSE_TYPE;
      exports2.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ReactSharedInternals;
      exports2.__COMPILER_RUNTIME = deprecatedAPIs;
      exports2.act = function(callback) {
        var prevActQueue = ReactSharedInternals.actQueue, prevActScopeDepth = actScopeDepth;
        actScopeDepth++;
        var queue = ReactSharedInternals.actQueue = null !== prevActQueue ? prevActQueue : [], didAwaitActCall = false;
        try {
          var result = callback();
        } catch (error) {
          ReactSharedInternals.thrownErrors.push(error);
        }
        if (0 < ReactSharedInternals.thrownErrors.length)
          throw popActScope(prevActQueue, prevActScopeDepth), callback = aggregateErrors(ReactSharedInternals.thrownErrors), ReactSharedInternals.thrownErrors.length = 0, callback;
        if (null !== result && "object" === typeof result && "function" === typeof result.then) {
          var thenable = result;
          queueSeveralMicrotasks(function() {
            didAwaitActCall || didWarnNoAwaitAct || (didWarnNoAwaitAct = true, console.error(
              "You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"
            ));
          });
          return {
            then: function(resolve, reject) {
              didAwaitActCall = true;
              thenable.then(
                function(returnValue) {
                  popActScope(prevActQueue, prevActScopeDepth);
                  if (0 === prevActScopeDepth) {
                    try {
                      flushActQueue(queue), enqueueTask(function() {
                        return recursivelyFlushAsyncActWork(
                          returnValue,
                          resolve,
                          reject
                        );
                      });
                    } catch (error$0) {
                      ReactSharedInternals.thrownErrors.push(error$0);
                    }
                    if (0 < ReactSharedInternals.thrownErrors.length) {
                      var _thrownError = aggregateErrors(
                        ReactSharedInternals.thrownErrors
                      );
                      ReactSharedInternals.thrownErrors.length = 0;
                      reject(_thrownError);
                    }
                  } else resolve(returnValue);
                },
                function(error) {
                  popActScope(prevActQueue, prevActScopeDepth);
                  0 < ReactSharedInternals.thrownErrors.length ? (error = aggregateErrors(
                    ReactSharedInternals.thrownErrors
                  ), ReactSharedInternals.thrownErrors.length = 0, reject(error)) : reject(error);
                }
              );
            }
          };
        }
        var returnValue$jscomp$0 = result;
        popActScope(prevActQueue, prevActScopeDepth);
        0 === prevActScopeDepth && (flushActQueue(queue), 0 !== queue.length && queueSeveralMicrotasks(function() {
          didAwaitActCall || didWarnNoAwaitAct || (didWarnNoAwaitAct = true, console.error(
            "A component suspended inside an `act` scope, but the `act` call was not awaited. When testing React components that depend on asynchronous data, you must await the result:\n\nawait act(() => ...)"
          ));
        }), ReactSharedInternals.actQueue = null);
        if (0 < ReactSharedInternals.thrownErrors.length)
          throw callback = aggregateErrors(ReactSharedInternals.thrownErrors), ReactSharedInternals.thrownErrors.length = 0, callback;
        return {
          then: function(resolve, reject) {
            didAwaitActCall = true;
            0 === prevActScopeDepth ? (ReactSharedInternals.actQueue = queue, enqueueTask(function() {
              return recursivelyFlushAsyncActWork(
                returnValue$jscomp$0,
                resolve,
                reject
              );
            })) : resolve(returnValue$jscomp$0);
          }
        };
      };
      exports2.cache = function(fn) {
        return function() {
          return fn.apply(null, arguments);
        };
      };
      exports2.cacheSignal = function() {
        return null;
      };
      exports2.captureOwnerStack = function() {
        var getCurrentStack = ReactSharedInternals.getCurrentStack;
        return null === getCurrentStack ? null : getCurrentStack();
      };
      exports2.cloneElement = function(element, config, children) {
        if (null === element || void 0 === element)
          throw Error(
            "The argument must be a React element, but you passed " + element + "."
          );
        var props = assign({}, element.props), key = element.key, owner = element._owner;
        if (null != config) {
          var JSCompiler_inline_result;
          a: {
            if (hasOwnProperty.call(config, "ref") && (JSCompiler_inline_result = Object.getOwnPropertyDescriptor(
              config,
              "ref"
            ).get) && JSCompiler_inline_result.isReactWarning) {
              JSCompiler_inline_result = false;
              break a;
            }
            JSCompiler_inline_result = void 0 !== config.ref;
          }
          JSCompiler_inline_result && (owner = getOwner());
          hasValidKey(config) && (checkKeyStringCoercion(config.key), key = "" + config.key);
          for (propName in config)
            !hasOwnProperty.call(config, propName) || "key" === propName || "__self" === propName || "__source" === propName || "ref" === propName && void 0 === config.ref || (props[propName] = config[propName]);
        }
        var propName = arguments.length - 2;
        if (1 === propName) props.children = children;
        else if (1 < propName) {
          JSCompiler_inline_result = Array(propName);
          for (var i = 0; i < propName; i++)
            JSCompiler_inline_result[i] = arguments[i + 2];
          props.children = JSCompiler_inline_result;
        }
        props = ReactElement(
          element.type,
          key,
          props,
          owner,
          element._debugStack,
          element._debugTask
        );
        for (key = 2; key < arguments.length; key++)
          validateChildKeys(arguments[key]);
        return props;
      };
      exports2.createContext = function(defaultValue) {
        defaultValue = {
          $$typeof: REACT_CONTEXT_TYPE,
          _currentValue: defaultValue,
          _currentValue2: defaultValue,
          _threadCount: 0,
          Provider: null,
          Consumer: null
        };
        defaultValue.Provider = defaultValue;
        defaultValue.Consumer = {
          $$typeof: REACT_CONSUMER_TYPE,
          _context: defaultValue
        };
        defaultValue._currentRenderer = null;
        defaultValue._currentRenderer2 = null;
        return defaultValue;
      };
      exports2.createElement = function(type, config, children) {
        for (var i = 2; i < arguments.length; i++)
          validateChildKeys(arguments[i]);
        i = {};
        var key = null;
        if (null != config)
          for (propName in didWarnAboutOldJSXRuntime || !("__self" in config) || "key" in config || (didWarnAboutOldJSXRuntime = true, console.warn(
            "Your app (or one of its dependencies) is using an outdated JSX transform. Update to the modern JSX transform for faster performance: https://react.dev/link/new-jsx-transform"
          )), hasValidKey(config) && (checkKeyStringCoercion(config.key), key = "" + config.key), config)
            hasOwnProperty.call(config, propName) && "key" !== propName && "__self" !== propName && "__source" !== propName && (i[propName] = config[propName]);
        var childrenLength = arguments.length - 2;
        if (1 === childrenLength) i.children = children;
        else if (1 < childrenLength) {
          for (var childArray = Array(childrenLength), _i = 0; _i < childrenLength; _i++)
            childArray[_i] = arguments[_i + 2];
          Object.freeze && Object.freeze(childArray);
          i.children = childArray;
        }
        if (type && type.defaultProps)
          for (propName in childrenLength = type.defaultProps, childrenLength)
            void 0 === i[propName] && (i[propName] = childrenLength[propName]);
        key && defineKeyPropWarningGetter(
          i,
          "function" === typeof type ? type.displayName || type.name || "Unknown" : type
        );
        var propName = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        return ReactElement(
          type,
          key,
          i,
          getOwner(),
          propName ? Error("react-stack-top-frame") : unknownOwnerDebugStack,
          propName ? createTask(getTaskName(type)) : unknownOwnerDebugTask
        );
      };
      exports2.createRef = function() {
        var refObject = { current: null };
        Object.seal(refObject);
        return refObject;
      };
      exports2.forwardRef = function(render) {
        null != render && render.$$typeof === REACT_MEMO_TYPE ? console.error(
          "forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...))."
        ) : "function" !== typeof render ? console.error(
          "forwardRef requires a render function but was given %s.",
          null === render ? "null" : typeof render
        ) : 0 !== render.length && 2 !== render.length && console.error(
          "forwardRef render functions accept exactly two parameters: props and ref. %s",
          1 === render.length ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined."
        );
        null != render && null != render.defaultProps && console.error(
          "forwardRef render functions do not support defaultProps. Did you accidentally pass a React component?"
        );
        var elementType = { $$typeof: REACT_FORWARD_REF_TYPE, render }, ownName;
        Object.defineProperty(elementType, "displayName", {
          enumerable: false,
          configurable: true,
          get: function() {
            return ownName;
          },
          set: function(name) {
            ownName = name;
            render.name || render.displayName || (Object.defineProperty(render, "name", { value: name }), render.displayName = name);
          }
        });
        return elementType;
      };
      exports2.isValidElement = isValidElement;
      exports2.lazy = function(ctor) {
        ctor = { _status: -1, _result: ctor };
        var lazyType = {
          $$typeof: REACT_LAZY_TYPE,
          _payload: ctor,
          _init: lazyInitializer
        }, ioInfo = {
          name: "lazy",
          start: -1,
          end: -1,
          value: null,
          owner: null,
          debugStack: Error("react-stack-top-frame"),
          debugTask: console.createTask ? console.createTask("lazy()") : null
        };
        ctor._ioInfo = ioInfo;
        lazyType._debugInfo = [{ awaited: ioInfo }];
        return lazyType;
      };
      exports2.memo = function(type, compare) {
        null == type && console.error(
          "memo: The first argument must be a component. Instead received: %s",
          null === type ? "null" : typeof type
        );
        compare = {
          $$typeof: REACT_MEMO_TYPE,
          type,
          compare: void 0 === compare ? null : compare
        };
        var ownName;
        Object.defineProperty(compare, "displayName", {
          enumerable: false,
          configurable: true,
          get: function() {
            return ownName;
          },
          set: function(name) {
            ownName = name;
            type.name || type.displayName || (Object.defineProperty(type, "name", { value: name }), type.displayName = name);
          }
        });
        return compare;
      };
      exports2.startTransition = function(scope) {
        var prevTransition = ReactSharedInternals.T, currentTransition = {};
        currentTransition._updatedFibers = /* @__PURE__ */ new Set();
        ReactSharedInternals.T = currentTransition;
        try {
          var returnValue = scope(), onStartTransitionFinish = ReactSharedInternals.S;
          null !== onStartTransitionFinish && onStartTransitionFinish(currentTransition, returnValue);
          "object" === typeof returnValue && null !== returnValue && "function" === typeof returnValue.then && (ReactSharedInternals.asyncTransitions++, returnValue.then(releaseAsyncTransition, releaseAsyncTransition), returnValue.then(noop, reportGlobalError));
        } catch (error) {
          reportGlobalError(error);
        } finally {
          null === prevTransition && currentTransition._updatedFibers && (scope = currentTransition._updatedFibers.size, currentTransition._updatedFibers.clear(), 10 < scope && console.warn(
            "Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."
          )), null !== prevTransition && null !== currentTransition.types && (null !== prevTransition.types && prevTransition.types !== currentTransition.types && console.error(
            "We expected inner Transitions to have transferred the outer types set and that you cannot add to the outer Transition while inside the inner.This is a bug in React."
          ), prevTransition.types = currentTransition.types), ReactSharedInternals.T = prevTransition;
        }
      };
      exports2.unstable_useCacheRefresh = function() {
        return resolveDispatcher().useCacheRefresh();
      };
      exports2.use = function(usable) {
        return resolveDispatcher().use(usable);
      };
      exports2.useActionState = function(action, initialState, permalink) {
        return resolveDispatcher().useActionState(
          action,
          initialState,
          permalink
        );
      };
      exports2.useCallback = function(callback, deps) {
        return resolveDispatcher().useCallback(callback, deps);
      };
      exports2.useContext = function(Context) {
        var dispatcher = resolveDispatcher();
        Context.$$typeof === REACT_CONSUMER_TYPE && console.error(
          "Calling useContext(Context.Consumer) is not supported and will cause bugs. Did you mean to call useContext(Context) instead?"
        );
        return dispatcher.useContext(Context);
      };
      exports2.useDebugValue = function(value, formatterFn) {
        return resolveDispatcher().useDebugValue(value, formatterFn);
      };
      exports2.useDeferredValue = function(value, initialValue) {
        return resolveDispatcher().useDeferredValue(value, initialValue);
      };
      exports2.useEffect = function(create, deps) {
        null == create && console.warn(
          "React Hook useEffect requires an effect callback. Did you forget to pass a callback to the hook?"
        );
        return resolveDispatcher().useEffect(create, deps);
      };
      exports2.useEffectEvent = function(callback) {
        return resolveDispatcher().useEffectEvent(callback);
      };
      exports2.useId = function() {
        return resolveDispatcher().useId();
      };
      exports2.useImperativeHandle = function(ref, create, deps) {
        return resolveDispatcher().useImperativeHandle(ref, create, deps);
      };
      exports2.useInsertionEffect = function(create, deps) {
        null == create && console.warn(
          "React Hook useInsertionEffect requires an effect callback. Did you forget to pass a callback to the hook?"
        );
        return resolveDispatcher().useInsertionEffect(create, deps);
      };
      exports2.useLayoutEffect = function(create, deps) {
        null == create && console.warn(
          "React Hook useLayoutEffect requires an effect callback. Did you forget to pass a callback to the hook?"
        );
        return resolveDispatcher().useLayoutEffect(create, deps);
      };
      exports2.useMemo = function(create, deps) {
        return resolveDispatcher().useMemo(create, deps);
      };
      exports2.useOptimistic = function(passthrough, reducer) {
        return resolveDispatcher().useOptimistic(passthrough, reducer);
      };
      exports2.useReducer = function(reducer, initialArg, init) {
        return resolveDispatcher().useReducer(reducer, initialArg, init);
      };
      exports2.useRef = function(initialValue) {
        return resolveDispatcher().useRef(initialValue);
      };
      exports2.useState = function(initialState) {
        return resolveDispatcher().useState(initialState);
      };
      exports2.useSyncExternalStore = function(subscribe, getSnapshot, getServerSnapshot) {
        return resolveDispatcher().useSyncExternalStore(
          subscribe,
          getSnapshot,
          getServerSnapshot
        );
      };
      exports2.useTransition = function() {
        return resolveDispatcher().useTransition();
      };
      exports2.version = "19.2.0";
      "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
    })();
  }
});

// ../../node_modules/.pnpm/react@19.2.0/node_modules/react/index.js
var require_react = __commonJS({
  "../../node_modules/.pnpm/react@19.2.0/node_modules/react/index.js"(exports2, module2) {
    "use strict";
    if (process.env.NODE_ENV === "production") {
      module2.exports = require_react_production();
    } else {
      module2.exports = require_react_development();
    }
  }
});

// ../../node_modules/.pnpm/react@19.2.0/node_modules/react/cjs/react-jsx-runtime.production.js
var require_react_jsx_runtime_production = __commonJS({
  "../../node_modules/.pnpm/react@19.2.0/node_modules/react/cjs/react-jsx-runtime.production.js"(exports2) {
    "use strict";
    var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element");
    var REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
    function jsxProd(type, config, maybeKey) {
      var key = null;
      void 0 !== maybeKey && (key = "" + maybeKey);
      void 0 !== config.key && (key = "" + config.key);
      if ("key" in config) {
        maybeKey = {};
        for (var propName in config)
          "key" !== propName && (maybeKey[propName] = config[propName]);
      } else maybeKey = config;
      config = maybeKey.ref;
      return {
        $$typeof: REACT_ELEMENT_TYPE,
        type,
        key,
        ref: void 0 !== config ? config : null,
        props: maybeKey
      };
    }
    exports2.Fragment = REACT_FRAGMENT_TYPE;
    exports2.jsx = jsxProd;
    exports2.jsxs = jsxProd;
  }
});

// ../../node_modules/.pnpm/react@19.2.0/node_modules/react/cjs/react-jsx-runtime.development.js
var require_react_jsx_runtime_development = __commonJS({
  "../../node_modules/.pnpm/react@19.2.0/node_modules/react/cjs/react-jsx-runtime.development.js"(exports2) {
    "use strict";
    "production" !== process.env.NODE_ENV && (function() {
      function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type)
          return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch (type) {
          case REACT_FRAGMENT_TYPE:
            return "Fragment";
          case REACT_PROFILER_TYPE:
            return "Profiler";
          case REACT_STRICT_MODE_TYPE:
            return "StrictMode";
          case REACT_SUSPENSE_TYPE:
            return "Suspense";
          case REACT_SUSPENSE_LIST_TYPE:
            return "SuspenseList";
          case REACT_ACTIVITY_TYPE:
            return "Activity";
        }
        if ("object" === typeof type)
          switch ("number" === typeof type.tag && console.error(
            "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
          ), type.$$typeof) {
            case REACT_PORTAL_TYPE:
              return "Portal";
            case REACT_CONTEXT_TYPE:
              return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
              return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
              var innerType = type.render;
              type = type.displayName;
              type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
              return type;
            case REACT_MEMO_TYPE:
              return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
              innerType = type._payload;
              type = type._init;
              try {
                return getComponentNameFromType(type(innerType));
              } catch (x) {
              }
          }
        return null;
      }
      function testStringCoercion(value) {
        return "" + value;
      }
      function checkKeyStringCoercion(value) {
        try {
          testStringCoercion(value);
          var JSCompiler_inline_result = false;
        } catch (e) {
          JSCompiler_inline_result = true;
        }
        if (JSCompiler_inline_result) {
          JSCompiler_inline_result = console;
          var JSCompiler_temp_const = JSCompiler_inline_result.error;
          var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
          JSCompiler_temp_const.call(
            JSCompiler_inline_result,
            "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
            JSCompiler_inline_result$jscomp$0
          );
          return testStringCoercion(value);
        }
      }
      function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE)
          return "<...>";
        try {
          var name = getComponentNameFromType(type);
          return name ? "<" + name + ">" : "<...>";
        } catch (x) {
          return "<...>";
        }
      }
      function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
      }
      function UnknownOwner() {
        return Error("react-stack-top-frame");
      }
      function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
          var getter = Object.getOwnPropertyDescriptor(config, "key").get;
          if (getter && getter.isReactWarning) return false;
        }
        return void 0 !== config.key;
      }
      function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
          specialPropKeyWarningShown || (specialPropKeyWarningShown = true, console.error(
            "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
            displayName
          ));
        }
        warnAboutAccessingKey.isReactWarning = true;
        Object.defineProperty(props, "key", {
          get: warnAboutAccessingKey,
          configurable: true
        });
      }
      function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = true, console.error(
          "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
        ));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
      }
      function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
          $$typeof: REACT_ELEMENT_TYPE,
          type,
          key,
          props,
          _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
          enumerable: false,
          get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", { enumerable: false, value: null });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
          configurable: false,
          enumerable: false,
          writable: true,
          value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
          configurable: false,
          enumerable: false,
          writable: true,
          value: null
        });
        Object.defineProperty(type, "_debugStack", {
          configurable: false,
          enumerable: false,
          writable: true,
          value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
          configurable: false,
          enumerable: false,
          writable: true,
          value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
      }
      function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children)
          if (isStaticChildren)
            if (isArrayImpl(children)) {
              for (isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)
                validateChildKeys(children[isStaticChildren]);
              Object.freeze && Object.freeze(children);
            } else
              console.error(
                "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
              );
          else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
          children = getComponentNameFromType(type);
          var keys = Object.keys(config).filter(function(k) {
            return "key" !== k;
          });
          isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
          didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error(
            'A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />',
            isStaticChildren,
            children,
            keys,
            children
          ), didWarnAboutKeySpread[children + isStaticChildren] = true);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
          maybeKey = {};
          for (var propName in config)
            "key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(
          maybeKey,
          "function" === typeof type ? type.displayName || type.name || "Unknown" : type
        );
        return ReactElement(
          type,
          children,
          maybeKey,
          getOwner(),
          debugStack,
          debugTask
        );
      }
      function validateChildKeys(node) {
        isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
      }
      function isValidElement(object) {
        return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
      }
      var React2 = require_react(), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React2.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
      };
      React2 = {
        react_stack_bottom_frame: function(callStackForError) {
          return callStackForError();
        }
      };
      var specialPropKeyWarningShown;
      var didWarnAboutElementRef = {};
      var unknownOwnerDebugStack = React2.react_stack_bottom_frame.bind(
        React2,
        UnknownOwner
      )();
      var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
      var didWarnAboutKeySpread = {};
      exports2.Fragment = REACT_FRAGMENT_TYPE;
      exports2.jsx = function(type, config, maybeKey) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        return jsxDEVImpl(
          type,
          config,
          maybeKey,
          false,
          trackActualOwner ? Error("react-stack-top-frame") : unknownOwnerDebugStack,
          trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask
        );
      };
      exports2.jsxs = function(type, config, maybeKey) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        return jsxDEVImpl(
          type,
          config,
          maybeKey,
          true,
          trackActualOwner ? Error("react-stack-top-frame") : unknownOwnerDebugStack,
          trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask
        );
      };
    })();
  }
});

// ../../node_modules/.pnpm/react@19.2.0/node_modules/react/jsx-runtime.js
var require_jsx_runtime = __commonJS({
  "../../node_modules/.pnpm/react@19.2.0/node_modules/react/jsx-runtime.js"(exports2, module2) {
    "use strict";
    if (process.env.NODE_ENV === "production") {
      module2.exports = require_react_jsx_runtime_production();
    } else {
      module2.exports = require_react_jsx_runtime_development();
    }
  }
});

// src/index.ts
var index_exports = {};
__export(index_exports, {
  AUTOCOMPLETE_VALUES: () => AUTOCOMPLETE_VALUES,
  BORDER_RADIUS: () => BORDER_RADIUS,
  BORDER_RADIUS_CSS_VARS: () => BORDER_RADIUS_CSS_VARS,
  BORDER_RADIUS_SCALE: () => BORDER_RADIUS_SCALE,
  BORDER_RADIUS_UTILITIES: () => BORDER_RADIUS_UTILITIES,
  BULK_ACTIONS: () => BULK_ACTIONS,
  BUTTON_SIZES: () => BUTTON_SIZES,
  BUTTON_STATES: () => BUTTON_STATES,
  CARD_STATES: () => CARD_STATES,
  COLOR_SCHEMES: () => COLOR_SCHEMES,
  COLUMN_TYPES: () => COLUMN_TYPES,
  COMPONENT_DESIGN_TOKENS: () => COMPONENT_DESIGN_TOKENS,
  COMPONENT_SIZES: () => COMPONENT_SIZES,
  COMPONENT_VARIANTS: () => COMPONENT_VARIANTS,
  CONFIG: () => CONFIG,
  CSS_DESIGN_TOKENS: () => CSS_DESIGN_TOKENS,
  DATA_STATES: () => DATA_STATES,
  DESIGN_TOKEN_SCALE: () => DESIGN_TOKEN_SCALE,
  ELEVATION_LEVELS: () => ELEVATION_LEVELS,
  EXPORT_FORMATS: () => EXPORT_FORMATS,
  FIELD_SIZES: () => FIELD_SIZES,
  FILTER_TYPES: () => FILTER_TYPES,
  FORM_SIZES: () => FORM_SIZES,
  FORM_STATES: () => FORM_STATES,
  FORM_TYPES: () => FORM_TYPES,
  GEO_DRAWING_ERRORS: () => GEO_DRAWING_ERRORS,
  GEO_DRAWING_INTERACTION: () => GEO_DRAWING_INTERACTION,
  GEO_DRAWING_MEASUREMENT: () => GEO_DRAWING_MEASUREMENT,
  GEO_DRAWING_OSM: () => GEO_DRAWING_OSM,
  GEO_DRAWING_SNAP: () => GEO_DRAWING_SNAP,
  GEO_DRAWING_STYLES: () => GEO_DRAWING_STYLES,
  GEO_DRAWING_SUCCESS: () => GEO_DRAWING_SUCCESS,
  ICON_SIZES: () => ICON_SIZES,
  INPUT_VARIANTS: () => INPUT_VARIANTS,
  LAYERA_CONSTANTS_VERSION: () => LAYERA_CONSTANTS_VERSION,
  LINK_TARGETS: () => LINK_TARGETS,
  LayeraThemeEngine: () => LayeraThemeEngine,
  LayeraThemeProvider: () => LayeraThemeProvider,
  MENU_POSITIONS: () => MENU_POSITIONS,
  NAVIGATION_TYPES: () => NAVIGATION_TYPES,
  PAGE_LAYOUTS: () => PAGE_LAYOUTS,
  PAGINATION_SIZES: () => PAGINATION_SIZES,
  PERMISSIONS: () => PERMISSIONS,
  RESPONSIVE_DESIGN_TOKENS: () => RESPONSIVE_DESIGN_TOKENS,
  ROLE_HIERARCHY: () => ROLE_HIERARCHY,
  ROLE_PERMISSIONS: () => ROLE_PERMISSIONS,
  ROUTE_PATTERNS: () => ROUTE_PATTERNS,
  SNAP_CONSTANTS: () => SNAP_CONSTANTS,
  SNAP_DEVICE_DEFAULTS: () => SNAP_DEVICE_DEFAULTS,
  SNAP_TYPE_GROUPS: () => SNAP_TYPE_GROUPS,
  SNAP_VISUAL: () => SNAP_VISUAL,
  SORT_DIRECTIONS: () => SORT_DIRECTIONS,
  SPACING_SCALE: () => SPACING_SCALE,
  TABLE_COLUMN_WIDTHS: () => TABLE_COLUMN_WIDTHS,
  TABLE_DENSITIES: () => TABLE_DENSITIES,
  TABLE_VARIANTS: () => TABLE_VARIANTS,
  THEME_MODES: () => THEME_MODES,
  USER_ROLES: () => USER_ROLES,
  USER_STATUS: () => USER_STATUS,
  VALIDATION_RULES: () => VALIDATION_RULES,
  Z_INDEX: () => Z_INDEX,
  getBorderRadiusValue: () => getBorderRadiusValue,
  getBorderRadiusVar: () => getBorderRadiusVar,
  getDesignTokenVar: () => getDesignTokenVar,
  getDesignTokenVars: () => getDesignTokenVars,
  getThemeEngine: () => getThemeEngine,
  useBorderRadius: () => useBorderRadius,
  useColor: () => useColor,
  useComponentTokens: () => useComponentTokens,
  useDesignToken: () => useDesignToken,
  useDesignTokenDebugger: () => useDesignTokenDebugger,
  useDesignTokens: () => useDesignTokens,
  useElevation: () => useElevation,
  useLayeraDesignSystem: () => useLayeraDesignSystem,
  useLayeraTheme: () => useLayeraTheme,
  useMotion: () => useMotion,
  useResponsiveDesignTokens: () => useResponsiveDesignTokens,
  useSpacing: () => useSpacing,
  useTypography: () => useTypography,
  useZIndex: () => useZIndex
});
module.exports = __toCommonJS(index_exports);

// src/sizes.ts
var COMPONENT_SIZES = {
  XS: "xs",
  SM: "sm",
  MD: "md",
  LG: "lg",
  XL: "xl"
};
var FORM_SIZES = {
  SMALL: "sm",
  MEDIUM: "md",
  LARGE: "lg"
};
var BUTTON_SIZES = {
  XS: "xs",
  SM: "sm",
  MD: "md",
  LG: "lg",
  XL: "xl"
};
var ICON_SIZES = {
  XS: "xs",
  SM: "sm",
  MD: "md",
  LG: "lg",
  XL: "xl"
};
var TABLE_COLUMN_WIDTHS = {
  NARROW: 80,
  SMALL: 120,
  STANDARD: 200,
  WIDE: 300,
  EXTRA_WIDE: 400
};

// src/states.ts
var FORM_STATES = {
  DEFAULT: "default",
  FOCUS: "focus",
  ERROR: "error",
  SUCCESS: "success",
  WARNING: "warning",
  DISABLED: "disabled",
  LOADING: "loading"
};
var BUTTON_STATES = {
  DEFAULT: "default",
  HOVER: "hover",
  ACTIVE: "active",
  FOCUS: "focus",
  DISABLED: "disabled",
  LOADING: "loading"
};
var CARD_STATES = {
  DEFAULT: "default",
  HOVER: "hover",
  ACTIVE: "active",
  DISABLED: "disabled",
  LOADING: "loading"
};
var DATA_STATES = {
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
  EMPTY: "empty",
  IDLE: "idle"
};
var USER_STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  PENDING: "pending",
  SUSPENDED: "suspended",
  VERIFIED: "verified",
  UNVERIFIED: "unverified"
};

// src/roles.ts
var USER_ROLES = {
  SUPER_ADMIN: "super_admin",
  ADMIN: "admin",
  MANAGER: "manager",
  EDITOR: "editor",
  MODERATOR: "moderator",
  USER: "user",
  VIEWER: "viewer",
  GUEST: "guest"
};
var ROLE_HIERARCHY = {
  [USER_ROLES.SUPER_ADMIN]: 100,
  [USER_ROLES.ADMIN]: 90,
  [USER_ROLES.MANAGER]: 80,
  [USER_ROLES.EDITOR]: 70,
  [USER_ROLES.MODERATOR]: 60,
  [USER_ROLES.USER]: 50,
  [USER_ROLES.VIEWER]: 30,
  [USER_ROLES.GUEST]: 10
};
var PERMISSIONS = {
  // User management
  USER_CREATE: "user:create",
  USER_READ: "user:read",
  USER_UPDATE: "user:update",
  USER_DELETE: "user:delete",
  USER_MANAGE_ROLES: "user:manage_roles",
  // System administration
  SYSTEM_ADMIN: "system:admin",
  SYSTEM_CONFIG: "system:config",
  SYSTEM_LOGS: "system:logs",
  SYSTEM_BACKUP: "system:backup",
  // Data management
  DATA_READ: "data:read",
  DATA_WRITE: "data:write",
  DATA_DELETE: "data:delete",
  DATA_EXPORT: "data:export",
  DATA_IMPORT: "data:import",
  // Geographic data
  GEO_READ: "geo:read",
  GEO_WRITE: "geo:write",
  GEO_ALERT: "geo:alert",
  GEO_MONITOR: "geo:monitor"
};
var ROLE_PERMISSIONS = {
  [USER_ROLES.SUPER_ADMIN]: Object.values(PERMISSIONS),
  [USER_ROLES.ADMIN]: [
    PERMISSIONS.USER_CREATE,
    PERMISSIONS.USER_READ,
    PERMISSIONS.USER_UPDATE,
    PERMISSIONS.USER_DELETE,
    PERMISSIONS.USER_MANAGE_ROLES,
    PERMISSIONS.SYSTEM_CONFIG,
    PERMISSIONS.SYSTEM_LOGS,
    PERMISSIONS.DATA_READ,
    PERMISSIONS.DATA_WRITE,
    PERMISSIONS.DATA_DELETE,
    PERMISSIONS.DATA_EXPORT,
    PERMISSIONS.GEO_READ,
    PERMISSIONS.GEO_WRITE,
    PERMISSIONS.GEO_ALERT,
    PERMISSIONS.GEO_MONITOR
  ],
  [USER_ROLES.MANAGER]: [
    PERMISSIONS.USER_READ,
    PERMISSIONS.USER_UPDATE,
    PERMISSIONS.DATA_READ,
    PERMISSIONS.DATA_WRITE,
    PERMISSIONS.DATA_EXPORT,
    PERMISSIONS.GEO_READ,
    PERMISSIONS.GEO_WRITE,
    PERMISSIONS.GEO_ALERT
  ],
  [USER_ROLES.EDITOR]: [
    PERMISSIONS.USER_READ,
    PERMISSIONS.DATA_READ,
    PERMISSIONS.DATA_WRITE,
    PERMISSIONS.GEO_READ,
    PERMISSIONS.GEO_WRITE
  ],
  [USER_ROLES.MODERATOR]: [
    PERMISSIONS.USER_READ,
    PERMISSIONS.DATA_READ,
    PERMISSIONS.GEO_READ,
    PERMISSIONS.GEO_MONITOR
  ],
  [USER_ROLES.USER]: [
    PERMISSIONS.DATA_READ,
    PERMISSIONS.GEO_READ
  ],
  [USER_ROLES.VIEWER]: [
    PERMISSIONS.DATA_READ,
    PERMISSIONS.GEO_READ
  ],
  [USER_ROLES.GUEST]: [
    PERMISSIONS.DATA_READ
  ]
};

// src/forms.ts
var FORM_TYPES = {
  TEXT: "text",
  EMAIL: "email",
  PASSWORD: "password",
  TEL: "tel",
  URL: "url",
  NUMBER: "number",
  DATE: "date",
  DATETIME_LOCAL: "datetime-local",
  TIME: "time",
  SEARCH: "search",
  TEXTAREA: "textarea",
  SELECT: "select",
  CHECKBOX: "checkbox",
  RADIO: "radio",
  FILE: "file"
};
var INPUT_VARIANTS = {
  DEFAULT: "default",
  OUTLINE: "outline",
  FILLED: "filled",
  GHOST: "ghost",
  UNDERLINE: "underline"
};
var VALIDATION_RULES = {
  REQUIRED: "required",
  MIN_LENGTH: "minLength",
  MAX_LENGTH: "maxLength",
  PATTERN: "pattern",
  EMAIL: "email",
  URL: "url",
  NUMBER: "number",
  MIN: "min",
  MAX: "max",
  CUSTOM: "custom"
};
var AUTOCOMPLETE_VALUES = {
  OFF: "off",
  ON: "on",
  NAME: "name",
  EMAIL: "email",
  USERNAME: "username",
  NEW_PASSWORD: "new-password",
  CURRENT_PASSWORD: "current-password",
  PHONE: "tel",
  ORGANIZATION: "organization",
  STREET_ADDRESS: "street-address",
  COUNTRY: "country",
  POSTAL_CODE: "postal-code"
};
var FIELD_SIZES = {
  SM: "sm",
  MD: "md",
  LG: "lg",
  FULL: "full"
};

// src/tables.ts
var TABLE_VARIANTS = {
  DEFAULT: "default",
  STRIPED: "striped",
  BORDERED: "bordered",
  BORDERLESS: "borderless",
  COMPACT: "compact",
  SPACIOUS: "spacious"
};
var SORT_DIRECTIONS = {
  ASC: "asc",
  DESC: "desc",
  NONE: "none"
};
var FILTER_TYPES = {
  TEXT: "text",
  SELECT: "select",
  MULTISELECT: "multiselect",
  DATE: "date",
  DATE_RANGE: "dateRange",
  NUMBER: "number",
  NUMBER_RANGE: "numberRange",
  BOOLEAN: "boolean",
  CUSTOM: "custom"
};
var COLUMN_TYPES = {
  TEXT: "text",
  NUMBER: "number",
  DATE: "date",
  BOOLEAN: "boolean",
  BADGE: "badge",
  AVATAR: "avatar",
  ACTIONS: "actions",
  LINK: "link",
  CUSTOM: "custom"
};
var TABLE_DENSITIES = {
  COMPACT: "compact",
  NORMAL: "normal",
  COMFORTABLE: "comfortable"
};
var PAGINATION_SIZES = {
  SMALL: 10,
  MEDIUM: 25,
  LARGE: 50,
  EXTRA_LARGE: 100
};
var BULK_ACTIONS = {
  SELECT_ALL: "selectAll",
  SELECT_NONE: "selectNone",
  SELECT_PAGE: "selectPage",
  EXPORT: "export",
  DELETE: "delete",
  ARCHIVE: "archive",
  ACTIVATE: "activate",
  DEACTIVATE: "deactivate"
};
var EXPORT_FORMATS = {
  CSV: "csv",
  EXCEL: "xlsx",
  PDF: "pdf",
  JSON: "json"
};

// src/themes.ts
var THEME_MODES = {
  LIGHT: "light",
  DARK: "dark",
  AUTO: "auto",
  SYSTEM: "system"
};
var COLOR_SCHEMES = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
  SUCCESS: "success",
  WARNING: "warning",
  ERROR: "error",
  INFO: "info",
  NEUTRAL: "neutral"
};
var COMPONENT_VARIANTS = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
  TERTIARY: "tertiary",
  GHOST: "ghost",
  OUTLINE: "outline",
  LINK: "link",
  DANGER: "danger",
  SUCCESS: "success",
  WARNING: "warning",
  INFO: "info"
};
var ELEVATION_LEVELS = {
  NONE: 0,
  XS: 1,
  SM: 2,
  MD: 3,
  LG: 4,
  XL: 5,
  XXL: 6
};
var BORDER_RADIUS_SCALE = {
  // Base radius units (pixel-perfect system)
  NONE: 0,
  // No radius - Sharp edges
  // Micro radius (για fine details)
  XXS: 2,
  // 2px - Subtle rounding
  XS: 4,
  // 4px - Small components
  // Standard radius (aligned με spacing)
  SM: 8,
  // 8px - Cards, buttons
  MD: 12,
  // 12px - Panels, modals
  LG: 16,
  // 16px - Large cards
  XL: 24,
  // 24px - Hero sections
  XXL: 32,
  // 32px - Large containers
  XXXL: 48,
  // 48px - Extra large elements
  // Special radius values
  PILL: 9999,
  // Full rounding (pills, badges)
  CIRCLE: "50%",
  // Perfect circles
  // Component-specific radius
  BUTTON: 8,
  // Standard button radius
  CARD: 12,
  // Standard card radius
  INPUT: 6,
  // Form input radius
  BADGE: 9999,
  // Badge/tag radius
  MODAL: 16,
  // Modal dialog radius
  TOOLTIP: 4,
  // Tooltip radius
  // Layout radius (για major sections)
  LAYOUT_SM: 20,
  // 20px - Small sections
  LAYOUT_MD: 28,
  // 28px - Medium sections
  LAYOUT_LG: 36,
  // 36px - Large sections
  LAYOUT_XL: 44
  // 44px - Hero sections
};
var BORDER_RADIUS = BORDER_RADIUS_SCALE;
var SPACING_SCALE = {
  NONE: 0,
  XXS: 2,
  XS: 4,
  SM: 8,
  MD: 16,
  LG: 24,
  XL: 32,
  XXL: 48,
  XXXL: 64
};
var Z_INDEX = {
  DROPDOWN: 1e3,
  STICKY: 1020,
  FIXED: 1030,
  MODAL_BACKDROP: 1040,
  MODAL: 1050,
  POPOVER: 1060,
  TOOLTIP: 1070,
  TOAST: 1080,
  // Υψηλά z-index για elements που πρέπει να εμφανίζονται πάνω από χάρτες
  MAP_OVERLAY: 1e4,
  MAP_MODAL: 10050
};
var BORDER_RADIUS_CSS_VARS = {
  // Base radius tokens
  "border-radius-none": `${BORDER_RADIUS_SCALE.NONE}px`,
  "border-radius-xxs": `${BORDER_RADIUS_SCALE.XXS}px`,
  "border-radius-xs": `${BORDER_RADIUS_SCALE.XS}px`,
  "border-radius-sm": `${BORDER_RADIUS_SCALE.SM}px`,
  "border-radius-md": `${BORDER_RADIUS_SCALE.MD}px`,
  "border-radius-lg": `${BORDER_RADIUS_SCALE.LG}px`,
  "border-radius-xl": `${BORDER_RADIUS_SCALE.XL}px`,
  "border-radius-xxl": `${BORDER_RADIUS_SCALE.XXL}px`,
  "border-radius-xxxl": `${BORDER_RADIUS_SCALE.XXXL}px`,
  // Special radius tokens
  "border-radius-pill": `${BORDER_RADIUS_SCALE.PILL}px`,
  "border-radius-circle": BORDER_RADIUS_SCALE.CIRCLE,
  // Component-specific tokens
  "border-radius-button": `${BORDER_RADIUS_SCALE.BUTTON}px`,
  "border-radius-card": `${BORDER_RADIUS_SCALE.CARD}px`,
  "border-radius-input": `${BORDER_RADIUS_SCALE.INPUT}px`,
  "border-radius-badge": `${BORDER_RADIUS_SCALE.BADGE}px`,
  "border-radius-modal": `${BORDER_RADIUS_SCALE.MODAL}px`,
  "border-radius-tooltip": `${BORDER_RADIUS_SCALE.TOOLTIP}px`,
  // Layout radius tokens
  "border-radius-layout-sm": `${BORDER_RADIUS_SCALE.LAYOUT_SM}px`,
  "border-radius-layout-md": `${BORDER_RADIUS_SCALE.LAYOUT_MD}px`,
  "border-radius-layout-lg": `${BORDER_RADIUS_SCALE.LAYOUT_LG}px`,
  "border-radius-layout-xl": `${BORDER_RADIUS_SCALE.LAYOUT_XL}px`
};
var getBorderRadiusVar = (token) => {
  return `var(--border-radius-${token})`;
};
var getBorderRadiusValue = (token) => {
  const value = BORDER_RADIUS_SCALE[token];
  if (typeof value === "number") {
    return value === 0 ? "0" : `${value}px`;
  }
  return value;
};
var BORDER_RADIUS_UTILITIES = {
  // Component-specific patterns
  components: {
    // Button variations
    button: {
      default: getBorderRadiusVar("button"),
      // 8px
      rounded: getBorderRadiusVar("pill"),
      // 9999px
      square: getBorderRadiusVar("none")
      // 0px
    },
    // Card variations
    card: {
      default: getBorderRadiusVar("card"),
      // 12px
      compact: getBorderRadiusVar("sm"),
      // 8px
      elevated: getBorderRadiusVar("lg"),
      // 16px
      hero: getBorderRadiusVar("xl")
      // 24px
    },
    // Input field variations
    input: {
      default: getBorderRadiusVar("input"),
      // 6px
      rounded: getBorderRadiusVar("sm"),
      // 8px
      pill: getBorderRadiusVar("pill")
      // 9999px
    },
    // Modal variations
    modal: {
      default: getBorderRadiusVar("modal"),
      // 16px
      compact: getBorderRadiusVar("md"),
      // 12px
      large: getBorderRadiusVar("xl")
      // 24px
    },
    // Badge/Tag variations
    badge: {
      default: getBorderRadiusVar("badge"),
      // 9999px
      rectangular: getBorderRadiusVar("xs"),
      // 4px
      rounded: getBorderRadiusVar("sm")
      // 8px
    }
  },
  // Layout patterns
  layouts: {
    // Section containers
    section: {
      subtle: getBorderRadiusVar("layout-sm"),
      // 20px
      standard: getBorderRadiusVar("layout-md"),
      // 28px
      prominent: getBorderRadiusVar("layout-lg"),
      // 36px
      hero: getBorderRadiusVar("layout-xl")
      // 44px
    },
    // Panel containers
    panel: {
      compact: getBorderRadiusVar("md"),
      // 12px
      standard: getBorderRadiusVar("lg"),
      // 16px
      spacious: getBorderRadiusVar("xl")
      // 24px
    }
  },
  // Interaction states
  interactions: {
    // Hover states (slightly increased radius)
    hover: {
      fromSm: getBorderRadiusVar("md"),
      // 8px → 12px
      fromMd: getBorderRadiusVar("lg"),
      // 12px → 16px
      fromLg: getBorderRadiusVar("xl")
      // 16px → 24px
    },
    // Focus states (maintained radius με border)
    focus: {
      default: getBorderRadiusVar("sm"),
      // Consistent με most components
      input: getBorderRadiusVar("input"),
      // Specific για form fields
      button: getBorderRadiusVar("button")
      // Specific για buttons
    }
  },
  // Application-specific patterns
  application: {
    // GeoAlert specific
    geoAlert: {
      mapTooltip: getBorderRadiusVar("tooltip"),
      // 4px
      alertCard: getBorderRadiusVar("card"),
      // 12px
      stepCard: getBorderRadiusVar("lg"),
      // 16px
      modalDialog: getBorderRadiusVar("modal")
      // 16px
    },
    // Drawing/Design tools
    design: {
      canvas: getBorderRadiusVar("sm"),
      // 8px
      toolbar: getBorderRadiusVar("xs"),
      // 4px
      preview: getBorderRadiusVar("md")
      // 12px
    }
  }
};

// src/navigation.ts
var NAVIGATION_TYPES = {
  HORIZONTAL: "horizontal",
  VERTICAL: "vertical",
  SIDEBAR: "sidebar",
  BREADCRUMB: "breadcrumb",
  TAB: "tab",
  STEPPER: "stepper"
};
var MENU_POSITIONS = {
  TOP: "top",
  BOTTOM: "bottom",
  LEFT: "left",
  RIGHT: "right",
  CENTER: "center"
};
var LINK_TARGETS = {
  SELF: "_self",
  BLANK: "_blank",
  PARENT: "_parent",
  TOP: "_top"
};
var ROUTE_PATTERNS = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  ACCOUNT: "/account",
  SETTINGS: "/settings",
  DATA: "/data",
  DASHBOARD: "/dashboard",
  ADMIN: "/admin",
  MFA_ENROLL: "/mfa-enroll",
  PROFILE: "/profile",
  USERS: "/users",
  ROLES: "/roles",
  AUDIT: "/audit",
  REPORTS: "/reports",
  GEO_ALERTS: "/geo-alerts",
  MAPS: "/maps"
};
var PAGE_LAYOUTS = {
  FULLSCREEN: "fullscreen",
  CENTERED: "centered",
  SIDEBAR: "sidebar",
  SPLIT: "split",
  MODAL: "modal"
};

// src/snap.ts
var SNAP_CONSTANTS = {
  // Default snap tolerance σε pixels
  DEFAULT_TOLERANCE: 10,
  // Maximum results από spatial queries
  MAX_RESULTS: 50,
  // Snap type priorities (0-100, higher = more priority)
  DEFAULT_PRIORITIES: {
    endpoint: 100,
    midpoint: 80,
    center: 90,
    vertex: 85,
    intersection: 95,
    perpendicular: 70,
    tangent: 65,
    nearest: 60,
    grid: 50,
    edge: 75
  },
  // Spatial index configuration
  SPATIAL_INDEX: {
    MAX_ENTRIES: 16,
    MIN_ENTRIES: 4,
    AUTO_REBALANCE_THRESHOLD: 1e3
  },
  // Performance thresholds
  PERFORMANCE: {
    HIGH_GEOMETRY_COUNT: 1e4,
    MEDIUM_GEOMETRY_COUNT: 5e3,
    LOW_GEOMETRY_COUNT: 1e3,
    MAX_SEARCH_TIME_MS: 16,
    // ~60fps
    INDEX_REBUILD_WARNING_MS: 100
  },
  // Visual feedback
  VISUAL: {
    INDICATOR_SIZE: 16,
    CURSOR_SIZE: 24,
    ANIMATION_DURATION_MS: 200,
    GUIDELINE_OPACITY: 0.6
  }
};
var SNAP_VISUAL = {
  // Colors per snap type (theme-aware)
  COLORS: {
    light: {
      endpoint: "#ff6b6b",
      midpoint: "#4ecdc4",
      center: "#45b7d1",
      vertex: "#96ceb4",
      intersection: "#ffeaa7",
      perpendicular: "#dda0dd",
      tangent: "#98d8c8",
      nearest: "#f7dc6f",
      grid: "#bb8fce",
      edge: "#85c1e9"
    },
    dark: {
      endpoint: "#e74c3c",
      midpoint: "#1abc9c",
      center: "#3498db",
      vertex: "#2ecc71",
      intersection: "#f39c12",
      perpendicular: "#9b59b6",
      tangent: "#16a085",
      nearest: "#f1c40f",
      grid: "#8e44ad",
      edge: "#2980b9"
    }
  },
  // Icons per snap type
  ICONS: {
    endpoint: "square",
    midpoint: "triangle",
    center: "circle",
    vertex: "diamond",
    intersection: "cross",
    perpendicular: "perpendicular",
    tangent: "tangent",
    nearest: "target",
    grid: "grid",
    edge: "line"
  }
};
var SNAP_DEVICE_DEFAULTS = {
  DESKTOP: {
    tolerance: 10,
    showGuidelines: true,
    showTooltips: true,
    animationEnabled: true,
    maxGeometries: 1e4
  },
  TABLET: {
    tolerance: 15,
    showGuidelines: true,
    showTooltips: false,
    animationEnabled: true,
    maxGeometries: 5e3
  },
  MOBILE: {
    tolerance: 25,
    showGuidelines: false,
    showTooltips: false,
    animationEnabled: false,
    maxGeometries: 1e3
  }
};
var SNAP_TYPE_GROUPS = {
  BASIC: ["endpoint", "midpoint", "center", "vertex"],
  ADVANCED: ["intersection", "grid", "edge"],
  PRECISION: ["perpendicular", "tangent", "nearest"],
  CAD_RECOMMENDED: ["endpoint", "midpoint", "center", "vertex", "intersection"],
  GIS_RECOMMENDED: ["endpoint", "vertex", "nearest"],
  MOBILE_RECOMMENDED: ["endpoint", "vertex"]
};

// src/geo-drawing.ts
var GEO_DRAWING_SNAP = {
  /** Default snap tolerance σε pixels */
  DEFAULT_TOLERANCE: 15,
  /** Minimum zoom level για OSM data fetching */
  MIN_SNAP_ZOOM: 16,
  /** Maximum zoom για OSM API calls */
  MAX_SNAP_ZOOM: 20,
  /** Debounce time για map movement events (ms) */
  DEBOUNCE_MS: 500,
  /** Priority order για snap types */
  SNAP_PRIORITY: ["vertex", "center", "midpoint", "edge", "nearest"]
};
var GEO_DRAWING_MEASUREMENT = {
  /** Default decimal places για distance display */
  DISTANCE_DECIMALS: 2,
  /** Default decimal places για area display */
  AREA_DECIMALS: 2,
  /** Default decimal places για coordinates */
  COORDINATE_DECIMALS: 6,
  /** Threshold για switching από meters σε kilometers */
  DISTANCE_KM_THRESHOLD: 1e3,
  /** Threshold για switching από m² σε hectares */
  AREA_HECTARE_THRESHOLD: 1e4,
  /** Threshold για switching από hectares σε km² */
  AREA_KM_THRESHOLD: 1e6
};
var GEO_DRAWING_OSM = {
  /** Overpass API URL */
  OVERPASS_API_URL: "https://overpass-api.de/api/interpreter",
  /** Request timeout σε milliseconds */
  REQUEST_TIMEOUT: 3e4,
  /** Maximum cache entries */
  MAX_CACHE_ENTRIES: 100,
  /** Cache TTL σε milliseconds (5 minutes) */
  CACHE_TTL: 5 * 60 * 1e3,
  /** Coordinate precision για cache keys */
  CACHE_PRECISION: 4
};
var GEO_DRAWING_INTERACTION = {
  /** Double-click timeout σε milliseconds */
  DOUBLE_CLICK_TIMEOUT: 300,
  /** Key codes για shortcuts */
  KEY_CODES: {
    ESCAPE: "Escape",
    ENTER: "Enter",
    DELETE: "Delete",
    BACKSPACE: "Backspace"
  },
  /** Mouse button codes */
  MOUSE_BUTTONS: {
    LEFT: 0,
    MIDDLE: 1,
    RIGHT: 2
  }
};
var GEO_DRAWING_STYLES = {
  /** Default line weights */
  LINE_WEIGHTS: {
    THIN: 1,
    NORMAL: 2,
    THICK: 3,
    MEASUREMENT: 3,
    OSM_BUILDING: 1
  },
  /** Point marker sizes */
  POINT_SIZES: {
    SMALL: 4,
    NORMAL: 6,
    LARGE: 8
  },
  /** Opacity values */
  OPACITY: {
    DRAWING: 0.8,
    FINISHED: 1,
    BUILDING_FILL: 0.1,
    BUILDING_HOVER: 0.3,
    MEASUREMENT_FILL: 0.3
  }
};
var GEO_DRAWING_ERRORS = {
  MINIMUM_POINTS_DISTANCE: "geo-drawing.errors.minimum-points-distance",
  MINIMUM_POINTS_AREA: "geo-drawing.errors.minimum-points-area",
  OSM_FETCH_FAILED: "geo-drawing.errors.osm-fetch-failed",
  SNAP_ENGINE_ERROR: "geo-drawing.errors.snap-engine-error",
  CALCULATION_ERROR: "geo-drawing.errors.calculation-error"
};
var GEO_DRAWING_SUCCESS = {
  MEASUREMENT_COMPLETED: "geo-drawing.success.measurement-completed",
  MEASUREMENT_SAVED: "geo-drawing.success.measurement-saved",
  MEASUREMENT_CLEARED: "geo-drawing.success.measurement-cleared"
};
var CONFIG = {
  geoDrawing: {
    snapTolerance: GEO_DRAWING_SNAP.DEFAULT_TOLERANCE,
    minSnapZoom: GEO_DRAWING_SNAP.MIN_SNAP_ZOOM,
    debounceMs: GEO_DRAWING_SNAP.DEBOUNCE_MS,
    ...GEO_DRAWING_MEASUREMENT,
    ...GEO_DRAWING_INTERACTION
  },
  osm: {
    overpassApiUrl: GEO_DRAWING_OSM.OVERPASS_API_URL,
    requestTimeout: GEO_DRAWING_OSM.REQUEST_TIMEOUT,
    maxCacheEntries: GEO_DRAWING_OSM.MAX_CACHE_ENTRIES,
    cacheTtl: GEO_DRAWING_OSM.CACHE_TTL
  }
};

// src/design-tokens.ts
var DESIGN_TOKEN_SCALE = {
  // Fundamental base unit (4px) - όλα τα άλλα είναι multiple αυτού
  BASE_UNIT: 4,
  // Scale factors based on golden ratio και fibonacci sequence
  SCALE_FACTORS: {
    XXS: 0.5,
    // 2px
    XS: 1,
    // 4px
    SM: 2,
    // 8px
    MD: 4,
    // 16px
    LG: 6,
    // 24px
    XL: 8,
    // 32px
    XXL: 12,
    // 48px
    XXXL: 16,
    // 64px
    XXXXL: 24
    // 96px
  }
};
var CSS_DESIGN_TOKENS = {
  // === SPACING TOKENS ===
  spacing: {
    "spacing-0": "0",
    "spacing-xxs": `${DESIGN_TOKEN_SCALE.BASE_UNIT * DESIGN_TOKEN_SCALE.SCALE_FACTORS.XXS}px`,
    "spacing-xs": `${DESIGN_TOKEN_SCALE.BASE_UNIT * DESIGN_TOKEN_SCALE.SCALE_FACTORS.XS}px`,
    "spacing-sm": `${DESIGN_TOKEN_SCALE.BASE_UNIT * DESIGN_TOKEN_SCALE.SCALE_FACTORS.SM}px`,
    "spacing-md": `${DESIGN_TOKEN_SCALE.BASE_UNIT * DESIGN_TOKEN_SCALE.SCALE_FACTORS.MD}px`,
    "spacing-lg": `${DESIGN_TOKEN_SCALE.BASE_UNIT * DESIGN_TOKEN_SCALE.SCALE_FACTORS.LG}px`,
    "spacing-xl": `${DESIGN_TOKEN_SCALE.BASE_UNIT * DESIGN_TOKEN_SCALE.SCALE_FACTORS.XL}px`,
    "spacing-xxl": `${DESIGN_TOKEN_SCALE.BASE_UNIT * DESIGN_TOKEN_SCALE.SCALE_FACTORS.XXL}px`,
    "spacing-xxxl": `${DESIGN_TOKEN_SCALE.BASE_UNIT * DESIGN_TOKEN_SCALE.SCALE_FACTORS.XXXL}px`
  },
  // === SEMANTIC COLOR TOKENS ===
  colors: {
    // Background colors - theme-aware
    "color-bg-canvas": "light-dark(#ffffff, #0f0f0f)",
    "color-bg-surface": "light-dark(#fafafa, #1a1a1a)",
    "color-bg-surface-raised": "light-dark(#ffffff, #262626)",
    "color-bg-surface-overlay": "light-dark(rgba(255,255,255,0.95), rgba(15,15,15,0.95))",
    // Text colors - WCAG AAA compliant
    "color-text-primary": "light-dark(#0f0f0f, #f0f0f0)",
    "color-text-secondary": "light-dark(#6b7280, #a1a1aa)",
    "color-text-tertiary": "light-dark(#9ca3af, #71717a)",
    "color-text-inverse": "light-dark(#ffffff, #0f0f0f)",
    // Semantic states - accessibility compliant
    "color-semantic-info-bg": "light-dark(#eff6ff, #1e3a8a)",
    "color-semantic-info-border": "light-dark(#3b82f6, #60a5fa)",
    "color-semantic-info-text": "light-dark(#1e40af, #bfdbfe)",
    "color-semantic-success-bg": "light-dark(#f0fdf4, #14532d)",
    "color-semantic-success-border": "light-dark(#22c55e, #4ade80)",
    "color-semantic-success-text": "light-dark(#166534, #bbf7d0)",
    "color-semantic-warning-bg": "light-dark(#fffbeb, #92400e)",
    "color-semantic-warning-border": "light-dark(#f59e0b, #fbbf24)",
    "color-semantic-warning-text": "light-dark(#d97706, #fef3c7)",
    "color-semantic-error-bg": "light-dark(#fef2f2, #7f1d1d)",
    "color-semantic-error-border": "light-dark(#ef4444, #f87171)",
    "color-semantic-error-text": "light-dark(#dc2626, #fecaca)",
    // Interactive states
    "color-interactive-primary": "light-dark(#3b82f6, #60a5fa)",
    "color-interactive-primary-hover": "light-dark(#2563eb, #3b82f6)",
    "color-interactive-primary-active": "light-dark(#1d4ed8, #2563eb)",
    // Border colors
    "color-border-default": "light-dark(#e5e7eb, #374151)",
    "color-border-subtle": "light-dark(#f3f4f6, #1f2937)",
    "color-border-strong": "light-dark(#d1d5db, #4b5563)"
  },
  // === ELEVATION TOKENS ===
  elevation: {
    "elevation-none": "none",
    "elevation-xs": "light-dark(0 1px 2px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.3))",
    "elevation-sm": "light-dark(0 1px 3px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.4))",
    "elevation-md": "light-dark(0 4px 6px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.4))",
    "elevation-lg": "light-dark(0 10px 15px rgba(0,0,0,0.1), 0 10px 15px rgba(0,0,0,0.4))",
    "elevation-xl": "light-dark(0 20px 25px rgba(0,0,0,0.1), 0 20px 25px rgba(0,0,0,0.4))",
    "elevation-xxl": "light-dark(0 25px 50px rgba(0,0,0,0.25), 0 25px 50px rgba(0,0,0,0.6))"
  },
  // === MOTION TOKENS ===
  motion: {
    // Durations - respect reduced-motion
    "motion-duration-instant": "0ms",
    "motion-duration-fast": "150ms",
    "motion-duration-normal": "250ms",
    "motion-duration-slow": "400ms",
    "motion-duration-slower": "600ms",
    // Easing curves - mathematically optimized
    "motion-ease-linear": "linear",
    "motion-ease-ease": "ease",
    "motion-ease-ease-in": "ease-in",
    "motion-ease-ease-out": "ease-out",
    "motion-ease-ease-in-out": "ease-in-out",
    "motion-ease-smooth": "cubic-bezier(0.4, 0.0, 0.2, 1)",
    "motion-ease-sharp": "cubic-bezier(0.4, 0.0, 0.6, 1)",
    "motion-ease-bounce": "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
    // Complete transitions
    "motion-transition-fast": "var(--motion-duration-fast) var(--motion-ease-smooth)",
    "motion-transition-normal": "var(--motion-duration-normal) var(--motion-ease-smooth)",
    "motion-transition-slow": "var(--motion-duration-slow) var(--motion-ease-smooth)"
  },
  // === TYPOGRAPHY TOKENS ===
  typography: {
    // Font families - system font stack
    "font-family-sans": 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    "font-family-mono": '"Fira Code", "JetBrains Mono", Consolas, "Courier New", monospace',
    // Font sizes - modular scale
    "font-size-xs": "0.75rem",
    // 12px
    "font-size-sm": "0.875rem",
    // 14px
    "font-size-md": "1rem",
    // 16px
    "font-size-lg": "1.125rem",
    // 18px
    "font-size-xl": "1.25rem",
    // 20px
    "font-size-xxl": "1.5rem",
    // 24px
    "font-size-xxxl": "2rem",
    // 32px
    // Line heights - optimal readability
    "line-height-tight": "1.25",
    "line-height-normal": "1.5",
    "line-height-relaxed": "1.75",
    // Font weights
    "font-weight-regular": "400",
    "font-weight-medium": "500",
    "font-weight-semibold": "600",
    "font-weight-bold": "700"
  },
  // === BORDER RADIUS TOKENS ===
  borderRadius: {
    "border-radius-none": "0",
    "border-radius-xs": "2px",
    "border-radius-sm": "4px",
    "border-radius-md": "6px",
    "border-radius-lg": "8px",
    "border-radius-xl": "12px",
    "border-radius-xxl": "16px",
    "border-radius-full": "9999px"
  },
  // === Z-INDEX TOKENS ===
  zIndex: {
    "z-index-base": "0",
    "z-index-elevated": "100",
    "z-index-sticky": "200",
    "z-index-overlay": "300",
    "z-index-modal": "400",
    "z-index-popover": "500",
    "z-index-tooltip": "600",
    "z-index-toast": "700",
    "z-index-map-overlay": "10000",
    "z-index-map-modal": "10100"
  },
  // === CSS POSITIONING TOKENS ===
  positioning: {
    // Box sizing models
    "box-sizing-content": "content-box",
    "box-sizing-border": "border-box",
    // Position values
    "position-static": "static",
    "position-relative": "relative",
    "position-absolute": "absolute",
    "position-fixed": "fixed",
    "position-sticky": "sticky",
    // Overflow values
    "overflow-visible": "visible",
    "overflow-hidden": "hidden",
    "overflow-clip": "clip",
    "overflow-scroll": "scroll",
    "overflow-auto": "auto"
  }
};
var COMPONENT_DESIGN_TOKENS = {
  button: {
    "button-height-sm": "var(--spacing-xl)",
    // 32px
    "button-height-md": "var(--spacing-xxl)",
    // 48px
    "button-height-lg": "var(--spacing-xxxl)",
    // 64px
    "button-padding-x-sm": "var(--spacing-md)",
    // 16px
    "button-padding-x-md": "var(--spacing-lg)",
    // 24px
    "button-padding-x-lg": "var(--spacing-xl)",
    // 32px
    "button-border-radius": "var(--border-radius-md)",
    "button-transition": "all var(--motion-transition-fast)"
  },
  card: {
    "card-padding": "var(--spacing-lg)",
    "card-border-radius": "var(--border-radius-lg)",
    "card-background": "var(--color-bg-surface-raised)",
    "card-border": "1px solid var(--color-border-subtle)",
    "card-elevation": "var(--elevation-sm)",
    "card-elevation-hover": "var(--elevation-md)",
    "card-transition": "all var(--motion-transition-normal)"
  },
  modal: {
    "modal-backdrop": "rgba(0, 0, 0, 0.6)",
    "modal-elevation": "var(--elevation-xxl)",
    "modal-border-radius": "var(--border-radius-xl)",
    "modal-padding": "var(--spacing-xxl)",
    "modal-animation-enter": "var(--motion-transition-slow)",
    "modal-animation-exit": "var(--motion-transition-normal)"
  }
};
var RESPONSIVE_DESIGN_TOKENS = {
  mobile: {
    "spacing-scale-factor": "0.75",
    // 25% μικρότερα spacing σε mobile
    "font-scale-factor": "0.875",
    // Μικρότερα fonts σε mobile
    "border-radius-scale-factor": "0.75"
    // Μικρότερα border radius
  },
  tablet: {
    "spacing-scale-factor": "0.875",
    "font-scale-factor": "0.9375",
    "border-radius-scale-factor": "0.875"
  },
  desktop: {
    "spacing-scale-factor": "1",
    "font-scale-factor": "1",
    "border-radius-scale-factor": "1"
  },
  desktopLarge: {
    "spacing-scale-factor": "1.125",
    // 12.5% μεγαλύτερα για large screens
    "font-scale-factor": "1.0625",
    "border-radius-scale-factor": "1.125"
  }
};

// src/theme-engine.ts
var LayeraThemeEngine = class {
  constructor(config = {}) {
    __publicField(this, "config");
    __publicField(this, "state");
    __publicField(this, "mediaQueries", []);
    __publicField(this, "rafId", null);
    __publicField(this, "updateQueue", []);
    __publicField(this, "observers", /* @__PURE__ */ new Set());
    this.config = {
      rootSelector: ":root",
      enableSystemDetection: true,
      enableReducedMotion: true,
      enableHighContrast: true,
      enablePerformanceMonitoring: false,
      storageKey: "layera-theme-state",
      ...config
    };
    this.state = {
      activeTheme: "system",
      resolvedTheme: "light",
      systemPreference: "light",
      prefersReducedMotion: false,
      prefersHighContrast: false,
      isLoading: true,
      lastUpdated: Date.now()
    };
    this.initialize();
  }
  /**
   * Initialize theme engine
   */
  initialize() {
    if (typeof window === "undefined") {
      this.state.isLoading = false;
      return;
    }
    this.detectSystemPreferences();
    this.setupMediaQueryListeners();
    this.loadPersistedState();
    this.injectCSSTokens();
    this.state.isLoading = false;
    this.notifyObservers();
  }
  /**
   * Detect system preferences
   */
  detectSystemPreferences() {
    if (!this.config.enableSystemDetection) return;
    const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");
    this.state.systemPreference = darkModeQuery.matches ? "dark" : "light";
    if (this.config.enableReducedMotion) {
      const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      this.state.prefersReducedMotion = reducedMotionQuery.matches;
    }
    if (this.config.enableHighContrast) {
      const highContrastQuery = window.matchMedia("(prefers-contrast: high)");
      this.state.prefersHighContrast = highContrastQuery.matches;
    }
  }
  /**
   * Setup media query listeners για dynamic updates
   */
  setupMediaQueryListeners() {
    if (typeof window === "undefined") return;
    const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleDarkModeChange = (e) => {
      this.state.systemPreference = e.matches ? "dark" : "light";
      if (this.state.activeTheme === "system") {
        this.updateResolvedTheme();
        this.scheduleUpdate(() => this.injectCSSTokens());
      }
    };
    darkModeQuery.addEventListener("change", handleDarkModeChange);
    this.mediaQueries.push(darkModeQuery);
    if (this.config.enableReducedMotion) {
      const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      const handleReducedMotionChange = (e) => {
        this.state.prefersReducedMotion = e.matches;
        this.scheduleUpdate(() => this.injectMotionTokens());
      };
      reducedMotionQuery.addEventListener("change", handleReducedMotionChange);
      this.mediaQueries.push(reducedMotionQuery);
    }
    if (this.config.enableHighContrast) {
      const highContrastQuery = window.matchMedia("(prefers-contrast: high)");
      const handleHighContrastChange = (e) => {
        this.state.prefersHighContrast = e.matches;
        this.scheduleUpdate(() => this.injectColorTokens());
      };
      highContrastQuery.addEventListener("change", handleHighContrastChange);
      this.mediaQueries.push(highContrastQuery);
    }
  }
  /**
   * Load persisted theme state από localStorage
   */
  loadPersistedState() {
    if (typeof window === "undefined") return;
    try {
      const stored = localStorage.getItem(this.config.storageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        this.state.activeTheme = parsed.activeTheme || "system";
      }
    } catch (error) {
      console.warn("LayeraThemeEngine: Failed to load persisted state", error);
    }
    this.updateResolvedTheme();
  }
  /**
   * Persist theme state στο localStorage
   */
  persistState() {
    if (typeof window === "undefined") return;
    try {
      const toStore = {
        activeTheme: this.state.activeTheme,
        lastUpdated: this.state.lastUpdated
      };
      localStorage.setItem(this.config.storageKey, JSON.stringify(toStore));
    } catch (error) {
      console.warn("LayeraThemeEngine: Failed to persist state", error);
    }
  }
  /**
   * Update resolved theme based on active theme and system preference
   */
  updateResolvedTheme() {
    this.state.resolvedTheme = this.state.activeTheme === "system" ? this.state.systemPreference : this.state.activeTheme;
  }
  /**
   * Schedule update using RequestAnimationFrame για performance
   */
  scheduleUpdate(updateFn) {
    this.updateQueue.push(updateFn);
    if (this.rafId === null) {
      this.rafId = requestAnimationFrame(() => {
        this.flushUpdates();
      });
    }
  }
  /**
   * Flush all queued updates
   */
  flushUpdates() {
    const updates = [...this.updateQueue];
    this.updateQueue.length = 0;
    this.rafId = null;
    updates.forEach((update) => update());
    this.state.lastUpdated = Date.now();
    this.notifyObservers();
  }
  /**
   * Inject όλα τα CSS design tokens στο DOM
   */
  injectCSSTokens() {
    this.injectSpacingTokens();
    this.injectColorTokens();
    this.injectElevationTokens();
    this.injectMotionTokens();
    this.injectTypographyTokens();
    this.injectBorderRadiusTokens();
    this.injectZIndexTokens();
    this.injectComponentTokens();
    this.injectResponsiveTokens();
  }
  /**
   * Inject spacing tokens
   */
  injectSpacingTokens() {
    const root = document.querySelector(this.config.rootSelector);
    if (!root) return;
    Object.entries(CSS_DESIGN_TOKENS.spacing).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });
  }
  /**
   * Inject color tokens με theme awareness
   */
  injectColorTokens() {
    const root = document.querySelector(this.config.rootSelector);
    if (!root) return;
    root.style.setProperty("color-scheme", this.state.resolvedTheme);
    Object.entries(CSS_DESIGN_TOKENS.colors).forEach(([key, value]) => {
      const adjustedValue = this.state.prefersHighContrast ? this.adjustForHighContrast(key, value) : value;
      root.style.setProperty(`--${key}`, adjustedValue);
    });
  }
  /**
   * Adjust colors για high contrast mode
   */
  adjustForHighContrast(tokenName, value) {
    if (!this.state.prefersHighContrast) return value;
    if (tokenName.includes("border")) {
      const adjusted = value.replace(/rgba\(([^,]+),([^,]+),([^,]+),[\d.]+\)/, "rgba($1,$2,$3,1)");
      return adjusted;
    }
    return value;
  }
  /**
   * Inject elevation tokens
   */
  injectElevationTokens() {
    const root = document.querySelector(this.config.rootSelector);
    if (!root) return;
    Object.entries(CSS_DESIGN_TOKENS.elevation).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });
  }
  /**
   * Inject motion tokens με reduced motion respect
   */
  injectMotionTokens() {
    const root = document.querySelector(this.config.rootSelector);
    if (!root) return;
    Object.entries(CSS_DESIGN_TOKENS.motion).forEach(([key, value]) => {
      if (this.state.prefersReducedMotion && key.includes("duration")) {
        value = "0ms";
      }
      root.style.setProperty(`--${key}`, value);
    });
  }
  /**
   * Inject typography tokens
   */
  injectTypographyTokens() {
    const root = document.querySelector(this.config.rootSelector);
    if (!root) return;
    Object.entries(CSS_DESIGN_TOKENS.typography).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });
  }
  /**
   * Inject border radius tokens
   */
  injectBorderRadiusTokens() {
    const root = document.querySelector(this.config.rootSelector);
    if (!root) return;
    Object.entries(CSS_DESIGN_TOKENS.borderRadius).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });
  }
  /**
   * Inject z-index tokens
   */
  injectZIndexTokens() {
    const root = document.querySelector(this.config.rootSelector);
    if (!root) return;
    Object.entries(CSS_DESIGN_TOKENS.zIndex).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });
  }
  /**
   * Inject component-specific tokens
   */
  injectComponentTokens() {
    const root = document.querySelector(this.config.rootSelector);
    if (!root) return;
    Object.values(COMPONENT_DESIGN_TOKENS).forEach((componentTokens) => {
      Object.entries(componentTokens).forEach(([key, value]) => {
        root.style.setProperty(`--${key}`, value);
      });
    });
  }
  /**
   * Inject responsive tokens based on current breakpoint
   */
  injectResponsiveTokens() {
  }
  /**
   * Public API - Set theme
   */
  setTheme(theme) {
    this.state.activeTheme = theme;
    this.updateResolvedTheme();
    this.scheduleUpdate(() => {
      this.injectCSSTokens();
      this.persistState();
    });
  }
  /**
   * Public API - Get current state
   */
  getState() {
    return { ...this.state };
  }
  /**
   * Public API - Subscribe to state changes
   */
  subscribe(observer) {
    this.observers.add(observer);
    return () => this.observers.delete(observer);
  }
  /**
   * Notify observers of state changes
   */
  notifyObservers() {
    this.observers.forEach((observer) => {
      try {
        observer(this.getState());
      } catch (error) {
        console.error("LayeraThemeEngine: Observer error", error);
      }
    });
  }
  /**
   * Cleanup - remove event listeners and clear RAF
   */
  destroy() {
    this.mediaQueries.forEach((mq) => {
      mq.removeEventListener("change", () => {
      });
    });
    this.mediaQueries.length = 0;
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    this.updateQueue.length = 0;
    this.observers.clear();
  }
};
var globalThemeEngine = null;
var getThemeEngine = (config) => {
  if (!globalThemeEngine) {
    globalThemeEngine = new LayeraThemeEngine(config);
  }
  return globalThemeEngine;
};
var getDesignTokenVar = (tokenName) => {
  return `var(--${tokenName})`;
};
var getDesignTokenVars = (tokenNames) => {
  return tokenNames.reduce((acc, tokenName) => {
    acc[tokenName] = `var(--${tokenName})`;
    return acc;
  }, {});
};

// src/react-hooks.tsx
var import_react = __toESM(require_react());
var import_jsx_runtime = __toESM(require_jsx_runtime());
var ThemeContext = (0, import_react.createContext)({
  engine: null,
  state: null,
  setTheme: () => {
  },
  isReady: false
});
var LayeraThemeProvider = ({
  children,
  config
}) => {
  const [engine] = (0, import_react.useState)(() => new LayeraThemeEngine(config));
  const [state, setState] = (0, import_react.useState)(null);
  const [isReady, setIsReady] = (0, import_react.useState)(false);
  (0, import_react.useEffect)(() => {
    const unsubscribe = engine.subscribe((newState) => {
      setState(newState);
      if (!isReady && !newState.isLoading) {
        setIsReady(true);
      }
    });
    setState(engine.getState());
    if (!engine.getState().isLoading) {
      setIsReady(true);
    }
    return () => {
      unsubscribe();
      engine.destroy();
    };
  }, [engine, isReady]);
  const setTheme = (0, import_react.useCallback)((theme) => {
    engine.setTheme(theme);
  }, [engine]);
  const contextValue = (0, import_react.useMemo)(() => ({
    engine,
    state,
    setTheme,
    isReady
  }), [engine, state, setTheme, isReady]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeContext.Provider, { value: contextValue, children });
};
var useLayeraTheme = () => {
  const context = (0, import_react.useContext)(ThemeContext);
  if (context.engine === null) {
    throw new Error("useLayeraTheme must be used within LayeraThemeProvider");
  }
  return context;
};
var useDesignToken = (tokenName) => {
  const { isReady } = useLayeraTheme();
  return (0, import_react.useMemo)(() => {
    if (typeof window === "undefined" || !isReady) {
      return getSSRFallback(tokenName);
    }
    return `var(--${tokenName})`;
  }, [tokenName, isReady]);
};
var useDesignTokens = (tokenNames) => {
  const { isReady } = useLayeraTheme();
  return (0, import_react.useMemo)(() => {
    const result = {};
    for (const tokenName of tokenNames) {
      if (typeof window === "undefined" || !isReady) {
        result[tokenName] = getSSRFallback(tokenName);
      } else {
        result[tokenName] = `var(--${tokenName})`;
      }
    }
    return result;
  }, [tokenNames, isReady]);
};
var useSpacing = (token) => {
  return useDesignToken(token);
};
var useColor = (token) => {
  return useDesignToken(token);
};
var useElevation = (token) => {
  return useDesignToken(token);
};
var useMotion = (token) => {
  return useDesignToken(token);
};
var useTypography = (token) => {
  return useDesignToken(token);
};
var useBorderRadius = (token) => {
  return useDesignToken(token);
};
var useZIndex = (token) => {
  return useDesignToken(token);
};
var useComponentTokens = (componentName) => {
  const { isReady } = useLayeraTheme();
  return (0, import_react.useMemo)(() => {
    const componentTokens = COMPONENT_DESIGN_TOKENS[componentName];
    const result = {};
    Object.entries(componentTokens).forEach(([key]) => {
      if (typeof window === "undefined" || !isReady) {
        result[key] = getSSRFallback(key);
      } else {
        result[key] = `var(--${key})`;
      }
    });
    return result;
  }, [componentName, isReady]);
};
var useLayeraDesignSystem = () => {
  const { state, isReady } = useLayeraTheme();
  return (0, import_react.useMemo)(() => ({
    // Spacing system
    spacing: {
      xxs: useDesignToken("spacing-xxs"),
      xs: useDesignToken("spacing-xs"),
      sm: useDesignToken("spacing-sm"),
      md: useDesignToken("spacing-md"),
      lg: useDesignToken("spacing-lg"),
      xl: useDesignToken("spacing-xl"),
      xxl: useDesignToken("spacing-xxl"),
      xxxl: useDesignToken("spacing-xxxl")
    },
    // Color system
    colors: {
      bg: {
        canvas: useDesignToken("color-bg-canvas"),
        surface: useDesignToken("color-bg-surface"),
        surfaceRaised: useDesignToken("color-bg-surface-raised"),
        surfaceOverlay: useDesignToken("color-bg-surface-overlay")
      },
      text: {
        primary: useDesignToken("color-text-primary"),
        secondary: useDesignToken("color-text-secondary"),
        tertiary: useDesignToken("color-text-tertiary"),
        inverse: useDesignToken("color-text-inverse")
      },
      semantic: {
        info: {
          bg: useDesignToken("color-semantic-info-bg"),
          border: useDesignToken("color-semantic-info-border"),
          text: useDesignToken("color-semantic-info-text")
        },
        success: {
          bg: useDesignToken("color-semantic-success-bg"),
          border: useDesignToken("color-semantic-success-border"),
          text: useDesignToken("color-semantic-success-text")
        },
        warning: {
          bg: useDesignToken("color-semantic-warning-bg"),
          border: useDesignToken("color-semantic-warning-border"),
          text: useDesignToken("color-semantic-warning-text")
        },
        error: {
          bg: useDesignToken("color-semantic-error-bg"),
          border: useDesignToken("color-semantic-error-border"),
          text: useDesignToken("color-semantic-error-text")
        }
      },
      interactive: {
        primary: useDesignToken("color-interactive-primary"),
        primaryHover: useDesignToken("color-interactive-primary-hover"),
        primaryActive: useDesignToken("color-interactive-primary-active")
      },
      border: {
        default: useDesignToken("color-border-default"),
        subtle: useDesignToken("color-border-subtle"),
        strong: useDesignToken("color-border-strong")
      }
    },
    // Elevation system
    elevation: {
      none: useDesignToken("elevation-none"),
      xs: useDesignToken("elevation-xs"),
      sm: useDesignToken("elevation-sm"),
      md: useDesignToken("elevation-md"),
      lg: useDesignToken("elevation-lg"),
      xl: useDesignToken("elevation-xl"),
      xxl: useDesignToken("elevation-xxl")
    },
    // Motion system
    motion: {
      duration: {
        instant: useDesignToken("motion-duration-instant"),
        fast: useDesignToken("motion-duration-fast"),
        normal: useDesignToken("motion-duration-normal"),
        slow: useDesignToken("motion-duration-slow"),
        slower: useDesignToken("motion-duration-slower")
      },
      ease: {
        linear: useDesignToken("motion-ease-linear"),
        ease: useDesignToken("motion-ease-ease"),
        easeIn: useDesignToken("motion-ease-ease-in"),
        easeOut: useDesignToken("motion-ease-ease-out"),
        easeInOut: useDesignToken("motion-ease-ease-in-out"),
        smooth: useDesignToken("motion-ease-smooth"),
        sharp: useDesignToken("motion-ease-sharp"),
        bounce: useDesignToken("motion-ease-bounce")
      },
      transition: {
        fast: useDesignToken("motion-transition-fast"),
        normal: useDesignToken("motion-transition-normal"),
        slow: useDesignToken("motion-transition-slow")
      }
    },
    // Typography system
    typography: {
      fontFamily: {
        sans: useDesignToken("font-family-sans"),
        mono: useDesignToken("font-family-mono")
      },
      fontSize: {
        xs: useDesignToken("font-size-xs"),
        sm: useDesignToken("font-size-sm"),
        md: useDesignToken("font-size-md"),
        lg: useDesignToken("font-size-lg"),
        xl: useDesignToken("font-size-xl"),
        xxl: useDesignToken("font-size-xxl"),
        xxxl: useDesignToken("font-size-xxxl")
      },
      lineHeight: {
        tight: useDesignToken("line-height-tight"),
        normal: useDesignToken("line-height-normal"),
        relaxed: useDesignToken("line-height-relaxed")
      },
      fontWeight: {
        regular: useDesignToken("font-weight-regular"),
        medium: useDesignToken("font-weight-medium"),
        semibold: useDesignToken("font-weight-semibold"),
        bold: useDesignToken("font-weight-bold")
      }
    },
    // Border radius system
    borderRadius: {
      none: useDesignToken("border-radius-none"),
      xs: useDesignToken("border-radius-xs"),
      sm: useDesignToken("border-radius-sm"),
      md: useDesignToken("border-radius-md"),
      lg: useDesignToken("border-radius-lg"),
      xl: useDesignToken("border-radius-xl"),
      xxl: useDesignToken("border-radius-xxl"),
      full: useDesignToken("border-radius-full")
    },
    // Z-index system
    zIndex: {
      base: useDesignToken("z-index-base"),
      elevated: useDesignToken("z-index-elevated"),
      sticky: useDesignToken("z-index-sticky"),
      overlay: useDesignToken("z-index-overlay"),
      modal: useDesignToken("z-index-modal"),
      popover: useDesignToken("z-index-popover"),
      tooltip: useDesignToken("z-index-tooltip"),
      toast: useDesignToken("z-index-toast"),
      mapOverlay: useDesignToken("z-index-map-overlay"),
      mapModal: useDesignToken("z-index-map-modal")
    },
    // Current theme state
    theme: {
      current: state?.resolvedTheme || "light",
      isLoading: !isReady,
      systemPreference: state?.systemPreference || "light",
      prefersReducedMotion: state?.prefersReducedMotion || false,
      prefersHighContrast: state?.prefersHighContrast || false
    }
  }), [state, isReady]);
};
var useResponsiveDesignTokens = () => {
  return (0, import_react.useMemo)(() => ({
    // Responsive spacing scaling
    getSpacing: (token, _scale = "desktop") => {
      return useDesignToken(token);
    }
  }), []);
};
function getSSRFallback(tokenName) {
  const ssrFallbacks = {
    // Spacing fallbacks
    "spacing-0": "0",
    "spacing-xxs": "2px",
    "spacing-xs": "4px",
    "spacing-sm": "8px",
    "spacing-md": "16px",
    "spacing-lg": "24px",
    "spacing-xl": "32px",
    "spacing-xxl": "48px",
    "spacing-xxxl": "64px",
    // Color fallbacks (light theme defaults)
    "color-bg-canvas": "#ffffff",
    "color-bg-surface": "#fafafa",
    "color-text-primary": "#0f0f0f",
    "color-text-secondary": "#6b7280",
    // Motion fallbacks
    "motion-duration-fast": "150ms",
    "motion-duration-normal": "250ms",
    "motion-ease-smooth": "cubic-bezier(0.4, 0.0, 0.2, 1)",
    // Typography fallbacks
    "font-family-sans": 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
    "font-size-md": "1rem",
    // Border radius fallbacks
    "border-radius-md": "6px",
    "border-radius-lg": "8px",
    // Elevation fallbacks
    "elevation-sm": "0 1px 3px rgba(0,0,0,0.1)",
    // Z-index fallbacks
    "z-index-modal": "400",
    "z-index-overlay": "300"
  };
  return ssrFallbacks[tokenName] || "0";
}
var useDesignTokenDebugger = () => {
  const { state, engine } = useLayeraTheme();
  if (process.env.NODE_ENV !== "development") {
    return null;
  }
  return (0, import_react.useMemo)(() => ({
    // Debug theme state
    themeState: state,
    // Debug available tokens
    availableTokens: {
      spacing: Object.keys(CSS_DESIGN_TOKENS.spacing),
      colors: Object.keys(CSS_DESIGN_TOKENS.colors),
      elevation: Object.keys(CSS_DESIGN_TOKENS.elevation),
      motion: Object.keys(CSS_DESIGN_TOKENS.motion),
      typography: Object.keys(CSS_DESIGN_TOKENS.typography),
      borderRadius: Object.keys(CSS_DESIGN_TOKENS.borderRadius),
      zIndex: Object.keys(CSS_DESIGN_TOKENS.zIndex),
      components: Object.keys(COMPONENT_DESIGN_TOKENS)
    },
    // Debug functions
    logAllTokens: () => {
      console.group("\u{1F3A8} Layera Design Tokens Debug");
      console.log("Theme State:", state);
      console.log("Available Tokens:", CSS_DESIGN_TOKENS);
      console.log("Component Tokens:", COMPONENT_DESIGN_TOKENS);
      console.groupEnd();
    },
    // Performance monitoring
    getPerformanceMetrics: () => engine?.getState()
  }), [state, engine]);
};

// src/index.ts
var LAYERA_CONSTANTS_VERSION = "1.0.0";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AUTOCOMPLETE_VALUES,
  BORDER_RADIUS,
  BORDER_RADIUS_CSS_VARS,
  BORDER_RADIUS_SCALE,
  BORDER_RADIUS_UTILITIES,
  BULK_ACTIONS,
  BUTTON_SIZES,
  BUTTON_STATES,
  CARD_STATES,
  COLOR_SCHEMES,
  COLUMN_TYPES,
  COMPONENT_DESIGN_TOKENS,
  COMPONENT_SIZES,
  COMPONENT_VARIANTS,
  CONFIG,
  CSS_DESIGN_TOKENS,
  DATA_STATES,
  DESIGN_TOKEN_SCALE,
  ELEVATION_LEVELS,
  EXPORT_FORMATS,
  FIELD_SIZES,
  FILTER_TYPES,
  FORM_SIZES,
  FORM_STATES,
  FORM_TYPES,
  GEO_DRAWING_ERRORS,
  GEO_DRAWING_INTERACTION,
  GEO_DRAWING_MEASUREMENT,
  GEO_DRAWING_OSM,
  GEO_DRAWING_SNAP,
  GEO_DRAWING_STYLES,
  GEO_DRAWING_SUCCESS,
  ICON_SIZES,
  INPUT_VARIANTS,
  LAYERA_CONSTANTS_VERSION,
  LINK_TARGETS,
  LayeraThemeEngine,
  LayeraThemeProvider,
  MENU_POSITIONS,
  NAVIGATION_TYPES,
  PAGE_LAYOUTS,
  PAGINATION_SIZES,
  PERMISSIONS,
  RESPONSIVE_DESIGN_TOKENS,
  ROLE_HIERARCHY,
  ROLE_PERMISSIONS,
  ROUTE_PATTERNS,
  SNAP_CONSTANTS,
  SNAP_DEVICE_DEFAULTS,
  SNAP_TYPE_GROUPS,
  SNAP_VISUAL,
  SORT_DIRECTIONS,
  SPACING_SCALE,
  TABLE_COLUMN_WIDTHS,
  TABLE_DENSITIES,
  TABLE_VARIANTS,
  THEME_MODES,
  USER_ROLES,
  USER_STATUS,
  VALIDATION_RULES,
  Z_INDEX,
  getBorderRadiusValue,
  getBorderRadiusVar,
  getDesignTokenVar,
  getDesignTokenVars,
  getThemeEngine,
  useBorderRadius,
  useColor,
  useComponentTokens,
  useDesignToken,
  useDesignTokenDebugger,
  useDesignTokens,
  useElevation,
  useLayeraDesignSystem,
  useLayeraTheme,
  useMotion,
  useResponsiveDesignTokens,
  useSpacing,
  useTypography,
  useZIndex
});
/*! Bundled license information:

react/cjs/react.production.js:
  (**
   * @license React
   * react.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react/cjs/react.development.js:
  (**
   * @license React
   * react.development.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react/cjs/react-jsx-runtime.production.js:
  (**
   * @license React
   * react-jsx-runtime.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react/cjs/react-jsx-runtime.development.js:
  (**
   * @license React
   * react-jsx-runtime.development.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
