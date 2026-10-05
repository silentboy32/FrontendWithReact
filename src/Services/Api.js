
import axios from "axios";

const API = axios.create({
  
  baseURL : import.meta.env.VITE_APP_URL,
  withCredentials: true,
  
  headers : {
    "Content-Type" : "application/json"
  },
  
})

export default API;



const ApiUrl = {
  baseURL : import.meta.env.VITE_APP_URL
}

export { ApiUrl }