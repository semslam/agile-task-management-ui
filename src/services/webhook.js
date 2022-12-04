import axios from "axios";
export default class WebHook {


  baseURL =  "http://localhost:6001/api/v1/";

  constructor(isAuth = null){
  let headers = {
      "Content-type": "application/json",
      'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
    }
    if(isAuth){
      headers = {"Authorization":`Bearer ${isAuth}`, ...headers}
    }
   this.axios = axios.create({
      baseURL:this.baseURL,
      headers 
    })
   console.log(this.axios)
   console.log(headers) 
  }

  getAll(path) {
    return this.axios.get(path);
  }

  get(path) {
    return this.axios.get(`${path}`);
  }

  create(path,data) {
    return this.axios.post(path, data);
  }

  update(path,data) {
    return this.axios.put(`${path}`, data);
  }

  delete(path,id) {
    return this.axios.delete(`${path}/${id}`);
  }


  // findByContent(title) {
  //   return axios.get(`/article?content=${title}`);
  // }
}

// export default new WebHook();