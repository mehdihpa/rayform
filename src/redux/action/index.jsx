export const updateFormList = (formState) => {
  return {
    type: "updateFormList",
    data: formState,
  };
};
export const formLabelToDraw = (form) => {
  return {
    type: "formLabelToDraw",
    data: form,
  };
};
export const typeElelment = (type) => {
  return {
    type: "typeElement",
    data: type,
  };
};
export const inputConfig = (element) => {
  return {
    type: "inputConfig",
    data: element,
  };
};
export const passwordConfig = (element) => {
  return {
    type: "passwordConfig",
    data: element,
  };
};
export const numberConfig = (element) => {
  return {
    type: "numberConfig",
    data: element,
  };
};
export const textAreaConfig = (element) => {
  return {
    type: "textAreaConfig",
    data: element,
  };
};
export const checkBoxConfig = (element) => {
  return {
    type: "checkBoxConfig",
    data: element,
  };
};
export const radioConfig = (element) => {
  return {
    type: "radioConfig",
    data: element,
  };
};
export const emailConfig = (element) => {
  return {
    type: "emailConfig",
    data: element,
  };
};
export const mobileConfig = (element) => {
  return {
    type: "mobileConfig",
    data: element,
  };
};
export const linkConfig = (element) => {
  return {
    type: "linkConfig",
    data: element,
  };
};
export const buttonConfig = (element) => {
  return {
    type: "buttonConfig",
    data: element,
  };
};
export const dateConfig = (element) => {
  return {
    type: "dateConfig",
    data: element,
  };
};
export const tableConfig = (element) => {
  return {
    type: "tableConfig",
    data: element,
  };
};
export const dropdownConfig = (element) => {
  return {
    type: "dropdownConfig",
    data: element,
  };
};
export const showEdit = (display) => {
  return {
    type: "showEdit",
    data: display,
  };
};

export const setIdElement = (idElement) => ({
  type: "setIdElement",
  data: idElement,
});
