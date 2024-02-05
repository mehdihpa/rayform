import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";
import { dropdownConfig, showEdit } from "../../../redux/action";
import { useSelector } from "react-redux";
import {
  Button,
  AccordionDetails,
  Accordion,
  AccordionSummary,
} from "@mui/material";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FormatPaintIcon from "@mui/icons-material/FormatPaint";
import DynamicFormIcon from "@mui/icons-material/DynamicForm";
import { Add } from "@mui/icons-material";
export const DDConfig = () => {
  const dispatchConfgi = useDispatch();
  const elementId = useSelector((state) => state?.typeElementReducer?.type?.id);
  const showDisplay = useSelector((state) => state?.showEditReducer?.display);
  const dispatchDisplay = useDispatch();
  const [dropdownNameOptions, setDropdownNameOptions] = useState([
    { name: "", key: "" },
  ]);
  const [newNameOption, setNewNameOption] = useState();
  const [newKeyOption, setNewKeyOption] = useState();

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
      setNewKeyOption("");
    }
  };
  const handleNameInputChange = (e) => {
    setNewNameOption(e.target.value);
  };
  const handleKeyInputChange = (e) => {
    setNewKeyOption(e.target.value);
  };
  const elementType = useSelector(
    (state) => state?.typeElementReducer?.type?.type
  );
  const [checkRequire, setCheckRequire] = useState(false);
  const [checkDivHidden, setCheckDivHidden] = useState(false);
  const [locationFormData, setLocationFormData] = useState({
    label: "",
    placeHolder: "",
    description: "",
    styleInjection: "",
    textColor: "",
    textSize: "",
    elementStatus: "",
    require: checkRequire,
    hidden: checkDivHidden,
    type: elementType,
  });

  const json = useSelector((state) => state?.genericElementConfigReducer);

  useEffect(() => {
    const selectedElement = json?.element.find(
      (item) => item?.uuid === elementId
    );

    if (selectedElement) {
      setLocationFormData({
        label: selectedElement?.label || "",
        placeHolder: selectedElement?.placeHolder || "",
        description: selectedElement?.description || "",
        styleInjection: selectedElement?.styleInjection || "",
        textColor: selectedElement?.textColor || "",
        require: checkRequire,
        elementStatus: selectedElement.elementStatus || "",
        hidden: checkDivHidden,
        type: elementType,
        textSize: selectedElement.textSize || "",
        dropdownData: {
          dropdownNameOptions: dropdownNameOptions,
        },
      });
    }
  }, [json?.element, elementId]);

  const handleChange = (e) => {
    setLocationFormData({
      ...locationFormData,
      [e.target.name]: e.target.value,
    });
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
  const handleDispatch = () => {
    const newElement = {
      uuid: elementId,
      label: locationFormData.label,
      placeHolder: locationFormData.placeHolder,
      description: locationFormData.description,
      styleInjection: locationFormData.styleInjection,
      textColor: locationFormData.textColor,
      type: elementType,
      require: checkRequire,
      elementStatus: locationFormData.elementStatus || "",
      hidden: checkDivHidden,
      textSize: locationFormData.textSize,
      dropdownData: {
        dropdownNameOptions: dropdownNameOptions,
      },
      // status: true, // Update this according to your data structure
    };

    dispatchConfgi(dropdownConfig(newElement));
    dispatchDisplay(showEdit(false));
  };
  return (
    <div
      className="flex flex-col gap-y-5"
      style={{ display: showDisplay === false ? "none" : "flex" }}
    >
      <div>
        <label
          htmlFor="label"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          برچسب{" "}
        </label>
        <input
          type="text"
          id="label"
          name="label"
          value={locationFormData.label}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="برچسب را وارد کنید"
          required
          onChange={(e) => handleChange(e)}
        />
      </div>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <FormatPaintIcon />{" "}
          <div className="py-1">
            <span>تنظیمات استایل</span>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div>
            <label
              htmlFor="styleInjection"
              className=" block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              کلاس css
            </label>
            <input
              type="text"
              name="styleInjection"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="مثال : bg-primary bg-red-500 hidden"
              required
              onChange={(e) => handleChange(e)}
              value={locationFormData.styleInjection}
            />
          </div>
          <div>
            <label className="w-full  pt-3   text-sm font-medium text-gray-900 dark:text-gray-300">
              وضعیت{" "}
            </label>
            <select
              id="elementStatus"
              name="elementStatus"
              onChange={(e) => handleChange(e)}
              className="form-select mt-2"
            >
              <option value="true">فعال</option>
              <option value="false">غیر فعال</option>
            </select>
          </div>
          <div>
            <label className="w-full  pt-3   text-sm font-medium text-gray-900 dark:text-gray-300">
              سایز متن برچسب{" "}
            </label>
            <select
              id="textSize"
              name="textSize"
              onChange={(e) => handleChange(e)}
              className="form-select mt-2"
            >
              <option value="15">کوچک</option>
              <option value="25"> متوسط</option>
              <option value="35"> بزرگ</option>
            </select>
          </div>
          <div className="flex items-start -mb-4 mt-4 pb-3">
            <input
              type="checkbox"
              name="hidden"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              onChange={(e) =>
                e.target.checked
                  ? setCheckDivHidden(true)
                  : setCheckDivHidden(false)
              }
            />
            <label
              for="default-checkbox"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              المنت قابل مشاهده نباشد
            </label>
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <DynamicFormIcon />{" "}
          <div className="py-1 px-1">
            <span>تنظیمات اعتبار سنجی</span>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div className="flex items-start -mb-4 mt-4 pb-3">
            <input
              type="checkbox"
              name="require"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              onChange={(e) =>
                e.target.checked
                  ? setCheckRequire(true)
                  : setCheckRequire(false)
              }
            />
            <label
              for="default-checkbox"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              الزامی میباشد
            </label>
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          ایجاد گزینه
        </AccordionSummary>

        <AccordionDetails>
          <div>
            <div>
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="dynamicDropdown"
              >
                لیست گزینه ها
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
              <div className="my-3">
                <label
                  className=" mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="newKeyOption"
                >
                  کلید{" "}
                </label>
                <input
                  type="text"
                  id="newKeyOption"
                  value={newKeyOption}
                  onChange={handleKeyInputChange}
                  placeholder="عنوان را وارد کنید"
                  className=" my-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex flex-row justify-end">
              <button
                className=" text-white bg-orange-400 hover:bg-orange-500 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-9 py-1.5 me-2 mb-2"
                onClick={handleAddNameOption}
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
          حذف گزینه
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
