import interceptor from "../../interceptor";
import { API_endpoints } from "../../API_endpoints";

function getAllRoles() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await interceptor(API_endpoints.getAllRoles, "GET");
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
}


export { getAllRoles };
