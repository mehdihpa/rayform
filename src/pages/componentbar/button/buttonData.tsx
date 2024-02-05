import { useEffect } from "react";
import { useSelector } from "react-redux";

export const ButtonData = () => {
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
        .filter((item) => item?.type === "button")
        .map((item) => item?.uuid)
        ? json?.element
            ?.filter((item) => item?.type === "button" && item?.uuid)
            .map((item) => item?.label)
        : filteredElement?.label,
    type:
      elementId !=
      json?.element
        .filter((item) => item?.type === "button")
        .map((item) => item?.uuid)
        ? json?.element
            ?.filter((item) => item?.type === "button" && item?.uuid)
            .map((item) => item?.type)
        : filteredElement?.type,

    styleInjection:
      elementId !=
      json?.element
        .filter((item) => item?.type === "button")
        .map((item) => item?.uuid)
        ? json?.element
            ?.filter((item) => item?.type === "button" && item?.uuid)
            .map((item) => item?.styleInjection)
        : filteredElement?.styleInjection,
    id:
      elementId !=
      json?.element
        .filter((item) => item?.type === "button")
        .map((item) => item?.id)
        ? json?.element
            ?.filter((item) => item?.type === "button" && item?.id)
            .map((item) => item?.id)
        : filteredElement?.id,

    elementStatus:
      elementId !=
      json?.element
        .filter((item) => item?.type === "button")
        .map((item) => item?.uuid)
        ? json?.element
            ?.filter((item) => item?.type === "button" && item?.uuid)
            .map((item) => item?.elementStatus)
        : filteredElement?.elementStatus,

    require:
      elementId !=
      json?.element
        .filter((item) => item?.type === "button")
        .map((item) => item?.uuid)
        ? json?.element
            ?.filter((item) => item?.type === "button" && item?.uuid)
            .map((item) => item?.require)
        : filteredElement?.require,
    hidden:
      elementId !=
      json?.element
        .filter((item) => item?.type === "button")
        .map((item) => item?.uuid)
        ? json?.element
            ?.filter((item) => item?.type === "button" && item?.uuid)
            .map((item) => item?.hidden)
        : filteredElement?.hidden,
  };
};
