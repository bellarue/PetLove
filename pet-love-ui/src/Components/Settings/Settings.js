import React, {Fragment} from 'react';
import { Box } from '@mui/material';

const Username = (props) => {

    const {onClick} = props;

    return(
        <Box
            sx={{
                width: "100%",
                height: "100%",

                borderTop: 3,
                borderRight: 3,
                borderBottom: 3,
                borderLeft: 0,

                display: "flex",
                // flexDirection: "row",
                justifyContent: "center",
                alignContent: "center",
                textAlign: "center",
            }}
            onClick={onClick}
        >
            Username
        </Box>
    )
};

const AccountSettings = (props) => {

    return(
        <Box
            sx={{
                width: "100%",
                height: "100%",

                borderTop: 0,
                borderRight: 3,
                borderBottom: 3,
                borderLeft: 0,

                display: "flex",
                // flexDirection: "row",
                justifyContent: "center",
                alignContent: "center",
                textAlign: "center",
            }}
        >
            Account Settings
        </Box>
    )
};

const VisualAndAccessibility = (props) => {

    return (
        <Box
            sx={{
                width: "100%",
                height: "100%",

                borderTop: 0,
                borderRight: 3,
                borderBottom: 3,
                borderLeft: 0,

                display: "flex",
                // flexDirection: "row",
                justifyContent: "center",
                alignContent: "center",
                textAlign: "center",
            }}
        >
            Visual/
            Accessibility
        </Box>
    )
};

const ManagePets = (props) => {

    return (
        <Box
            sx={{
                width: "100%",
                height: "100%",

                borderTop: 0,
                borderRight: 3,
                borderBottom: 3,
                borderLeft: 0,

                display: "flex",
                // flexDirection: "row",
                justifyContent: "center",
                alignContent: "center",
                textAlign: "center",
            }}
        >
            Manage
            Pets
        </Box>
    )
};

const LogOut = (props) => {

    return(
        <Box
            sx={{
                width: "100%",
                height: "100%",

                borderTop: 0,
                borderRight: 3,
                borderBottom: 3,
                borderLeft: 0,

                display: "flex",
                // flexDirection: "row",
                justifyContent: "center",
                alignContent: "center",
                textAlign: "center",
            }}
        >
            Log Out
        </Box>
    )
};


export default function Settings (props) {

    const userClick = () => {
        alert("username selected");
    }

    return (
        <Fragment>
            <Box
                sx={{
                    width: "100%",
                    height: "100%",
                    m: 4,
                    ml: 0, //get rid of when bgcolor: 'primary.main', is removed
                    mb: 8,

                    fontSize: 30,
                    fontWeight: 500,

                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignContent: "center",
                    textAlign: "center",
                    bgcolor: 'primary.main',
                }}
            >
                Account Settings
            </Box>

            <Box
                sx={{
                    width: 200,
                    height: 200,
                    m: 0,

                    maxWidth: "25%",
                    mexHeight: "100%",

                    fontSize: 30,
                    fontWeight: 500,

                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignContent: "center",
                    textAlign: "center",
                    // bgcolor: 'primary.dark',
                }}
            >
                <Box>
                    <Username onClick={userClick}/>
                </Box>
                <Box>
                    <AccountSettings/>
                </Box>
                <Box>
                    <VisualAndAccessibility/>
                </Box>
                <Box>
                    <ManagePets/>
                </Box>
                <Box>
                    <LogOut/>
                </Box>
            </Box>
        </Fragment>
    )
}
