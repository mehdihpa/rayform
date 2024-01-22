import axios from "axios";

const baseUrl = "https://sit-rayform.saminray.com/api/";
const endpoint = `${baseUrl}forms`;

export const getForms = () => {
  return axios.get(`${endpoint}`, {
    headers: {
      Authorization: "ali",
    },
  });
};

export const getFormById = (id) => {
  return axios.get(`${endpoint}/${id}`, {
    headers: {
      Authorization: "ali",
    },
  });
};

export const deleteFormById = (id) => {
  return axios.delete(`${endpoint}/${id}`, {
    headers: {
      Authorization: "ali",
    },
  });
};

export const postForm = (data, key) => {
  return axios.post(
    `${endpoint}`,
    {
      key: key,
      label: data.label,
      description: data.description,
      status: "disable",
    },
    {
      headers: {
        Authorization: "ali",
      },
    }
  );
};

export const updateForm = (data) => {
  return axios.put(
    `${endpoint}`,
    {
      key: data.key,
      label: data.label,
      description: data.description,
      status: "disable",
      id: data.id,
      code: data.code,
    },
    {
      headers: {
        Authorization: "ali",
      },
    }
  );
};
