import axios from "axios";
const token = localStorage.getItem("x-auth-token");

export default axios.create({
  baseURL: "http://localhost:301/api",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "x-auth-token": token,
  },
});
