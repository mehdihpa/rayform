// import { helpers } from "chart.js";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFakeData } from "../../../api/appApi";
import { tableConfig } from "../../../redux/action";

// import { Line } from 'react-chartjs-2';

const Table = (props) => {
  const [data, setData] = useState([]);
  const json = useSelector((state) => state?.genericElementConfigReducer);
  const urlTable = json.element
    .filter((item) => item?.uuid === props?.id)
    .map((item) => item.urlTable)[0];
  const mapPath = json.element
    .filter((item) => item?.uuid === props?.id)
    .map((item) => item.mapPath)[0];
  const dataTable = json.element
    .filter((item) => item?.uuid === props?.id)
    .map((item) => item.dataTable)[0];
  useEffect(() => {
    getFakeData(urlTable).then((res) => {
      setData(res?.[mapPath]);
    });
  }, [mapPath]);
  console.log(dataTable?.dropdownNameOptions);
  const dispatchConfgi = useDispatch();

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
      require: "",
      hidden: "",
      regex: "",
      messageRegex: "",
    };

    dispatchConfgi(tableConfig(newElement));
  }, []);
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
