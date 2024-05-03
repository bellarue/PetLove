import React, {Fragment, useEffect, useState} from 'react';
import API from '../../API_Interface/API_Interface'
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Box, TextField, Button } from '@mui/material'
import { styled, css } from '@mui/system';
import { Modal as BaseModal } from '@mui/base/Modal';
import AddIcon from '@mui/icons-material/Add';

export default function AddMedication(props) {
    const {petID} = props;
    const [open, setOpen] = useState(false);
    const [verify, setVerify] = useState(false);
    const [nameInput, setNameInput] = useState('');
    const [startDateInput, setStartDateInput] = useState('');
    const [vetInput, setVetInput] = useState(''); //FIXME: how should i do this one
    const [typeInput, setTypeInput] = useState('');
    const [dosageInput, setDosageInput] = useState('');
    const [adminMethodInput, setAdminMethodInput] = useState('');
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleNameChange = event => {
        console.log("handleInputChange called.");
        setNameInput(event.target.value);
    };
    const handleTypeChange = event => {
        console.log("handleInputChange called.");
        setTypeInput(event.target.value);
    };
    const handleVetChange = event => {
        console.log("handleInputChange called.");
        setVetInput(event.target.value);
    };
    const handleDosageChange = event => {
        console.log("handleInputChange called.");
        setDosageInput(event.target.value);
    };
    const handleMethodChange = event => {
        console.log("handleInputChange called.");
        setAdminMethodInput(event.target.value);
    };

    useEffect(() => {
        if( !verify || nameInput.length === 0 || startDateInput.length === 0 
            || typeInput.length === 0 || dosageInput.length === 0 || adminMethodInput.length === 0 ){
            return;
        }

        const api = new API();

        async function postMedication() {
            const medUpdateResults = api.addMedication({name: nameInput, startDate: startDateInput, pet: petID, veterinarian: vetInput, type: typeInput, dosage: dosageInput, admin_method: adminMethodInput});
            console.log(`adding to medications ${JSON.stringify(medUpdateResults)}`);
        }

        postMedication();
        handleClose();
    }, [verify]);

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
                <Box sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <Box sx={{
                        width: '100%',
                        height: 30,
                        display: 'flex',
                        flexDirection: 'row'
                    }}>
                        <TextField
                            id="outlined-error-helper-text"
                            label="Name*"
                            placeholder=""
                            value={nameInput}
                            onChange={handleNameChange}
                        />
                        {/* <DatePicker
                            label="Start Date"
                            value={startDateInput}
                            onChange={(newValue) => setStartDateInput(newValue)}
                        /> */}
                    </Box>
                    <Box sx={{
                        width: '100%',
                        height: 30,
                        display: 'flex',
                        flexDirection: 'row'
                    }}>
                        <TextField
                            id="outlined-error-helper-text"
                            label="Veterinarian*"
                            placeholder=""
                            value={vetInput}
                            onChange={handleVetChange}
                        />
                        <TextField
                            id="outlined-error-helper-text"
                            label="Type*"
                            placeholder=""
                            value={typeInput}
                            onChange={handleTypeChange}
                        />
                    </Box>
                    <Box sx={{
                        width: '100%',
                        height: 30,
                        display: 'flex',
                        flexDirection: 'row'
                    }}>
                        <TextField
                            id="outlined-error-helper-text"
                            label="Dosage*"
                            placeholder=""
                            value={dosageInput}
                            onChange={handleDosageChange}
                        />
                        <TextField
                            id="outlined-error-helper-text"
                            label="Administration Method*"
                            placeholder=""
                            value={adminMethodInput}
                            onChange={handleMethodChange}
                        />
                    </Box>
                    <Button onClick={setVerify(true)}>
                        Add
                        <AddIcon />
                    </Button>
                </Box>
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