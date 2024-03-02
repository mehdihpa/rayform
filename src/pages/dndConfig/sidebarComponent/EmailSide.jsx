import React from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from "../ItemTypes";
import EmailIcon from "@mui/icons-material/Email";

const EmailSide = (props) => {
  const [{ isDragging }, drag] = useDrag({
    item: {
      type: ItemTypes.CARD,
      id: props._id,
      name: props.name,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
  return (
    <div className="" style={{ color: "white", margin: 10 }}>
      <button
        className="pb-3 text-xl w-full text-right px-4  my-2 bg-[#3E79B1] text-slate-100 hover:text-white rounded-md p-2 no-underline"
        ref={drag}
      >
        <EmailIcon className="ml-1" />
        ایمیل
      </button>
    </div>
  );
};

export default EmailSide;
