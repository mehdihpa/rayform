import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;
const endpoint = `${baseUrl}fields`;

export const getAllFieldsOfSpecificForm = (formId) => {
  return axios.get(`${endpoint}?FormId=${formId}`, {
    headers: {
      Authorization: "ali",
    },
  });
};

export const createNewField = (data) => {
  return axios.post(`${endpoint}`, data, {
    headers: {
      Authorization: "ali",
    },
  });
};

export const deleteField = (id) => {
  return axios.delete(`${endpoint}/${id}`, {
    headers: {
      Authorization: "ali",
    },
  });
};

export const getSpecificFieldData = (id) => {
  return axios.get(`${endpoint}/${id}`, {
    headers: {
      Authorization: "ali",
    },
  });
};

export const editSpecificFieldData = (data, id) => {
  return axios.put(`${endpoint}/${id}`, data, {
    headers: {
      Authorization: "ali",
    },
  });
};

export const createFieldsIdArray = (data) => {
  return axios.post(`${endpoint}/order`, data, {
    headers: {
      Authorization: "ali",
    },
  });
};
export const getFakeData = (path) => {
  console.log(path)
  return axios.get(`${path}`, {
    headers: {
      Authorization: "ali",
    },
  });
};
