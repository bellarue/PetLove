import React, { Fragment, useState, useEffect } from "react";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import API from "../../API_Interface/API_Interface";

//for user setting's modal
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

export default function AccountSettings(props) {
    const { username } = props;

    //for user setting's modal
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [inputUserName, setInputUserName] = useState(""); // Store temporary input field value
    const [updatedUserName, setUpdatedUserName] = useState(""); // Store updated user name for display
    const [email, setEmail] = useState("");
    const [check, setCheck] = useState(false);


    //to get the username's email
    useEffect(() => {
        const api = new API();

        async function getEmail() {
            const userJSONString = await api.userWithUsername(username);
            console.log(`user from the DB ${JSON.stringify(userJSONString)}`);
            setEmail(userJSONString.data[0]['email']);
        }

        getEmail();
    }, []);

    //update new username in database
    useEffect(() => {
        if( !check ){
            return;
        }

    const api = new API();
    async function updatingUserName() {
        const userJSONString = await api.updateUserName({userName: inputUserName, email: email}); // Use inputUserName for API call
        console.log(`users from the DB ${JSON.stringify(userJSONString)}`);
    }

    updatingUserName();
    }, [check]);

    return (
        <div>
            <Box sx={{ m: 2 }}>
                <Button onClick={handleOpen}>
                    <p style={{ marginLeft: "0%" }}>Edit User Information</p>
                    <EditIcon></EditIcon>
                </Button>
                <h2>
                    <p>
                        Username: {updatedUserName ? updatedUserName : username}
                    </p>
                    <p>
                        Email: {email}
                    </p>
                </h2>
            </Box>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                    >
                        User Details
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <div className="edit-container">
                            <label htmlFor="">New Username </label>{" "}
                            {/* Use htmlFor instead of for */}
                            <input
                                type="text"
                                value={inputUserName} // Use inputUserName instead of updatedUserName
                                onChange={(event) =>
                                    setInputUserName(event.target.value)
                                } // Update inputUserName
                            />
                        </div>

                        <button
                            className="edit-btn"
                            onClick={() => {
                                setUpdatedUserName(inputUserName); // Update username only if the Save button is clicked
                                setCheck(true);
                                handleClose();
                            }}
                        >
                            Save
                        </button>
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}
