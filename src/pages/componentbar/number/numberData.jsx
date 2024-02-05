import { useEffect } from "react";
import { useSelector } from "react-redux";

export const NumberData = () => {
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
        .filter((item) => item?.type === "number")
        .map((item) => item?.uuid)
        ? json?.element
            ?.filter((item) => item?.type === "number" && item?.uuid)
            .map((item) => item?.label)
        : filteredElement?.label,
    type:
      elementId !=
      json?.element
        .filter((item) => item?.type === "number")
        .map((item) => item?.uuid)
        ? json?.element
            ?.filter((item) => item?.type === "number" && item?.uuid)
            .map((item) => item?.type)
        : filteredElement?.type,
    description:
      elementId !=
      json?.element
        .filter((item) => item?.type === "number")
        .map((item) => item?.uuid)
        ? json?.element
            ?.filter((item) => item?.type === "number" && item?.uuid)
            .map((item) => item?.description)
        : filteredElement?.description,
    styleInjection:
      elementId !=
      json?.element
        .filter((item) => item?.type === "number")
        .map((item) => item?.uuid)
        ? json?.element
            ?.filter((item) => item?.type === "number" && item?.uuid)
            .map((item) => item?.styleInjection)
        : filteredElement?.styleInjection,
    id:
      elementId !=
      json?.element
        .filter((item) => item?.type === "number")
        .map((item) => item?.id)
        ? json?.element
            ?.filter((item) => item?.type === "number" && item?.id)
            .map((item) => item?.id)
        : filteredElement?.id,
    textColor:
      elementId !=
      json?.element
        .filter((item) => item?.type === "number")
        .map((item) => item?.uuid)
        ? json?.element
            ?.filter((item) => item?.type === "number" && item?.uuid)
            .map((item) => item?.textColor)
        : filteredElement?.textColor,
    placeHolder:
      elementId !=
      json?.element
        .filter((item) => item?.type === "number")
        .map((item) => item?.uuid)
        ? json?.element
            ?.filter((item) => item?.type === "number" && item?.uuid)
            .map((item) => item?.placeHolder)
        : filteredElement?.placeHolder,
    textSize:
      elementId !=
      json?.element
        .filter((item) => item?.type === "number")
        .map((item) => item?.uuid)
        ? json?.element
            ?.filter((item) => item?.type === "number" && item?.uuid)
            .map((item) => item?.textSize)
        : filteredElement?.textSize,
    elementStatus:
      elementId !=
      json?.element
        .filter((item) => item?.type === "number")
        .map((item) => item?.uuid)
        ? json?.element
            ?.filter((item) => item?.type === "number" && item?.uuid)
            .map((item) => item?.elementStatus)
        : filteredElement?.elementStatus,
    minLength:
      elementId !=
      json?.element
        .filter((item) => item?.type === "number")
        .map((item) => item?.uuid)
        ? json?.element
            ?.filter((item) => item?.type === "number" && item?.uuid)
            .map((item) => item?.minLength)
        : filteredElement?.minLength,
    maxLength:
      elementId !=
      json?.element
        .filter((item) => item?.type === "number")
        .map((item) => item?.uuid)
        ? json?.element
            ?.filter((item) => item?.type === "number" && item?.uuid)
            .map((item) => item?.maxLength)
        : filteredElement?.maxLength,
    require:
      elementId !=
      json?.element
        .filter((item) => item?.type === "number")
        .map((item) => item?.uuid)
        ? json?.element
            ?.filter((item) => item?.type === "number" && item?.uuid)
            .map((item) => item?.require)
        : filteredElement?.require,
    hidden:
      elementId !=
      json?.element
        .filter((item) => item?.type === "number")
        .map((item) => item?.uuid)
        ? json?.element
            ?.filter((item) => item?.type === "number" && item?.uuid)
            .map((item) => item?.hidden)
        : filteredElement?.hidden,
  };
};
