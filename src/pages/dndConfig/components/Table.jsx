// import { helpers } from "chart.js";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFakeData } from "../../../api/appApi";
import { tableConfig } from "../../../redux/action";
import { nanoid } from "nanoid";

// import { Line } from 'react-chartjs-2';

const Table = (props) => {
  const [data, setData] = useState([]);
  const json = useSelector((state) => state?.genericElementConfigReducer);
  const urlTable = json.element
    .filter((item) => item?.uuid === props?.id)
    .map((item) => item.urlTable);
  const mapPath = json.element
    .filter((item) => item?.uuid === props?.id)
    .map((item) => item.mapPath);
  const dataTable = json.element
    .filter((item) => item?.uuid === props?.id)
    .map((item) => item.dataTable);
  useEffect(() => {
    getFakeData(urlTable).then((res) => {
      setData(res?.[mapPath]);
    });
  }, [json]);
  console.log(dataTable?.dropdownNameOptions);
  const dispatchConfgi = useDispatch();
  const key = nanoid(); //=> "V1StGXR8_Z5jdHi6B-myT"

  useEffect(() => {
    const newElement = {
      uuid: props?.id,
      styleInjection: "",
      textColor: "",
      type: "table",
      textSize: "",
      elementStatus: "",
      minLength: "",
      maxLength: "",
      require: false,
      hidden: "",
      key: key,
      regex: "",
      messageRegex: "",
      width: elements
        .filter((item) => item?.firstChild?.id === props?.id)
        .map((item) => item?.style?.width)[0],
      transform: "",
    };

    dispatchConfgi(tableConfig(newElement));
  }, [
    elements[0],
    elements
      .filter((item) => item?.firstChild?.id === props?.id)
      .map((item) => item?.style?.width)[0],
  ]);
  return (
    <div dir="rtl" className="mb-3 p-2 block">
      {dataTable[0]?.dropdownNameOptions === undefined ? (
        <span className="flex flex-row justify-center m-2 text-gray-500">
          تنظیمات سرویس یافت نشد!
        </span>
      ) : (
        <table className="table-auto divide-y divide-gray-200 dark:divide-gray-700">
          <thead>
            <tr>
              {dataTable[0]?.dropdownNameOptions
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
                {dataTable[0]?.dropdownNameOptions
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
};

export default Table;
