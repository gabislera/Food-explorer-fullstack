import axios from "axios";

export const api = axios.create({
  baseURL: "https://foodexplorer-api-i9nz.onrender.com"
  // baseURL: "http://localhost:3333"
})
