import React, {Fragment, useEffect, useState} from 'react';
import API from '../../API_Interface/API_Interface'
import Typography from '@mui/material/Typography';
import { Box, Button } from '@mui/material'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ApptTable(props) {
    const {appts, petsOnAppts, setDeleteAppt} = props;
    console.log(`pets on appts ${JSON.stringify(petsOnAppts)}`);

    const getTime = (dateTime) => {
        return dateTime.slice(11,dateTime.length);
    }
    
    const rows = [];
    for( let appt of appts ){
        rows.push({id: appt['apptID'], time: getTime(appt['dateTime']), type: appt['type'], notes: appt['notes']});
    }

    const petsList = (idx) => {
        if( petsOnAppts.length === 0 ){
            return "";
        }
        if( petsOnAppts[idx].length === 0 ){
            return "";
        }
        let pets = "";
        for( let pet of petsOnAppts[idx] ){
            pets = pets + pet['name'] + ", ";
        }
        pets = pets.slice(0, pets.length-2);
        return pets;
    }

    return (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Time</TableCell>
                <TableCell align="left">Type</TableCell>
                <TableCell align="left">Pets</TableCell>
                <TableCell align="left">Notes</TableCell>
                <TableCell align="right">
                    <DeleteIcon/>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, idx) => (
                <TableRow
                  key={idx}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.time}
                  </TableCell>
                  <TableCell align="left">{row.type}</TableCell>
                  <TableCell align="left">{petsList(idx)}</TableCell>
                  <TableCell align="left">{row.notes}</TableCell>
                  <TableCell align="right">
                    <Button onClick={()=>setDeleteAppt(row.id)}>
                        <DeleteIcon/>
                    </Button>
                </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
}
