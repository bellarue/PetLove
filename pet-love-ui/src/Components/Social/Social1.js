import React, {Fragment} from 'react';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

import testPFP from '../../images/testImg.jpeg';
import testQR from '../../images/QRCodeExample.jpg';

const ProfilePic = (props) => {

    return(
        <Box
            sx={{
                width: "100%",
                height: "100%",

                maxWidth: 100,
                maxHeight: 100,

                border: 3,
                m: 2,
                // p: 5,

                display: "flex",
                // flexDirection: "row",
                justifyContent: "center",
                alignContent: "center",
                textAlign: "center",
                
            }}
        >
            <img src={testPFP} alt="" style={{ maxWidth: "100%", maxHeight: "100%" }} />
        </Box>
    )
};

const FriendCode = (props) => {
    const teststr = "SW-7417-3522-1808";
    return(
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignContent: "center",
                textAlign: "center",
            }}
        >
            FriendCode: {teststr}

        </Box>
    )

};

const DisplayUserName = (props) => {

    const userName = "Phi Do";

    return(
        <Fragment>
            <Box
                sx={{
                    width: "75%",
                    height: "100%",

                    maxWidth: "100%",
                    maxHeight: "100%",

                    border: 3,
                    m: 2,
                    // p: 5,

                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignContent: "center",
                    textAlign: "center",
                }}
            >
                <Box>
                    {userName}
                    <FriendCode/> 
                </Box>

                <Box
                    sx={{    
                        display: "flex",
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                    }}
                >
                    <img src={testQR} alt="" style={{ width: 50, height: 50 }} />
                </Box>
                
            </Box>
        </Fragment>

    )
};

const FriendRequests = (props) => {

    return(
        <Box
            sx={{
                width: 1350,
                height: 75,

                maxWidth: "100%",
                maxHeight: "100%",

                border: 3,
                m: 2,

                display: "flex",
                // flexDirection: "row",
                justifyContent: "center",
                alignContent: "center",
                textAlign: "center",
            }}
        >
            Friend Requests
        </Box>
    )
};

const Messages = (props) => {

    return(
        <Box
            sx={{
                width: 1350,
                height: 75,

                maxWidth: "100%",
                maxHeight: "100%",

                border: 3,
                m: 2,

                display: "flex",
                // flexDirection: "row",
                justifyContent: "center",
                alignContent: "center",
                textAlign: "center",
            }}
        >
            Messages
        </Box>
    )
};

const FriendPictures = (props) => {

    return(
        <Box
            sx={{
                width: 1350,
                height: 400,

                maxWidth: "100%",
                maxHeight: "100%",

                border: 3,
                m: 2,

                display: "flex",
                // flexDirection: "row",
                justifyContent: "center",
                alignContent: "center",
                textAlign: "center",
            }}
        >
            Friend Pictures
        </Box>
    )
};

export default function Social(props) {
    return (
        <Fragment>
            <Box
                sx={{
                    m: 2,
                    fontSize: 40,
                    fontWeight: 500,

                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignContent: "center",
                    textAlign: "center",
                }}
            >
                Social Page
            </Box>

            <Box
                sx={{
                    display: "flex",
                    // justifyContent: "center",
                    gap: "2px",
                }}
            >
                <ProfilePic/>
                
                <DisplayUserName/>
                <FriendPictures/>
            </Box>

            <Box>
                <FriendRequests/>
            </Box>

            <Box>
                <Messages/>
            </Box>

            {/* <Box>
                <FriendPictures/>
            </Box> */}

        </Fragment>
    )
}
