import React from "react";
import { Controller, useForm } from "react-hook-form";
import { v4 as uuid } from "uuid";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  Select,
  TextField,
} from "@mui/material";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { postForm } from "../../api/homeApi";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { updateFormList } from "../../redux/action";
function AddForm() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const key = uuid();
  const [expanded, setExpanded] = React.useState(false);
  const dispatch = useDispatch();

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const onSubmit = (data) => {
    postForm(data, key);
    setExpanded(false);
    Swal.fire({
      icon: "success",
      width: 400,
      text: `عملیات با موفقیت انجام شد`,
      confirmButtonText: "تایید",
      confirmButtonColor: "#2AA5E3",
      customClass: {
        title: "swal2-steps",
      },
    });
    dispatch(updateFormList(true));
    reset();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <>
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <div className="flex flex-row items-center">
              <div>
                <IconButton aria-label="delete">
                  <LibraryAddIcon
                    className="text-[#3E79B1] "
                    fontSize="medium"
                  />
                </IconButton>{" "}
              </div>
              <div>
                {" "}
                <h1 className="text-slate-500 text-lg">
                  <span>ثبت فرم</span>
                </h1>
              </div>
            </div>
          </AccordionSummary>

          <AccordionDetails>
            <div
              className="   grid lg:grid-cols-2 grid-cols-1 gap-[30px]  p-[1rem] mx-auto "
              style={{ direction: "rtl" }}
            >
              <Controller
                name="label"
                control={control}
                defaultValue=""
                rules={{ required: " عنوان  الزامی است" }}
                render={({ field: { ref, ...field } }) => (
                  <TextField
                    id="label"
                    inputRef={ref}
                    {...field}
                    label={"عنوان *"}
                    error={errors.label}
                    helperText={errors.label?.message}
                    size="medium"
                  />
                )}
              />

              <Controller
                name="description"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={"توضیحات"}
                    // error={Boolean(errors.username)}
                    // helperText={errors.username?.message as any}
                  />
                )}
              />
            </div>{" "}
            <div className="flex flex-row justify-end ml-4 gap-3">
              <div>
                <Button type="submit" variant="contained">
                  ثبت
                </Button>
              </div>
              <div>
                <Button color="inherit" variant="contained">
                  <span
                    className="text-slate-600"
                    onClick={handleChange("panel1")}
                  >
                    انصراف
                  </span>
                </Button>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
      </>
    </form>
  );
}
export default AddForm;
