import interceptor from "../interceptor";
import { API_endpoints } from "../API_endpoints";

function getAllOrganisations() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await interceptor(API_endpoints.getAllOrganisations, "GET");
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
}

function addOrganisation(body) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await interceptor(API_endpoints.addOrganisation, "POST", body);
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
}

function updateOrganisation(id, body) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await interceptor(API_endpoints.updateOrganisation + "/" + id, "PUT", body);
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
}

function deleteOrganisation(id) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await interceptor(API_endpoints.deleteUser + "/" + id, "DELETE");
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
}

export { getAllOrganisations, addOrganisation, updateOrganisation, deleteOrganisation };
