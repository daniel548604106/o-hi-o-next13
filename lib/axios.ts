import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3001/v1"
      : "https://o-hi-o-server.onrender.com/v1",
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" },
});

const fetcher = (url: string, params: any = {}) =>
  axiosInstance.get(url, { ...(params && params) }).then((res) => res.data);

const poster = (url: string, params: any = {}) => {
  console.log(url, params, "params");
  return axiosInstance
    .post(url, { ...(params && params) })
    .then((res) => res.data);
};

export { axiosInstance as axios, fetcher, poster };
