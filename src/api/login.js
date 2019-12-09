import service from "@/utils/request.js";
/**
 * 获取验证码
 */
export function getSms(phone) {
  return service.request({
    method: "post",
    url: "/captchas/",
    data: {
      phone
    }
  });
}

/**
 * 获取用户邮箱
 */

/**
 * 登录
 */

/**
 * 注册
 */
