import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";
import { checkBoxConfig, numberConfig, showEdit } from "../../../redux/action";
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
export const CheckBoxConfig = () => {
  const dispatchConfgi = useDispatch();
  const elementId = useSelector((state) => state?.typeElementReducer?.type?.id);
  const elementType = useSelector(
    (state) => state?.typeElementReducer?.type?.type
  );
  const showDisplay = useSelector((state) => state?.showEditReducer?.display);
  const dispatchDisplay = useDispatch();
  const [checkDivHidden, setCheckDivHidden] = useState(false);
  const [locationFormData, setLocationFormData] = useState({
    label: "",
    placeHolder: "",
    description: "",
    styleInjection: "",
    textColor: "",
    textSize: "",
    type: elementType,
    elementStatus: "",
    hidden: checkDivHidden,
  });

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
        type: elementType,
        elementStatus: selectedElement.elementStatus || "",
        hidden: checkDivHidden,
        textSize: selectedElement.textSize || "",
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
      hidden: checkDivHidden,
      elementStatus: locationFormData.elementStatus,
    };
    dispatchDisplay(showEdit(false));

    dispatchConfgi(checkBoxConfig(newElement));
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
          برچسب
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

      <Button
        onClick={handleDispatch}
        variant="contained"
        startIcon={<AppRegistrationIcon />}
        ل
      >
        ثبت تغییرات
      </Button>
    </div>
  );
};
