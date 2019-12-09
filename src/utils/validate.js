/**
 * 过滤特殊字符
 */
export function filterStr(str) {
  var pattern = /[`~!@#$^&*()=|{ }':;',\\[\]\\.<>\\/?~！@#￥……&*（）——|{}【】'；：""'。，、？]/g;
  return str.replace(pattern, "");
}

/**
 * 验证邮箱
 */
export function valiEmail(value) {
  let reg = /^([a-zA-Z]|[0-9])(\w)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
  return reg.test(value);
}

/**
 * 验证手机号
 */
export function valiPhone(value) {
  let reg = /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199)\d{8}$/;
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
