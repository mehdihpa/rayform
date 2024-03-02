import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
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

import FormatBoldIcon from "@mui/icons-material/FormatBold";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import BackupTableIcon from "@mui/icons-material/BackupTable";
import { v4 as uuid } from "uuid";

import InputSide from "./sidebarComponent/InputSide";
import ButtonSlide from "./sidebarComponent/ButtonSlide";
import PasswordSide from "./sidebarComponent/PasswordSide";
import NumberSide from "./sidebarComponent/NumberSide";
import TextAreaSlide from "./sidebarComponent/TextAreaSide";
import CheckBoxSide from "./sidebarComponent/CheckBoxSide";
import RadioSide from "./sidebarComponent/RadioSide";
import EmailSide from "./sidebarComponent/EmailSide";
import PhoneNumber from "./components/PhoneNumber";
import PhoneNumberSide from "./sidebarComponent/PhoneNumberSide";
import LinkSide from "./sidebarComponent/LinkSide";
import DropDownSide from "./sidebarComponent/DropDownSide";
import CalenderSide from "./sidebarComponent/CalenderSide";
import TableSide from "./sidebarComponent/TableSide";

const Sidebar = (props) => {
  // uniqueIdElement
  const unique = uuid();
  const list = [
    { name: "input", id: unique },
    { name: "button", id: unique },
    { name: "passWord", id: unique },
    { name: "number", id: unique },
    { name: "textarea", id: unique },
    { name: "checkBox", id: unique },
    { name: "radioButton", id: unique },
    { name: "email", id: unique },
    { name: "phoneNumber", id: unique },
    { name: "url", id: unique },
    { name: "dropDown", id: unique },
    { name: "day", id: unique },
    { name: "table", id: unique },
  ];
  //
  const [open, setOpen] = useState("1");
  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };
  return (
    <div
      className="overflow-y-scroll overflow-x-hidden "
      style={{
        backgroundColor: "#fff",
        width: 600,
        display: "flex",
        margin: "10px 10px",
        padding: "5px",
        height: "635px",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* <br></br> */}
      <Accordion style={{ direction: "rtl" }} defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography
            style={{
              color: "black",
              margin: 10,
              width: 210,
              fontSize: 30,
              textAlign: "right",
            }}
          >
            پایه
          </Typography>
        </AccordionSummary>

        <AccordionDetails className="text-right">
          {list.map((ele, index) => {
            if (ele.name === "input") {
              return (
                <InputSide key={index} name={ele.name} _id={ele.id}></InputSide>
              );
            }
            if (ele.name === "button") {
              return (
                <ButtonSlide
                  key={index}
                  name={ele.name}
                  _id={ele.id}
                ></ButtonSlide>
              );
            }
            if (ele.name === "passWord") {
              return (
                <PasswordSide
                  key={index}
                  name={ele.name}
                  _id={ele.id}
                ></PasswordSide>
              );
            }
            if (ele.name === "number") {
              return (
                <NumberSide
                  key={index}
                  name={ele.name}
                  _id={ele.id}
                ></NumberSide>
              );
            }
            if (ele.name === "textarea") {
              return (
                <TextAreaSlide
                  key={index}
                  name={ele.name}
                  _id={ele.id}
                ></TextAreaSlide>
              );
            }
            if (ele.name === "checkBox") {
              return (
                <CheckBoxSide
                  key={index}
                  name={ele.name}
                  _id={ele.id}
                ></CheckBoxSide>
              );
            }
            if (ele.name === "radioButton") {
              return (
                <RadioSide key={index} name={ele.name} _id={ele.id}></RadioSide>
              );
            }

            if (ele.name === "Pie") {
              return (
                <button
                  className="pb-3 text-xl w-full  my-2 bg-[#3E79B1] text-slate-100 hover:text-white rounded-md p-2 no-underline"
                  key={index}
                  name={ele.name}
                  _id={ele.id}
                >
                  عدد
                </button>
              );
            }
          })}
        </AccordionDetails>
      </Accordion>
      <Accordion style={{ direction: "rtl", marginTop: 10 }} defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography
            style={{
              color: "black",
              margin: 10,
              width: 210,
              fontSize: 30,
              textAlign: "right",
            }}
          >
            پیشرفته
          </Typography>
        </AccordionSummary>

        <AccordionDetails className="text-right">
          {list.map((ele, index) => {
            if (ele.name === "email") {
              return (
                <EmailSide key={index} name={ele.name} _id={ele.id}></EmailSide>
              );
            }
            if (ele.name === "phoneNumber") {
              return (
                <PhoneNumberSide
                  key={index}
                  name={ele.name}
                  _id={ele.id}
                ></PhoneNumberSide>
              );
            }
            if (ele.name === "url") {
              return (
                <LinkSide key={index} name={ele.name} _id={ele.id}></LinkSide>
              );
            }
            if (ele.name === "day") {
              return (
                <CalenderSide
                  key={index}
                  name={ele.name}
                  _id={ele.id}
                ></CalenderSide>
              );
            }
            if (ele.name === "dropDown") {
              return (
                <DropDownSide
                  key={index}
                  name={ele.name}
                  _id={ele.id}
                ></DropDownSide>
              );
            }
            if (ele.name === "table") {
              return (
                <TableSide key={index} name={ele.name} _id={ele.id}></TableSide>
              );
            }
          })}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default Sidebar;
