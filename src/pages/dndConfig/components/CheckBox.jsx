// import { helpers } from "chart.js";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkBoxConfig } from "../../../redux/action";
// import { Line } from 'react-chartjs-2';

const CheckBox = (props) => {
  const json = useSelector((state) => state?.genericElementConfigReducer);
  const [showRequire, setShowRequire] = useState(false);
  const label = json.element
    .filter((item) => item?.uuid === props?.id)
    .map((item) => item.label);
  const styleInjection = json.element
    .filter((item) => item?.uuid === props?.id)
    .map((item) => item.styleInjection);
  const textColor = json.element
    .filter((item) => item?.uuid === props?.id)
    .map((item) => item.textColor);
  const hidden = json.element
    .filter((item) => item?.uuid === props?.id)
    .map((item) => item.hidden);
  const elementStatus = json.element
    .filter((item) => item?.uuid === props?.id)
    .map((item) => item.elementStatus);
  const textSize = json.element
    .filter((item) => item?.uuid === props?.id)
    .map((item) => item.textSize);
  const dispatchConfgi = useDispatch();

  useEffect(() => {
    const newElement = {
      uuid: props?.id,
      label: "چک باکس",
      description: "",
      styleInjection: "",
      textColor: "",
      type: "checkBox",
      textSize: "",
      elementStatus: "",
      minLength: "",
      maxLength: "",
      require: "",
      hidden: "",
      regex: "",
      messageRegex: "",
    };

    dispatchConfgi(checkBoxConfig(newElement));
  }, []);
  return (
    <div dir="rtl" className={`p-2 mb-3 ${hidden === true ? "hidden" : ""}`}>
      <input
        id="default-checkbox"
        type="checkbox"
        value=""
        className={`  ${
          elementStatus === "false"
            ? "bg-slate-200"
            : elementStatus === "true" || elementStatus === "" || undefined
            ? ""
            : ""
        } w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600`}
        disabled={
          elementStatus === "false"
            ? true
            : elementStatus === "true" || elementStatus === "" || undefined
            ? false
            : false
        }
      />
      <label
        for="default-checkbox"
        className={`ms-2 mt-4 ${styleInjection} text-sm font-medium text-gray-900 dark:text-gray-300`}
        style={{ fontSize: `${textSize}px`, color: `${textColor}` }}
      >
        {label?.length === 0 ? "چک باکس " : label}
      </label>
    </div>
  );
};

export default CheckBox;
