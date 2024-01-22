import { useDraggable } from "@dnd-kit/core";
import { nanoid } from "nanoid";
import React, { useEffect, useRef, useState } from "react";

import { fields } from "./fields";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";

export function SidebarField(props) {
  let { field, overlay } = props;
  let { icon, title } = field;

  let className = "sidebar-field";
  if (overlay) {
    className += " overlay";
  }

  return (
    <div className=" flex flex-row gap-2 p-2 text-center">
      <div>{icon}</div>
      <div>{title}</div>
    </div>
  );
}

function DraggableSidebarField(props) {
  let { field, ...rest } = props;

  let id = useRef(nanoid());

  let { attributes, listeners, setNodeRef } = useDraggable({
    id: id.current,
    data: {
      field,
      fromSidebar: true,
    },
  });

  return (
    <div
      className=" border border-slate-200 rounded-lg -mb-3   "
      ref={setNodeRef}
      {...listeners}
      {...attributes}
    >
      <SidebarField field={field} {...rest} />
    </div>
  );
}

export default function Sidebar(props) {
  let { fieldsRegKey } = props;
  let [expanded, setExpanded] = React.useState(false);

  let handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div
      key={fieldsRegKey}
      className="border border-slate-200 rounded-lg mt-3 mx-1 w-60 px-5 py-7 drop-shadow-xl "
    >
      {" "}
      <div className="flex flex-col gap-y-5">
        {/* پایه */}

        <div>
          {" "}
          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
          >
            <AccordionSummary
              // expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <div className="flex flex-row items-center  ">
                <div className="-mt-2 ">
                  {" "}
                  <h1 className="text-slate-500 text-lg">
                    <span>پایه </span>
                  </h1>
                </div>
              </div>
            </AccordionSummary>
            {fields
              .filter((f) => f.group === "base")
              .map((f) => (
                <div className="mb-4">
                  <AccordionDetails>
                    <DraggableSidebarField key={f.title} field={f} />
                  </AccordionDetails>
                </div>
              ))}
          </Accordion>
        </div>
        {/* پیشرفته */}

        <div>
          {" "}
          <Accordion
            expanded={expanded === "panel2"}
            onChange={handleChange("panel2")}
          >
            <AccordionSummary
              // expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <div className="flex flex-row items-center  ">
                <div className="-mt-2 ">
                  {" "}
                  <h1 className="text-slate-500 text-lg">
                    <span>پیشرفته </span>
                  </h1>
                </div>
              </div>
            </AccordionSummary>
            {fields
              .filter((f) => f.group === "advance")
              .map((f) => (
                <div className="mb-4">
                  <AccordionDetails>
                    <DraggableSidebarField key={f.title} field={f} />
                  </AccordionDetails>
                </div>
              ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
