import React, {Fragment, useEffect, useState} from 'react';
import API from '../../API_Interface/API_Interface'
import Typography from '@mui/material/Typography';
import {Box} from '@mui/material'
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';

export default function Search() {
    const [input, setInput] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [showList, setShowList] = useState(false);

    useEffect(() => {
        if( input === '' || !showList ){
            return;
        }
        const api = new API();

        async function getUsers() {
            const usersJSONString = await api.userWithUsername(input);
            console.log(`users from the DB ${JSON.stringify(usersJSONString)}`);
            setUsers(usersJSONString.data);
        }

        getUsers();
    }, [input]);

    const handleInputChange = event => {
        console.log("handleInputChange called.");
        setInput(event.target.value);
    }

    const UsersList = props => {
        const {users} = props; //need to get this from api route
        console.log(`rendering users list, ${JSON.stringify(users)}`);
        const handleListItemClick = (event, index) => {
            setSelectedIndex(index);
        };
        return (
            <List component="nav"
                aria-label="list of users" sx={{
                width: 100,
                maxHeight: 300,
                bgcolor: 'background.paper',
                position: 'relative',
                overflow: 'auto',
                mr: 2
            }}>
                {
                    users.map((user,idx) =>
                        <ListItemButton 
                            key={idx}
                            selected={selectedIndex === idx}
                            onClick={(event) => handleListItemClick(event, idx)}
                        >
                            <ListItemText primary={user['username']} />
                        </ListItemButton>
                    )
                }
            </List>
        )
    }

    return <Fragment>
        <Box sx={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <Box display="flex" flexDirection="row" justifyContent="space-around" alignItems="center" width="100%" mb={0.75}>
                <TextField
                    id="outlined-error-helper-text"
                    label="Veterinarian's Email"
                    placeholder=""
                    value={input}
                    onChange={handleInputChange}
                />
            </Box>
            <Button
                variant="outlined"
                size="medium"
                onClick={() => {setShowList(true)}}
            >Search</Button>
        </Box>
        
    </Fragment>
  }