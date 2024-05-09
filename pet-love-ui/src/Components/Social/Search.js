import React, {Fragment, useEffect, useState} from 'react';
import API from '../../API_Interface/API_Interface'
import Typography from '@mui/material/Typography';
import {Box, Button, ListItemButton} from '@mui/material'
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Tooltip from '@mui/material/Tooltip';
import AddIcon from '@mui/icons-material/Add';

export default function Search(props) {
    const {email, friends} = props;
    console.log(`friends in search bar is ${friends}`);
    const [input, setInput] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [users, setUsers] = useState([]);
    const [friendRequest, setFriendRequest] = useState('');
    
    const removeUser = (idx) => {
        let tempUsers = users.slice();
        tempUsers.splice(idx);
        setUsers(tempUsers);
    }

    useEffect(() => {
        if( friendRequest === '' ){
            return;
        }
    
        const api = new API();
        console.log(friendRequest);
        async function postFriendRequest() {
            const userJSONString = await api.addFriendRequest({sender: email, recipient: friendRequest['email']});
            console.log(`FR result ${JSON.stringify(userJSONString)}`);
            setFriendRequest(''); //reset FR
        }

        postFriendRequest();
    }, [friendRequest]);
    useEffect(() => {

        if( input === '' ){
            return;
        }
        const api = new API();

        async function getUsers() {
            const usersJSONString = await api.userWithUsername(input);
            console.log(`users from the DB ${JSON.stringify(usersJSONString)}`);
            setUsers(usersJSONString.data);
        }

        getUsers();
    }, [friends, input]);

    useEffect(() => {
        if( users.length === 0 ){
            return;
        }
        let tempUsers = users.slice();
        let removed = false;
        for( let i = 0; i < tempUsers.length; i++ ){
            if( tempUsers[i]['email'] === email || friends.includes(tempUsers[i]['email']) ){
                console.log(`removing user from search ${tempUsers[i]['email']}`);
                tempUsers.splice(i, 1);
                removed = true;
            }
        }
        if( removed ){
            setUsers(tempUsers);
        }
    }, [users]);

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
            removeUser(index);
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
                        <Tooltip title="Send friend request?" key={idx}>
                            <ListItemButton 
                                key={idx}
                                selected={selectedIndex === idx}
                                onClick={(event) => handleListItemClick(event, idx)}
                            >
                                <ListItemText primary={user['username']} />
                                <ListItemIcon>
                                    <AddIcon/>
                                </ListItemIcon>
                            </ListItemButton>
                        </Tooltip>
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
            <UsersList users={users} />
        </Box>
        
    </Fragment>
  }