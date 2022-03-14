import request from "/@utils/request";

export function getAction(url, params) {
  return request({
    url,
    method: 'get',
    params
  })
}

export function postAction(url, params) {
  return request({
    url,
    method: "post",
    data
  });
}
