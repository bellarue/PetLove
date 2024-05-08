import "./ChatApp.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";
import CloseIcon from '@mui/icons-material/Close';
import {Box, Button} from '@mui/material'

const socket = io.connect("http://localhost:3001");

function ChatApp(props) {
    const {setShowChatApp} = props;
    const [username, setUserName] = useState("");
    const [room, setRoom] = useState("");
    const [showChat, setShowChat] = useState(false);

    const joinRoom = () => {
        if (username !== "" && room !== "") {
            socket.emit("join_room", room);
            setShowChat(true);
        }
    };

    return (
        <div className="chatApp">
            <Button variant="contained"
                onClick={()=>setShowChatApp(false)}
                sx={{position: "absolute",
                    top: 5,
                    right: 5,
                    backgroundColor: '#FF6D01'
            }}>
                <CloseIcon/>
            </Button>
            {!showChat ? (
                <div className="joinChatContainer">
                    <h3>Join a Chat Room</h3>
                    <input
                        type="text"
                        placeholder="User Name..."
                        onChange={(event) => {
                            setUserName(event.target.value);
                        }}
                    />
                    <input
                        type="text"
                        placeholder="Room ID..."
                        onChange={(event) => {
                            setRoom(event.target.value);
                        }}
                    />
                    <button onClick={joinRoom}>Join a Room</button>
                </div>
            ) : (
                <Chat socket={socket} username={username} room={room}></Chat>
            )}
        </div>
    );
}

export default ChatApp;
