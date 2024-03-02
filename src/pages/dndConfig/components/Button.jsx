// import { helpers } from "chart.js";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { buttonConfig } from "../../../redux/action";
// import { Line } from 'react-chartjs-2';

const Button = (props) => {
  const json = useSelector((state) => state?.genericElementConfigReducer);
  const [showRequire, setShowRequire] = useState(false);
  const label = json.element
    .filter((item) => item?.uuid === props?.id)
    .map((item) => item.label);
  const styleInjection = json.element
    .filter((item) => item?.uuid === props?.id)
    .map((item) => item.styleInjection);
  const require = json.element
    .filter((item) => item?.uuid === props?.id)
    .map((item) => item.require);
  const hidden = json.element
    .filter((item) => item?.uuid === props?.id)
    .map((item) => item.hidden);
  const elementStatus = json.element
    .filter((item) => item?.uuid === props?.id)
    .map((item) => item.elementStatus);
  useEffect(() => {
    if (require === true) {
      setShowRequire(true);
    } else {
      setShowRequire(false);
    }
  }, [require]);
  const dispatchConfgi = useDispatch();

  useEffect(() => {
    const newElement = {
      uuid: props?.id,
      label: "ثبت ",
      description: "",
      styleInjection: "",
      textColor: "",
      type: "button",
      textSize: "",
      elementStatus: "",
      minLength: "",
      maxLength: "",
      require: "",
      hidden: "",
      regex: "",
      messageRegex: "",
    };

    dispatchConfgi(buttonConfig(newElement));
  }, []);
  return (
    <div dir="rtl" className={`mb-3 p-2 ${hidden === true ? "hidden" : ""}`}>
      <br />
      <button
        className={`text-white w-full bg-blue-700  ${
          elementStatus === "false"
            ? "bg-secondary"
            : elementStatus === "true" || elementStatus === "" || undefined
            ? ""
            : ""
        } ${styleInjection} font-medium rounded-lg text-sm px-5 py-[8.5px] mt-2 me-2 mb-2"`}
      >
        {require === true
          ? label?.length === 0
            ? "ثبت *"
            : label + " *"
          : label?.length === 0
          ? "ثبت"
          : label}{" "}
      </button>
    </div>
  );
};

export default Button;
