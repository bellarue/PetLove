import React, {useState, useEffect, Fragment} from 'react';
import API from './API_Interface/API_Interface';

import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import {Typography} from '@mui/material'
import Divider from '@mui/material/Divider';

const CreateAccount = props => {
    const {users, emails, setShowForm} = props;
    const [emailInput, setEmailInput] = useState('');
    const [usernameInput, setUsernameInput] = useState('');
    const [fnameInput, setFNameInput] = useState('');
    const [lnameInput, setLNameInput] = useState('');
    const [verifyInfo, setVerifyInfo] = useState(false);
    const [emailUsed, setEmailUsed] = useState(false);
    const [usernameUsed, setUsernameUsed] = useState(false);
    const handleEmailChange = event => {
        console.log("handleInputChange called.");
        setEmailInput(event.target.value);
        setEmailUsed(false);
    };
    const handleUsernameChange = event => {
        console.log("handleInputChange called.");
        setUsernameInput(event.target.value);
        setUsernameUsed(false);
    };
    const handleFNameChange = event => {
        console.log("handleInputChange called.");
        setFNameInput(event.target.value);
    };
    const handleLNameChange = event => {
        console.log("handleInputChange called.");
        setLNameInput(event.target.value);
    };

    useEffect(()=>{
        let authFailed = false;
        if( !verifyInfo ){
            return;
        }
        if( emails.includes(emailInput) ){
            setEmailUsed(true);
            authFailed = true;
        }
        if( users.includes(usernameInput) ){
            setUsernameUsed(true);
            authFailed = true;
        }
        if( authFailed || emailInput.length === 0 || usernameInput.length === 0
            || fnameInput.length === 0 || lnameInput.length === 0 ){
            return;
        }

        const api = new API();
    
        async function addUser() {
            const userJSONString = api.addUser({email: emailInput, username: usernameInput, fname: fnameInput, lname: lnameInput});
            console.log(`addUser result ${JSON.stringify(userJSONString)}`);
        }

        addUser();
        setShowForm(false);

    }, [verifyInfo]);

    return <Fragment>
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" width={400} mt={10}>
            <Box display="flex" flexDirection="row" justifyContent="space-around" alignItems="center" width="100%" mb={0.75}>
                <TextField
                    error={emailUsed}
                    id="outlined-error-helper-text"
                    label="Email"
                    placeholder=""
                    value={emailInput}
                    onChange={handleEmailChange}
                />
                <TextField
                    error={usernameUsed}
                    id="outlined-error-helper-text"
                    label="Username"
                    placeholder=""
                    value={usernameInput}
                    onChange={handleUsernameChange}
                />
            </Box>
            <Box display="flex" flexDirection="row" justifyContent="space-around" alignItems="center" width="100%">
                <TextField
                    id="outlined-error-helper-text"
                    label="First Name"
                    placeholder=""
                    value={fnameInput}
                    onChange={handleFNameChange}
                />
                <TextField
                    id="outlined-error-helper-text"
                    label="Last Name"
                    placeholder=""
                    value={lnameInput}
                    onChange={handleLNameChange}
                />
            </Box>
        </Box>
        <Button
            variant="outlined"
            size="medium"
            onClick={() => {setVerifyInfo(true)}}
        >Create</Button>
    </Fragment>
}

export default function Login({setUser}) {
    const [userInput, setUserInput] = useState('');
    const [verifyUser, setVerifyUser] = useState(false);
    const [authFailed, setAuthFailed] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [users, setUsers] = useState([]);
    const [emails, setEmails] = useState([]);

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
    console.log(`emails list is ${JSON.stringify(emails)}`);
    console.log(`users list is ${JSON.stringify(users)}`);

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
            return <CreateAccount users={users} emails={emails} setShowForm={(value)=>setShowForm(value)} />;
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