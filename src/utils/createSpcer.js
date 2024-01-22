export default function createSpacer({
  parentFieldId,
  id,
  title,
  inputType,
  style,
}) {
  return {
    parentFieldId: parentFieldId,
    id,
    type: "spacer",
    title: title,
    inputType: inputType,
    style: style,
  };
}
