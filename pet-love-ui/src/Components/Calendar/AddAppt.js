import React, {Fragment, useEffect, useState} from 'react';
import Typography from '@mui/material/Typography';
import { Box, Button, TextField } from '@mui/material'
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { styled, css } from '@mui/system';
import { Modal as BaseModal } from '@mui/base/Modal';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import AddIcon from '@mui/icons-material/Add';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const ChoosePets = (props) => {
    const {pets, petName, setPetName} = props;

    const handleChange = (event) => {
        const {
        target: { value },
        } = event;
        setPetName(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <div>
        <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
            <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={petName}
            onChange={handleChange}
            input={<OutlinedInput label="Tag" />}
            renderValue={(selected) => selected.join(', ')}
            MenuProps={MenuProps}
            >
            {pets.map((pet) => (
                <MenuItem key={pet['petID']} value={pet['name']}>
                <Checkbox checked={petName.indexOf(pet['name']) > -1} />
                <ListItemText primary={pet['name']} />
                </MenuItem>
            ))}
            </Select>
        </FormControl>
        </div>
    );
}

export default function AddAppt(props) {
    const {pets, apptInfo, setApptInfo} = props;
    const [open, setOpen] = React.useState(false);
    const [timeInput, setTimeInput] = useState("");
    const [typeInput, setTypeInput] = useState("");
    const [petInput, setPetInput] = React.useState([]);
    const [notesInput, setNotesInput] = useState([]);
    const [verify, setVerify] = useState(false);
    const [timeFailed, setTimeFailed] = useState(false);
    const [typeFailed, setTypeFailed] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const onAddClick = () => {
        setVerify(true);
        return;
    }

    const handleTimeChange = event => {
        console.log("handleInputChange called.");
        if(timeInput > 0){
            console.log(`time input at 0 ${timeInput[0].isInteger}`);
        }
        setTimeInput(event.target.value);
        setTimeFailed(false);
    };

    const handleTypeChange = event => {
        console.log("handleInputChange called.");
        setTypeInput(event.target.value);
        setTypeFailed(false);
    };

    const handleNotesChange = event => {
        console.log("handleInputChange called.");
        setNotesInput(event.target.value);
    };

    useEffect(() => {
        if( !verify ) {
            return;
        }
        let failed = false;
        if( timeInput.length === 0 ){
            setTimeFailed(true);
            failed = true;
        }
        else{
            let hour = parseInt(timeInput.slice(0,2));
            let minute = parseInt(timeInput.slice(3,timeInput.length));
            if( timeInput.length !== 5 || timeInput[2] !== ':' ||
                hour.isNaN() || minute.isNaN() ||
                hour > 23 || hour < 0 || minute > 59 || minute < 0 ) {
                setTimeFailed(true);
                failed = true;
            }
        }
        
        if( typeInput.length === 0 ){
            setTypeFailed(true);
            failed = true;
        }
        if(failed) {
            setVerify(false);
            return;
        }
        let notes = notesInput;
        if( notes.length === 0 ){
            notes = '/0';
        }
        setApptInfo({time: timeInput, type: typeInput, pets: petInput, notes: notes});
        handleClose();
    }, [verify])

    return (
        <div>
        <TriggerButton type="button" onClick={handleOpen}>
            <AddIcon/>
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
                    flexDirection: 'column',
                    marginBottom: 4
                }}>
                    <Box sx={{
                        width: '100%',
                        height: 30,
                        display: 'flex',
                        flexDirection: 'row',
                        marginBottom: 3
                    }}>
                        <TextField
                            error={timeFailed}
                            id="outlined-error-helper-text"
                            label="Time"
                            placeholder="HH:MM"
                            value={timeInput}
                            onChange={handleTimeChange}
                        />
                        <TextField
                            error={typeFailed}
                            id="outlined-error-helper-text"
                            label="Type"
                            placeholder="ex: groomer"
                            value={typeInput}
                            onChange={handleTypeChange}
                        />
                    </Box>
                    <Box sx={{
                        width: '100%',
                        height: 30,
                        marginBottom: 5
                    }}>
                        <ChoosePets pets={pets} petName={petInput} setPetName={(input)=>setPetInput(input)} />
                    </Box>
                        <TextField
                            id="outlined-error-helper-text"
                            label="Notes"
                            placeholder=""
                            value={notesInput}
                            onChange={handleNotesChange}
                        />
                </Box>
                
                <Button onClick={onAddClick}>
                    Add 
                    <AddIcon/>
                </Button>
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