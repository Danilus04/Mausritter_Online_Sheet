import axios from "axios";

const port = 65535

const api = axios.create({
    baseURL: `http://localhost:${port}/`
});

export default api;