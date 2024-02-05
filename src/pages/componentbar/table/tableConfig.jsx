import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";
import { showEdit, tableConfig } from "../../../redux/action";
import { useSelector } from "react-redux";
import {
  Accordion,
  AccordionSummary,
  Button,
  AccordionDetails,
} from "@mui/material";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import {
  Add,
  ContactlessOutlined,
  HdrPlus,
  PlusOne,
} from "@mui/icons-material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export const TableConfig = () => {
  const dispatchConfgi = useDispatch();
  const elementId = useSelector((state) => state?.typeElementReducer?.type?.id);
  const elementType = useSelector(
    (state) => state?.typeElementReducer?.type?.type
  );
  const dispatchDisplay = useDispatch();
  const showDisplay = useSelector((state) => state?.showEditReducer?.display);
  const [locationFormData, setLocationFormData] = useState({
    label: "",
    placeHolder: "",
    description: "",
    styleInjection: "",
    textColor: "",
    textSize: "",
    // status: true, // Assuming status is a string
    type: elementType,
    mapPath: null,
    urlTable: null,
  });
  const [dropdownNameOptions, setDropdownNameOptions] = useState([
    { name: "", key: "" },
  ]);
  const [newNameOption, setNewNameOption] = useState();

  const handleAddNameOption = () => {
    if (
      newNameOption.trim() !== "" &&
      !dropdownNameOptions.some((option) => option.name === newNameOption)
    ) {
      setDropdownNameOptions([
        ...dropdownNameOptions,
        { name: newNameOption, key: newKeyOption },
      ]);
      setNewNameOption("");
    }
  };

  const handleRemoveNameOption = () => {
    const updatedNameOptions = dropdownNameOptions.filter(
      (option) => option.name !== newNameOption
    );

    setDropdownNameOptions(updatedNameOptions);

    // Remove the corresponding option from dropdownKeyOptions based on the name
    const updatedKeyOptions = dropdownKeyOptions.filter(
      (option) => option.name !== newNameOption
    );

    setDropdownKeyOptions(updatedKeyOptions);
  };

  console.log(dropdownNameOptions, "name");
  const handleNameInputChange = (e) => {
    setNewNameOption(e.target.value);
  };

  const [dropdownKeyOptions, setDropdownKeyOptions] = useState([{ key: "" }]);
  const [newKeyOption, setNewKeyOption] = useState();

  const handleAddKeyOption = () => {
    if (
      newKeyOption.trim() !== "" &&
      !dropdownKeyOptions.some((option) => option.key === newKeyOption)
    ) {
      setDropdownKeyOptions([
        ...dropdownKeyOptions,
        { name: newNameOption, key: newKeyOption },
      ]);
      setNewKeyOption("");
      setNewNameOption("");
    }
    handleAddNameOption();
  };

  const handleKeyInputChange = (e) => {
    setNewKeyOption(e.target.value);
  };

  const json = useSelector((state) => state?.genericElementConfigReducer);

  useEffect(() => {
    const selectedElement = json.element.find(
      (item) => item?.uuid === elementId
    );

    if (selectedElement) {
      setLocationFormData({
        label: selectedElement?.label || "",
        placeHolder: selectedElement?.placeHolder || "",
        description: selectedElement?.description || "",
        styleInjection: selectedElement?.styleInjection || "",
        textColor: selectedElement?.textColor || "",
        // status: selectedElement?.status || true, // Update this according to your data structure
        type: elementType,
        textSize: selectedElement.textSize || "",
        mapPath: selectedElement.mapPath || null,
        urlTable: selectedElement.urlTable || null,
        dataTable: {
          dropdownNameOptions: dropdownNameOptions,
        },
      });
    }
  }, [json.element, elementId]);

  const handleChange = (e) => {
    setLocationFormData({
      ...locationFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDispatch = () => {
    const newElement = {
      uuid: elementId,
      label: locationFormData.label,
      placeHolder: locationFormData.placeHolder,
      description: locationFormData.description,
      styleInjection: locationFormData.styleInjection,
      textColor: locationFormData.textColor,
      type: elementType,
      textSize: locationFormData.textSize,
      mapPath: locationFormData.mapPath,
      urlTable: locationFormData.urlTable,
      dataTable: {
        dropdownNameOptions: dropdownNameOptions,
      },
      // status: true, // Update this according to your data structure
    };

    dispatchConfgi(tableConfig(newElement));
    dispatchDisplay(showEdit(false));
  };
  return (
    <div
      className="flex flex-col gap-y-5"
      style={{ display: showDisplay === false ? "none" : "flex" }}
    >
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          تنظیمات سرویس
        </AccordionSummary>
        <AccordionDetails>
          <div>
            <label
              htmlFor="label"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              ادرس سرویس
            </label>
            <input
              type="text"
              name="urlTable"
              value={locationFormData.urlTable}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="ادرس سرویس را وارد کنید"
              required
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="my-3">
            <label
              htmlFor="label"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              مسیر دیتا
            </label>
            <input
              type="text"
              name="mapPath"
              value={locationFormData.mapPath}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="مسیر دیتا را وارد کنید"
              required
              onChange={(e) => handleChange(e)}
            />
          </div>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          افزودن به لیست
        </AccordionSummary>
        <AccordionDetails>
          <div>
            <div className="my-3">
              <label
                className=" mb-2 text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="newNameOption"
              >
                key{" "}
              </label>
              <input
                type="text"
                id="newNameOption"
                value={newKeyOption}
                onChange={handleKeyInputChange}
                placeholder="key را وارد کنید"
                className=" my-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div>
              <div className="my-3">
                <label
                  className=" mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="newNameOption"
                >
                  عنوان{" "}
                </label>
                <input
                  type="text"
                  id="newNameOption"
                  value={newNameOption}
                  onChange={handleNameInputChange}
                  placeholder="عنوان را وارد کنید"
                  className=" my-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex flex-row justify-end">
              <button
                className=" text-white bg-orange-400 hover:bg-orange-500 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-9 py-1.5 me-2 mb-2"
                onClick={handleAddKeyOption}
              >
                <Add /> اضافه کردن
              </button>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          مشاهده لیست
        </AccordionSummary>
        <AccordionDetails>
          <div>
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="dynamicDropdown"
            >
              لیست key
            </label>
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              id="dynamicDropdown"
            >
              {dropdownKeyOptions.map((option, index) => (
                <option key={index} value={option.key}>
                  {option.key}
                </option>
              ))}
            </select>

            <div className="my-3">
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="dynamicDropdown"
              >
                لیست عناوین
              </label>
              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                id="dynamicDropdown"
              >
                {dropdownNameOptions.map((option, index) => (
                  <option key={index} value={option.name}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          حذف از لیست
        </AccordionSummary>
        <AccordionDetails>
          <div>
            <div className="my-3">
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="dynamicDropdown"
              >
                لیست عناوین
              </label>
              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                id="dynamicDropdown"
                onChange={(e) => setNewNameOption(e.target.value)}
              >
                {dropdownNameOptions.map((option, index) => (
                  <option key={index} value={option.name}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-row justify-end">
              <button
                className=" text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-400 font-medium rounded-lg text-sm px-9 py-1.5 me-2 mb-2"
                onClick={handleRemoveNameOption}
              >
                <Add /> حذف کردن
              </button>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
      <Button
        onClick={handleDispatch}
        variant="contained"
        startIcon={<AppRegistrationIcon />}
      >
        ثبت تغییرات
      </Button>
    </div>
  );
};
