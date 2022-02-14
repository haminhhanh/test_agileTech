import React,{useCallback} from "react";
import "./index.css";
import Modal from '@material-ui/core/Modal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from "react-hook-form";
import userApi from '../../api/api';

function MuiModal() {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

const onSubmit=useCallback(async(value) =>{
  const res = await userApi.add({
    email: value.Email,
    position: value.Position,
    phone: value.Phone,
    username: value.Username,
  });

  if(res){
    setOpen(false);
  }
},[])
 
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
              <FontAwesomeIcon icon={faCircleXmark}  className="iconMenu" color='#E9992A' size='2x'/>
            </button>
          </div>
          <div className="input">
            <label>Username</label>
            <input placeholder="Username" {...register("Username", { required: true })}/>
            {errors.Username && <span>User name error</span>}
          </div>
          <div className="input">
            <label>Email</label>
           
            <input placeholder="Email" {...register("Email", { required: true,pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ })}/>
            {errors.Email && <span>Email error</span>}
          </div>
          <div className="input">
            <label>Phone</label>
            <input placeholder="Phone" {...register("Phone", { required: true,pattern: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/ })}/>
            {errors.Phone && <span>Phone error</span>}
          </div>
          <div className="input">
            <label>Position</label>
            <input placeholder="Position" {...register("Position", { required: true })}/>
            {errors.Position && <span>Position error</span>}
          </div>
          <button className="button-confirm" type='submit'>Add</button>
        </form>
      </Modal>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  paper: {
    backgroundColor: '#282833',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
export default MuiModal;
