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
import { nanoid } from "nanoid";
// import { Line } from 'react-chartjs-2';

const DropDown = (props) => {
  const [messageMinLength, setMessageMinLength] = useState(false);
  const [showRequire, setShowRequire] = useState(false);
  const json = useSelector((state) => state?.genericElementConfigReducer);
  const label = json.element
    .filter((item) => item?.uuid === props?.id)
    .map((item) => item.label);
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
    .map((item) => item.dropdownData);
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
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    if (event.target.value.length === 0 && require === true) {
      setShowRequire(true);
    } else {
      setShowRequire(false);
    }
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const controlInput = (e) => {
    setText(e.target.value);
    console.log(e.target.value);
    if (e.target.value.length === 0 && require === true) {
      setShowRequire(true);
    } else {
      setShowRequire(false);
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
      label: selectedElement?.label || "دراپ دان",
      description: selectedElement?.description || "",
      styleInjection: selectedElement?.styleInjection || "",
      textColor: selectedElement?.textColor || "",
      type: "dropDown",
      textSize: selectedElement?.textSize || "",
      elementStatus: selectedElement?.elementStatus || "",
      minLength: selectedElement?.minLength || "",
      maxLength: selectedElement?.maxLength || "",
      require: selectedElement?.require || false,
      hidden: selectedElement?.hidden || false,
      dropdownData: selectedElement?.dropdownData || "",
      key: key,
      value: personName,
      regex: "",
      messageRegex: "",
      width: elements
        .filter((item) => item?.firstChild?.id === props?.id)
        .map((item) => item?.style?.width)[0],
      transform: selectedElement?.transform || "",
    };

    dispatchConfgi(dropdownConfig(newElement));
  }, [
    personName,
    elements
      .filter((item) => item?.firstChild?.id === props?.id)
      .map((item) => item?.style?.width)[0],
  ]);
  return (
    <div dir="rtl" className="mb-3 p-2">
      <Box sx={{ minWidth: 120 }}>
        <FormControl className="mt-3" fullWidth>
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
            multiple
            value={personName}
            onChange={handleChange}
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
