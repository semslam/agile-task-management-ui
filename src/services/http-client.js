import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:6001/api/v1/",
  headers: {
    "Content-type": "application/json",
    'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
  }
});