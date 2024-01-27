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

            {
              field?.type === "input"
                ? dispatchConfgi(
                    inputConfig({
                      uuid: field?.id,
                      label: dataInput?.label,
                      placeHolder: dataInput?.placeHolder,
                      description: dataInput?.description,
                      // status: dataInput?.status,
                      bgColor: dataInput?.bgColor,
                      textColor: dataInput?.textColor,
                      textSize: dataInput?.textSize,
                      type: elementType,
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
                      bgColor: dataPassword?.bgColor,
                      textColor: dataPassword?.textColor,
                      textSize: dataPassword?.textSize,
                      type: elementType,
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
                      bgColor: dataNumber?.bgColor,
                      textColor: dataNumber?.textColor,
                      textSize: dataNumber?.textSize,
                      type: elementType,
                    })
                  )
                : field?.type === "textarea"
                ? dispatchConfgi(
                    textAreaConfig({
                      uuid: field?.id,
                      label: dataTextArea?.label,
                      placeHolder: dataTextArea?.placeHolder,
                      description: dataTextArea?.description,
                      // status: dataInput?.status,
                      bgColor: dataTextArea?.bgColor,
                      textColor: dataTextArea?.textColor,
                      textSize: dataTextArea?.textSize,
                      type: elementType,
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
                      bgColor: checkBox?.bgColor,
                      textColor: checkBox?.textColor,
                      textSize: checkBox?.textSize,
                      type: elementType,
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
                      bgColor: radio?.bgColor,
                      textColor: radio?.textColor,
                      textSize: radio?.textSize,
                      type: elementType,
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
                      bgColor: email?.bgColor,
                      textColor: email?.textColor,
                      textSize: email?.textSize,
                      type: elementType,
                    })
                  )
                : field?.type === "phoneNumber"
                ? dispatchConfgi(
                    mobileConfig({
                      uuid: field?.id,
                      label: mobile?.label,
                      placeHolder: mobile?.placeHolder,
                      description: mobile?.description,
                      // status: dataInput?.status,
                      bgColor: mobile?.bgColor,
                      textColor: mobile?.textColor,
                      textSize: mobile?.textSize,
                      type: elementType,
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
                      bgColor: link?.bgColor,
                      textColor: link?.textColor,
                      textSize: link?.textSize,
                      type: elementType,
                    })
                  )
                : field?.type === "day"
                ? dispatchConfgi(
                    dateConfig({
                      uuid: field?.id,
                      label: date?.label,
                      placeHolder: date?.placeHolder,
                      description: date?.description,
                      // status: dataInput?.status,
                      bgColor: date?.bgColor,
                      textColor: date?.textColor,
                      textSize: date?.textSize,
                      type: elementType,
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
                      bgColor: dropDown?.bgColor,
                      textColor: dropDown?.textColor,
                      textSize: dropDown?.textSize,
                      type: elementType,
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
                      bgColor: tableData?.bgColor,
                      textColor: tableData?.textColor,
                      textSize: tableData?.textSize,
                      urlTable: tableData?.urlTable,
                      mapPath: tableData?.mapPath,
                      dataTable: tableData?.dataTable,
                      type: elementType,
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

  return (
    <div ref={setNodeRef} className="canvas" style={style} {...listeners}>
      <div className="canvas-fields ">
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
