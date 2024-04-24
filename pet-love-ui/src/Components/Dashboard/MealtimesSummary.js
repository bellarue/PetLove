import React, {Fragment, useEffect, useState} from 'react';
import API from '../../API_Interface/API_Interface'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const mealsTableAttributes = [
    {
        title: 'Pet',
        attributeDBName: 'pet',
        align: 'left'
    },
    {
        title: 'Time',
        attributeDBName: 'time',
        align: 'left'
    },
    {
        title: 'Type',
        attributeDBName: 'type',
        align: 'left'
    },
    {
        title: 'Amount',
        attributeDBName: 'amount',
        align: 'left'
    }
];

export default function MealtimesSummary(props) {
    const {meals} = props;
    const [petNames, setPetNames] = useState([]);
    const [petIDs, setPetIDs] = useState([]);

    useEffect(() => {
        if( meals.length === 0 ){
            return
        }
        const api = new API();

        async function getPets() {
            const names = [];
            const ids = [];
            for(let meal of meals){
                if( ids.includes(meal['pet']) ) {
                    continue; //no duplicates
                }
                const petJSONString = await api.petWithPetID(meal['pet']);
                console.log(`pet from the DB ${JSON.stringify(petJSONString)}`);
                names.push(petJSONString.data[0]['name']);
                ids.push(meal['pet']);
            }
            console.log(`pets from the DB ${JSON.stringify(names)}`);
            setPetNames(names);
            setPetIDs(ids);
        }

        getPets();
    }, [meals]);

    const TRow = ({mealtimeObject}) => {
        return <TableRow
            sx={{'&:last-child td, &:last-child th': {border: 0}}}
        >
            {
                mealsTableAttributes.map((attr, idx) =>
                    <TableCell key={idx}
                               align={attr.align}>
                        {
                            mealtimeObject[attr.attributeDBName]
                        }
                    </TableCell>)
            }
        </TableRow>
    }
    return <Fragment>
        {
            meals.length > 0 &&
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="mealtime table">
                        <TableHead>
                            <TableRow>
                                {
                                    mealsTableAttributes.map((attr, idx) =>
                                        <TableCell  key={idx}
                                                    align={attr.align}>
                                            {attr.title}
                                        </TableCell>)
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                meals.map((meal, idx) => (
                                    <TRow mealtimeObject={meal} key={idx}/>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
        }
    </Fragment>
}