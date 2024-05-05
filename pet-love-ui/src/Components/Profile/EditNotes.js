import React, {Fragment, useEffect, useState} from 'react';
import API from '../../API_Interface/API_Interface'
import clsx from 'clsx';
import { styled, css } from '@mui/system';
import { Modal as BaseModal } from '@mui/base/Modal';
import TextField from '@mui/material/TextField';
import CreateIcon from '@mui/icons-material/Create';
import { Button } from '@mui/material'

export default function EditNotes(props) {
    const {value, setValue, petID} = props;
    const [input, setInput] = useState(value);
    const [open, setOpen] = React.useState(false);
    const [verify, setVerify] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
      if( !verify ){
          return;
      }
      if( value === input ){
        handleClose();
        return; //no change
      }
      setValue(input);
      const api = new API();
      let notes = input;
        if( notes === '' ){
            notes = null;
        }

      async function postNotes() {
          const notesUpdateResults = await api.changePetNotes({notes: notes, petID: petID});
          console.log(`changing notes ${JSON.stringify(notesUpdateResults)}`);
      }

      postNotes();
      handleClose();
    }, [verify]);

    const handleInputChange = event => {
        console.log("handleInputChange called.");
        setInput(event.target.value);
    };

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
                  <TextField
                    id="outlined-error-helper-text"
                    label="Notes"
                    placeholder=""
                    value={input}
                    onChange={handleInputChange}
                  />
                  <Button onClick={()=>setVerify(true)}>
                    Update 
                    <CreateIcon/>
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
  