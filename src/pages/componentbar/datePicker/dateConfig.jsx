import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import { dateConfig, showEdit } from "../../../redux/action";
import { Button } from "@mui/material";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
export const DateConfig = () => {
  const dispatchConfgi = useDispatch();
  const dispatchDisplay = useDispatch();
  const showDisplay = useSelector((state) => state?.showEditReducer?.display);

  const elementId = useSelector((state) => state?.typeElementReducer?.type?.id);
  const elementType = useSelector(
    (state) => state?.typeElementReducer?.type?.type
  );
  const [locationFormData, setLocationFormData] = useState({
    label: "",
    placeHolder: "",
    description: "",
    bgColor: "",
    textColor: "",
    textSize: "",
    // status: true, // Assuming status is a string
    type: elementType,
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
        bgColor: selectedElement?.bgColor || "",
        textColor: selectedElement?.textColor || "",
        // status: selectedElement?.status || true, // Update this according to your data structure
        type: elementType,
        textSize: locationFormData.textSize || "",
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
      bgColor: locationFormData.bgColor,
      textColor: locationFormData.textColor,
      type: elementType,
      textSize: locationFormData.textSize,
      // status: true, // Update this according to your data structure
    };

    dispatchConfgi(dateConfig(newElement));
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
