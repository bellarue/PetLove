import React, {useState, useEffect, Fragment} from 'react';
import API from './API_Interface/API_Interface';

import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import {Typography} from '@mui/material'
import Divider from '@mui/material/Divider';

const CreateAccount = props => {
    const {users} = props;
    const [emailInput, setEmailInput] = useState('');
    const [verifyEmail, setVerifyEmail] = useState(false);
    const [emailUsed, setEmailUsed] = useState(false);
    const handleInputChange = event => {
        console.log("handleInputChange called.");
        setEmailInput(event.target.value);
        setEmailUsed(false);
    };

    useEffect(()=>{
        if( !verifyEmail ){
            return;
        }
        if( users.includes(emailInput) ){
            setEmailUsed(true);
        }
    }, [verifyEmail]);

    return <Fragment>
        <Box display="flex" justifyContent="center" alignItems="center" width="100%" mt={10}>
            <TextField
                error={emailUsed}
                id="outlined-error-helper-text"
                label="Email"
                placeholder=""
                value={emailInput}
                onChange={handleInputChange}
            />
        </Box>
        <Button
            variant="outlined"
            size="medium"
            onClick={() => {setVerifyEmail(true)}}
        >Create</Button>
    </Fragment>
}

export default function Login({setUser}) {
    const [userInput, setUserInput] = useState('');
    const [verifyUser, setVerifyUser] = useState(false);
    const [authFailed, setAuthFailed] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const api = new API();

        async function getUsers() {
            const usersJSONString = await api.allUsersEmails();
            console.log(`users from the DB ${JSON.stringify(usersJSONString)}`);
            setUsers(usersJSONString.data);
        }

        getUsers();
    }, []);

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

    const display = () => {
        if(showForm){
            return <CreateAccount users={users} />;
        }
        return;
    }

    return (
       <Fragment>
           <Box display="flex" justifyContent="center" alignItems="center" width="100%" mt={10}>

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
            <Button
                    variant="outlined"
                    size="medium"
                    onClick={() => {
                        setShowForm(true);
                    }}
                >Create Account</Button>
            {display()}
           </Box>
       </Fragment>

    );
}