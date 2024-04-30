import React, {Fragment, useState, useEffect} from 'react';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import EditIcon from "@mui/icons-material/Edit";

//for user setting's modal 
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

export default function UserSettings(props) {

    const {username} = props.username;

    //for user setting's modal 
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

return (
    
    <div>

    {/* <Typography>
        user settings
    </Typography> */}
      {/* <section> */}
        <Box sx={{ m: 2,  }}>
        
        <Button onClick={handleOpen}>
          <p style={{ marginLeft: "0%" }}>Edit User Information</p>
          <EditIcon></EditIcon>
        </Button>
        <h2>
          <p>Username: {username}</p>
        </h2>
        <h2>
          <p>Email: email@gmail.com</p>
        </h2>
        </Box>
      {/* </section> */}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            User Details
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className="edit-container">
              <label for="">New Username </label>
              <input type="text" />
              {/* <br></br>
              <label for="">New Contact Image</label>
              <input type="file" /> */}
            </div>

            <button class="edit-btn">Save</button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}