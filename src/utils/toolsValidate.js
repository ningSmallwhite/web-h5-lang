/**
 * 手机号码
 * @param val 当前值字符串
 * @returns 返回 true: 手机号码正确
 */
export function verifyPhone(val) {
  // false: 手机号码不正确
  if (
    !/^((12[0-9])|(13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/.test(
      val
    )
  )
    return false;
  // true: 手机号码正确
  else return true;
}
