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
    const [notesInput, setNotesInput] = useState('');
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
    const handleNotesChange = event => {
        console.log("handleInputChange called.");
        setNotesInput(event.target.value);
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
        
        let notes = notesInput;
        if( notes === '' ){
            notes = null;
        }

        async function postMedication() {
            const medUpdateResults = api.addMedication(nameInput, startDateInput, petID, vetInput, typeInput, dosageInput, adminMethodInput, notes);
            console.log(`adding to medications ${JSON.stringify(medUpdateResults)}`);
        }

        postMedication();
    }, [verify]);

    return (
        <div>
        <TriggerButton type="button" onClick={handleOpen}>
            <AddIcon />
        </TriggerButton>
        <Modal
            aria-labelledby="unstyled-modal-title"
            aria-describedby="unstyled-modal-description"
            open={open}
            onClose={handleClose}
            slots={{ backdrop: StyledBackdrop }}
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
                    <Box sx={{
                        width: '100%',
                        height: 50
                    }}>
                        <TextField
                            id="outlined-error-helper-text"
                            label="Notes"
                            placeholder=""
                            value={notesInput}
                            onChange={handleNotesChange}
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

const Backdrop = React.forwardRef((props, ref) => {
  const { open, className, ...other } = props;
  return (
    <div
      className={clsx({ 'base-Backdrop-open': open }, className)}
      ref={ref}
      {...other}
    />
  );
});

Backdrop.propTypes = {
  className: PropTypes.string.isRequired,
  open: PropTypes.bool,
};

const blue = {
  200: '#99CCFF',
  300: '#66B2FF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0066CC',
};

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

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
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

const TriggerButton = styled('button')(
  ({ theme }) => css`
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 600;
    font-size: 0.875rem;
    line-height: 1.5;
    padding: 8px 16px;
    border-radius: 8px;
    transition: all 150ms ease;
    cursor: pointer;
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    color: ${theme.palette.mode === 'dark' ? grey[200] : grey[900]};
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

    &:hover {
      background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
      border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
    }

    &:active {
      background: ${theme.palette.mode === 'dark' ? grey[700] : grey[100]};
    }

    &:focus-visible {
      box-shadow: 0 0 0 4px ${theme.palette.mode === 'dark' ? blue[300] : blue[200]};
      outline: none;
    }
  `,
);