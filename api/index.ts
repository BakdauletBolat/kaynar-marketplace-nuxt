import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://back-kaynar.kz",
  timeout: 10000,
});

axiosInstance.interceptors.request.use(function (config) {
  const token = useCookie("token");
  config["headers"]["Authorization"] = `Bearer ${token.value}`;
  return config;
});

export function customFetch<T>(url: string, options: any = {}) {
  const baseURL = "https://back-kaynar.kz";
  return $fetch<T>(baseURL + url, {
    headers: {},
    ...options,
  });
}

export default axiosInstance;
