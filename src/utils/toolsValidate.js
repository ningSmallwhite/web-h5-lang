/**
 * 手机号码
 * @param val 当前值字符串
 * @returns 返回 true: 手机号码正确
 */
export function verifyPhone(val) {
  // false: 手机号码不正确
  if (
    !/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57]|19[0-9])[0-9]{8}$/.test(
      val
    )
  )
    return false;
  // true: 手机号码正确
  else return true;
}

// 获取地址栏参数
export const getUrlKey = name => {
  return (
    decodeURIComponent(
      (new RegExp("[?|&]" + name + "=" + "([^&;]+?)(&|#|;|$)").exec(
        location.href
        // eslint-disable-next-line no-sparse-arrays
      ) || [, ""])[1].replace(/\+/g, "%20")
    ) || null
  );
};