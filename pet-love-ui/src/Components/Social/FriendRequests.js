import React, {Fragment, useEffect, useState} from 'react';
import API from '../../API_Interface/API_Interface'
import Typography from '@mui/material/Typography';
import {Box} from '@mui/material'
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import ListSubheader from '@mui/material/ListSubheader';
import Divider from '@mui/material/Divider';

const FriendRequestList = (props) => {
    const {friendRequests, setAccept, setReject} = props;
  
    return (
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper", overflow:'auto', maxHeight:200 }}>
        <ListSubheader>
            Friend Requests
        </ListSubheader>
        <Divider/>
        {friendRequests.map((fr, idx) => {
  
          return (
            <ListItem
              key={idx}
              secondaryAction={
                <>
                  <IconButton aria-label="accept" onClick={()=>setAccept(fr['sender'])}>
                    <CheckIcon />
                  </IconButton>
                  <IconButton edge="end" aria-label="reject" onClick={()=>setReject(fr['sender'])}>
                    <CloseIcon />
                  </IconButton>
                </>
              }
              disablePadding
            >
                <ListItemText
                    id={idx}
                    primary={fr['username']}
                />
            </ListItem>
          );
        })}
      </List>
    );
  }

export default function FriendRequests(props) {
    const {email, setReload} = props;
    const [friendRequests, setFriendRequests] = useState([]);
    const [accept, setAccept] = useState('');
    const [reject, setReject] = useState('');

    useEffect(() => {
        if( email === '' ){
            return;
        }
        const api = new API();

        async function getFriendRequests() {
            const frJSONString = await api.friendRequestsByRecipient(email);
            console.log(`friend requests from the DB ${JSON.stringify(frJSONString)}`);
            setFriendRequests(frJSONString.data);
        }

        getFriendRequests();
    }, [accept, reject, email]);

    useEffect(() => {
        if( accept === '' ){
            return;
        }

        const api = new API();

        async function postFriendship() {
            const friend1JSONString = await api.addFriendship({user: email, friend: accept});
            console.log(`friendship added ${JSON.stringify(friend1JSONString)}`);
            const friend2JSONString = await api.addFriendship({user: accept, friend: email});
            console.log(`friendship added ${JSON.stringify(friend2JSONString)}`);
        }
        async function deleteRequest() {
            const frJSONString = await api.removeFriendRequest({sender: accept, recipient: email});
            console.log(`request removed ${JSON.stringify(frJSONString)}`);
        }

        postFriendship();
        deleteRequest();
        setAccept('');
        setReload(true);
    }, [accept]);

    useEffect(() => {
        if( reject === '' ){
            return;
        }

        const api = new API();

        async function deleteRequest() {
            const frJSONString = await api.removeFriendRequest({sender: reject, recipient: email});
            console.log(`request removed ${JSON.stringify(frJSONString)}`);
        }

        deleteRequest();
        setReject('');
    }, [reject])

    return <Fragment>
        <Box sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            marginLeft: 1
        }}>
            <FriendRequestList friendRequests={friendRequests} setAccept={(value)=>setAccept(value)} setReject={(value)=>setReject(value)} />
        </Box>
    </Fragment>
}