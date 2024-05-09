import React, {Fragment, useEffect, useState} from 'react';
import API from '../../API_Interface/API_Interface'
import Typography from '@mui/material/Typography';
import {Box, Button} from '@mui/material'
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';

import Search from './Search';
import ChatApp from "../Chat/ChatApp";
import FriendRequests from './FriendRequests';

const FriendsList = (props) => {
    const {friends} = props;
    return <Fragment>
        <Box sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'auto'
        }}>
            <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <List aria-label="friends list">
                <ListSubheader>
                    Friends List
                </ListSubheader>
                <Divider/>
                {
                    friends.map((friend, idx) => 
                        <ListItemText primary={friend['username']} key={idx} />
                    )
                }
            </List>
            </Box>
        </Box>
    </Fragment>
}

export default function Social(props) {
    const {username} = props;
    const [email, setEmail] = useState('');
    const [showChatApp, setShowChatApp] = useState(false);
    const [friends, setFriends] = useState([]);
    const [reload, setReload] = useState(true);

    const handleClick = () => {
        setShowChatApp(true);
    };

    useEffect(() => {
        const api = new API();

        async function getEmail() {
            const userJSONString = await api.userWithUsername(username);
            console.log(`user from the DB ${JSON.stringify(userJSONString)}`);
            setEmail(userJSONString.data[0]['email']);
        }

        getEmail();
    }, []);

    useEffect(() => {
        console.log(`reload is ${reload}`);
        if( !reload || email.length === 0 ){ //just to prevent looping, reload default is true 
            return;
        }
        const api = new API();

        async function getFriends() {
            const friendsJSONString = await api.friendsByUser(email);
            console.log(`friends from the DB ${JSON.stringify(friendsJSONString)}`);
            setFriends(friendsJSONString.data);
        }

        getFriends();
        setReload(false);
    }, [reload, email]);

    return <Fragment>
        <Box sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <Box sx={{
                width: '100%',
                height: 30,
                alignItems: 'center'
            }}>
                <Typography align="center">
                    Social
                </Typography>
            </Box>
            {/* <Box sx={{
                width: '100%',
                height: 100,
                alignItems: 'center'
            }}>
                <Typography>
                    grid row, 2 items? profile picture (can change here?) and search username
                </Typography>
            </Box> */}
            <Box sx={{
                width: '100%',
                height: 300,
                display: 'flex',
                flexDirection: 'row'
            }}>
                <FriendsList friends={friends} />
                <FriendRequests email={email} setReload={(value)=>setReload(value)} />
            </Box>
            <Search email={email} friends={friends.map(comp => comp.friend)} />
            <Box
                sx={{
                    position: "absolute",
                    bottom: 5,
                    right: 5,
                    display: "flex",
                    flexDirection: "column",
                    // justifyContent: "center",
                    gap: "2px",
                }}
            >
                {!showChatApp && (
                    <Box>
                        <Button
                            variant="contained"
                            color="success"
                            onClick={handleClick}
                        >
                            Chat Rooms!
                        </Button>
                    </Box>
                )}
                {showChatApp && <ChatApp setShowChatApp={(value)=>setShowChatApp(value)} />}
            </Box>
        </Box>
        
    </Fragment>
}