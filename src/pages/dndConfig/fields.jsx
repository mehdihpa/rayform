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
import DatePicker from "react-datepicker";
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
import { TextField } from "@mui/material";
export let fields = [
  {
    type: "input",
    title: "ورودی",
    icon: <TextFieldsIcon />,
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
    let [age, setAge] = React.useState("");
    let {
      label,
      type,
      id,
      placeHolder,
      description,
      bgColor,
      textColor,
      textSize,
      // status,
    } = TableData();
    let handleChange = (event) => {
      setAge(event.target.value);
    };
    const [data, setData] = useState([]);
    getFakeData().then((res) => {
      setData(res?.data);
    });
    console.log(data);
    const columns = [
      {
        name: "نام ",
        selector: (row) => row.name,
      },
      {
        name: "نام کاربری",
        selector: (row) => row.username,
      },
      {
        name: "ایمیل",
        selector: (row) => row.email,
      },
      {
        name: "موبایل",
        selector: (row) => row.phone,
      },
    ];
    return (
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <DataTable columns={columns} data={data} />
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
      bgColor,
      textColor,
      textSize,
      // status,
    } = DropDownData();

    const [age, setAge] = useState("");
    const [dynamicMenuItems, setDynamicMenuItems] = useState([
      { value: 10, label: "Ten" },
      { value: 20, label: "Twenty" },
      { value: 30, label: "Thirty" },
    ]);
    const [newItem, setNewItem] = useState("");
    const handleChange = (event) => {
      setAge(event.target.value);
    };

    const handleNewItemChange = (event) => {
      setNewItem(event.target.value);
    };

    const addNewItem = () => {
      if (newItem.trim() === "") {
        return;
      }
      const newItemObject = {
        value: dynamicMenuItems.length + 1,
        label: newItem.trim(),
      };
      setDynamicMenuItems([...dynamicMenuItems, newItemObject]);
      setNewItem("");
    };

    return (
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel
            id="demo-simple-select-label"
            style={{ fontSize: `${textSize}px`, color: `${textColor}` }}
          >
            {" "}
            {label?.length === 0 ? "دراپ دان" : label}
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            onChange={handleChange}
            style={{ backgroundColor: bgColor, color: textColor }}
          >
            {dynamicMenuItems.map((item) => (
              <MenuItem
                key={item.value}
                value={item.value}
                style={{ color: textColor }}
              >
                {item.label}
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
      </Box>
    );
  },
  input: () => {
    let {
      label,
      type,
      id,
      placeHolder,
      description,
      bgColor,
      textColor,
      textSize,
      // status,
    } = InputData();
    useEffect(() => {}, [label]);
    return (
      <div>
        <label
          for="input"
          name="input"
          type="text"
          className={`block mb-2  text-gray-900 dark:text-white`}
          style={{ fontSize: `${textSize}px` }}
        >
          {label?.length === 0 ? "ورودی" : label}
        </label>
        <input
          type="textField"
          name="input"
          className={` border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400   dark:focus:ring-blue-500 dark:focus:border-blue-500`}
          required
          placeholder={placeHolder}
          style={{ backgroundColor: `${bgColor}`, color: `${textColor}` }}
          // disabled={status}
        />{" "}
        <p
          className={`  mx-1 my-2 px-1  rounded-md`}
          style={{ backgroundColor: `${bgColor}`, color: `${textColor}` }}
        >
          {description}
        </p>
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
      bgColor,
      textColor,
      textSize,
      // status,
    } = TextAreaData();
    return (
      <div className="flex flex-col gap-y-5">
        <label
          for="message"
          className="block mb-2 text-sm  font-medium text-gray-900 dark:text-white"
          style={{ fontSize: `${textSize}px` }}
        >
          {label?.length === 0 ? "باکس متن" : label}
        </label>
        <textarea
          id="message"
          rows="4"
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={placeHolder}
          style={{ backgroundColor: `${bgColor}`, color: `${textColor}` }}
        ></textarea>
      </div>
    );
  },
  checkBox: () => {
    let {
      label,
      type,
      id,
      placeHolder,
      description,
      bgColor,
      textColor,
      textSize,
      // status,
    } = CheckBoxData();
    return (
      <div className="flex items-center mb-4">
        <input
          id="default-checkbox"
          type="checkbox"
          value=""
          style={{ backgroundColor: `${bgColor}`, color: `${textColor}` }}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label
          for="default-checkbox"
          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          style={{ fontSize: `${textSize}px`, color: `${textColor}` }}
        >
          {label?.length === 0 ? "چک باکس" : label}
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
      bgColor,
      textColor,
      textSize,
      // status,
    } = NumberData();
    return (
      <div>
        <label
          for="visitors"
          className={`block mb-2`}
          style={{ fontSize: `${textSize}px` }}
        >
          {label?.length === 0 ? "عدد" : label}
        </label>
        <input
          type="number"
          id="visitors"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={placeHolder}
          style={{ backgroundColor: `${bgColor}`, color: `${textColor}` }}
        />{" "}
        <p
          className={`  mx-1 my-2 px-1  rounded-md`}
          style={{ backgroundColor: `${bgColor}`, color: `${textColor}` }}
        >
          {description}
        </p>
      </div>
    );
  },
  button: () => <button>دکمه</button>,
  passWord: () => {
    let {
      label,
      type,
      id,
      placeHolder,
      description,
      bgColor,
      textColor,
      textSize,
      // status,
    } = PasswordData();
    return (
      <div className="mb-6">
        <label
          for="passWord"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          style={{ fontSize: `${textSize}px` }}
        >
          {label?.length === 0 ? "رمز عبور" : label}
        </label>
        <input
          type="passWord"
          id="passWord"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
          placeholder={placeHolder}
          style={{ backgroundColor: `${bgColor}`, color: `${textColor}` }}
        />
        <p
          className={`  mx-1 my-2 px-1  rounded-md`}
          style={{ backgroundColor: `${bgColor}`, color: `${textColor}` }}
        >
          {description}
        </p>
      </div>
    );
  },
  radioButton: () => {
    let {
      label,
      type,
      id,
      placeHolder,
      description,
      bgColor,
      textColor,
      textSize,
      // status,
    } = RadioData();
    return (
      <div className="flex items-center mb-4">
        <input
          id="default-radio-1"
          type="radio"
          value=""
          name="default-radio"
          style={{ backgroundColor: `${bgColor}`, color: `${textColor}` }}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label
          for="default-checkbox"
          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          style={{ fontSize: `${textSize}px`, color: `${textColor}` }}
        >
          {label?.length === 0 ? "رادیو باتن" : label}
        </label>
      </div>
    );
  },
  email: () => {
    let {
      label,
      type,
      id,
      placeHolder,
      description,
      bgColor,
      textColor,
      textSize,
      // status,
    } = EmailData();
    return (
      <div className="mb-6">
        <label
          for="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          style={{ fontSize: `${textSize}px`, color: `${textColor}` }}
        >
          {label?.length === 0 ? " ایمیل" : label}
        </label>
        <input
          type="email"
          id="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
          placeholder={placeHolder}
          style={{ backgroundColor: `${bgColor}`, color: `${textColor}` }}
        />
        <p
          className={`  mx-1 my-2 px-1  rounded-md`}
          style={{ backgroundColor: `${bgColor}`, color: `${textColor}` }}
        >
          {description}
        </p>
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
      bgColor,
      textColor,
      textSize,
      // status,
    } = LinkData();
    return (
      <div>
        <label
          for="website"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          style={{ fontSize: `${textSize}px`, color: `${textColor}` }}
        >
          {label?.length === 0 ? " لینک" : label}
        </label>
        <input
          type="url"
          id="website"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={placeHolder}
          style={{ backgroundColor: `${bgColor}`, color: `${textColor}` }}
          required
        />
        <p
          className={`  mx-1 my-2 px-1  rounded-md`}
          style={{ backgroundColor: `${bgColor}`, color: `${textColor}` }}
        >
          {description}
        </p>
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
      bgColor,
      textColor,
      textSize,
      // status,
    } = MobileData();
    console.log(label, "label");

    return (
      <form className=" mx-auto">
        <label
          for="phone-input"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          style={{ fontSize: `${textSize}px`, color: `${textColor}` }}
        >
          {label?.length === 0 ? " شماره همراه" : label}
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
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            required
            placeholder={placeHolder}
            style={{ backgroundColor: `${bgColor}`, color: `${textColor}` }}
          />
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
      bgColor,
      textColor,
      textSize,
      // status,
    } = DatePickerData();
    console.log(label, "label");
    return (
      <div>
        <label
          for="input"
          name="input"
          type="text"
          className={`block mb-2  text-gray-900 dark:text-white`}
          style={{ fontSize: `${textSize}px` }}
        >
          {label?.length === 0 ? "تقویم" : label}
        </label>
        <div date-rangepicker className="flex items-center">
          <div className="w-full border-2 border-slate-200 rounded-md">
            <DatePicker
              className="w-full p-2 mx-6"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              showIcon
            />
          </div>
        </div>
      </div>
    );
  },
};
