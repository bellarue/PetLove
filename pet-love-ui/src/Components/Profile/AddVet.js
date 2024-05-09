import React, {Fragment, useEffect, useState} from 'react';
import API from '../../API_Interface/API_Interface'
import { Box, Button, TextField, Typography } from '@mui/material'
import { styled, css } from '@mui/system';
import { Modal as BaseModal } from '@mui/base/Modal';
import AddIcon from '@mui/icons-material/Add';

export default function AddVet(props) {
    const {email} = props;
    const [open, setOpen] = useState(false);
    const [nameInput, setNameInput] = useState('');
    const [emailInput, setEmailInput] = useState('');
    const [phoneNumInput, setPhoneNumInput] = useState('');
    const [verifyEmail, setVerifyEmail] = useState(false);
    const [emailFailed, setEmailFailed] = useState(false);
    const [nameFailed, setNameFailed] = useState(false);
    const [phoneNumFailed, setPhoneNumFailed] = useState(false);
    const [vets, setVets] = useState([]);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        const api = new API();

        async function getVets() {
            const vetsJSONString = await api.vetsByUser(email);
            console.log(`vets from the DB ${JSON.stringify(vetsJSONString)}`);
            setVets(vetsJSONString.data.map(comp => comp.email));
        }

        getVets();
    }, []);

    const onAddClick = () => {
        setVerifyEmail(true);
        return;
    }
    
    const handleNameChange = event => {
        console.log("handleInputChange called.");
        setNameInput(event.target.value);
        setNameFailed(false);
    };
    const handleEmailChange = event => {
        console.log("handleInputChange called.");
        setEmailInput(event.target.value);
        setEmailFailed(false);
    };

    const handlePhoneNumChange = event => {
        console.log("handleInputChange called.");
        setPhoneNumInput(event.target.value);
        setPhoneNumFailed(false);
    };

    useEffect(() => {
        if( !verifyEmail ){
            return;
        }
        let failed = false;
        if( vets.includes(emailInput) || emailInput.length === 0 ){
            setEmailFailed(true);
            failed = true;
        }
        if( nameInput.length === 0 ){
            setNameFailed(true);
            failed = true;
        }
        if( phoneNumInput > 0 && phoneNumInput != 10 ){
            setPhoneNumFailed(true);
            failed = true;
        }
        if( failed ){
            setVerifyEmail(false);
            return;
        }
        const api = new API();
        let phoneNum = phoneNumInput;
        if( phoneNum === '' ){
            phoneNum = null;
        }

        async function postVet() {
            const vetUpdateResults = await api.addVet({email: emailInput, name: nameInput, phone_num: phoneNum});
            console.log(`adding to vets ${JSON.stringify(vetUpdateResults)}`);
        }

        postVet();
        handleClose();
    }, [verifyEmail]);

    return (
        <div>
        <Button onClick={handleOpen}>
            <AddIcon />
        </Button>
        <Modal
            aria-labelledby="unstyled-modal-title"
            aria-describedby="unstyled-modal-description"
            open={open}
            onClose={handleClose}
        >
            <ModalContent sx={{ width: 400 }}>
                <Fragment>
                    <Box display="flex" flexDirection="column" alignItems="center" width={400} mt={10}>
                        <Typography align='center'>
                            New Vet
                        </Typography>
                        <Box display="flex" flexDirection="row" justifyContent="space-around" alignItems="center" width="100%" mb={0.75}>
                            <TextField
                                error={nameFailed}
                                id="outlined-error-helper-text"
                                label="Name*"
                                placeholder=""
                                value={nameInput}
                                onChange={handleNameChange}
                            />
                            <TextField
                                error={emailFailed}
                                id="outlined-error-helper-text"
                                label="Email*"
                                placeholder=""
                                value={emailInput}
                                onChange={handleEmailChange}
                            />
                        </Box>
                        <Box display="flex" flexDirection="row" justifyContent="space-around" alignItems="center" width="100%" mb={0.75}>
                            <TextField
                                error={phoneNumFailed}
                                id="outlined-error-helper-text"
                                label="Phone Number"
                                placeholder=""
                                value={phoneNumInput}
                                onChange={handlePhoneNumChange}
                            />
                        </Box>
                    </Box>
                    <Button onClick={onAddClick}>
                        Add 
                        <AddIcon/>
                    </Button>
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