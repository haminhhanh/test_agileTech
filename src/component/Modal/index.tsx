import React, { useCallback } from "react";
import "./index.css";
import Modal from "@material-ui/core/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import userApi from "../../api/api";

function MuiModal() {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = useCallback(async (value) => {
    const res = await userApi.add({
      email: value.Email,
      position: value.Position,
      phone: value.Phone,
      username: value.Username,
    });

    if (res) {
      setOpen(false);
    }
  }, []);

  return (
    <div className="modalWrapper">
      <button onClick={handleOpen}>Add</button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className={classes.modal}
      >
        <form className={classes.paper} onSubmit={handleSubmit(onSubmit)}>
          <div className="title">
            <h5>Add User</h5>
            <button onClick={handleClose}>
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="iconMenu"
                color="#adb5bd"
                size="2x"
              />
            </button>
          </div>
          <div className="input">
            <label>Username</label>
            <input
              placeholder="Username"
              {...register("Username", { required: "This input is required" })}
            />
            {errors.Username && <span>{errors.Username.message}</span>}
          </div>
          <div className="input">
            <label>Email</label>

            <input
              placeholder="Email"
              {...register("Email", {
                required: "This input is required",
                pattern: {
                  value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                  message: "Invalid email",
                },
              })}
            />
            {errors.Email && <span>{errors.Email.message}</span>}
          </div>
          <div className="input">
            <label>Phone</label>
            <input
              placeholder="Phone"
              {...register("Phone", {
                required: "This input is required",
                pattern: {
                  value: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
                  message: "Phone email",
                },
              })}
            />
            {errors.Phone && <span>{errors.Phone.message}</span>}
          </div>
          <div className="input">
            <label>Position</label>
            <input
              placeholder="Position"
              {...register("Position", { required: "This input is required" })}
            />
            {errors.Position && <span>{errors.Position.message}</span>}
          </div>
          <button className="button-confirm" type="submit">
            Add
          </button>
        </form>
      </Modal>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: "#282833",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
export default MuiModal;
