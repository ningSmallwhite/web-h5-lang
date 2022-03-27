import request from "/@utils/request";

export function getAction(url, params) {
  return request({
    url,
    method: 'get',
    params
  })
}

export function postAction(url, params, header) {
  return request({
    url,
    method: "post",
    data: params,
    headers: header,
  });
}
