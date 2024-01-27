import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";
import { dropdownConfig, showEdit } from "../../../redux/action";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import { Add } from "@mui/icons-material";
export const DDConfig = () => {
  const dispatchConfgi = useDispatch();
  const elementId = useSelector((state) => state?.typeElementReducer?.type?.id);
  const showDisplay = useSelector((state) => state?.showEditReducer?.display);
  const dispatchDisplay = useDispatch();
  const [dropdownNameOptions, setDropdownNameOptions] = useState([
    { name: "" },
  ]);
  const [newNameOption, setNewNameOption] = useState();
  const handleAddNameOption = () => {
    if (
      newNameOption.trim() !== "" &&
      !dropdownNameOptions.some((option) => option.name === newNameOption)
    ) {
      setDropdownNameOptions([...dropdownNameOptions, { name: newNameOption }]);
      setNewNameOption("");
    }
  };
  const handleNameInputChange = (e) => {
    setNewNameOption(e.target.value);
  };
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
    const selectedElement = json?.element.find(
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

      {/* <div>
        <label
          for="bordered-radio-1"
          className="w-full  py-4  text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          وضعیت{" "}
        </label>
        <div className="flex items-center mt-2 ps-4 border border-gray-200 rounded dark:border-gray-700">
          <label
            for="bordered-radio-1"
            className="w-20 py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            <input
              id="bordered-radio-1"
              type="radio"
              value={locationFormData.status === true}
              name="status"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              onChange={(e) => handleChange(e)}
            />{" "}
            فعال
          </label>

          <label
            for="bordered-radio-2"
            className="w-20 py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            <input
              id="bordered-radio-2"
              type="radio"
              value={locationFormData.status === false}
              name="status"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              onChange={(e) => handleChange(e)}
            />{" "}
            غیرفعال
          </label>
        </div>
      </div> */}
      <div>
        <label
          htmlFor="bgColor"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          رنگ پس زمینه
        </label>
        <input
          type="text"
          name="bgColor"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="رنگ پس زمینه را وارد کنید"
          required
          onChange={(e) => handleChange(e)}
          value={locationFormData.bgColor}
        />
      </div>
      <div>
        <label
          htmlFor="textColor"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          رنگ متن
        </label>
        <input
          type="text"
          name="textColor"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="رنگ متن را وارد کنید"
          required
          onChange={(e) => handleChange(e)}
          value={locationFormData.textColor}
        />
      </div>
      <div>
        <label
          for="bordered-radio-1"
          className="w-full  py-4  text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          سایز متن{" "}
        </label>
        <div className="flex items-center mt-2 justify-evenly ps-4 border border-gray-200 rounded dark:border-gray-700">
          <label
            for="bordered-radio-1"
            className="w-20 py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            <input
              name="textSize"
              type="radio"
              checked={locationFormData.textSize === 15}
              onChange={() =>
                handleChange({ target: { name: "textSize", value: 15 } })
              }
              name="bordered-radio"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />{" "}
            کوچک
          </label>

          <label
            for="bordered-radio-2"
            className="w-20 py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            <input
              name="textSize"
              onChange={() =>
                handleChange({ target: { name: "textSize", value: 25 } })
              }
              type="radio"
              checked={locationFormData.textSize === 25}
              name="bordered-radio"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />{" "}
            متوسط
          </label>
          <label
            for="bordered-radio-2"
            className="w-20 py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            <input
              name="textSize"
              onChange={() =>
                handleChange({ target: { name: "textSize", value: 35 } })
              }
              type="radio"
              checked={locationFormData.textSize === 35}
              name="bordered-radio"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />{" "}
            بزرگ
          </label>
        </div>
      </div>
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
