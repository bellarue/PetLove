import React, {Fragment, useEffect, useState} from 'react';
import API from '../../API_Interface/API_Interface'
import { Box, Button, TextField, Typography } from '@mui/material'
import { styled, css } from '@mui/system';
import { Modal as BaseModal } from '@mui/base/Modal';

export default function CreateAccount(props) {
    const {users, emails, setShowAlert} = props;
    const [emailInput, setEmailInput] = useState('');
    const [usernameInput, setUsernameInput] = useState('');
    const [fnameInput, setFNameInput] = useState('');
    const [lnameInput, setLNameInput] = useState('');
    const [verifyInfo, setVerifyInfo] = useState(false);
    const [emailUsed, setEmailUsed] = useState(false);
    const [usernameUsed, setUsernameUsed] = useState(false);
    const [fnameFailed, setFNameFailed] = useState(false);
    const [lnameFailed, setLNameFailed] = useState(false);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    const handleEmailChange = event => {
        console.log("handleInputChange called.");
        setEmailInput(event.target.value);
        setEmailUsed(false);
    };
    const handleUsernameChange = event => {
        console.log("handleInputChange called.");
        setUsernameInput(event.target.value);
        setUsernameUsed(false);
    };
    const handleFNameChange = event => {
        console.log("handleInputChange called.");
        setFNameInput(event.target.value);
        setFNameFailed(false);
    };
    const handleLNameChange = event => {
        console.log("handleInputChange called.");
        setLNameInput(event.target.value);
        setLNameFailed(false);
    };

    useEffect(()=>{
        if( !verifyInfo ){
            return;
        }
        let authFailed = false;
        if( emailInput.length === 0 || emails.includes(emailInput) ){
            setEmailUsed(true);
            authFailed = true;
        }
        if( usernameInput.length === 0 || users.includes(usernameInput) ){
            setUsernameUsed(true);
            authFailed = true;
        }
        if( fnameInput.length === 0 ){
            setFNameFailed(true);
            authFailed = true;
        }
        if( lnameInput.length === 0 ){
            setLNameFailed(true);
            authFailed = true;
        }
        if( authFailed ){
            setVerifyInfo(false);
            return;
        }

        const api = new API();
    
        async function addUser() {
            const userJSONString = api.addUser({email: emailInput, username: usernameInput, fname: fnameInput, lname: lnameInput});
            console.log(`addUser result ${JSON.stringify(userJSONString)}`);
            setVerifyInfo(false);
            setShowAlert(true);
        }

        addUser();
        handleClose();
    }, [verifyInfo]);

    return (
        <div>
        <Button onClick={handleOpen} variant="outlined" size="medium">
            Create Account
        </Button>
        <Modal
            aria-labelledby="unstyled-modal-title"
            aria-describedby="unstyled-modal-description"
            open={open}
            onClose={handleClose}
        >
            <ModalContent sx={{ width: 400 }}>
                <Fragment>
                    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" width={400}>
                        <Typography marginBottom={1}>
                            Create New Account
                        </Typography>
                        <Box display="flex" flexDirection="row" justifyContent="space-around" alignItems="center" width="100%" mb={0.75}>
                            <TextField
                                error={emailUsed}
                                id="outlined-error-helper-text"
                                label="Email"
                                placeholder=""
                                value={emailInput}
                                onChange={handleEmailChange}
                            />
                            <TextField
                                error={usernameUsed}
                                id="outlined-error-helper-text"
                                label="Username"
                                placeholder=""
                                value={usernameInput}
                                onChange={handleUsernameChange}
                            />
                        </Box>
                        <Box display="flex" flexDirection="row" justifyContent="space-around" alignItems="center" width="100%">
                            <TextField
                                error={fnameFailed}
                                id="outlined-error-helper-text"
                                label="First Name"
                                placeholder=""
                                value={fnameInput}
                                onChange={handleFNameChange}
                            />
                            <TextField
                                error={lnameFailed}
                                id="outlined-error-helper-text"
                                label="Last Name"
                                placeholder=""
                                value={lnameInput}
                                onChange={handleLNameChange}
                            />
                        </Box>
                    </Box>
                    <Button
                        variant="outlined"
                        size="medium"
                        onClick={() => {setVerifyInfo(true)}}
                    >Create</Button>
                </Fragment>
            </ModalContent>
        </Modal>
        </div>
    );
}

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const Modal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled('div')(
  ({ theme }) => css`
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 500;
    text-align: start;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: hidden;
    background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0 4px 12px
      ${theme.palette.mode === 'dark' ? 'rgb(0 0 0 / 0.5)' : 'rgb(0 0 0 / 0.2)'};
    padding: 24px;
    color: ${theme.palette.mode === 'dark' ? grey[50] : grey[900]};

    & .modal-title {
      margin: 0;
      line-height: 1.5rem;
      margin-bottom: 8px;
    }

    & .modal-description {
      margin: 0;
      line-height: 1.5rem;
      font-weight: 400;
      color: ${theme.palette.mode === 'dark' ? grey[400] : grey[800]};
      margin-bottom: 4px;
    }
  `,
);