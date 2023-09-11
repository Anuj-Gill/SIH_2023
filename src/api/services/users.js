import interceptor from "../interceptor";
import { API_endpoints } from "../API_endpoints";

function getAllUsers() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await interceptor(API_endpoints.getAllUsers, "GET");
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
}

function addUser(body) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await interceptor(API_endpoints.addUser, "POST", body);
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
}

function updateUser(id, body) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await interceptor(API_endpoints.updateUser + "/" + id, "PUT", body);
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
}

function deleteUser(id) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await interceptor(API_endpoints.deleteUser + "/" + id, "DELETE");
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
}

function getUsersForRole(body) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await interceptor(API_endpoints.getUsersForRole, "POST", body);
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
}

export { getAllUsers, addUser, updateUser, deleteUser, getUsersForRole };
