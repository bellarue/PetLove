import React, {Fragment, useEffect, useState} from 'react';
import API from '../../API_Interface/API_Interface'
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Button, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { styled, css } from '@mui/system';
import { Modal as BaseModal } from '@mui/base/Modal';
import AddIcon from '@mui/icons-material/Add';

export default function AddParent(props) {
    const {petID, friends, setUpdate} = props;
    const [open, setOpen] = React.useState(false);
    const [parent, setParent] = useState('');
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [verify, setVerify] = useState(false);

    const onAddClick = () => {
        setVerify(true);
        return;
    }
    
    const handleChange = (event) => {
        setParent(event.target.value);
    };

    useEffect(() => {
        if( !verify || parent.length === 0 ){
            return;
        }

        const api = new API();

        async function postParent() {
            const parentUpdateResults = await api.addParent({user: parent, pet: petID});
            console.log(`adding to pet parents ${JSON.stringify(parentUpdateResults)}`);
            setUpdate(true);
            setParent('');
            setVerify(false);
        }
        postParent();
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
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Choose Parent</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={parent}
                            label="Choose Parent"
                            onChange={handleChange}
                            >
                            {
                                friends.map((friend, idx) => 
                                    <MenuItem key={idx} value={friend['friend']}>
                                        {friend['username']}
                                    </MenuItem>
                                )
                            }
                            </Select>
                        </FormControl>
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