import http from "./http-client";

export default class WebHook {

  constructor(authorization = null){
    if(!authorization){
      http.options = authorization
    }
    
  }

  getAll(path) {
    return http.get(path);
  }

  get(path,id) {
    return http.get(`${path}/${id}`);
  }

  create(path,data) {
    return http.post(path, data);
  }

  update(path,data,id) {
    if(!id)
      return http.put(`${path}/${id}`, data);
    
    return http.put(`${path}`, data);
  }

  delete(path,id) {
    return http.delete(`${path}/${id}`);
  }


  findByContent(title) {
    return http.get(`/article?content=${title}`);
  }
}

// export default new WebHook();