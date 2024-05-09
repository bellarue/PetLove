import React, { Fragment, useState, useEffect } from "react";
import { Box } from "@mui/material";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";


export default function VisualAndAccessibility(props) {
    const [backgroundColor, setBackgroundColor] = useState("white");

    const handleChange = (event) => {
        const selectedValue = parseInt(event.target.value);

        switch (selectedValue) {
            case 0:
                setBackgroundColor("white");
                break;
            case 1:
                setBackgroundColor("#36454F"); //black
                break;
            case 2:
                setBackgroundColor("#ADD8E6"); //light blue
                break;
            case 3:
                setBackgroundColor("#B2AC88"); //sage green
                break;
            case 4:
                setBackgroundColor("#FFD580"); //light orange
                break;
            case 5:
                setBackgroundColor("#CBC3E3"); //purple
                break;
            case 6:
                setBackgroundColor("#FFB6C1"); //pink
                break;
            case 7:
                setBackgroundColor("#a0d6b4"); //seafoam green
                break;
            case 8:
                setBackgroundColor("#fffd37"); //yellow
                break;
            case 9:
                setBackgroundColor("#a88f59"); //darksand
                break;
            default:
                setBackgroundColor("white");
                break;
        }
    };

    return (
        <Box
            sx={{ minWidth: 480, padding: 5, backgroundColor: backgroundColor }}
        >
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                    Background Color
                </InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={backgroundColor}
                    label="backgroundColor"
                    onChange={handleChange}
                >
                    <MenuItem value={0}>Light Mode</MenuItem>
                    <MenuItem value={1}>Dark Mode</MenuItem>
                    <MenuItem value={2}>Blue</MenuItem>
                    <MenuItem value={3}>Sage Green</MenuItem>
                    <MenuItem value={4}>Orange</MenuItem>
                    <MenuItem value={5}>Purple</MenuItem>
                    <MenuItem value={6}>Pink</MenuItem>
                    <MenuItem value={7}>Seafoam Green</MenuItem>
                    <MenuItem value={8}>Yellow</MenuItem>
                    <MenuItem value={9}>Dark Sand</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}
