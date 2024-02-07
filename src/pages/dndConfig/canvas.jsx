import { useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { fields, renderers } from "./fields";
import { DeleteOutline, Edit } from "@mui/icons-material";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import DehazeIcon from "@mui/icons-material/Dehaze";
import AppsIcon from "@mui/icons-material/Apps";
import { useDispatch, useSelector } from "react-redux";
import {
  checkBoxConfig,
  emailConfig,
  inputConfig,
  mobileConfig,
  numberConfig,
  passwordConfig,
  radioConfig,
  typeElelment,
  linkConfig,
  dateConfig,
  textAreaConfig,
  showEdit,
  setIdElement,
  dropdownConfig,
  tableConfig,
  buttonConfig,
} from "../../redux/action";
import { useEffect, useState } from "react";

function getRenderer(type) {
  if (type === "spacer") {
    return () => {
      return <div className="spacer mt-2">spacer</div>;
    };
  }

  return renderers[type] || (() => <div>No renderer found for {type}</div>);
}

export function Field(props) {
  let { field, overlay, ...rest } = props;
  let { type } = field;

  let Component = getRenderer(type);

  let className = "canvas-field";
  if (overlay) {
    className += " overlay";
  }

  return (
    <div className="mx-3 my-8">
      <Component {...rest} />
    </div>
  );
}

function SortableField(props) {
  let { id, index, field, onRemove, deleteField } = props;

  let { attributes, listeners, setNodeRef, transform, transition, removable } =
    useSortable({
      id: id,
      data: {
        index,
        id,
        field,
        parent: "n",
      },
    });
  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    removable,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
    height: `12px`,
    cursor: "grab",
    userSelect: "none",
  };
  let dispatchELementType = useDispatch();
  let dispatchConfgi = useDispatch();
  let deleteElement = useDispatch();
  let setIdElementDispatch = useDispatch();
  const handleDelete = () => {
    deleteField(id); // Call deleteField with the field's ID
  };
  let elementType = useSelector(
    (state) => state?.typeElementReducer?.type?.type
  );
  let json = useSelector((state) => state?.genericElementConfigReducer);
  let dispatchDisplay = useDispatch();

  let resetElementType = useDispatch();
  console.log(field, "fff");

  useEffect(() => {}, [json.element, json.element, field]);
  return (
    <div className="flex- flex-col mx-3 my-8  ">
      <div className="flex flex-row justify-end items-center gap-x-1 mb-2.5  ">
        <div
          onClick={() => {
            dispatchELementType(
              typeElelment({ type: field?.type, id: field?.id })
            );
            dispatchDisplay(showEdit(true));

            let dataInput = json.element.find(
              (item) => item?.uuid === field?.id
            );

            let dataPassword = json.element.find(
              (item) => item?.uuid === field?.id
            );
            let dataNumber = json.element.find(
              (item) => item?.uuid === field?.id
            );
            let dataTextArea = json.element.find(
              (item) => item?.uuid === field?.id
            );
            let checkBox = json.element.find(
              (item) => item?.uuid === field?.id
            );
            let radio = json.element.find((item) => item?.uuid === field?.id);
            let email = json.element.find((item) => item?.uuid === field?.id);
            let mobile = json.element.find((item) => item?.uuid === field?.id);
            let link = json.element.find((item) => item?.uuid === field?.id);
            let date = json.element.find((item) => item?.uuid === field?.id);
            let dropDown = json.element.find(
              (item) => item?.uuid === field?.id
            );
            let tableData = json.element.find(
              (item) => item?.uuid === field?.id
            );
            let buttonData = json.element.find(
              (item) => item?.uuid === field?.id
            );
            {
              field?.type === "input"
                ? dispatchConfgi(
                    inputConfig({
                      uuid: field?.id,
                      label: dataInput?.label,
                      placeHolder: dataInput?.placeHolder,
                      description: dataInput?.description,
                      // status: dataInput?.status,
                      styleInjection: dataInput?.styleInjection,
                      textColor: dataInput?.textColor,
                      textSize: dataInput?.textSize,
                      type: elementType,
                      elementStatus: dataInput?.elementStatus,
                      minLength: dataInput?.minLength,
                      maxLength: dataInput?.maxLength,
                      require: dataInput?.require,
                      hidden: dataInput?.hidden,
                      regex: dataInput?.regex,
                      messageRegex: dataInput?.messageRegex,
                    })
                  )
                : field?.type === "passWord"
                ? dispatchConfgi(
                    passwordConfig({
                      uuid: field?.id,
                      label: dataPassword?.label,
                      placeHolder: dataPassword?.placeHolder,
                      description: dataPassword?.description,
                      // status: dataInput?.status,
                      styleInjection: dataPassword?.styleInjection,
                      textColor: dataPassword?.textColor,
                      textSize: dataPassword?.textSize,
                      type: elementType,
                      elementStatus: dataPassword?.elementStatus,
                      minLength: dataPassword?.minLength,
                      maxLength: dataPassword?.maxLength,
                      require: dataPassword?.require,
                      hidden: dataPassword?.hidden,
                    })
                  )
                : field?.type === "number"
                ? dispatchConfgi(
                    numberConfig({
                      uuid: field?.id,
                      label: dataNumber?.label,
                      placeHolder: dataNumber?.placeHolder,
                      description: dataNumber?.description,
                      // status: dataInput?.status,
                      styleInjection: dataNumber?.styleInjection,

                      textColor: dataNumber?.textColor,
                      textSize: dataNumber?.textSize,
                      type: elementType,
                      elementStatus: dataNumber?.elementStatus,
                      minLength: dataNumber?.minLength,
                      maxLength: dataNumber?.maxLength,
                      require: dataNumber?.require,
                      hidden: dataNumber?.hidden,
                    })
                  )
                : field?.type === "textarea"
                ? dispatchConfgi(
                    textAreaConfig({
                      uuid: field?.id,
                      label: dataTextArea?.label,
                      placeHolder: dataTextArea?.placeHolder,
                      description: dataTextArea?.description,
                      styleInjection: dataTextArea?.styleInjection,

                      textColor: dataTextArea?.textColor,
                      textSize: dataTextArea?.textSize,
                      type: elementType,
                      elementStatus: dataTextArea?.elementStatus,
                      minLength: dataTextArea?.minLength,
                      maxLength: dataTextArea?.maxLength,
                      require: dataTextArea?.require,
                      hidden: dataTextArea?.hidden,
                    })
                  )
                : field?.type === "checkBox"
                ? dispatchConfgi(
                    checkBoxConfig({
                      uuid: field?.id,
                      label: checkBox?.label,
                      placeHolder: checkBox?.placeHolder,
                      description: checkBox?.description,
                      // status: dataInput?.status,
                      styleInjection: checkBox?.styleInjection,

                      textColor: checkBox?.textColor,
                      textSize: checkBox?.textSize,
                      type: elementType,
                      hidden: checkBox?.hidden,
                      elementStatus: checkBox?.elementStatus,
                    })
                  )
                : field?.type === "radioButton"
                ? dispatchConfgi(
                    radioConfig({
                      uuid: field?.id,
                      label: radio?.label,
                      placeHolder: radio?.placeHolder,
                      description: radio?.description,
                      // status: dataInput?.status,
                      styleInjection: radio?.styleInjection,

                      textColor: radio?.textColor,
                      textSize: radio?.textSize,
                      type: elementType,
                      hidden: checkBox?.hidden,
                      elementStatus: checkBox?.elementStatus,
                    })
                  )
                : field?.type === "email"
                ? dispatchConfgi(
                    emailConfig({
                      uuid: field?.id,
                      label: email?.label,
                      placeHolder: email?.placeHolder,
                      description: email?.description,
                      // status: dataInput?.status,
                      styleInjection: email?.styleInjection,
                      textColor: email?.textColor,
                      textSize: email?.textSize,
                      type: elementType,
                      elementStatus: email?.elementStatus,
                      minLength: email?.minLength,
                      maxLength: email?.maxLength,
                      require: email?.require,
                      hidden: email?.hidden,
                    })
                  )
                : field?.type === "phoneNumber"
                ? dispatchConfgi(
                    mobileConfig({
                      uuid: field?.id,
                      label: mobile?.label,
                      placeHolder: mobile?.placeHolder,
                      styleInjection: mobile?.styleInjection,

                      textColor: mobile?.textColor,
                      textSize: mobile?.textSize,
                      type: elementType,
                      elementStatus: dataNumber?.elementStatus,
                      minLength: dataNumber?.minLength,
                      maxLength: dataNumber?.maxLength,
                      require: dataNumber?.require,
                      hidden: dataNumber?.hidden,
                    })
                  )
                : field?.type === "url"
                ? dispatchConfgi(
                    linkConfig({
                      uuid: field?.id,
                      label: link?.label,
                      placeHolder: link?.placeHolder,
                      description: link?.description,
                      // status: dataInput?.status,
                      styleInjection: link?.styleInjection,
                      textColor: link?.textColor,
                      textSize: link?.textSize,
                      type: elementType,
                      elementStatus: link?.elementStatus,
                      minLength: link?.minLength,
                      maxLength: link?.maxLength,
                      require: link?.require,
                      hidden: link?.hidden,
                    })
                  )
                : field?.type === "day"
                ? dispatchConfgi(
                    dateConfig({
                      uuid: field?.id,
                      label: date?.label,
                      styleInjection: link?.styleInjection,
                      textColor: date?.textColor,
                      textSize: date?.textSize,
                      type: elementType,
                      elementStatus: date?.elementStatus,
                      require: date?.require,
                      hidden: date?.hidden,
                    })
                  )
                : field?.type === "dropDown"
                ? dispatchConfgi(
                    dropdownConfig({
                      uuid: field?.id,
                      label: dropDown?.label,
                      placeHolder: dropDown?.placeHolder,
                      description: dropDown?.description,
                      // status: dataInput?.status,
                      styleInjection: dropDown?.styleInjection,
                      textColor: dropDown?.textColor,
                      textSize: dropDown?.textSize,
                      type: elementType,
                      elementStatus: dropDown?.elementStatus,
                      require: dropDown?.require,
                      hidden: dropDown?.hidden,
                    })
                  )
                : field?.type === "table"
                ? dispatchConfgi(
                    tableConfig({
                      uuid: field?.id,
                      label: tableData?.label,
                      placeHolder: tableData?.placeHolder,
                      description: tableData?.description,
                      // status: dataInput?.status,
                      styleInjection: tableData?.styleInjection,

                      textColor: tableData?.textColor,
                      textSize: tableData?.textSize,
                      urlTable: tableData?.urlTable,
                      mapPath: tableData?.mapPath,
                      dataTable: tableData?.dataTable,
                      type: elementType,
                    })
                  )
                : field?.type === "button"
                ? dispatchConfgi(
                    buttonConfig({
                      uuid: field?.id,
                      label: buttonData?.label,
                      elementStatus: buttonData?.elementStatus,
                      require: buttonData?.require,
                      type: elementType,
                      hidden: buttonData?.hidden,
                      styleInjection: buttonData?.styleInjection,
                    })
                  )
                : "";
            }
          }}
        >
          <Edit className="text-orange-400 cursor-pointer	" />
        </div>

        <div
          onClick={() => {
            deleteElement({ type: "deleteElement", uuid: field.id });
            setIdElementDispatch(setIdElement(field?.id));
            resetElementType(typeElelment({ type: undefined, id: undefined }));
            handleDelete();
          }}
        >
          <DeleteOutline className="text-red-600 cursor-pointer" />
        </div>
      </div>
      <div
        className="flex flex-row   justify-end -mt-[33.3px] "
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={style}
      >
        {" "}
        <AppsIcon
          className="text-[#596FB7] cursor-move"
          fontSize="medium"
        />{" "}
      </div>
      <div className="border   border-slate-200  mt-3  rounded-lg">
        <Field className="" field={field} />
      </div>
    </div>
  );
}
export default function Canvas(props) {
  let { fields, deleteField } = props;
  let { listeners, setNodeRef, transform, transition } = useDroppable({
    id: "canvas_droppable",
    data: {
      parent: null,
      isContainer: true,
    },
  });

  let style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  console.log(fields, "fff");
  return (
    <div ref={setNodeRef} className="canvas" style={style} {...listeners}>
      <div className=" ">
        {fields.map((f, i) => (
          <SortableField
            key={f.id}
            id={f.id}
            field={f}
            index={i}
            deleteField={deleteField} // Pass deleteField function
          />
        ))}
      </div>
    </div>
  );
}
