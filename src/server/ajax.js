import { objToSearch } from "../utils/util";

// 检查服务器请求是否成功
function checkStatus(res) {
  if (res.ok && res.status >= 200 && res.status < 300) {
    return res;
  }
  const error = new Error(res.status + ": " + res.statusText);
  throw error;
}

// 返回 json
function parseJson(res) {
  return res.json();
}

/**
 * 检测服务器数据正确性
 * @param {*} res 服务器返回数据
 */
function checkCode(res) {
  if (1) return res;
  if (res.ret === 200 && res.data.err_code === 0) return res;
  else if (res.code === 0) return res;
  else throw new Error(res.msg);
}

function request(url, options) {
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJson)
    .then(checkCode);
}

/**
 * 封装 GET 请求
 * @param {String} url
 * @param {Object} data
 */
export const get = (url, data) => {
  url += (url.includes("?") ? "&" : "?") + objToSearch(data);
  return request(url, {
    method: "GET",
    credentials: "include",
    headers: {
      "X-Requested-With": "XMLHttpRequest"
    }
  });
};

/**
 * 封装 POST 请求
 * @param {String} url
 * @param {Object} data
 */
export const post = (url, data) => {
  return request(url, {
    method: "POST",
    credentials: "include",
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      Accept: "application/json, text/javascript, */*; q=0.01",
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
    },
    body: objToSearch(data)
  });
};

/**
 * 文件上传接口
 * @param {String} url
 * @param {Object} data
 */
export const upload = (url, data = {}) => {
  const formData = new FormData();
  Object.keys(data).forEach(key => {
    formData.append("key", data[key]);
  });
  return fetch(url, {
    method: "POST",
    body: data
  })
    .then(checkStatus)
    .then(parseJson)
    .then(checkCode);
};
