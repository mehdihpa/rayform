// import { helpers } from "chart.js";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { buttonConfig } from "../../../redux/action";
import { nanoid } from "nanoid";
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
  const key = nanoid(); //=> "V1StGXR8_Z5jdHi6B-myT"
  var elements = document.getElementsByClassName("23");
  const selectedElement = json.element.find((item) => item?.uuid === props?.id);
  elements = Array.from(elements); //convert to array
  useEffect(() => {
    const newElement = {
      uuid: props?.id,
      label: selectedElement?.label || "ثبت ",
      description: selectedElement?.description || "",
      styleInjection: selectedElement?.styleInjection || "",
      textColor: selectedElement?.textColor || "",
      type: "button",
      textSize: selectedElement?.textSize || "",
      elementStatus: selectedElement?.elementStatus || "",
      minLength: selectedElement?.minLength || "",
      maxLength: selectedElement?.maxLength || "",
      require: selectedElement?.require || false,
      hidden: selectedElement?.hidden || false,
      key: key,
      regex: selectedElement?.regex || "",
      messageRegex: selectedElement?.messageRegex || "",
      width: elements
        .filter((item) => item?.firstChild?.id === props?.id)
        .map((item) => item?.style?.width)[0],
      transform:
        elements
          .filter((item) => item?.firstChild?.id === props?.id)
          .map((item) => item?.style?.transform)[0] || "",
    };

    dispatchConfgi(buttonConfig(newElement));
  }, [
    elements[0],
    elements
      .filter((item) => item?.firstChild?.id === props?.id)
      .map((item) => item?.style?.width)[0],
    elements
      .filter((item) => item?.firstChild?.id === props?.id)
      .map((item) => item?.style?.transform)[0],
  ]);
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
