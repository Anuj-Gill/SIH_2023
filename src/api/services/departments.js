import interceptor from "../interceptor";
import { API_endpoints } from "../API_endpoints";

function getAllDepartments() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await interceptor(API_endpoints.getAllDepartments, "GET");
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
}

function addDepartment(body) {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(body);
      const response = await interceptor(API_endpoints.addDepartment, "POST", body);
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
}

function updateDepartment(id, body) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await interceptor(API_endpoints.updateDepartment + "/" + id, "PUT", body);
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
}

function deleteDepartment(id) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await interceptor(API_endpoints.deleteDepartment + "/" + id, "DELETE");
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
}

export { getAllDepartments, addDepartment, updateDepartment, deleteDepartment };
