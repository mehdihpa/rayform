import { useRef, useState } from "react";
import { useImmer } from "use-immer";

import PrimaryNavbar from "../../components/Navbar/PrimaryNavbar";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Form } from "samin-form-render";
import PlaceHolder from "../dndConfig/PlaceHolder";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Input from "../dndConfig/components/Input";
import Email from "../dndConfig/components/Email";

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

  let { fields } = data;
  let title = useSelector((state) => state?.formLabelToDrawReducer?.title);
  let json = useSelector((state) => state?.genericElementConfigReducer);

  let elementType = useSelector(
    (state) => state?.typeElementReducer?.type?.type
  );

  return (
    <>
      <div className="  ">
        <DndProvider backend={HTML5Backend}>
          <PlaceHolder></PlaceHolder>
        </DndProvider>{" "}
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
            className="flex flex-col items-center mt-2  border border-amber-100 rounded-md  p-3"
          >
            <div className="mt-2 w-[790px]">
              <Form fields={json?.element} />{" "}
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
}
