import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import { Button, IconButton, Tooltip } from "@mui/material";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderTop: "3px solid #CC3636",
  borderRadious: "5px",
  boxShadow: 24,
  p: 4,
};

export default function DeleteModal({
  handleClose,
  title,
  open,
  deleteAcions,
}) {
  return (
    <div>
      <Modal
        className="rounded-xl"
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex flex-col">
            <div className="flex flex-row justify-between">
              <div>
                {" "}
                <Typography
                  className="text-slate-700"
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                >
                  <DeleteIcon className="text-red-500" />
                  حذف
                </Typography>
                <Typography
                  id="modal-modal-description"
                  sx={{ m: 2, color: "#282A3A" }}
                >
                  ایا از حذف {title} اطمینان دارید؟
                </Typography>
              </div>
              <div>
                <Tooltip title="بستن">
                  <IconButton aria-label="delete" onClick={handleClose}>
                    <CloseIcon className="text-slate-400" />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
            <div className="flex flex-row justify-end gap-2 mt-3">
              <Button color="error" variant="contained" onClick={deleteAcions}>
                حذف
              </Button>
              <Button color="inherit" variant="contained" onClick={handleClose}>
                انصراف
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
