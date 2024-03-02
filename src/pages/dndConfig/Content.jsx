import React, { useState } from "react";
import { ItemTypes } from "./ItemTypes";
import { useDrop } from "react-dnd";
import BarChart from "./components/Button";
import PieChart from "./components/Password";
import RGL, { WidthProvider } from "react-grid-layout";
//  import css -- IMP!!!
import "../../../node_modules/react-grid-layout/css/styles.css";
import "../../../node_modules/react-resizable/css/styles.css";
import "../dndConfig/Content.css";
import Input from "./components/Input";
import Button from "./components/Button";
import Password from "./components/Password";
import Number from "./components/Number";
import TextArea from "./components/TextArea";
import CheckBox from "./components/CheckBox";
import Radio from "./components/Radio";
import Email from "./components/Email";
import PhoneNumber from "./components/PhoneNumber";
import Link from "./components/Link";

import { useDispatch, useSelector } from "react-redux";
import {
  buttonConfig,
  dateConfig,
  dropdownConfig,
  emailConfig,
  inputConfig,
  linkConfig,
  mobileConfig,
  numberConfig,
  passwordConfig,
  radioConfig,
  setIdElement,
  showEdit,
  tableConfig,
  textAreaConfig,
  typeElelment,
} from "../../redux/action";
import { DeleteOutline, Edit } from "@mui/icons-material";
import DropDown from "./components/DropDown.";
import Calender from "./components/Calender";
import Table from "./components/Table";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";

const ReactGridLayout = WidthProvider(RGL);
const Content = (props) => {
  const [row, setRow] = useState([]);
  const [layout, setLayout] = useState([
    { i: 1, x: 0, y: 0, w: 1, h: 1, minH: 1, maxH: 1 }, // *** -- minH & maxH doesnt effect the grid items
    { i: 2, x: 2, y: 0, w: 1, h: 1, minH: 1, maxH: 1 },
    // {i: '3', x: 0, y: 0, w: 1, h: 1, minH: 1, maxH: 1},
    // {i: '4', x: 0, y: 0, w: 1, h: 1, minH: 1, maxH: 1}
  ]);
  const [resizeplotly, setResizePlotly] = useState(false);
  const onLayoutChange = (layout) => {
    setLayout(layout);
  };
  let dispatchELementType = useDispatch();

  let elementType = useSelector(
    (state) => state?.typeElementReducer?.type?.type
  );
  const onResize = (layouts) => {
    console.log(layouts);
    setLayout(layouts);
  };
  const [currentPosition, setCurrentPosition] = useState({
    xRate: 0,
    yRate: 10,
  });

  const onDrag = (e, data) => {
    setCurrentPosition({ xRate: data.lastX, yRate: data.lastY });
  };
  let json = useSelector((state) => state?.genericElementConfigReducer);
  let dispatchDisplay = useDispatch();
  let deleteElement = useDispatch();
  let setIdElementDispatch = useDispatch();
  let resetElementType = useDispatch();

  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: (item, monitor) => {
      if (row.length < 1000) {
        setRow((old) => {
          props.change([...old, { name: item?.name, id: item?.id }]);
          return [...old, { name: item?.name, id: item?.id }];
        });
      } else {
        alert("Maximum 4 items allowed on a row");
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });
  console.log(row);
  const handleRemoveClick = (itemId) => {
    setRow((old) => old.filter((item) => item.id !== itemId));
  };

  return (
    <div className="">
      <div className=" mr-2 -mt-6  " ref={drop} style={{ height: "auto" }}>
        <ReactGridLayout
          compactType={"horizontal"}
          // rowHeight= {200}
          cols={4}
          onResize={onResize}
          width={100}
          layout={layout}
          onLayoutChange={onLayoutChange}
          // draggableHandle=".MyDragHandleClassName"
          draggableCancel=".MyDragCancel"
          isBounded={true}
        >
          {row.length !== 0 ? (
            row.map((ele, index) => {
              console.log(index);
              return (
                //            {/* <Draggable
                //   position={{
                //     x: currentPosition.xRate,
                //     y: currentPosition.yRate,
                //   }}
                //   onDrag={onDrag}
                // >
                //   <div className="Piece">
                //     <span className="Piece-phrase "> */}
                <div className="" key={index + 1}>
                  {ele.name === "input" ? (
                    <>
                      <DeleteOutline
                        className="text-red-600 cursor-pointer"
                        onClick={() => {
                          deleteElement({
                            type: "deleteElement",
                            uuid: ele.id,
                          });
                          handleRemoveClick(ele.id);
                          setIdElementDispatch(setIdElement(ele?.id));
                          resetElementType(
                            typeElelment({
                              type: undefined,
                              id: undefined,
                            })
                          );
                        }}
                      />
                      <Edit
                        className="ml-3 text-orange-400 cursor-pointer"
                        onClick={() => {
                          dispatchDisplay(showEdit(true));

                          dispatchELementType(
                            typeElelment({ type: ele?.name, id: ele?.id })
                          );
                          // dispatchDisplay(showEdit(true));

                          let dataInput = json.element.find(
                            (item) => item?.uuid === ele?.id
                          );

                          ele?.type === "input"
                            ? dispatchConfgi(
                                inputConfig({
                                  uuid: ele?.id,
                                  label: dataInput?.label,
                                  placeHolder: dataInput?.placeHolder,
                                  description: dataInput?.description,
                                  // status: dataInput?.status,
                                  styleInjection: dataInput?.styleInjection,
                                  textColor: dataInput?.textColor,
                                  textSize: dataInput?.textSize,
                                  type: "input",
                                  elementStatus: dataInput?.elementStatus,
                                  minLength: dataInput?.minLength,
                                  maxLength: dataInput?.maxLength,
                                  require: dataInput?.require,
                                  hidden: dataInput?.hidden,
                                  regex: dataInput?.regex,
                                  messageRegex: dataInput?.messageRegex,
                                })
                              )
                            : "";
                        }}
                      />

                      <Input id={ele.id} factor={index + 1}></Input>
                    </>
                  ) : ele.name === "button" ? (
                    <>
                      <DeleteOutline
                        className="text-red-600 cursor-pointer"
                        onClick={() => {
                          deleteElement({
                            type: "deleteElement",
                            uuid: ele.id,
                          });
                          handleRemoveClick(ele.id);
                          setIdElementDispatch(setIdElement(ele?.id));
                          resetElementType(
                            typeElelment({
                              type: undefined,
                              id: undefined,
                            })
                          );
                        }}
                      />
                      <Edit
                        className="ml-3 text-orange-400 cursor-pointer"
                        onClick={() => {
                          dispatchELementType(
                            typeElelment({ type: ele?.name, id: ele?.id })
                          );
                          dispatchDisplay(showEdit(true));

                          let buttonData = json.element.find(
                            (item) => item?.uuid === ele?.id
                          );

                          ele?.type === "button"
                            ? dispatchConfgi(
                                buttonConfig({
                                  uuid: ele?.id,
                                  label: buttonData?.label,
                                  elementStatus: buttonData?.elementStatus,
                                  require: buttonData?.require,
                                  type: "button",
                                  hidden: buttonData?.hidden,
                                  styleInjection: buttonData?.styleInjection,
                                })
                              )
                            : "";
                        }}
                      />

                      <Button id={ele.id} factor={index + 1}></Button>
                    </>
                  ) : ele.name === "passWord" ? (
                    <>
                      <DeleteOutline
                        className="text-red-600 cursor-pointer"
                        onClick={() => {
                          deleteElement({
                            type: "deleteElement",
                            uuid: ele.id,
                          });
                          handleRemoveClick(ele.id);
                          setIdElementDispatch(setIdElement(ele?.id));
                          resetElementType(
                            typeElelment({
                              type: undefined,
                              id: undefined,
                            })
                          );
                        }}
                      />
                      <Edit
                        className="ml-3 text-orange-400 cursor-pointer"
                        onClick={() => {
                          dispatchELementType(
                            typeElelment({ type: ele?.name, id: ele?.id })
                          );
                          dispatchDisplay(showEdit(true));

                          let dataPassword = json.element.find(
                            (item) => item?.uuid === ele?.id
                          );

                          ele?.type === "passWord"
                            ? dispatchConfgi(
                                passwordConfig({
                                  uuid: ele?.id,
                                  label: dataPassword?.label,
                                  placeHolder: dataPassword?.placeHolder,
                                  description: dataPassword?.description,
                                  // status: dataInput?.status,
                                  styleInjection: dataPassword?.styleInjection,
                                  textColor: dataPassword?.textColor,
                                  textSize: dataPassword?.textSize,
                                  type: "passWord",
                                  elementStatus: dataPassword?.elementStatus,
                                  minLength: dataPassword?.minLength,
                                  maxLength: dataPassword?.maxLength,
                                  require: dataPassword?.require,
                                  hidden: dataPassword?.hidden,
                                })
                              )
                            : "";
                        }}
                      />
                      <Password id={ele.id} factor={index + 1}></Password>
                    </>
                  ) : ele.name === "number" ? (
                    <>
                      <DeleteOutline
                        className="text-red-600 cursor-pointer"
                        onClick={() => {
                          deleteElement({
                            type: "deleteElement",
                            uuid: ele.id,
                          });
                          handleRemoveClick(ele.id);
                          setIdElementDispatch(setIdElement(ele?.id));
                          resetElementType(
                            typeElelment({
                              type: undefined,
                              id: undefined,
                            })
                          );
                        }}
                      />
                      <Edit
                        className="ml-3 text-orange-400 cursor-pointer"
                        onClick={() => {
                          dispatchELementType(
                            typeElelment({ type: ele?.name, id: ele?.id })
                          );
                          dispatchDisplay(showEdit(true));

                          let dataNumber = json.element.find(
                            (item) => item?.uuid === ele?.id
                          );

                          ele?.type === "number"
                            ? dispatchConfgi(
                                numberConfig({
                                  uuid: ele?.id,
                                  label: dataNumber?.label,
                                  placeHolder: dataNumber?.placeHolder,
                                  description: dataNumber?.description,
                                  // status: dataInput?.status,
                                  styleInjection: dataNumber?.styleInjection,

                                  textColor: dataNumber?.textColor,
                                  textSize: dataNumber?.textSize,
                                  type: "number",
                                  elementStatus: dataNumber?.elementStatus,
                                  minLength: dataNumber?.minLength,
                                  maxLength: dataNumber?.maxLength,
                                  require: dataNumber?.require,
                                  hidden: dataNumber?.hidden,
                                })
                              )
                            : "";
                        }}
                      />
                      <Number id={ele.id} factor={index + 1}></Number>
                    </>
                  ) : ele.name === "textarea" ? (
                    <>
                      <DeleteOutline
                        className="text-red-600 cursor-pointer"
                        onClick={() => {
                          deleteElement({
                            type: "deleteElement",
                            uuid: ele.id,
                          });
                          handleRemoveClick(ele.id);
                          setIdElementDispatch(setIdElement(ele?.id));
                          resetElementType(
                            typeElelment({
                              type: undefined,
                              id: undefined,
                            })
                          );
                        }}
                      />
                      <Edit
                        className="ml-3 text-orange-400 cursor-pointer"
                        onClick={() => {
                          dispatchELementType(
                            typeElelment({ type: ele?.name, id: ele?.id })
                          );
                          dispatchDisplay(showEdit(true));

                          let dataTextArea = json.element.find(
                            (item) => item?.uuid === ele?.id
                          );

                          ele?.type === "textarea"
                            ? dispatchConfgi(
                                textAreaConfig({
                                  uuid: ele?.id,
                                  label: dataTextArea?.label,
                                  placeHolder: dataTextArea?.placeHolder,
                                  description: dataTextArea?.description,
                                  // status: dataInput?.status,
                                  styleInjection: dataTextArea?.styleInjection,

                                  textColor: dataTextArea?.textColor,
                                  textSize: dataTextArea?.textSize,
                                  type: "textarea",
                                  elementStatus: dataTextArea?.elementStatus,
                                  minLength: dataTextArea?.minLength,
                                  maxLength: dataTextArea?.maxLength,
                                  require: dataTextArea?.require,
                                  hidden: dataTextArea?.hidden,
                                })
                              )
                            : "";
                        }}
                      />
                      <TextArea id={ele.id} factor={index + 1}></TextArea>
                    </>
                  ) : ele.name === "checkBox" ? (
                    <>
                      <DeleteOutline
                        className="text-red-600 cursor-pointer"
                        onClick={() => {
                          deleteElement({
                            type: "deleteElement",
                            uuid: ele.id,
                          });
                          handleRemoveClick(ele.id);
                          setIdElementDispatch(setIdElement(ele?.id));
                          resetElementType(
                            typeElelment({
                              type: undefined,
                              id: undefined,
                            })
                          );
                        }}
                      />{" "}
                      <Edit
                        className="ml-3 text-orange-400 cursor-pointer"
                        onClick={() => {
                          dispatchELementType(
                            typeElelment({ type: ele?.name, id: ele?.id })
                          );
                          dispatchDisplay(showEdit(true));

                          let checkBox = json.element.find(
                            (item) => item?.uuid === ele?.id
                          );

                          ele?.type === "checkBox"
                            ? dispatchConfgi(
                                checkBoxConfig({
                                  uuid: ele?.id,
                                  label: checkBox?.label,
                                  placeHolder: checkBox?.placeHolder,
                                  description: checkBox?.description,
                                  // status: dataInput?.status,
                                  styleInjection: checkBox?.styleInjection,

                                  textColor: checkBox?.textColor,
                                  textSize: checkBox?.textSize,
                                  type: "checkBox",
                                  hidden: checkBox?.hidden,
                                  elementStatus: checkBox?.elementStatus,
                                })
                              )
                            : "";
                        }}
                      />{" "}
                      <CheckBox id={ele.id} factor={index + 1}></CheckBox>
                    </>
                  ) : ele.name === "radioButton" ? (
                    <>
                      <DeleteOutline
                        className="text-red-600 cursor-pointer"
                        onClick={() => {
                          deleteElement({
                            type: "deleteElement",
                            uuid: ele.id,
                          });
                          handleRemoveClick(ele.id);
                          setIdElementDispatch(setIdElement(ele?.id));
                          resetElementType(
                            typeElelment({
                              type: undefined,
                              id: undefined,
                            })
                          );
                        }}
                      />{" "}
                      <Edit
                        className="ml-3 text-orange-400 cursor-pointer"
                        onClick={() => {
                          dispatchELementType(
                            typeElelment({ type: ele?.name, id: ele?.id })
                          );
                          dispatchDisplay(showEdit(true));

                          let radio = json.element.find(
                            (item) => item?.uuid === ele?.id
                          );

                          ele?.type === "radioButton"
                            ? dispatchConfgi(
                                radioConfig({
                                  uuid: ele?.id,
                                  label: radio?.label,
                                  placeHolder: radio?.placeHolder,
                                  description: radio?.description,
                                  // status: dataInput?.status,
                                  styleInjection: radio?.styleInjection,

                                  textColor: radio?.textColor,
                                  textSize: radio?.textSize,
                                  type: "radioButton",
                                  hidden: radio?.hidden,
                                  elementStatus: radio?.elementStatus,
                                })
                              )
                            : "";
                        }}
                      />{" "}
                      <Radio id={ele.id} factor={index + 1}></Radio>
                    </>
                  ) : ele.name === "email" ? (
                    <>
                      <DeleteOutline
                        className="text-red-600 cursor-pointer"
                        onClick={() => {
                          deleteElement({
                            type: "deleteElement",
                            uuid: ele.id,
                          });
                          handleRemoveClick(ele.id);
                          setIdElementDispatch(setIdElement(ele?.id));
                          resetElementType(
                            typeElelment({
                              type: undefined,
                              id: undefined,
                            })
                          );
                        }}
                      />
                      <Edit
                        className="ml-3 text-orange-400 cursor-pointer"
                        onClick={() => {
                          dispatchELementType(
                            typeElelment({ type: ele?.name, id: ele?.id })
                          );
                          dispatchDisplay(showEdit(true));

                          let email = json.element.find(
                            (item) => item?.uuid === ele?.id
                          );

                          ele?.type === "email"
                            ? dispatchConfgi(
                                emailConfig({
                                  uuid: ele?.id,
                                  label: email?.label,
                                  placeHolder: email?.placeHolder,
                                  description: email?.description,
                                  // status: dataInput?.status,
                                  styleInjection: email?.styleInjection,
                                  textColor: email?.textColor,
                                  textSize: email?.textSize,
                                  type: "email",
                                  elementStatus: email?.elementStatus,
                                  minLength: email?.minLength,
                                  maxLength: email?.maxLength,
                                  require: email?.require,
                                  hidden: email?.hidden,
                                })
                              )
                            : "";
                        }}
                      />{" "}
                      <Email id={ele?.id} factor={index + 1}></Email>
                    </>
                  ) : ele.name === "phoneNumber" ? (
                    <>
                      <DeleteOutline
                        className="text-red-600 cursor-pointer"
                        onClick={() => {
                          deleteElement({
                            type: "deleteElement",
                            uuid: ele.id,
                          });
                          handleRemoveClick(ele.id);
                          setIdElementDispatch(setIdElement(ele?.id));
                          resetElementType(
                            typeElelment({
                              type: undefined,
                              id: undefined,
                            })
                          );
                        }}
                      />{" "}
                      <Edit
                        className="ml-3 text-orange-400 cursor-pointer"
                        onClick={() => {
                          dispatchELementType(
                            typeElelment({ type: ele?.name, id: ele?.id })
                          );
                          dispatchDisplay(showEdit(true));
                          let mobile = json.element.find(
                            (item) => item?.uuid === ele?.id
                          );

                          ele?.type === "phoneNumber"
                            ? dispatchConfgi(
                                mobileConfig({
                                  uuid: ele?.id,
                                  label: mobile?.label,
                                  placeHolder: mobile?.placeHolder,
                                  styleInjection: mobile?.styleInjection,

                                  textColor: mobile?.textColor,
                                  textSize: mobile?.textSize,
                                  type: "phoneNumber",
                                  elementStatus: mobile?.elementStatus,
                                  minLength: mobile?.minLength,
                                  maxLength: mobile?.maxLength,
                                  require: mobile?.require,
                                  hidden: mobile?.hidden,
                                })
                              )
                            : "";
                        }}
                      />{" "}
                      <PhoneNumber id={ele.id} factor={index + 1}></PhoneNumber>
                    </>
                  ) : ele.name === "url" ? (
                    <>
                      <DeleteOutline
                        className="text-red-600 cursor-pointer"
                        onClick={() => {
                          deleteElement({
                            type: "deleteElement",
                            uuid: ele.id,
                          });
                          handleRemoveClick(ele.id);
                          setIdElementDispatch(setIdElement(ele?.id));
                          resetElementType(
                            typeElelment({
                              type: undefined,
                              id: undefined,
                            })
                          );
                        }}
                      />
                      <Edit
                        className="ml-3 text-orange-400 cursor-pointer"
                        onClick={() => {
                          dispatchELementType(
                            typeElelment({ type: ele?.name, id: ele?.id })
                          );
                          dispatchDisplay(showEdit(true));
                          let link = json.element.find(
                            (item) => item?.uuid === ele?.id
                          );

                          ele?.type === "url"
                            ? dispatchConfgi(
                                linkConfig({
                                  uuid: ele?.id,
                                  label: link?.label,
                                  placeHolder: link?.placeHolder,
                                  description: link?.description,
                                  // status: dataInput?.status,
                                  styleInjection: link?.styleInjection,
                                  textColor: link?.textColor,
                                  textSize: link?.textSize,
                                  type: "url",
                                  elementStatus: link?.elementStatus,
                                  minLength: link?.minLength,
                                  maxLength: link?.maxLength,
                                  require: link?.require,
                                  hidden: link?.hidden,
                                })
                              )
                            : "";
                        }}
                      />{" "}
                      <Link id={ele.id} factor={index + 1}></Link>
                    </>
                  ) : ele.name === "dropDown" ? (
                    <>
                      <DeleteOutline
                        className="text-red-600 cursor-pointer"
                        onClick={() => {
                          deleteElement({
                            type: "deleteElement",
                            uuid: ele.id,
                          });
                          handleRemoveClick(ele.id);
                          setIdElementDispatch(setIdElement(ele?.id));
                          resetElementType(
                            typeElelment({
                              type: undefined,
                              id: undefined,
                            })
                          );
                        }}
                      />
                      <Edit
                        className="ml-3 text-orange-400 cursor-pointer"
                        onClick={() => {
                          dispatchELementType(
                            typeElelment({ type: ele?.name, id: ele?.id })
                          );
                          dispatchDisplay(showEdit(true));
                          let dropDown = json.element.find(
                            (item) => item?.uuid === ele?.id
                          );

                          ele?.type === "dropDown"
                            ? dispatchConfgi(
                                dropdownConfig({
                                  uuid: ele?.id,
                                  label: dropDown?.label,
                                  placeHolder: dropDown?.placeHolder,
                                  description: dropDown?.description,
                                  // status: dataInput?.status,
                                  styleInjection: dropDown?.styleInjection,
                                  textColor: dropDown?.textColor,
                                  textSize: dropDown?.textSize,
                                  type: "dropDown",
                                  elementStatus: dropDown?.elementStatus,
                                  require: dropDown?.require,
                                  hidden: dropDown?.hidden,
                                })
                              )
                            : "";
                        }}
                      />{" "}
                      <DropDown id={ele.id} factor={index + 1}></DropDown>
                    </>
                  ) : ele.name === "day" ? (
                    <>
                      <DeleteOutline
                        className="text-red-600 cursor-pointer"
                        onClick={() => {
                          deleteElement({
                            type: "deleteElement",
                            uuid: ele.id,
                          });
                          handleRemoveClick(ele.id);
                          setIdElementDispatch(setIdElement(ele?.id));
                          resetElementType(
                            typeElelment({
                              type: undefined,
                              id: undefined,
                            })
                          );
                        }}
                      />
                      <Edit
                        className="ml-3 text-orange-400 cursor-pointer"
                        onClick={() => {
                          dispatchELementType(
                            typeElelment({ type: ele?.name, id: ele?.id })
                          );
                          dispatchDisplay(showEdit(true));
                          let date = json.element.find(
                            (item) => item?.uuid === ele?.id
                          );

                          ele?.type === "day"
                            ? dispatchConfgi(
                                dateConfig({
                                  uuid: ele?.id,
                                  label: date?.label,
                                  styleInjection: link?.styleInjection,
                                  textColor: date?.textColor,
                                  textSize: date?.textSize,
                                  type: "day",
                                  elementStatus: date?.elementStatus,
                                  require: date?.require,
                                  hidden: date?.hidden,
                                })
                              )
                            : "";
                        }}
                      />{" "}
                      <Calender id={ele.id} factor={index + 1}></Calender>
                    </>
                  ) : ele.name === "table" ? (
                    <>
                      <DeleteOutline
                        className="text-red-600 cursor-pointer"
                        onClick={() => {
                          deleteElement({
                            type: "deleteElement",
                            uuid: ele.id,
                          });
                          handleRemoveClick(ele.id);
                          setIdElementDispatch(setIdElement(ele?.id));
                          resetElementType(
                            typeElelment({
                              type: undefined,
                              id: undefined,
                            })
                          );
                        }}
                      />
                      <Edit
                        className="ml-3 text-orange-400 cursor-pointer"
                        onClick={() => {
                          dispatchELementType(
                            typeElelment({ type: ele?.name, id: ele?.id })
                          );
                          dispatchDisplay(showEdit(true));
                          let tableData = json.element.find(
                            (item) => item?.uuid === ele?.id
                          );

                          ele?.type === "table"
                            ? dispatchConfgi(
                                tableConfig({
                                  uuid: ele?.id,
                                  label: tableData?.label,
                                  placeHolder: tableData?.placeHolder,
                                  description: tableData?.description,
                                  // status: dataInput?.status,
                                  styleInjection: tableData?.styleInjection,

                                  textColor: tableData?.textColor,
                                  textSize: tableData?.textSize,
                                  urlTable: tableData?.urlTable,
                                  mapPath: tableData?.mapPath,
                                  dataTable: tableData?.dataTable,
                                  type: "table",
                                })
                              )
                            : "";
                        }}
                      />{" "}
                      <Table id={ele.id} factor={index + 1}></Table>
                    </>
                  ) : (
                    <PieChart></PieChart>
                  )}
                </div>
              );
            })
          ) : (
            <div style={{ height: 200 }}></div>
          )}
        </ReactGridLayout>
      </div>
      {/* </span>
        </div>
      </Draggable> */}
    </div>
  );
};

export default Content;
