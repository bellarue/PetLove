import React, {useState, useEffect, Fragment} from 'react';
import API from './API_Interface/API_Interface';

import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import {Typography} from '@mui/material'
import Divider from '@mui/material/Divider';
import CreateAccount from './Components/CreateAccount/CreateAccount';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import CheckIcon from '@mui/icons-material/Check';

const AccountAlert = () => {
  return (
    <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
        <AlertTitle>Success</AlertTitle>
        Account added
    </Alert>
  );
}

export default function Login({setUser}) {
    const [userInput, setUserInput] = useState('');
    const [verifyUser, setVerifyUser] = useState(false);
    const [authFailed, setAuthFailed] = useState(false);
    const [users, setUsers] = useState([]);
    const [emails, setEmails] = useState([]);
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        const api = new API();

        async function getUsers() {
            const usersJSONString = await api.allUsers();
            console.log(`users from the DB ${JSON.stringify(usersJSONString)}`);
            setEmails(usersJSONString.data.map(comp => comp.email));
            setUsers(usersJSONString.data.map(comp => comp.username));
        }

        getUsers();
    }, []);
    // console.log(`emails list is ${JSON.stringify(emails)}`);
    // console.log(`users list is ${JSON.stringify(users)}`);

    const handleInputChange = event => {
        console.log("handleInputChange called.");

//        event.stopPropagation();
//        event.preventDefault();

        setUserInput(event.target.value);
        setAuthFailed(false);

        if(event.key === "Enter") {
            console.log("handleKeyPress: Verify user input.");
            setVerifyUser(true);
        }
    };

    useEffect(() => {

        if( ! verifyUser || userInput.length === 0)
            return;

        const api = new API();
        async function getUserInfo() {
            api.getUserInfo(userInput)
                .then( userInfo => {
                console.log(`api returns user info and it is: ${JSON.stringify(userInfo)}`);
                const user = userInfo.user;
                if( userInfo.status === "OK" ) {
                    setUser(user);
                } else  {
                    setVerifyUser(false);
                    setAuthFailed(true);
                }
            });
        }

        getUserInfo();
    }, [verifyUser, setUser, userInput]);

    return (
       <Fragment>
            {!showAlert ? null : <Box sx={{
                position: "absolute",
                top: 5,
                right: 200,
                left: 200
            }}>
                <AccountAlert />
            </Box>}
           <Box display="flex" flexDirection='column' justifyContent="center" alignItems="center" width="100%" mt={11}>
                <TextField
                    error={authFailed}
                    id="outlined-error-helper-text"
                    label="Login name"
                    placeholder=""
                    value={userInput}
                    helperText="Only for existing users!"
                    onChange={handleInputChange}
                />
                <Divider />
           </Box>

           <Box display="flex" flexDirection='column' justifyContent="center" alignItems="center" width="100%" mt={2}>
           <Button
                    variant="outlined"
                    size="medium"
                    onClick={() => {setVerifyUser(true)}}
                >Proceed</Button>
            <Divider />
            <CreateAccount users={users} emails={emails} setShowAlert={(value)=>setShowAlert(value)} />
           </Box>
       </Fragment>

    );
}