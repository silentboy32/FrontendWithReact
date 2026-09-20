
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.API_URL
});

export default API;