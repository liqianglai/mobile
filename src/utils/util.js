import constant from "./constant";

const toString = Object.prototype.toString;

/**
 * 判断是否为null
 * @param {*} parameter
 */
const isNull = parameter => {
  if (isUndefined(parameter)) return true;
  if (parameter === null) return true;
  if (isObject(parameter)) {
    if (Object.keys(parameter).length === 0) return true;
  }
  if (isArray(parameter)) {
    if (parameter.length === 0) return true;
  }
  return false;
};

/**
 * 判断是否为undefined
 * @param {*} parameter
 */
const isUndefined = parameter => {
  return parameter === void 0;
};

/**
 * 判断是否为布尔值
 * @param {*} parameter
 */
const isBoolean = parameter => {
  return (
    parameter === true ||
    parameter === false ||
    toString.call(parameter) === "[object Boolean]"
  );
};

/**
 * 判断是否为数字
 * @param {*} parameter
 */
const isNumber = parameter => {
  return toString.call(parameter) === "[object Number]";
};

/**
 * 判断是否为字符串
 * @param {*} parameter
 */
const isString = parameter => {
  return toString.call(parameter) === "[object String]";
};

/**
 * 判断是否为对象，不包括null
 * @param {*} parameter
 */
const isObject = parameter => {
  const type = typeof parameter;
  return type === "function" || (type === "object" && !!parameter);
};

/**
 * 判断是否为数组
 * @param {*} parameter
 */
const isArray = parameter => {
  return toString.call(parameter) === "[object Array]";
};

/**
 * 判断是否为日期类型
 * @param {*} parameter
 */
const isDate = parameter => {
  return toString.call(parameter) === "[object Date]";
};

/**
 * 类型判断
 */
export const type = {
  isNull,
  isUndefined,
  isBoolean,
  isNumber,
  isString,
  isObject,
  isArray
};

/**
 * 操作cookie
 */
export const cookie = {
  get: key => {
    const cookieStr = document.cookie;
    const map = new Map();
    cookieStr.split("; ").forEach(item => {
      map.set(item.split("=")[0], item.split("=")[1]);
    });
    return decodeURIComponent(map.get(key));
  },
  set: (key, value) => {
    document.cookie = key + "=" + encodeURIComponent(value);
  },
  remove: key => {
    document.cookie = key + "=0;expire=" + new Date().toUTCString();
  }
};

/**
 * 拼接字符串
 * @param {String} args 要拼接的字符串，支持多个
 */
export const pathJoin = (...args) => {
  let arr = [].slice.call(args),
    len = arr.length,
    path = "";
  for (let i = 0; i < len; i++) {
    if (!arr[i]) continue;
    if (i === 0) arr[i] = arr[i].replace(/\/$/, "");
    else if (i === len - 1) arr[i] = arr[i].replace(/^\//, "");
    else arr[i] = arr[i].replace(/^\/|\/$/, "");
    path += arr[i] + "/";
  }
  return path.slice(0, path.length - 1);
};

// 解析 location.search
export const parseSearch = () => {
  const str = decodeURIComponent(document.location.search.slice(1)),
    params = str.split("&");
  const obj = {};
  params.forEach(param => {
    const paramObj = param.split("=");
    obj[paramObj[0]] = paramObj[1];
  });
  return obj;
};

/**
 * 日期格式化
 * @param {Date|String} date 要格式化的时间，默认当前时间，日期对象或 Number 类型毫秒数
 * @param {String} fmt 格式，默认yyyy-MM-dd
 */
export const dateFormat = (date = new Date(), fmt = "yyyy-MM-dd") => {
  if (!isDate(date)) date = new Date(date);
  try {
    date.getMonth();
  } catch (e) {
    return new Error("参数错误");
  }
  const o = {
    "M+": date.getMonth() + 1, //月份
    "d+": date.getDate(), //日
    "h+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    S: date.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
    }
  }
  return fmt;
};

/**
 * 对象转查询字符串
 * {name:'二胖', age:22} => name=二胖&age=22
 * @param {*} params
 */
export const objToSearch = params => {
  let result = "";
  for (let key in params) {
    (params[key] === 0 || params[key]) && (result += `${key}=${params[key]}&`);
  }
  return result && result.slice(0, result.length - 1);
};

/**
 * localStorage简单封装
 */
export const storage = {
  setItem: (key, value) => {
    if (!key) {
      console.error("storage.setItem", "非法参数");
      return false;
    }
    const oldStorage = JSON.parse(
      localStorage.getItem(constant.STORAGE_KEY) || "{}"
    );
    oldStorage[key] = value;
    localStorage.setItem(constant.STORAGE_KEY, JSON.stringify(oldStorage));
  },
  getItem: key => {
    if (!key) {
      console.error("storage.getItem", "非法参数");
      return false;
    }
    const oldStorage = JSON.parse(
      localStorage.getItem(constant.STORAGE_KEY) || "{}"
    );
    return oldStorage[key];
  },
  removeItem: key => {
    if (!key) {
      console.error("storage.remove", "非法参数");
      return false;
    }
    const oldStorage = JSON.parse(
      localStorage.getItem(constant.STORAGE_KEY) || "{}"
    );
    if (Object.keys(oldStorage).indexOf(key) >= 0) {
      delete oldStorage[key];
    }
    return localStorage.setItem(
      constant.STORAGE_KEY,
      JSON.stringify(oldStorage)
    );
  },
  /**
   * 清空localStorage
   */
  clear: () => {
    localStorage.clear();
  }
};

/**
 * 获取页面传参
 * 暂时只支持 state 方式
 */
export const getPageParams = () => {
  return storage.getItem(constant.pageState) || {};
};

export const throttle = (fn, interval = 300, ...args) => {
  let canExecute = true;
  return function() {
    if (!canExecute) return;
    canExecute = false;
    setTimeout(() => {
      fn.apply(this, args);
      canExecute = true;
    }, interval);
  };
};
