// import { helpers } from "chart.js";
import React, { useEffect, useState } from "react";
import DatePicker from "react-multi-date-picker";
import InputIcon from "react-multi-date-picker/components/input_icon";
// import { Line } from 'react-chartjs-2';
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { useDispatch, useSelector } from "react-redux";
import { dateConfig } from "../../../redux/action";

const Calender = (props) => {
  let [startDate, setStartDate] = useState(new Date());
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

  useEffect(() => {
    const newElement = {
      uuid: props?.id,
      label: "تاریخ",
      description: "",
      styleInjection: "",
      textColor: "",
      type: "day",
      textSize: "",
      elementStatus: "",
      minLength: "",
      maxLength: "",
      require: "",
      hidden: "",
      regex: "",
      messageRegex: "",
    };

    dispatchConfgi(dateConfig(newElement));
  }, []);
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
      <div date-rangepicker className="flex items-center ">
        <div
          className={` ${styleInjection} ${
            elementStatus === "false"
              ? "bg-slate-200"
              : elementStatus === "true" || elementStatus === "" || undefined
              ? ""
              : ""
          }`}
        >
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
      </div>
    </div>
  );
};

export default Calender;
