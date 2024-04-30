import React, { Fragment } from "react";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { Box } from "@mui/material";
import ChatApp from "../Chat/ChatApp";

import Button from "@mui/material/Button";

import testPFP from "../../images/testImg.jpeg";

const ProfilePic = (props) => {
    return (
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
            <img
                src={testPFP}
                alt=""
                style={{ maxWidth: "100%", maxHeight: "100%" }}
            />
        </Box>
    );
};

const FriendCode = (props) => {
    // const teststr = "SW-7417-3522-1808";
    return (
        <Box
            sx={{
                width: 100,
                maxWidth: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignContent: "center",
                textAlign: "center",
            }}
        >
            {/* FriendCode: {teststr} */}
        </Box>
    );
};

const DisplayUserName = (props) => {
    const userName = "Phi Do";

    return (
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
                    <FriendCode />
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "right",
                        alignContent: "right",
                        textAlign: "right",
                    }}
                ></Box>
            </Box>
        </Fragment>
    );
};

const FriendRequests = (props) => {
    return (
        <Box
            sx={{
                width: "75%",
                height: "75%",

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
    );
};

const Messages = (props) => {
    return (
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
    );
};

const FriendPictures = (props) => {
    return (
        <Box
            sx={{
                width: 1350,
                height: 400,

                position: "relative",

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
    );
};

export default function Social(props) {
    const [showChatApp, setShowChatApp] = useState(false);
    const [selected, setSelected] = React.useState(false);

    const handleClick = () => {
        setShowChatApp(true);
    };

    return (
        // <Box>
        //     <App/>
        // </Box>
        <Fragment>
            <Box sx={{ maxWidth: "75%" }}>
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
                        width: "75%",
                        display: "flex",
                        flexDirection: "column",
                        // justifyContent: "center",
                        gap: "2px",
                    }}
                >
                    <ProfilePic />

                    <DisplayUserName />
                    {/* <FriendPictures /> */}
                </Box>
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
                    {showChatApp && <ChatApp />}
                </Box>

                <Box>
                    <FriendRequests />
                </Box>

                {/* dont need since phi addded chat rooms. implement direct messages if time */}
                {/* <Box>
                <Messages />
                </Box> */}

                {/* <Box>
                    <FriendPictures/>
                </Box> */}
            </Box>
        </Fragment>
    );
}
