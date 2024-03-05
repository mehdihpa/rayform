// import { helpers } from "chart.js";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { radioConfig } from "../../../redux/action";
import { nanoid } from "nanoid";
// import { Line } from 'react-chartjs-2';

const Radio = (props) => {
  const json = useSelector((state) => state?.genericElementConfigReducer);
  const [showRequire, setShowRequire] = useState(false);
  const [check, setCheck] = useState(false);

  const label = json.element
    .filter((item) => item?.uuid === props?.id)
    .map((item) => item.label)[0];
  const styleInjection = json.element
    .filter((item) => item?.uuid === props?.id)
    .map((item) => item.styleInjection)[0];
  const textColor = json.element
    .filter((item) => item?.uuid === props?.id)
    .map((item) => item.textColor)[0];
  const hidden = json.element
    .filter((item) => item?.uuid === props?.id)
    .map((item) => item.hidden)[0];
  const elementStatus = json.element
    .filter((item) => item?.uuid === props?.id)
    .map((item) => item.elementStatus)[0];
  const textSize = json.element
    .filter((item) => item?.uuid === props?.id)
    .map((item) => item.textSize)[0];

  const dispatchConfgi = useDispatch();
  const key = nanoid(); //=> "V1StGXR8_Z5jdHi6B-myT"
  const checkOnChange = (e) => {
    console.log(e.target.checked);
    setCheck(e.target.checked);
  };
  var elements = document.getElementsByClassName("23");

  elements = Array.from(elements); //convert to array
  useEffect(() => {
    const newElement = {
      uuid: props?.id,
      label: "رادیو باتن",
      placeHolder: "لطفا رادیو باتن را وارد کنید",
      description: "",
      styleInjection: "",
      textColor: "",
      type: "radioButton",
      textSize: "",
      elementStatus: "",
      minLength: "",
      maxLength: "",
      require: false,
      hidden: "",
      key: key,
      value: check,
      messageRegex: "",
      width: elements
        .filter((item) => item?.firstChild?.id === props?.id)
        .map((item) => item?.style?.width)[0],
      transform: "",
    };

    dispatchConfgi(radioConfig(newElement));
  }, [
    check,
    elements[0],
    elements
      .filter((item) => item?.firstChild?.id === props?.id)
      .map((item) => item?.style?.width)[0],
  ]);
  return (
    <div dir="rtl" className={`p-2 mb-3 ${hidden === true ? "hidden" : ""}`}>
      <input
        id="default-radio-1"
        type="radio"
        value={check}
        onChange={checkOnChange}
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
        className={`ms-2 mt-4 ${styleInjection} text-sm font-medium `}
      >
        {label?.length === 0 ? "رادیو باتن " : label}
      </label>
    </div>
  );
};

export default Radio;
