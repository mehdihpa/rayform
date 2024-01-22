import React, { useEffect, useState } from "react";
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
import { getFormById, getForms, updateForm } from "../../api/homeApi";
import Swal from "sweetalert2";
import { Edit } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { showEdit, updateFormList } from "../../redux/action";

function EditForm({ cancleEdit, formId, getForms }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const key = uuid();
  const dispatch = useDispatch();

  const [expanded, setExpanded] = React.useState(false);
  const [formById, setFormById] = useState({
    label: "",
    description: "",
  });
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  useEffect(() => {
    handleChange(setExpanded("panel1"));
    getFormById(formId)
      .then((p) => {
        setFormById(p?.data);
      })
      .catch((error) => {
        error.response && error.response.status === 500 ? "error 500" : "";
      });
  }, []);
  const onChange = (e) => {
    setFormById({ ...formById, [e.target.name]: e.target.value });
  };
  const editFormData = () => {
    updateForm(formById).then((res) => {
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

      cancleEdit();
    });
  };
  return (
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
                <Edit className="text-orange-400 " fontSize="medium" />
              </IconButton>{" "}
            </div>
            <div>
              {" "}
              <h1 className="text-slate-500 text-lg">
                <span>ویرایش فرم</span>
              </h1>
            </div>
          </div>
        </AccordionSummary>

        <AccordionDetails>
          <div
            className="   grid lg:grid-cols-2 grid-cols-1 gap-[30px]  p-[1rem] mx-auto "
            style={{ direction: "rtl" }}
          >
            <TextField
              size="small"
              inputProps={{
                style: {
                  fontSize: "1rem",
                  direction: "rtl",
                  height: "23px",
                  WebkitBoxShadow: "0 0 0 1000px white inset",
                },
                minLength: 2,
              }}
              label={"عنوان *"}
              name="label"
              placeholder=" عنوان الزامی است"
              value={formById?.label}
              onChange={(e) => onChange(e)}
              helperText={errors?.label?.message}
              error={formById?.label === ""}
            />{" "}
            <TextField
              size="small"
              inputProps={{
                style: {
                  fontSize: "1rem",
                  direction: "rtl",
                  height: "23px",
                  WebkitBoxShadow: "0 0 0 1000px white inset",
                },
                minLength: 2,
              }}
              label="توضیحات"
              name="description"
              value={formById?.description}
              onChange={(e) => onChange(e)}
            />{" "}
          </div>{" "}
          <div className="flex flex-row justify-end ml-4 gap-3">
            <div>
              <Button
                type="submit"
                onClick={editFormData}
                color="warning"
                variant="contained"
                disabled={formById?.label === ""}
              >
                ویرایش
              </Button>
            </div>
            <div>
              <Button color="inherit" variant="contained">
                <span className="text-slate-600" onClick={cancleEdit}>
                  انصراف
                </span>
              </Button>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </>
  );
}
export default EditForm;
