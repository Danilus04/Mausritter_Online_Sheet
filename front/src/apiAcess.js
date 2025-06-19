import axios from "axios";

const port = 8000

const api = axios.create({
    baseURL: `http://localhost:${port}/app/`
});

export default api;