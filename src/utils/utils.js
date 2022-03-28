// 获取地址栏参数
export const getUrlKey = (name) => {
  return (
    decodeURIComponent(
      (new RegExp("[?|&]" + name + "=" + "([^&;]+?)(&|#|;|$)").exec(
        location.href
        // eslint-disable-next-line no-sparse-arrays
      ) || [, ""])[1].replace(/\+/g, "%20")
    ) || null
  );
};

export const formateTime = (value, fmt) => {
  if (!value) return "";

  const date = new Date(value);
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  let o = {
    "M+":
      date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1,
    "d+": date.getDate() < 10 ? "0" + date.getDate() : date.getDate(),
    "h+": date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
    "m+": date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(),
    "s+": date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds(),
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + "";
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : str);
    }
  }
  return fmt;
};