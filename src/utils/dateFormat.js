import { type } from "./util";

export default {
  /**
   * 时间格式化
   * @param date 要格式化的时间 默认值当前时间
   * @param fmt 格式化字符串 yyyy-MM-dd
   */
  format: (date = new Date(), fmt = "yyyy-MM-dd") => {
    try {
      if (!type.isDate(date)) date = new Date(date);
      date.getMonth();
    } catch (e) {
      return e;
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
          RegExp.$1.length === 1
            ? o[k]
            : ("00" + o[k]).substr(("" + o[k]).length)
        );
      }
    }
    return fmt;
  }
};
