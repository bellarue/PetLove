import React, {Fragment, useEffect, useState} from 'react';
import API from '../../API_Interface/API_Interface'
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Box, TextField, Button } from '@mui/material'
// import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { styled, css } from '@mui/system';
import { Modal as BaseModal } from '@mui/base/Modal';
import AddIcon from '@mui/icons-material/Add';

export default function AddMealtime(props) {
    const {petID} = props;
    const [open, setOpen] = useState(false);
    const [verify, setVerify] = useState(false);
    const [timeInput, setTimeInput] = useState('');
    const [typeInput, setTypeInput] = useState('');
    const [amountInput, setAmountInput] = useState('');
    const [notesInput, setNotesInput] = useState('');
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleTypeChange = event => {
        console.log("handleInputChange called.");
        setTypeInput(event.target.value);
    };

    const handleAmountChange = event => {
        console.log("handleInputChange called.");
        setAmountInput(event.target.value);
    };

    const handleNotesChange = event => {
        console.log("handleInputChange called.");
        setNotesInput(event.target.value);
    };

    useEffect(() => {
        if( !verify || timeInput.length === 0 || typeInput.length === 0 || amountInput.length === 0 ){
            return;
        }

        const api = new API();

        let notes = notesInput;
        if( notes === '' ){
            notes = null;
        }

        async function postMealtime() {
            const mealtimeUpdateResults = api.addMealtime({time: timeInput, pet: petID, type: typeInput, amount: amountInput, notes: notes});
            console.log(`adding to mealtimes ${JSON.stringify(mealtimeUpdateResults)}`);
        }

        postMealtime();
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
                        {/* <TimePicker
                            label="Time*"
                            value={timeInput}
                            onChange={(newTime) => setTimeInput(newTime)}
                        /> */}
                        <TextField
                            id="outlined-error-helper-text"
                            label="Type*"
                            placeholder=""
                            value={typeInput}
                            onChange={handleTypeChange}
                        />
                    </Box>
                    <TextField
                        id="outlined-error-helper-text"
                        label="Amount*"
                        placeholder=""
                        value={amountInput}
                        onChange={handleAmountChange}
                    />
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