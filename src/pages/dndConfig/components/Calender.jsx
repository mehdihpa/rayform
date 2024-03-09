// import { helpers } from "chart.js";
import React, { useEffect, useState } from "react";
import DatePicker from "react-multi-date-picker";
import InputIcon from "react-multi-date-picker/components/input_icon";
// import { Line } from 'react-chartjs-2';
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { useDispatch, useSelector } from "react-redux";
import { dateConfig } from "../../../redux/action";
import { nanoid } from "nanoid";

const Calender = (props) => {
  let [startDate, setStartDate] = useState({ format: "MM/DD/YYYY" });
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
  }, [require]);
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
  };
  const dispatchConfgi = useDispatch();
  const key = nanoid(); //=> "V1StGXR8_Z5jdHi6B-myT"
  var elements = document.getElementsByClassName("23");
  const selectedElement = json.element.find((item) => item?.uuid === props?.id);
  elements = Array.from(elements); //convert to array
  useEffect(() => {
    const newElement = {
      uuid: props?.id,
      label: selectedElement?.label || "تاریخ",
      description: selectedElement?.description || "",
      styleInjection: selectedElement?.styleInjection || "",
      textColor: selectedElement?.textColor || "",
      type: "day",
      textSize: selectedElement?.textSize || "",
      elementStatus: selectedElement?.elementStatus || "",
      minLength: selectedElement?.minLength || "",
      maxLength: selectedElement?.maxLength || "",
      require: selectedElement?.require || false,
      hidden: selectedElement?.hidden || false,
      value: startDate.toDate?.(),
      key: key,
      regex: "",
      messageRegex: "",
      width: elements
        .filter((item) => item?.firstChild?.id === props?.id)
        .map((item) => item?.style?.width)[0],
      transform: selectedElement?.transform || "",
    };

    dispatchConfgi(dateConfig(newElement));
  }, [
    startDate,
    elements[0],
    elements
      .filter((item) => item?.firstChild?.id === props?.id)
      .map((item) => item?.style?.width)[0],
  ]);
  return (
    <div dir="rtl" className={`p-2 mb-3 ${hidden === true ? "hidden" : ""}`}>
      <label
        for="input"
        name="input"
        type="text"
        className={`block mb-2  text-gray-900 dark:text-white`}
        style={{ fontSize: `${textSize}px` }}
      >
        {require === true
          ? label?.length === 0
            ? "تقویم *"
            : label + " *"
          : label?.length === 0
          ? " تقویم"
          : label}
      </label>

      <DatePicker
        // render={<InputIcon className="p-2" />}
        className={`    ${styleInjection} ${
          elementStatus === "false"
            ? "bg-slate-200"
            : elementStatus === "true" || elementStatus === "" || undefined
            ? ""
            : ""
        }`}
        style={{
          // backgroundColor: "#fff",
          width: "210px",
          border: "1px solid #dee2e6",
          padding: "20.5px 10px",
          borderRadius: "9px",
        }}
        calendar={persian}
        locale={persian_fa}
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        showIcon
        required={require}
        disabled={
          elementStatus === "false"
            ? true
            : elementStatus === "true" || elementStatus === "" || undefined
            ? false
            : false
        }
      />
    </div>
  );
};

export default Calender;
