import React, {Fragment, useEffect, useState} from 'react';
import API from '../../API_Interface/API_Interface'
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Box, TextField, Button } from '@mui/material'
import { styled, css } from '@mui/system';
import { Modal as BaseModal } from '@mui/base/Modal';
import AddIcon from '@mui/icons-material/Add';

export default function AddMedication(props) {
    const {petID, setUpdate} = props;
    const [open, setOpen] = useState(false);
    const [verify, setVerify] = useState(false);
    const [nameInput, setNameInput] = useState('');
    const [startDateInput, setStartDateInput] = useState('');
    const [vetInput, setVetInput] = useState(''); //FIXME: how should i do this one
    const [typeInput, setTypeInput] = useState('');
    const [dosageInput, setDosageInput] = useState('');
    const [adminMethodInput, setAdminMethodInput] = useState('');
    const [startDateFailed, setStartDateFailed] = useState(false);
    const [nameFailed, setNameFailed] = useState(false);
    const [typeFailed, setTypeFailed] = useState(false);
    const [dosageFailed, setDosageFailed] = useState(false);
    const [adminMethodFailed, setAdminMethodFailed] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const months = [31,28,31,30,31,30,31,31,30,31,30,31];

    const handleNameChange = event => {
        console.log("handleInputChange called.");
        setNameInput(event.target.value);
        setNameFailed(false);
    };
    const handleStartDateChange = event => {
      console.log("handleInputChange called.");
      setStartDateInput(event.target.value);
      setStartDateFailed(false);
  };
    const handleTypeChange = event => {
        console.log("handleInputChange called.");
        setTypeInput(event.target.value);
        setTypeFailed(false);
    };
    const handleVetChange = event => {
        console.log("handleInputChange called.");
        setVetInput(event.target.value);
    };
    const handleDosageChange = event => {
        console.log("handleInputChange called.");
        setDosageInput(event.target.value);
        setDosageFailed(false);
    };
    const handleMethodChange = event => {
        console.log("handleInputChange called.");
        setAdminMethodInput(event.target.value);
        setAdminMethodFailed(false);
    };

    useEffect(() => {
        if( !verify || nameInput.length === 0 || startDateInput.length === 0 
            || typeInput.length === 0 || dosageInput.length === 0 || adminMethodInput.length === 0 ){
            return;
        }
        let failed = false;
        if( nameInput.length === 0 ){
            setNameFailed(true);
            failed = true;
        }
        if( typeInput.length === 0 ){
            setTypeFailed(true);
            failed = true;
        }
        if( dosageInput.length === 0 ){
            setDosageFailed(true);
            failed = true;
        }
        if( adminMethodInput.length === 0 ){
            setAdminMethodFailed(true);
            failed = true;
        }
        //start date must be YYYY-MM-DD
        if( startDateInput.length === 0 ){
            setStartDateFailed(true);
            failed = true;
        }
        else{
            let year = startDateInput.slice(0,4);
            let month = startDateInput.slice(5,7);
            let day = startDateInput.slice(8,startDateInput.length);
            if( startDateInput.length != 10 || startDateInput[4] != '-' || startDateInput[7] != '-' ||
                year < 2000 || year > 2050 || month <= 0 || month > 12 || day <= 0 || day > months[month-1] ){
                  setStartDateFailed(true);
                  failed = true;
            }
        }
        if( failed ){
            setVerify(false);
            return;
        }

        const api = new API();
        let vet = vetInput;
        if( vet === '' ){
          vet = null;
        }

        async function postMedication() {
            const medUpdateResults = await api.addMedication({name: nameInput, startDate: startDateInput, pet: petID, veterinarian: vet, type: typeInput, dosage: dosageInput, admin_method: adminMethodInput});
            console.log(`adding to medications ${JSON.stringify(medUpdateResults)}`);
            setUpdate(true);
            setNameInput('');
            setStartDateInput('');
            setVetInput('');
            setTypeInput('');
            setDosageInput('');
            setAdminMethodInput('');
            setVerify(false);
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
                        flexDirection: 'row',
                        marginBottom: 4
                    }}>
                        <TextField
                            error={nameFailed}
                            id="outlined-error-helper-text"
                            label="Name*"
                            placeholder=""
                            value={nameInput}
                            onChange={handleNameChange}
                        />
                        <TextField
                            error={startDateFailed}
                            id="outlined-error-helper-text"
                            label="Start Date*"
                            placeholder="YYYY-MM-DD"
                            value={startDateInput}
                            onChange={handleStartDateChange}
                        />
                    </Box>
                    <Box sx={{
                        width: '100%',
                        height: 30,
                        display: 'flex',
                        flexDirection: 'row',
                        marginBottom: 4
                    }}>
                        <TextField
                            id="outlined-error-helper-text"
                            label="Veterinarian"
                            placeholder=""
                            value={vetInput}
                            onChange={handleVetChange}
                        />
                        <TextField
                            error={typeFailed}
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
                        flexDirection: 'row',
                        marginBottom: 4
                    }}>
                        <TextField
                            error={dosageFailed}
                            id="outlined-error-helper-text"
                            label="Dosage*"
                            placeholder=""
                            value={dosageInput}
                            onChange={handleDosageChange}
                        />
                        <TextField
                            error={adminMethodFailed}
                            id="outlined-error-helper-text"
                            label="Admin Method*"
                            placeholder=""
                            value={adminMethodInput}
                            onChange={handleMethodChange}
                        />
                    </Box>
                    <Button onClick={()=>setVerify(true)}>
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