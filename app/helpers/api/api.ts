import axios from "axios";
import { API_URL } from "../constants/constants";

interface RequestProps {
  method: "get" | "post" | "put" | "delete";
  url?: string;
  data?: any;
  headers?: any;
  [propsName: string]: any;
}
let subscribers: Array<any> = [];

const request = axios.create({
  baseURL: API_URL,
  timeout: 40000,
});

// request.interceptors.request.use(
//   (config: any) => {
//     if (config.url.indexOf("/login") !== -1 || config.url.indexOf("/refresh-token") !== -1) {
//       delete config.headers.Authorization;
//     }
//     return { ...config, headers: { ...config?.headers } };
//   },
//   (error) => Promise.reject(error)
// );

request.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    return Promise.reject(error.response);
  }
);

const api = (options: RequestProps) => {
  let headers = {
    ...options.headers,
  };

  return request({
    baseURL: API_URL,
    responseType: "json",
    ...options,
    headers,
  });
};

export default api;
