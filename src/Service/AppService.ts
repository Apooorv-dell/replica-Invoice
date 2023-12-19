import apiClient from "./api-client";


class AppService {
  endPoint: string;
  constructor(endPoint: string) {
    this.endPoint = endPoint;
  }

  getAll<T>() {
    return apiClient.get<T[]>(this.endPoint);
  }

  delete(id: string) {
    return apiClient.delete(this.endPoint + "/" + id);
  }

  create<T>(data: T) {
    return apiClient.post(this.endPoint, data);
  }
  //   update<T>(data:T){
  //     return apiClient.put(this.endPoint,+"/")

  // //   }
}

const create = (endPoint: string) => new AppService(endPoint);
export default create;
