import React, { useCallback, useEffect, useState } from "react";
// components
import PrimaryNavbar from "../../components/Navbar/PrimaryNavbar";
import DeleteModal from "../../components/Modals/deleteModal";
import DataTable from "react-data-table-component";
import { Alert, Button, IconButton, Tooltip } from "@mui/material";
import { getForms, deleteFormById } from "../../api/homeApi";
import { DeleteOutline, Edit, Landslide } from "@mui/icons-material";
import Swal from "sweetalert2";
import AddForm from "../formManagement/addForm";
import EditForm from "../formManagement/editForm";
import { useDispatch, useSelector } from "react-redux";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useNavigate } from "react-router-dom";
import { Form } from "samin-form-render";
import { formLabelToDraw, updateFormList } from "../../redux/action";
const HomePage = ({ action }) => {
  const [forms, setForms] = useState([]);

  const [formTitle, setFormTitle] = useState("");
  const [openDelete, setOpenDelete] = useState(false);
  const [idForm, setIDForm] = useState(null);
  useEffect(() => {
    getForms().then((res) => {
      setForms(res?.data?.items);
    });
  }, []);

  const [edit, setEdit] = useState(false);
  const navigate = useNavigate();
  const dispatchLabel = useDispatch();
  const cancleEdit = () => {
    setEdit(false);
  };
  const editFormOnClick = (id) => {
    window.scrollTo(0, 0);
    setEdit(true);
    setIDForm(id);
  };
  const updateForm = useCallback(() => {
    getForms().then((res) => {
      setForms(res?.data?.items);
    });
  }, []); // Empty dependency array since we don't depend on any external values
  const closeDeleteModal = () => {
    setOpenDelete(false);
  };
  const openDeleteModal = (id, label) => {
    setOpenDelete(true);
    setIDForm(id);
    setFormTitle(label);
  };
  const deleteForm = () => {
    deleteFormById(idForm)
      .then(async (res) => {
        await closeDeleteModal();
        await Swal.fire({
          icon: "success",
          width: 400,
          text: `عملیات با موفق انجام شد`,
          confirmButtonText: "تایید",
          confirmButtonColor: "#2AA5E3",
          customClass: {
            title: "swal2-steps",
          },
        });
        await updateForm();
      })
      .catch(async (error) => {
        await closeDeleteModal();
        await Swal.fire({
          icon: "error",
          width: 400,
          title: `عملیات با خطا مواجه شد`,
          confirmButtonText: "تایید",
          confirmButtonColor: "#2AA5E3",
          customClass: {
            title: "swal2-steps",
          },
        });
      });
  };

  const customStyles = {
    header: {
      style: {
        minHeight: "86px",
      },
    },
    headRow: {
      style: {
        backgroundColor: "#3E79B1",
        color: "#FFFFFF",
        fontSize: "medium",
        textAlign: "center",
        borderRadius: "4px",
      },
    },
    headCells: {
      style: {
        "&:not(:last-of-type)": {
          // paddingRight: "1rem",
        },
      },
    },

    cells: {
      style: {
        "&:not(:last-of-type)": {
          fontSize: "small",
          borderLeftWidth: "1px",
          borderRadius: "2px",
          borderLefttStyle: "solid",
        },
      },
    },
  };
  const formDrawer = (label, key) => {
    dispatchLabel(formLabelToDraw(label));
    console.log(label, "label");
    navigate(`/app/${label}/${key}`);
  };
  const columns = [
    {
      name: "عنوان",
      selector: (row) => row.label,
      center: true,
    },
    {
      name: "کد",
      selector: (row) => row.code,
      center: true,
    },
    {
      name: "توضیحات",
      selector: (row) => row.description,
      center: true,
    },

    {
      name: "عملیات",
      center: true,
      cell: (row) => (
        <>
          <div className="flex flex-row gap-2">
            <div>
              <Tooltip title="ساخت فرم">
                <button onClick={() => formDrawer(row?.label, row?.key)}>
                  <DashboardIcon className="text-[#419197]" />
                </button>
              </Tooltip>
            </div>
            <div>
              {" "}
              <Tooltip title="ویرایش فرم">
                <button onClick={() => editFormOnClick(row?.id)}>
                  <Edit className="text-orange-400" />
                </button>
              </Tooltip>
            </div>
            <div>
              {" "}
              <Tooltip title="حذف فرم">
                <button onClick={() => openDeleteModal(row?.id, row?.label)}>
                  <DeleteOutline className="text-red-600" />
                </button>
              </Tooltip>
            </div>
          </div>
        </>
      ),
    },
  ];
  console.log(columns, "col");

  const formState = useSelector(
    (state) => state?.updateListByIdReducer.formState
  );
  const dispatchFormState = useDispatch();

  if (formState === true) {
    updateForm();
    dispatchFormState(updateFormList(false));
  }
  return (
    <div className="flex flex-col">
      <PrimaryNavbar />
      <div className="p-4">
        <hr className="bg-slate-100 h-1" />
      </div>
     
      <div className="mx-3">
        {" "}
        {edit === true ? (
          <EditForm
            cancleEdit={cancleEdit}
            formId={idForm}
            getForms={getForms}
          />
        ) : (
          <AddForm />
        )}
      </div>

      <div className="p-4">
        <hr className="bg-slate-100 h-1" />
      </div>

      <div className="mr-4 mt-4">
        <div className="flex flex-row items-center justify-between ">
          <div className="flex flex-row items-center mx-[9px]">
            <div>
              <IconButton aria-label="delete">
                <Landslide className="text-[#1F8A70] " fontSize="medium" />
              </IconButton>{" "}
            </div>
            <div>
              {" "}
              <h1 className="text-slate-500 text-lg">
                <span>لیست فرم ها</span>
              </h1>
            </div>
          </div>

          {/* <div>
            <Tooltip title="مشاهده همه فرم ها">
              <IconButton aria-label="delete">
                <PartyModeIcon className="text-[#1F8A70]" fontSize="large" />
              </IconButton>{" "}
            </Tooltip>
            <Tooltip title="فیلتر">
              <IconButton
                aria-label="filter"
                onClick={() => toggleDrawer(true)}
              >
                <FilterAltIcon className="text-[#6b706f]" fontSize="large" />
              </IconButton>{" "}
            </Tooltip>
          </div> */}
        </div>
      </div>
      <div className="m-3">
        {" "}
        <DataTable
          noDataComponent={
            <Alert
              className="w-full mt-2 flex justify-center text-md "
              icon={false}
              severity="info"
            >
              لیست کاربران یافت نشد!
            </Alert>
          }
          customStyles={customStyles}
          columns={columns}
          data={forms}
        />
      </div>
      <DeleteModal
        open={openDelete}
        handleClose={closeDeleteModal}
        deleteAcions={deleteForm}
        title={formTitle}
      />
    </div>
  );
};

export default HomePage;
