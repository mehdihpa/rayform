import { useRef, useState } from "react";
import { useImmer } from "use-immer";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import Announcements from "../dndConfig/announcements";
import Canvas, { Field } from "../dndConfig/canvas";
import Sidebar, { SidebarField } from "../dndConfig/sidebar";
import PrimaryNavbar from "../../components/Navbar/PrimaryNavbar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { InputConfig } from "../componentbar/input/inputConfig";
import { PasswordConfig } from "../componentbar/passWord/passwordConfig";
import { NumberConfig } from "../componentbar/number/numberConfig";
import { TextareaConfig } from "../componentbar/textarea/textareaConfig";
import { CheckBoxConfig } from "../componentbar/checkBox/checkboxConfig";
import { RadioConfig } from "../componentbar/radioButton/radionConfig";
import { EmailConfig } from "../componentbar/email/emailConfig";
import { MobileConfig } from "../componentbar/mobilenumber/mobileConfig";
import { LinkConfig } from "../componentbar/link/linkConfig";
import { DateConfig } from "../componentbar/datePicker/dateConfig";
import { DDConfig } from "../componentbar/dropdown/dropDownConfig";
import { TableConfig } from "../componentbar/table/tableConfig";
import { ButtonConfig } from "../componentbar/button/buttonConfig";
import { Form } from "samin-form-render";

function getData(prop) {
  return prop?.data?.current ?? {};
}

function createSpacer({ id }) {
  return {
    id,
    type: "spacer",
    title: "spacer",
  };
}

export default function FormDrawer() {
  let [sidebarFieldsRegenKey, setSidebarFieldsRegenKey] = useState(Date.now());
  let spacerInsertedRef = useRef();
  let currentDragFieldRef = useRef();
  let [activeSidebarField, setActiveSidebarField] = useState(); // only for fields from the sidebar
  let [activeField, setActiveField] = useState(); // only for fields that are in the form.
  let [data, updateData] = useImmer({
    fields: [],
  });
  function deleteField(id) {
    updateData((draft) => {
      draft.fields = draft.fields.filter((f) => f.id !== id);
      // console.log("fields:", draft.fields);
    });
  }

  let cleanUp = () => {
    setActiveSidebarField(null);
    setActiveField(null);
    currentDragFieldRef.current = null;
    spacerInsertedRef.current = false;
  };

  let handleDragStart = (e) => {
    let { active } = e;
    let activeData = getData(active);

    // This is where the cloning starts.
    // We set up a ref to the field we're dragging
    // from the sidebar so that we can finish the clone
    // in the onDragEnd handler.
    if (activeData.fromSidebar) {
      let { field } = activeData;
      let { type } = field;
      setActiveSidebarField(field);
      // Create a new field that'll be added to the fields array
      // if we drag it over the canvas.
      currentDragFieldRef.current = {
        id: active.id,
        type,
        name: `${type}${fields.length + 1}`,
        parent: null,
      };
      return;
    }

    // We aren't creating a new element so go ahead and just insert the spacer
    // since this field already belongs to the canvas.
    let { field, index } = activeData;

    setActiveField(field);
    currentDragFieldRef.current = field;
    updateData((draft) => {
      draft.fields.splice(index, 1, createSpacer({ id: active.id }));
    });
  };

  let handleDragOver = (e) => {
    let { active, over } = e;
    let activeData = getData(active);

    // Once we detect that a sidebar field is being moved over the canvas
    // we create the spacer using the sidebar fields id with a spacer suffix and add into the
    // fields array so that it'll be rendered on the canvas.

    // 🐑 CLONING 🐑
    // This is where the clone occurs. We're taking the id that was assigned to
    // sidebar field and reusing it for the spacer that we insert to the canvas.
    if (activeData.fromSidebar) {
      let overData = getData(over);

      if (!spacerInsertedRef.current) {
        let spacer = createSpacer({
          id: active.id + "-spacer",
        });

        updateData((draft) => {
          if (!draft.fields.length) {
            draft.fields.push(spacer);
          } else {
            let nextIndex =
              overData.index > -1 ? overData.index : draft.fields.length;

            draft.fields.splice(nextIndex, 0, spacer);
          }
          spacerInsertedRef.current = true;
        });
      } else if (!over) {
        // This solves the issue where you could have a spacer handing out in the canvas if you drug
        // a sidebar item on and then off
        updateData((draft) => {
          draft.fields = draft.fields.filter((f) => f.type !== "spacer");
        });
        spacerInsertedRef.current = false;
      } else {
        // Since we're still technically dragging the sidebar draggable and not one of the sortable draggables
        // we need to make sure we're updating the spacer position to reflect where our drop will occur.
        // We find the spacer and then swap it with the over skipping the op if the two indexes are the same
        updateData((draft) => {
          let spacerIndex = draft.fields.findIndex(
            (f) => f.id === active.id + "-spacer"
          );

          let nextIndex =
            overData.index > -1 ? overData.index : draft.fields.length - 1;

          if (nextIndex === spacerIndex) {
            return;
          }

          draft.fields = arrayMove(draft.fields, spacerIndex, overData.index);
        });
      }
    }
  };

  let handleDragEnd = (e) => {
    let { over } = e;

    // We dropped outside of the over so clean up so we can start fresh.
    if (!over) {
      cleanUp();
      updateData((draft) => {
        draft.fields = draft.fields.filter((f) => f.type !== "spacer");
      });
      return;
    }

    // This is where we commit the clone.
    // We take the field from the this ref and replace the spacer we inserted.
    // Since the ref just holds a reference to a field that the context is aware of
    // we just swap out the spacer with the referenced field.
    let nextField = currentDragFieldRef.current;

    if (nextField) {
      let overData = getData(over);

      updateData((draft) => {
        let spacerIndex = draft.fields.findIndex((f) => f.type === "spacer");
        draft.fields.splice(spacerIndex, 1, nextField);

        draft.fields = arrayMove(
          draft.fields,
          spacerIndex,
          overData.index || 0
        );
      });
    }

    setSidebarFieldsRegenKey(Date.now());
    cleanUp();
  };

  let { fields } = data;
  let title = useSelector((state) => state?.formLabelToDrawReducer?.title);
  let json = useSelector((state) => state?.genericElementConfigReducer);

  let elementType = useSelector(
    (state) => state?.typeElementReducer?.type?.type
  );

  return (
    <div>
      <PrimaryNavbar />
      <div className="p-4 ">
        <hr className="bg-slate-100 h-1" />
      </div>
      <div className="   text-right  text-lg" style={{ direction: "rtl" }}>
        <div className="flex flex-row  gap-x-1 mx-4">
          <div className="-mt-1.5 ">
            {" "}
            <Link to={"/"}>
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M5.27446 10.1262C5 10.7229 5 11.4018 5 12.7595V16.9999C5 18.8856 5 19.8284 5.58579 20.4142C6.11733 20.9457 6.94285 20.9949 8.5 20.9995V16C8.5 14.8954 9.39543 14 10.5 14H13.5C14.6046 14 15.5 14.8954 15.5 16V20.9995C17.0572 20.9949 17.8827 20.9457 18.4142 20.4142C19 19.8284 19 18.8856 19 16.9999V12.7595C19 11.4018 19 10.7229 18.7255 10.1262C18.4511 9.52943 17.9356 9.08763 16.9047 8.20401L15.9047 7.34687C14.0414 5.74974 13.1098 4.95117 12 4.95117C10.8902 4.95117 9.95857 5.74974 8.09525 7.34687L7.09525 8.20401C6.06437 9.08763 5.54892 9.52943 5.27446 10.1262ZM13.5 20.9999V16H10.5V20.9999H13.5Z"
                  fill="#2C2E43"
                />
              </svg>
            </Link>
          </div>
          <div className="text-[#2C2E43]">/</div>
          <div className="text-slate-500">
            {" "}
            مدیریت فرم <span className="text-slate-500">{title}</span>
          </div>
        </div>
      </div>
      <div className="p-4 ">
        <hr className="bg-slate-100 -mb-6" />
      </div>
      <div className="app">
        <div className="content mx-2">
          <DndContext
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
            autoScroll
            onDragStart={handleDragStart}
          >
            <Announcements />
            <Sidebar fieldsRegKey={sidebarFieldsRegenKey} />
            <SortableContext
              strategy={verticalListSortingStrategy}
              items={fields.map((f) => f.id)}
            >
              <Canvas fields={fields} deleteField={deleteField} />{" "}
              {/* componentBar */}
              <div className="flex flex-col overflow-scroll gap-y-4 border border-slate-200 rounded-lg mt-3 mx-1 w-[456px] px-5 py-7 ">
                <div>
                  {elementType === "input" ? (
                    <InputConfig />
                  ) : elementType === "passWord" ? (
                    <PasswordConfig />
                  ) : elementType === "number" ? (
                    <NumberConfig />
                  ) : elementType === "textarea" ? (
                    <TextareaConfig />
                  ) : elementType === "checkBox" ? (
                    <CheckBoxConfig />
                  ) : elementType === "radioButton" ? (
                    <RadioConfig />
                  ) : elementType === "email" ? (
                    <EmailConfig />
                  ) : elementType === "phoneNumber" ? (
                    <MobileConfig />
                  ) : elementType === "url" ? (
                    <LinkConfig />
                  ) : elementType === "day" ? (
                    <DateConfig />
                  ) : elementType === "dropDown" ? (
                    <DDConfig />
                  ) : elementType === "table" ? (
                    <TableConfig />
                  ) : elementType === "button" ? (
                    <ButtonConfig />
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </SortableContext>
            <DragOverlay dropAnimation={false}>
              {activeSidebarField ? (
                <SidebarField overlay field={activeSidebarField} />
              ) : null}
              {activeField ? <Field overlay field={activeField} /> : null}
            </DragOverlay>
          </DndContext>
        </div>
      </div>
      <div className="flex">
        <div className="mx-3 my-6 w-25 ">
          <span className="text-slate-500 font-bold mx-1.5">ساختار Json</span>

          <div
            style={{ direction: "ltr" }}
            className="flex flex-col gap-y- mt-2  border border-amber-100 rounded-md  p-3"
          >
            <div className="mt-2 ">
              {<pre>{JSON?.stringify(json, null, 5)}</pre>}
            </div>
          </div>
        </div>
        <div className="mx-3 my-6 w-75 ">
          <span className="text-slate-500 font-bold mx-1.5">
            ساختار Package
          </span>

          <div
            style={{ direction: "ltr" }}
            className="flex flex-col gap-y- mt-2  border border-amber-100 rounded-md  p-3"
          >
            <div className="mt-2 ">
              <Form fields={json?.element} />{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
