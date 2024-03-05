// import { helpers } from "chart.js";
import React, { useEffect, useState } from "react";
// import { Line } from 'react-chartjs-2';
import { useDispatch, useSelector } from "react-redux";
import { emailConfig } from "../../../redux/action";
const Email = (props) => {
  const [messageMinLength, setMessageMinLength] = useState(false);
  const [showRequire, setShowRequire] = useState(false);
  const json = useSelector((state) => state?.genericElementConfigReducer);
  const label = json.element
    .filter((item) => item?.uuid === props?.id)
    .map((item) => item.label)[0];
  const styleInjection = json.element
    .filter((item) => item?.uuid === props?.id)
    .map((item) => item.styleInjection)[0];
  const textSize = json.element
    .filter((item) => item?.uuid === props?.id)
    .map((item) => item.textSize)[0];
  const placeHolder = json.element
    .filter((item) => item?.uuid === props?.id)
    .map((item) => item.placeHolder)[0];
  const description = json.element
    .filter((item) => item?.uuid === props?.id)
    .map((item) => item.description)[0];
  const elementStatus = json.element
    .filter((item) => item?.uuid === props?.id)
    .map((item) => item.elementStatus)[0];
  const minLength = json.element
    .filter((item) => item?.uuid === props?.id)
    .map((item) => item.minLength)[0];
  const maxLength = json.element
    .filter((item) => item?.uuid === props?.id)
    .map((item) => item.maxLength)[0];
  const require = json.element
    .filter((item) => item?.uuid === props?.id)
    .map((item) => item.require)[0];
  const hidden = json.element
    .filter((item) => item?.uuid === props?.id)
    .map((item) => item.hidden)[0];
  const regex = json.element
    .filter((item) => item?.uuid === props?.id)
    .map((item) => item.regex)[0];
  const messageRegex = json.element
    .filter((item) => item?.uuid === props?.id)
    .map((item) => item.messageRegex)[0];
  useEffect(() => {
    if (require === true) {
      setShowRequire(true);
    } else {
      setShowRequire(false);
    }
  }, [require, regex, messageRegex]);
  const [text, setText] = useState("");
  const key = nanoid(); //=> "V1StGXR8_Z5jdHi6B-myT"

  const controlInput = (e) => {
    setText(e.target.value);

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
      label: "ایمیل",
      placeHolder: "لطفا ایمیل را وارد کنید",
      description: "",
      styleInjection: "",
      textColor: "",
      type: "email",
      textSize: "",
      elementStatus: "",
      minLength: "",
      maxLength: "",
      require: false,
      value: text,
      key: key,
      hidden: "",
      regex: "",
      messageRegex: "",
      width: elements
        .filter((item) => item?.firstChild?.id === props?.id)
        .map((item) => item?.style?.width)[0],
      transform: "",
    };

    dispatchConfgi(emailConfig(newElement));
  }, [
    text,
    elements[0],
    elements
      .filter((item) => item?.firstChild?.id === props?.id)
      .map((item) => item?.style?.width)[0],
  ]);
  console.log(require);
  return (
    <div dir="rtl" className={`p-2 mb-3 ${hidden === true ? "hidden" : ""}`}>
      <label
        htmlFor={props?.id}
        name="email"
        type="email"
        className={`block mb-2   text-gray-900 dark:text-white`}
        style={{ fontSize: `${textSize}px` }}
      >
        {require !== true ? label : label + "*"}
      </label>
      <input
        type="email"
        name="email"
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
      />{" "}
      <p
        className={`  mx-1 my-2 px-1  rounded-md`}
        // style={{ backgroundColor: `${styleInjection}`, color: `${textColor}` }}
      >
        {description}
      </p>
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

export default Email;
