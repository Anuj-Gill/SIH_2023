import interceptor from "../../interceptor";
import { API_endpoints } from "../../API_endpoints";

function getAllCountries() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await interceptor(API_endpoints.getAllCountries, "GET");
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
}

function addCountry(body) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await interceptor(API_endpoints.addCountry, "POST", body);
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
}

function updateCountry(id, body) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await interceptor(API_endpoints.updateCountry + "/" + id, "PUT", body);
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
}

function deleteCountry(id) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await interceptor(API_endpoints.deleteCountry + "/" + id, "DELETE");
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
}

export { getAllCountries, addCountry, updateCountry, deleteCountry };
