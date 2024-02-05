import { useSelector } from "react-redux";

export const EmailData = () => {
  const elementId = useSelector((state) => state?.typeElementReducer?.type?.id);
  const json = useSelector((state) => state?.genericElementConfigReducer);
  const filteredElement = json.element.filter(
    (item) => item?.uuid === elementId && item?.type
  )[0];
  console.log(json, "element");
  console.log(filteredElement, "element");
  console.log(elementId, "element");

  console.log(elementId, "test");
  return {
    label:
      elementId !=
      json?.element
        .filter((item) => item?.type === "email")
        .map((item) => item?.uuid)
        ? json?.element
            ?.filter((item) => item?.type === "email" && item?.uuid)
            .map((item) => item?.label)
        : filteredElement?.label,
    type:
      elementId !=
      json?.element
        .filter((item) => item?.type === "email")
        .map((item) => item?.uuid)
        ? json?.element
            ?.filter((item) => item?.type === "email" && item?.uuid)
            .map((item) => item?.type)
        : filteredElement?.type,
    description:
      elementId !=
      json?.element
        .filter((item) => item?.type === "email")
        .map((item) => item?.uuid)
        ? json?.element
            ?.filter((item) => item?.type === "email" && item?.uuid)
            .map((item) => item?.description)
        : filteredElement?.description,
    styleInjection:
      elementId !=
      json?.element
        .filter((item) => item?.type === "email")
        .map((item) => item?.uuid)
        ? json?.element
            ?.filter((item) => item?.type === "email" && item?.uuid)
            .map((item) => item?.styleInjection)
        : filteredElement?.styleInjection,
    id:
      elementId !=
      json?.element
        .filter((item) => item?.type === "email")
        .map((item) => item?.id)
        ? json?.element
            ?.filter((item) => item?.type === "email" && item?.id)
            .map((item) => item?.id)
        : filteredElement?.id,
    textColor:
      elementId !=
      json?.element
        .filter((item) => item?.type === "email")
        .map((item) => item?.uuid)
        ? json?.element
            ?.filter((item) => item?.type === "email" && item?.uuid)
            .map((item) => item?.textColor)
        : filteredElement?.textColor,
    placeHolder:
      elementId !=
      json?.element
        .filter((item) => item?.type === "email")
        .map((item) => item?.uuid)
        ? json?.element
            ?.filter((item) => item?.type === "email" && item?.uuid)
            .map((item) => item?.placeHolder)
        : filteredElement?.placeHolder,
    textSize:
      elementId !=
      json?.element
        .filter((item) => item?.type === "email")
        .map((item) => item?.uuid)
        ? json?.element
            ?.filter((item) => item?.type === "email" && item?.uuid)
            .map((item) => item?.textSize)
        : filteredElement?.textSize,
    elementStatus:
      elementId !=
      json?.element
        .filter((item) => item?.type === "email")
        .map((item) => item?.uuid)
        ? json?.element
            ?.filter((item) => item?.type === "email" && item?.uuid)
            .map((item) => item?.elementStatus)
        : filteredElement?.elementStatus,
    minLength:
      elementId !=
      json?.element
        .filter((item) => item?.type === "email")
        .map((item) => item?.uuid)
        ? json?.element
            ?.filter((item) => item?.type === "email" && item?.uuid)
            .map((item) => item?.minLength)
        : filteredElement?.minLength,
    maxLength:
      elementId !=
      json?.element
        .filter((item) => item?.type === "email")
        .map((item) => item?.uuid)
        ? json?.element
            ?.filter((item) => item?.type === "email" && item?.uuid)
            .map((item) => item?.maxLength)
        : filteredElement?.maxLength,
    require:
      elementId !=
      json?.element
        .filter((item) => item?.type === "email")
        .map((item) => item?.uuid)
        ? json?.element
            ?.filter((item) => item?.type === "email" && item?.uuid)
            .map((item) => item?.require)
        : filteredElement?.require,
    hidden:
      elementId !=
      json?.element
        .filter((item) => item?.type === "email")
        .map((item) => item?.uuid)
        ? json?.element
            ?.filter((item) => item?.type === "email" && item?.uuid)
            .map((item) => item?.hidden)
        : filteredElement?.hidden,
  };
};
