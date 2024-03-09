import React, { useState } from "react";
import Content from "./Content";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import { InputConfig } from "../componentbar/input/inputConfig";
import { PasswordConfig } from "../componentbar/passWord/passwordConfig";
import { NumberConfig } from "../componentbar/number/numberConfig";
import { TextareaConfig } from "../componentbar/textarea/textareaConfig";
import { CheckBoxConfig } from "../componentbar/checkBox/checkboxConfig";
import { RadioConfig } from "../componentbar/radioButton/radionConfig";
import { EmailConfig } from "../componentbar/email/emailConfig";
import { MobileConfig } from "../componentbar/mobilenumber/mobileConfig";
import { LinkConfig } from "../componentbar/link/linkConfig";
import { DateConfig } from "../componentbar/datePicker/dateConfig";
import { DDConfig } from "../componentbar/dropdown/dropDownConfig";
import { TableConfig } from "../componentbar/table/tableConfig";
import { ButtonConfig } from "../componentbar/button/buttonConfig";
import { useDispatch, useSelector } from "react-redux";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Add, AddAPhoto, DeleteOutline } from "@mui/icons-material";
import { Box, Modal } from "@mui/material";
import PrimaryNavbar from "../../components/Navbar/PrimaryNavbar";
import { v4 as uuid } from "uuid";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const PlaceHolder = (props) => {
  const idRow = uuid();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [rowCount, setRowCount] = useState(1);
  const [userData, setUserData] = useState({});
  let elementType = useSelector(
    (state) => state?.typeElementReducer?.type?.type
  );
  const changeHandler = (index, data) => {
    console.log(data);
    // setOpen(true)
    setUserData({ ...userData, [index]: [...data] });
  };
  const deleteHandler = (index) => {
    setRowCount((prevCount) => prevCount - 1);
  };
  const save = () => {
    console.log(userData);
    alert("Find the JSON for the current dashboard design in the console log.");
  };
  let title = useSelector((state) => state?.formLabelToDrawReducer?.title);

  return (
    <div
      className={` ${open === true ? "opacity-10" : ""}`}
      style={{ height: "100%", direction: "ltr" }}
    >
      <PrimaryNavbar />
      <div className="p-3 ">
        <hr className="bg-slate-100 h-1" />
      </div>

      <div className="   text-right  text-lg" style={{ direction: "rtl" }}>
        <div className="flex flex-row  gap-x-1 mx-4">
          <div className="-mt-1.5 ">
            {" "}
            <Link to={"/"}>
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M5.27446 10.1262C5 10.7229 5 11.4018 5 12.7595V16.9999C5 18.8856 5 19.8284 5.58579 20.4142C6.11733 20.9457 6.94285 20.9949 8.5 20.9995V16C8.5 14.8954 9.39543 14 10.5 14H13.5C14.6046 14 15.5 14.8954 15.5 16V20.9995C17.0572 20.9949 17.8827 20.9457 18.4142 20.4142C19 19.8284 19 18.8856 19 16.9999V12.7595C19 11.4018 19 10.7229 18.7255 10.1262C18.4511 9.52943 17.9356 9.08763 16.9047 8.20401L15.9047 7.34687C14.0414 5.74974 13.1098 4.95117 12 4.95117C10.8902 4.95117 9.95857 5.74974 8.09525 7.34687L7.09525 8.20401C6.06437 9.08763 5.54892 9.52943 5.27446 10.1262ZM13.5 20.9999V16H10.5V20.9999H13.5Z"
                  fill="#2C2E43"
                />
              </svg>
            </Link>
          </div>
          <div className="text-[#2C2E43]">/</div>
          <div className="text-slate-500">
            {" "}
            مدیریت فرم <span className="text-slate-500">{title}</span>
          </div>
        </div>
      </div>
      <div className="p-3 ">
        <hr className="bg-slate-100 h-1" />
      </div>
      <div
        className="text-right mr-[388px]"
        style={{
          marginTop: "-3px",
        }}
      >
        <div></div>

        <div>
          {" "}
          {/* <button
            className="bg-[#3E79B1] text-xl rounded-md text-slate-100 hover:text-white p-2 no-underline mr-7"
            onClick={() => {
              setRowCount(rowCount + 1);
            }}
          >
            اضافه کردن ردیف
            <Add />
          </button> */}
        </div>
      </div>
      <div
        className="   h-[670px] "
        style={{ display: "flex", flexDirection: "row" }}
      >
        <div className="flex  w-100 flex-row gap-20">
          <div className="">
            <div
              dir="rtl"
              className="  mt-3 flex-col overflow-y-scroll overflow-x-hidden gap-y-4 bg-[#ffffff] border border-slate-200 rounded-lg  mx-1 w-[456px] h-[620px] px-5 py-7 "
            >
              <div>
                {elementType === "input" ? (
                  <InputConfig />
                ) : elementType === "passWord" ? (
                  <PasswordConfig />
                ) : elementType === "number" ? (
                  <NumberConfig />
                ) : elementType === "textarea" ? (
                  <TextareaConfig />
                ) : elementType === "checkBox" ? (
                  <CheckBoxConfig />
                ) : elementType === "radioButton" ? (
                  <RadioConfig />
                ) : elementType === "email" ? (
                  <EmailConfig />
                ) : elementType === "phoneNumber" ? (
                  <MobileConfig />
                ) : elementType === "url" ? (
                  <LinkConfig />
                ) : elementType === "day" ? (
                  <DateConfig />
                ) : elementType === "dropDown" ? (
                  <DDConfig />
                ) : elementType === "table" ? (
                  <TableConfig />
                ) : elementType === "button" ? (
                  <ButtonConfig />
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <div className="border-1   mt-3 rounded-md -ml-2 px-4 py-2 overflow-y-scroll overflow-x-hidden w-100   h-[635px] ">
            {[...Array(rowCount)].map((_, index) => {
              return (
                <>
                  <div className="pt-1" key={index} style={{ marginBottom: 10 }}>
                    <Content
                      change={(data) => {
                        changeHandler(index, data);
                      }}
                    ></Content>
                  </div>
                </>
              );
            })}
          </div>
          <Sidebar></Sidebar>
        </div>
      </div>

      {/* <Modal
        open={open}
        onClose={handleClose}
        className="flex flex-row justify-center items-center"
      >
        <div className="flex flex-col overflow-scroll gap-y-4 bg-[#ffffff] border border-slate-200 rounded-lg mt-3 mx-1 w-[456px] h-[720px] px-5 py-7 ">
          <div>
            {elementType === "input" ? (
              <InputConfig />
            ) : elementType === "passWord" ? (
              <PasswordConfig />
            ) : elementType === "number" ? (
              <NumberConfig />
            ) : elementType === "textarea" ? (
              <TextareaConfig />
            ) : elementType === "checkBox" ? (
              <CheckBoxConfig />
            ) : elementType === "radioButton" ? (
              <RadioConfig />
            ) : elementType === "email" ? (
              <EmailConfig />
            ) : elementType === "phoneNumber" ? (
              <MobileConfig />
            ) : elementType === "url" ? (
              <LinkConfig />
            ) : elementType === "day" ? (
              <DateConfig />
            ) : elementType === "dropDown" ? (
              <DDConfig />
            ) : elementType === "table" ? (
              <TableConfig />
            ) : elementType === "button" ? (
              <ButtonConfig />
            ) : (
              <InputConfig />
            )}
          </div>
        </div>
      </Modal> */}
    </div>
  );
};

export default PlaceHolder;
