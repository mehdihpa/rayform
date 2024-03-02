// import { helpers } from "chart.js";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dropdownConfig } from "../../../redux/action";
// import { Line } from 'react-chartjs-2';

const DropDown = (props) => {
  const [messageMinLength, setMessageMinLength] = useState(false);
  const [showRequire, setShowRequire] = useState(false);
  const json = useSelector((state) => state?.genericElementConfigReducer);
  const label = json.element
    .filter((item) => item?.uuid === props?.id)
    .map((item) => item.label)[0];
  const placeHolder = json.element
    .filter((item) => item?.uuid === props?.id)
    .map((item) => item.placeHolder)[0];
  const description = json.element
    .filter((item) => item?.uuid === props?.id)
    .map((item) => item.description)[0];
  const styleInjection = json.element
    .filter((item) => item?.uuid === props?.id)
    .map((item) => item.styleInjection)[0];
  const textColor = json.element
    .filter((item) => item?.uuid === props?.id)
    .map((item) => item.textColor)[0];
  const textSize = json.element
    .filter((item) => item?.uuid === props?.id)
    .map((item) => item.textSize)[0];
  const dropdownData = json.element
    .filter((item) => item?.uuid === props?.id)
    .map((item) => item.dropdownData)[0];
  const require = json.element
    .filter((item) => item?.uuid === props?.id)
    .map((item) => item.require)[0];
  const hidden = json.element
    .filter((item) => item?.uuid === props?.id)
    .map((item) => item.hidden)[0];
  const elementStatus = json.element
    .filter((item) => item?.uuid === props?.id)
    .map((item) => item.elementStatus)[0];
  useEffect(() => {
    if (require === true) {
      setShowRequire(true);
    } else {
      setShowRequire(false);
    }
  }, [require, dropdownData]);
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
      label: "دراپ دان",
      description: "",
      styleInjection: "",
      textColor: "",
      type: "dropDown",
      textSize: "",
      elementStatus: "",
      minLength: "",
      maxLength: "",
      require: "",
      hidden: "",
      regex: "",
      messageRegex: "",
    };

    dispatchConfgi(dropdownConfig(newElement));
  }, []);
  return (
    <div dir="rtl" className="mb-3 p-2">
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel
            id="demo-simple-select-label"
            style={{ fontSize: `${textSize}px`, color: `${textColor}` }}
          >
            {require === true
              ? label?.length === 0
                ? "دراپ دان *"
                : label + " *"
              : label?.length === 0
              ? " دراپ دان"
              : label}
          </InputLabel>
          <Select
            className={` ${styleInjection} ${
              elementStatus === "false"
                ? "bg-slate-200"
                : elementStatus === "true" || elementStatus === "" || undefined
                ? ""
                : ""
            }‍‍`}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            input={<OutlinedInput label="Name" />}
            style={{ backgroundColor: styleInjection, color: textColor }}
            required={require}
            onChange={controlInput}
            disabled={
              elementStatus === "false"
                ? true
                : elementStatus === "true" || elementStatus === "" || undefined
                ? false
                : false
            }
          >
            {dropdownData[0]?.dropdownNameOptions?.map((item) => (
              <MenuItem
                key={item?.name}
                value={item?.key}
                style={{ color: textColor }}
              >
                {item?.name}
              </MenuItem>
            ))}
          </Select>
          {/* <TextField
            label="گزینه جدید"
            value={newItem}
            onChange={handleNewItemChange}
            margin="normal"
            variant="outlined"
          />
          <button
            className="bg-blue-600 rounded-md text-slate-100 w-[125px] p-2"
            onClick={addNewItem}
          >
            ایجاد گزینه جدید{" "}
          </button> */}
        </FormControl>
        <span className={`${showRequire === true ? "" : "hidden"} text-danger`}>
          {label} الزامی است
        </span>
      </Box>
    </div>
  );
};

export default DropDown;
