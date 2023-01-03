import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3001/v1"
      : "https://o-hi-o-server.de.r.appspot.com/v1",
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" },
});

const fetcher = (url: string) => axiosInstance.get(url).then((res) => res.data);

export { axiosInstance as axios, fetcher };