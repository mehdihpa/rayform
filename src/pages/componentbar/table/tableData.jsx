import { useEffect } from "react";
import { useSelector } from "react-redux";

export const TableData = () => {
  const elementId = useSelector((state) => state?.typeElementReducer?.type?.id);
  const json = useSelector((state) => state?.genericElementConfigReducer);
  const filteredElement = json.element.filter(
    (item) => item?.uuid === elementId
  )[0];

  useEffect(() => {}, [elementId, filteredElement, json]);

  return {
    label:
      elementId !=
      json?.element
        .filter((item) => item?.type === "table")
        .map((item) => item?.uuid)
        ? json?.element
            ?.filter((item) => item?.type === "table" && item?.uuid)
            .map((item) => item?.label)
        : filteredElement?.label,
    type:
      elementId !=
      json?.element
        .filter((item) => item?.type === "table")
        .map((item) => item?.uuid)
        ? json?.element
            ?.filter((item) => item?.type === "table" && item?.uuid)
            .map((item) => item?.type)
        : filteredElement?.type,
    description:
      elementId !=
      json?.element
        .filter((item) => item?.type === "table")
        .map((item) => item?.uuid)
        ? json?.element
            ?.filter((item) => item?.type === "table" && item?.uuid)
            .map((item) => item?.description)
        : filteredElement?.description,
    bgColor:
      elementId !=
      json?.element
        .filter((item) => item?.type === "table")
        .map((item) => item?.uuid)
        ? json?.element
            ?.filter((item) => item?.type === "table" && item?.uuid)
            .map((item) => item?.bgColor)
        : filteredElement?.bgColor,
    id:
      elementId !=
      json?.element
        .filter((item) => item?.type === "table")
        .map((item) => item?.id)
        ? json?.element
            ?.filter((item) => item?.type === "table" && item?.id)
            .map((item) => item?.id)
        : filteredElement?.id,
    textColor:
      elementId !=
      json?.element
        .filter((item) => item?.type === "table")
        .map((item) => item?.uuid)
        ? json?.element
            ?.filter((item) => item?.type === "table" && item?.uuid)
            .map((item) => item?.textColor)
        : filteredElement?.textColor,
    placeHolder:
      elementId !=
      json?.element
        .filter((item) => item?.type === "table")
        .map((item) => item?.uuid)
        ? json?.element
            ?.filter((item) => item?.type === "table" && item?.uuid)
            .map((item) => item?.placeHolder)
        : filteredElement?.placeHolder,
    textSize:
      elementId !=
      json?.element
        .filter((item) => item?.type === "table")
        .map((item) => item?.uuid)
        ? json?.element
            ?.filter((item) => item?.type === "table" && item?.uuid)
            .map((item) => item?.textSize)
        : filteredElement?.textSize,
  };
};
