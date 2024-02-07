import TextFieldsIcon from "@mui/icons-material/TextFields"; // These will be available from the sidebar
import HttpsIcon from "@mui/icons-material/Https";
import DialpadIcon from "@mui/icons-material/Dialpad";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import EmailIcon from "@mui/icons-material/Email";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import AddLinkIcon from "@mui/icons-material/AddLink";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { InputData } from "../componentbar/input/inputData";
import { v4 as uuid } from "uuid";
import { PasswordData } from "../componentbar/passWord/passwordData";
import { NumberData } from "../componentbar/number/numberData";
import { TextAreaData } from "../componentbar/textarea/textareaData";
import { CheckBoxData } from "../componentbar/checkBox/checkboxData";
import { RadioData } from "../componentbar/radioButton/radioData";
import { EmailData } from "../componentbar/email/emailData";
import { MobileData } from "../componentbar/mobilenumber/mobileData";
import { LinkData } from "../componentbar/link/linkData";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import InputIcon from "react-multi-date-picker/components/input_icon";

import "react-datepicker/dist/react-datepicker.css";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import React, { useEffect, useState } from "react";
import { DatePickerData } from "../componentbar/datePicker/dateData";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import { DropDownData } from "../componentbar/dropdown/dropDowndata";
import BackupTableIcon from "@mui/icons-material/BackupTable";
import { TableData } from "../componentbar/table/tableData";
import { getFakeData } from "../../api/appApi";
import DataTable from "react-data-table-component";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import {
  Alert,
  Button,
  ButtonBase,
  IconButton,
  OutlinedInput,
  TextField,
} from "@mui/material";
import Swal from "sweetalert2";
import { ButtonData } from "../componentbar/button/buttonData";
export let fields = [
  {
    type: "input",
    title: "ورودی",
    icon: <TextFieldsIcon />,
    group: "base",
  },
  {
    type: "button",
    title: "دکمه",
    icon: <FormatBoldIcon />,
    group: "base",
  },
  {
    type: "passWord",
    title: "رمز عبور",
    icon: <HttpsIcon />,
    group: "base",
  },
  {
    type: "number",
    title: "عدد",
    icon: <DialpadIcon />,
    group: "base",
  },
  {
    type: "textarea",
    title: "باکس متن",
    icon: <SpellcheckIcon />,
    group: "base",
  },
  {
    type: "checkBox",
    title: "چک باکس",
    icon: <CheckBoxIcon />,
    group: "base",
  },
  {
    type: "radioButton",
    title: "رادیو باتن ",
    icon: <RadioButtonCheckedIcon />,
    group: "base",
  },
  {
    type: "email",
    title: "ایمیل",
    icon: <EmailIcon />,
    group: "advance",
  },
  {
    type: "phoneNumber",
    title: "شماره همراه",
    icon: <PhoneEnabledIcon />,
    group: "advance",
  },
  {
    type: "url",
    title: "لینک",
    icon: <AddLinkIcon />,
    group: "advance",
  },
  // {
  //   type: "time",
  //   title: "ساعت",
  //   icon: <AccessTimeIcon />,
  //   group: "advance",
  // },
  {
    type: "day",
    title: "تقویم",
    icon: <CalendarMonthIcon />,
    group: "advance",
  },
  {
    type: "dropDown",
    title: "دراپ دان",
    icon: <UnfoldMoreIcon />,
    group: "advance",
  },
  {
    type: "table",
    title: "جدول",
    icon: <BackupTableIcon />,
    group: "advance",
  },
];

export let renderers = {
  table: () => {
    let {
      urlTable,
      mapPath,
      dataTable,
      // status,
    } = TableData();

    const [data, setData] = useState([]);

    useEffect(() => {
      getFakeData(urlTable).then((res) => {
        setData(res?.[mapPath]);
      });
    }, [urlTable]);
    console.log(dataTable?.dropdownNameOptions);
    return (
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        {dataTable?.dropdownNameOptions === undefined ? (
          <span className="flex flex-row justify-center m-2 text-gray-500">
            تنظیمات سرویس یافت نشد!
          </span>
        ) : (
          <table className="table-auto divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr>
                {dataTable?.dropdownNameOptions
                  ?.filter((item) => item?.name !== "" && item?.key !== "")
                  ?.map((item) => (
                    <th
                      key={item.key}
                      className="px-6 py-3 text-center text-md font-medium text-gray-500 uppercase "
                    >
                      {item.name}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {data?.map((item, index) => (
                <tr key={index}>
                  {dataTable?.dropdownNameOptions
                    ?.filter((option) => option?.key !== "")
                    ?.map((option, index) => (
                      <td
                        key={index}
                        className="px-6 text-center py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200"
                      >
                        {item[option.key]}
                      </td>
                    ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  },
  dropDown: () => {
    let {
      label,
      type,
      id,
      placeHolder,
      description,
      styleInjection,
      textColor,
      textSize,
      dropdownData,
      require,
      hidden,
      elementStatus,
    } = DropDownData();
    const [messageMinLength, setMessageMinLength] = useState(false);
    const [showRequire, setShowRequire] = useState(false);
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
    return (
      <div className={`mb-6 ${hidden === true ? "hidden" : ""}`}>
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
                  : elementStatus === "true" ||
                    elementStatus === "" ||
                    undefined
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
                  : elementStatus === "true" ||
                    elementStatus === "" ||
                    undefined
                  ? false
                  : false
              }
            >
              {dropdownData?.dropdownNameOptions?.map((item) => (
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
          <span
            className={`${showRequire === true ? "" : "hidden"} text-danger`}
          >
            {label} الزامی است
          </span>
        </Box>
      </div>
    );
  },
  input: () => {
    let {
      label,
      type,
      id,
      placeHolder,
      description,
      styleInjection,
      textColor,
      textSize,
      elementStatus,
      minLength,
      maxLength,
      require,
      hidden,
      regex,
      messageRegex,
      // status,
    } = InputData();
    console.log(messageRegex, "red");
    // console.log(textColor)
    const [messageMinLength, setMessageMinLength] = useState(false);
    const [showRequire, setShowRequire] = useState(false);
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

    return (
      <div className={`${hidden === true ? "hidden" : ""}`}>
        <label
          for="input"
          name="input"
          type="text"
          className={`block mb-2   text-gray-900 dark:text-white`}
          style={{ fontSize: `${textSize}px` }}
        >
          {require === true
            ? label?.length === 0
              ? "ورودی *"
              : label + " *"
            : label?.length === 0
            ? "ورودی"
            : label}
        </label>
        <input
          type="textField"
          name="input"
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
  },
  textarea: () => {
    let {
      label,
      type,
      id,
      placeHolder,
      description,
      styleInjection,
      textColor,
      textSize,
      elementStatus,
      minLength,
      maxLength,
      require,
      hidden,
    } = TextAreaData();
    const [messageMinLength, setMessageMinLength] = useState(false);
    const [showRequire, setShowRequire] = useState(false);
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
    return (
      <div className={`${hidden === true ? "hidden" : ""}`}>
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
  },
  checkBox: () => {
    let { label, styleInjection, textColor, textSize, elementStatus, hidden } =
      CheckBoxData();

    return (
      <div className={`${hidden === true ? "hidden" : ""}`}>
        <input
          id="default-checkbox"
          type="checkbox"
          value=""
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
          className={`ms-2 ${styleInjection} text-sm font-medium text-gray-900 dark:text-gray-300`}
          style={{ fontSize: `${textSize}px`, color: `${textColor}` }}
        >
          {label?.length === 0 ? "چک باکس " : label}
        </label>
      </div>
    );
  },
  number: () => {
    let {
      label,
      type,
      id,
      placeHolder,
      description,
      styleInjection,
      textColor,
      textSize,
      elementStatus,
      minLength,
      maxLength,
      require,
      hidden,
    } = NumberData();
    const [messageMinLength, setMessageMinLength] = useState(false);
    const [showRequire, setShowRequire] = useState(false);
    const [inputValue, setInputValue] = useState(minLength);
    useEffect(() => {
      if (inputValue?.length === 0) {
        setInputValue(minLength);
      }
      if (require === true) {
        setShowRequire(true);
      } else {
        setShowRequire(false);
      }
    }, [require, inputValue, minLength, inputValue]);

    const controlInput = (e) => {
      const newValue = parseInt(e?.target?.value, 10);

      // Check if the new value is between 15 and 20
      if (!isNaN(newValue) && newValue >= minLength && newValue <= maxLength) {
        setInputValue(newValue);
        // Add additional logic or set states as needed
      } else {
        // Handle case when the value is not between 15 and 20
        // You can show an error message or take other actions
      }
      if (e.target.value?.length === 0 && require === true) {
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
    return (
      <div className={`${hidden === true ? "hidden" : ""}`}>
        <label
          for="visitors"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          style={{ fontSize: `${textSize}px` }}
        >
          {require === true
            ? label?.length === 0
              ? "عدد  *"
              : label + " *"
            : label?.length === 0
            ? "عدد "
            : label}
        </label>
        <input
          id="visitors"
          value={inputValue}
          className={` ${styleInjection} ${
            elementStatus === "false"
              ? "bg-slate-200"
              : elementStatus === "true" || elementStatus === "" || undefined
              ? ""
              : ""
          } border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
          required={require}
          placeholder={placeHolder}
          onChange={controlInput}
          type="number"
          disabled={
            elementStatus === "false"
              ? true
              : elementStatus === "true" || elementStatus === "" || undefined
              ? false
              : false
          }
        />{" "}
        <span
          className={`block my-2 ${
            messageMinLength === true ? "" : "hidden"
          } text-secondary`}
        >
          شروع اعداد از {minLength} تا {maxLength} است
        </span>
        <span className={`${showRequire === true ? "" : "hidden"} text-danger`}>
          {label} الزامی است
        </span>
      </div>
    );
  },
  button: () => {
    let { label, styleInjection, elementStatus, hidden, require } =
      ButtonData();
    const [showRequire, setShowRequire] = useState(false);
    useEffect(() => {
      if (require === true) {
        setShowRequire(true);
      } else {
        setShowRequire(false);
      }
    }, [require]);

    return (
      <div className={`mb-6 ${hidden === true ? "hidden" : ""}`}>
        <button
          type="button"
          className={`text-white w-full ${
            elementStatus === "false"
              ? "bg-secondary"
              : elementStatus === "true" || elementStatus === "" || undefined
              ? ""
              : ""
          } ${styleInjection}  bg-blue-700  font-medium rounded-lg text-sm px-5 py-3 me-2 mb-2 `}
          required={require}
          disabled={
            elementStatus === "false"
              ? true
              : elementStatus === "true" || elementStatus === "" || undefined
              ? false
              : false
          }
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
  },
  passWord: () => {
    let {
      label,

      placeHolder,
      description,
      styleInjection,
      textColor,
      textSize,
      elementStatus,
      minLength,
      maxLength,
      require,
      hidden,
    } = PasswordData();
    const [messageMinLength, setMessageMinLength] = useState(false);
    const [showRequire, setShowRequire] = useState(false);
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
    return (
      <div className={`${hidden === true ? "hidden" : ""}`}>
        <label
          for="passWord"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          style={{ fontSize: `${textSize}px` }}
        >
          {require === true
            ? label?.length === 0
              ? "رمز عبور *"
              : label + " *"
            : label?.length === 0
            ? "رمز عبور"
            : label}
        </label>
        <input
          type="passWord"
          id="passWord"
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
        <span className={`${showRequire === true ? "" : "hidden"} text-danger`}>
          {label} الزامی است
        </span>
      </div>
    );
  },
  radioButton: () => {
    let { label, styleInjection, textColor, textSize, elementStatus, hidden } =
      RadioData();
    return (
      <div className={`${hidden === true ? "hidden" : ""}`}>
        <input
          id="default-radio-1"
          type="radio"
          value=""
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
          className={`ms-2 ${styleInjection} text-sm font-medium `}
        >
          {label?.length === 0 ? "رادیو باتن " : label}
        </label>
      </div>
    );
  },
  email: () => {
    let {
      label,

      placeHolder,
      description,
      styleInjection,
      textColor,
      textSize,
      elementStatus,
      minLength,
      maxLength,
      require,
      hidden,
    } = EmailData();
    const [messageMinLength, setMessageMinLength] = useState(false);
    const [showRequire, setShowRequire] = useState(false);
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
    return (
      <div className={`mb-6 ${hidden === true ? "hidden" : ""}`}>
        <label
          for="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          style={{ fontSize: `${textSize}px`, color: `${textColor}` }}
        >
          {require === true
            ? label?.length === 0
              ? "ایمیل  *"
              : label + " *"
            : label?.length === 0
            ? "ایمیل "
            : label}
        </label>
        <input
          type="email"
          id="email"
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
          style={{
            backgroundColor: `${styleInjection}`,
            color: `${textColor}`,
          }}
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
  },
  url: () => {
    let {
      label,
      type,
      id,
      placeHolder,
      description,
      styleInjection,
      textColor,
      textSize,
      elementStatus,
      minLength,
      maxLength,
      require,
      hidden,
    } = LinkData();
    const [messageMinLength, setMessageMinLength] = useState(false);
    const [showRequire, setShowRequire] = useState(false);
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
    return (
      <div className={`mb-6 ${hidden === true ? "hidden" : ""}`}>
        <label
          for="website"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          style={{ fontSize: `${textSize}px`, color: `${textColor}` }}
        >
          {require === true
            ? label?.length === 0
              ? "لینک *"
              : label + " *"
            : label?.length === 0
            ? " لینک"
            : label}
        </label>
        <input
          type="url"
          id="website"
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
        <span className={`${showRequire === true ? "" : "hidden"} text-danger`}>
          {label} الزامی است
        </span>
      </div>
    );
  },
  phoneNumber: () => {
    let {
      label,
      type,
      id,
      placeHolder,
      description,
      styleInjection,
      textColor,
      textSize,
      elementStatus,
      minLength,
      maxLength,
      require,
      hidden,
    } = MobileData();
    const [messageMinLength, setMessageMinLength] = useState(false);
    const [showRequire, setShowRequire] = useState(false);
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
    return (
      <form className={`mx-auto ${hidden === true ? "hidden" : ""}`}>
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
    );
  },
  // time: () => (
  //   <div className="mt-2 p-3  bg-white border border-1 rounded-lg shadow-xl">
  //     <div className="flex flex-row-reverse">
  //       <div
  //         className="relative"
  //         id="timepicker-inline-24"
  //         data-te-input-wrapper-init
  //       >
  //         <input
  //           type="text"
  //           className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
  //           id="form3"
  //         />
  //         <label
  //           for="form3"
  //           className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
  //         >
  //           Select a time
  //         </label>
  //       </div>
  //     </div>
  //   </div>
  // ),
  day: () => {
    let [startDate, setStartDate] = useState(new Date());
    let {
      label,
      type,
      id,
      placeHolder,
      description,
      styleInjection,
      textColor,
      textSize,
      elementStatus,
      minLength,
      maxLength,
      require,
      hidden,
    } = DatePickerData();
    const [messageMinLength, setMessageMinLength] = useState(false);
    const [showRequire, setShowRequire] = useState(false);
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
    return (
      <div className={`mx-auto ${hidden === true ? "hidden" : ""}`}>
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
        <div date-rangepicker className="flex items-center">
          <div
            className={`w-full border-2 border-slate-200 rounded-md ${styleInjection} ${
              elementStatus === "false"
                ? "bg-slate-200"
                : elementStatus === "true" || elementStatus === "" || undefined
                ? ""
                : ""
            }`}
          >
            <DatePicker
              render={<InputIcon className="p-2" />}
              className={`w-full  mx-6 ${styleInjection} ${
                elementStatus === "false"
                  ? "bg-slate-200"
                  : elementStatus === "true" ||
                    elementStatus === "" ||
                    undefined
                  ? ""
                  : ""
              }`}
              style={{
                backgroundColor: "#fff",
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
                  : elementStatus === "true" ||
                    elementStatus === "" ||
                    undefined
                  ? false
                  : false
              }
            />
          </div>
        </div>
      </div>
    );
  },
};
