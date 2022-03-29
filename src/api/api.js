import request from "/@utils/request";

export function getAction(url, params) {
  return request({
    url,
    method: "get",
    params,
  });
}

export function postAction(url, params, header) {
  return request({
    url,
    method: "post",
    data: params,
    headers: header,
  });
}

export const loadOpenId = (code) => {
  return getAction("/Data_Manage/WeChat_User/GetAccessTokenByCode", {
    code,
  });
};

export const loadUserInfo = (openid) => {
  return postAction("/Data_Manage/WeChat_User/GetWeChat_User", {
    openid: openid,
  });
};
