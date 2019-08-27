import axios from "axios";

/**解决跨域问题的相关配置  开始 */
import apiConfig from "../../config/api.config";
// Vue.use(Axios);
axios.defaults.baseURL = apiConfig.baseUrl;
/**解决跨域问题的相关配置  结束 */

export const getTodoList = params => {
  //封装一个函数，名为getTodoList
  return axios.get(`/category/list`, {
    // 请求路径 ‘/todo/list’
    params: params
  });
};
export const addTodo = params => {
  return axios.post(`/category/edit`, params).then(res => res.data);
};
//新增一个请求查询代办单项列表的数据的接口函数
export const getTodo = params => {
  return axios.get(`/category/detail/list`, {
    params: params
  });
};

//新增一个请求新增代办单的接口函数
export const addRecord = params => {
  return axios.post(`/category/detail/edit`, params).then(res => res.data);
};
export const editTodo = params => {
  return axios.post(`/category/edit`, params).then(res => res.data);
};
// export const editRecord = params => {
//   return axios.post(`/todo/editRecord`, params).then(res => res.data);
// };
// export const changeRecord = params => {
//   return axios.post(`/todo/changeRecord`, params).then(res => res.data);
// };
export const editTodoStatus = params => {
  return axios.post(`/category/status`, params).then(res => res.data);
};
export const editRecordStatus = params => {
  return axios.post(`/category/detail/status`, params).then(res => res.data);
};
