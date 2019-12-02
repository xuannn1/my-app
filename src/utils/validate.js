/**
 * 过滤特殊字符
 */
export function filterStr(str) {
  var pattern = /[`~!@#$^&*()=|{ }':;',\\[\]\\.<>\\/?~！@#￥……&*（）——|{}【】'；：""'。，、？]/g;
  const res = str.replace(pattern, "");
  return res;
}

/**
 * 验证邮箱
 */
export function valiEmail(value) {
  let reg = /^([a-zA-Z]|[0-9])(\w)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
  return reg.test(value);
}

/**
 * 验证密码，6至24位数字+字母
 */
export function valiPass(value) {
  let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
  return reg.test(value);
}

/**
 * 验证验证码，6位数字或字母
 */
export function valiCode(value) {
  let reg = /^[a-zA-Z0-9]{6}$/;
  return reg.test(value);
}
