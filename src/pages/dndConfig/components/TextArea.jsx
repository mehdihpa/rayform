// import { helpers } from "chart.js";
import React, { useEffect, useState } from "react";
// import { Line } from 'react-chartjs-2';
import { useDispatch, useSelector } from "react-redux";
import { textAreaConfig } from "../../../redux/action";
const TextArea = (props) => {
  const [messageMinLength, setMessageMinLength] = useState(false);
  const [showRequire, setShowRequire] = useState(false);
  const json = useSelector((state) => state?.genericElementConfigReducer);
  const label = json.element
    .filter((item) => item?.uuid === props?.id)
    .map((item) => item.label);
  const styleInjection = json.element
    .filter((item) => item?.uuid === props?.id)
    .map((item) => item.styleInjection);
  const textSize = json.element
    .filter((item) => item?.uuid === props?.id)
    .map((item) => item.textSize);
  const placeHolder = json.element
    .filter((item) => item?.uuid === props?.id)
    .map((item) => item.placeHolder);
  const description = json.element
    .filter((item) => item?.uuid === props?.id)
    .map((item) => item.description);
  const elementStatus = json.element
    .filter((item) => item?.uuid === props?.id)
    .map((item) => item.elementStatus);
  const minLength = json.element
    .filter((item) => item?.uuid === props?.id)
    .map((item) => item.minLength);
  const maxLength = json.element
    .filter((item) => item?.uuid === props?.id)
    .map((item) => item.maxLength);
  const require = json.element
    .filter((item) => item?.uuid === props?.id)
    .map((item) => item.require);
  const hidden = json.element
    .filter((item) => item?.uuid === props?.id)
    .map((item) => item.hidden);
  const regex = json.element
    .filter((item) => item?.uuid === props?.id)
    .map((item) => item.regex);
  const messageRegex = json.element
    .filter((item) => item?.uuid === props?.id)
    .map((item) => item.messageRegex);
  useEffect(() => {
    if (require === true) {
      setShowRequire(true);
    } else {
      setShowRequire(false);
    }
  }, [require, regex, messageRegex]);
  const controlInput = (e) => {
    console.log();
    if (e.target.value.length === 0 && require === true) {
      setShowRequire(true);
    } else {
      setShowRequire(false);
    }
    if (e.target.value.length < minLength) {
      setMessageMinLength(true);
    } else {
      setMessageMinLength(false);
    }
    const regPattern = regex.slice(1, -1);
    const re = new RegExp(regPattern);

    if (re.test(e.target.value)) {
    } else {
      Swal.fire({
        icon: "warning",
        text: `${messageRegex}`,
      });
    }
  };
  const dispatchConfgi = useDispatch();

  useEffect(() => {
    const newElement = {
      uuid: props?.id,
      label: "باکس متن",
      placeHolder: "لطفا متن را وارد کنید",
      description: "",
      styleInjection: "",
      textColor: "",
      type: "textarea",
      textSize: "",
      elementStatus: "",
      minLength: "",
      maxLength: "",
      require: "",
      hidden: "",
      regex: "",
      messageRegex: "",
    };

    dispatchConfgi(textAreaConfig(newElement));
  }, []);
  return (
    <div
      dir="rtl"
      className={`p-2 mb-4 pb-5 ${hidden === true ? "hidden" : ""}`}
    >
      <label
        for="message"
        className="block mb-2 text-sm  font-medium text-gray-900 dark:text-white"
        style={{ fontSize: `${textSize}px` }}
      >
        {require === true
          ? label?.length === 0
            ? "باکس متن *"
            : label + " *"
          : label?.length === 0
          ? "باکس متن "
          : label}
      </label>
      <textarea
        id="message"
        rows="4"
        className={` ${styleInjection} ${
          elementStatus === "false"
            ? "bg-slate-200"
            : elementStatus === "true" || elementStatus === "" || undefined
            ? ""
            : ""
        } border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
        required={require}
        placeholder={placeHolder}
        minLength={minLength}
        onChange={controlInput}
        maxLength={maxLength}
        disabled={
          elementStatus === "false"
            ? true
            : elementStatus === "true" || elementStatus === "" || undefined
            ? false
            : false
        }
      ></textarea>

      <span
        className={`block my-2 ${
          messageMinLength === true ? "" : "hidden"
        } text-danger`}
      >
        حداقل کاراکتر {minLength} میباشد
      </span>
      <span className={`${showRequire === true ? "" : "hidden"} text-danger`}>
        {label} الزامی است
      </span>
    </div>
  );
};

export default TextArea;
