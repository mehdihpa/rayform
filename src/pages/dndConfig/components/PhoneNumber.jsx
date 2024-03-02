// import { helpers } from "chart.js";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mobileConfig } from "../../../redux/action";
// import { Line } from 'react-chartjs-2';

const PhoneNumber = (props) => {
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
  const textColor = json.element
    .filter((item) => item?.uuid === props?.id)
    .map((item) => item.textColor);
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
      label: "شماره همراه",
      placeHolder: "لطفا شماره همراه را وارد کنید",
      description: "",
      styleInjection: "",
      textColor: "",
      type: "phoneNumber",
      textSize: "",
      elementStatus: "",
      minLength: "",
      maxLength: "",
      require: "",
      hidden: "",
      regex: "",
      messageRegex: "",
    };

    dispatchConfgi(mobileConfig(newElement));
  }, []);
  return (
    <div dir="rtl" className={`p-2 mb-3 ${hidden === true ? "hidden" : ""}`}>
      <form className={`mx-auto`}>
        <label
          for="phone-input"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          style={{ fontSize: `${textSize}px`, color: `${textColor}` }}
        >
          {require === true
            ? label?.length === 0
              ? "شماره همراه  *"
              : label + " *"
            : label?.length === 0
            ? "شماره همراه "
            : label}
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 19 18"
            >
              <path d="M18 13.446a3.02 3.02 0 0 0-.946-1.985l-1.4-1.4a3.054 3.054 0 0 0-4.218 0l-.7.7a.983.983 0 0 1-1.39 0l-2.1-2.1a.983.983 0 0 1 0-1.389l.7-.7a2.98 2.98 0 0 0 0-4.217l-1.4-1.4a2.824 2.824 0 0 0-4.218 0c-3.619 3.619-3 8.229 1.752 12.979C6.785 16.639 9.45 18 11.912 18a7.175 7.175 0 0 0 5.139-2.325A2.9 2.9 0 0 0 18 13.446Z" />
            </svg>
          </div>
          <input
            type="text"
            id="phone-input"
            aria-describedby="helper-text-explanation"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
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
          />
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
          <span
            className={`${showRequire === true ? "" : "hidden"} text-danger`}
          >
            {label} الزامی است
          </span>
        </div>
      </form>
    </div>
  );
};

export default PhoneNumber;
