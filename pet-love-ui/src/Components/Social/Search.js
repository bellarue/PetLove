import React, {Fragment, useEffect, useState} from 'react';
import API from '../../API_Interface/API_Interface'
import Typography from '@mui/material/Typography';
import {Box, Button, ListItemButton} from '@mui/material'
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';

export default function Search(props) {
    const {email} = props;
    const [input, setInput] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [showList, setShowList] = useState(false);
    const [users, setUsers] = useState([]);
    const [friendRequest, setFriendRequest] = useState('');

    useEffect(() => {
        if( friendRequest === '' ){
            return;
        }
    
        const api = new API();

        async function postFriendRequest() {
            const userJSONString = api.addFriendRequest(email, friendRequest['email']);
            console.log(`FR result ${JSON.stringify(userJSONString)}`);
            setFriendRequest(''); //reset FR
        }

        postFriendRequest();
    }, [friendRequest]);
    console.log(`show list is ${showList}`);
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
    }, [showList]);

    const handleInputChange = event => {
        console.log("handleInputChange called.");
        setInput(event.target.value);
    }

    const UsersList = props => {
        const {users} = props; //need to get this from api route
        console.log(`rendering users list, ${JSON.stringify(users)}`);
        const handleListItemClick = (event, index) => {
            setSelectedIndex(index);
            setFriendRequest(users[index]);
        };
        return (
            <List component="nav"
                aria-label="list of users" sx={{
                width: 200,
                maxHeight: 300,
                bgcolor: 'background.paper',
                position: 'relative',
                overflow: 'auto',
                mr: 2
            }}>
                {
                    users.map((user,idx) =>
                        <Tooltip title="Send friend request?">
                            <ListItemButton 
                                key={idx}
                                selected={selectedIndex === idx}
                                onClick={(event) => handleListItemClick(event, idx)}
                            >
                                <ListItemText primary={user['username']} />
                            </ListItemButton>
                        </Tooltip>
                    )
                }
            </List>
        )
    }

    const display = () => {
        if( showList ) {
            return <UsersList users={users} />
        }
    }

    return <Fragment>
        <Box sx={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <Box display="flex" flexDirection="row" alignItems="center" justifyContent='center' width="100%" mb={0.75}>
                <TextField
                    id="outlined-error-helper-text"
                    label="Search Users"
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
            {display()}
        </Box>
        
    </Fragment>
  }