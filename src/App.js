import {Fragment} from "react";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import MainDrawer from './menu/MainDrawer';

const makeUserName = ({fname, lname, username}) => {
    return username;
    // return `${fname} ${lname}`;
};

export default function App({user, logoutAction}) {
    const mainPageTitle = "Pet Love";

    return (
                <MainDrawer title={mainPageTitle}
                            user={makeUserName(user)}
                            logoutAction={logoutAction}/>
    )

}

