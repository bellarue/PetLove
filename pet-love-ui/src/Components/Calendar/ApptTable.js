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
    
    const rows = [];
    let idx = 0;
    for( let appt of appts ){
        let n = appt['notes'];
        if(n === '/0'){
            n = '';
        }
        let pets = [];
        if( petsOnAppts.length > idx && petsOnAppts[idx].length !== 0 ){
            pets = petsOnAppts[idx].map(comp => comp.name);
        }
        rows.push({id: appt['apptID'], time: appt['time'], type: appt['type'], pets: pets, notes: n});
        idx++;
    }

    const petsList = (pets) => {
        if( pets.length === 0 ){
            return "";
        }
        let p = "";
        for( let pet of pets ){
            p = p + pet + ", ";
        }
        p = p.slice(0, p.length-2);
        return p;
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
                  <TableCell align="left">{petsList(row.pets)}</TableCell>
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
