import React, { Fragment, useEffect, useState } from "react";
import API from "../../API_Interface/API_Interface";
import Typography from "@mui/material/Typography";
import { Box, Grid } from "@mui/material";
import Button from "@mui/material/Button";

import Search from "./Search";
import ChatApp from "../Chat/ChatApp";

export default function Social(props) {
    const { username } = props;
    const [email, setEmail] = useState("");
    const [showChatApp, setShowChatApp] = useState(false);

    const handleClick = () => {
        setShowChatApp(true);
    };

    useEffect(() => {
        const api = new API();

        async function getEmail() {
            const userJSONString = await api.userWithUsername(username);
            console.log(`user from the DB ${JSON.stringify(userJSONString)}`);
            setEmail(userJSONString.data[0]["email"]);
        }

        getEmail();
    }, []);

    return (
        <Fragment>
            <Box
                sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Box
                    sx={{
                        width: "100%",
                        height: 30,
                        alignItems: "center",
                    }}
                >
                    <Typography align="center">Social</Typography>
                </Box>
                <Box
                    sx={{
                        width: "100%",
                        height: 100,
                        alignItems: "center",
                    }}
                >
                    <Typography>
                        grid row, 2 items? profile picture (can change here?)
                        and search username
                    </Typography>
                </Box>
                <Search email={email} />
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
        </Fragment>
    );
}
