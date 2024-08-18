import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: "https://back-kaynar.kz",
  timeout: 1e4
});
function customFetch(url, options = {}) {
  const baseURL = "https://back-kaynar.kz";
  return $fetch(baseURL + url, {
    headers: {},
    ...options
  });
}

export { axiosInstance as a, customFetch as c };
//# sourceMappingURL=index-C5IDfPQf.mjs.map
