import React, {Fragment, useEffect, useState} from 'react';
import API from '../../API_Interface/API_Interface'
import Typography from '@mui/material/Typography';
import {Box, Button} from '@mui/material';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { styled, css } from '@mui/system';
import { Modal as BaseModal } from '@mui/base/Modal';
import CreateIcon from '@mui/icons-material/Create';
import CheckIcon from '@mui/icons-material/Check';
import AddVet from './AddVet';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const SelectVet = (props) => {
    const {vets, chosenVet, setChosenVet} = props;

    const handleChange = (event) => {
        setChosenVet(event.target.value);
    };

    return (
        <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Choose Vet</InputLabel>
            <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={chosenVet}
            label="Choose Vet"
            onChange={handleChange}
            >
                {
                    vets.map((vet, idx) => 
                        <MenuItem value={vet['email']}>
                            {vet['name']}
                        </MenuItem>
                    )
                }
            </Select>
        </FormControl>
        </Box>
    );
}

export default function EditVet(props) {
    const {email, petID} = props;
    const [vets, setVets] = useState([]);
    const [chosenVet, setChosenVet] = useState('');
    const [open, setOpen] = React.useState(false);
    const [check, setCheck] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        const api = new API();

        async function getVets() {
            const vetsJSONString = await api.vetsByUser(email);
            console.log(`vets from the DB ${JSON.stringify(vetsJSONString)}`);
            setVets(vetsJSONString.data);
        }

        getVets();
        handleClose();
    }, []);

    useEffect(() => {
        if( !check ){
            return;
        }
        if( chosenVet.length === '' ){
            handleClose();
            return;
        }
        const api = new API();

        async function postVet() {
            const vetsJSONString = await api.changeVet({veterinarian: chosenVet, petID: petID});
            console.log(`vet posted ${JSON.stringify(vetsJSONString)}`);
        }

        postVet();
    }, [check]);

    return (
        <div>
        <Button onClick={handleOpen}>
            <CreateIcon/>
        </Button>
        <Modal
            aria-labelledby="unstyled-modal-title"
            aria-describedby="unstyled-modal-description"
            open={open}
            onClose={handleClose}
        >
            <ModalContent sx={{ width: 400 }}>
            <Fragment>
                <Typography>
                    Select Vet from Available or Create New
                </Typography>
                <Box sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row'
                }}>
                    <SelectVet vets={vets} chosenVet={chosenVet} setChosenVet={(vetEmail)=>setChosenVet(vetEmail)} />
                    <AddVet email={email} />
                </Box>
                <Button onClick={()=>setCheck(true)}>
                    <CheckIcon/>
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
