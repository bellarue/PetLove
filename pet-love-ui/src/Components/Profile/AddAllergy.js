import React, {Fragment, useEffect, useState} from 'react';
import API from '../../API_Interface/API_Interface'
import { Button, TextField } from '@mui/material'
import { styled, css } from '@mui/system';
import { Modal as BaseModal } from '@mui/base/Modal';
import AddIcon from '@mui/icons-material/Add';

export default function AddAllergy(props) {
    const {petID, setUpdate} = props;
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState('');
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [verify, setVerify] = useState(false);
    
    const handleInputChange = event => {
        console.log("handleInputChange called.");
        setInput(event.target.value);
    };

    useEffect(() => {
        console.log(`in useEffect, verify is ${verify}, input is ${input}`)
        if( !verify ){
            return;
        }
        if( input.length === 0 ){
            handleClose();
            return;
        }

        const api = new API();

        async function postAllergy() {
            const allergyUpdateResults = await api.addAllergy({pet: petID, allergy: input});
            console.log(`adding to allergies ${JSON.stringify(allergyUpdateResults)}`);
            setUpdate(true);
            setInput('');
            setVerify(false);
        }

        postAllergy();
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
                <Fragment>
                    <TextField
                        id="outlined-error-helper-text"
                        label="New Allergy"
                        placeholder=""
                        value={input}
                        onChange={handleInputChange}
                    />
                    <Button onClick={()=>setVerify(true)}>
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