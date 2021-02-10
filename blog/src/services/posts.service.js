import http from "../http-common";

class PostDataService {
  getAll() {
    return http.get("/post");
  }

  get(id) {
    return http.get(`/post/${id}`);
  }
  
  create(data) {
    return http.put("/post", data);
  }

  update(id, data) {
    return http.patch(`/post/${id}`, data);
  }

  delete(id) {
    return http.delete(`/post/${id}`);
  }

  findBySlug(slug) {
    return http.get(`/post?slug=${slug}`);
  }
}

export default new PostDataService();