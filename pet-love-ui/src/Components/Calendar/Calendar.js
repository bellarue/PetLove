import React, {Fragment, useEffect, useState} from 'react';
import API from '../../API_Interface/API_Interface'
import Typography from '@mui/material/Typography';
import { Box, Button } from '@mui/material'
import ReactCalendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';

import ApptTable from './ApptTable';
import AddAppt from './AddAppt';

export default function Calendar(props) {
    const {username} = props;
    const [email, setEmail] = useState("");
    const [date, setDate] = useState(new Date());
    const [appts, setAppts] = useState([]);
    const [petsOnAppts, setPetsOnAppts] = useState([]);
    const [deleteAppt, setDeleteAppt] = useState("");
    const [pets, setPets] = useState([]);
    const [apptInfo, setApptInfo] = useState([]);

    const findPet = (name) => {
        for( let pet of pets ){
            if( pet['name'] === name ){
                return pet['petID'];
            }
        }
        return; //just to be safe, this shouldnt be possible
    }

    useEffect(() => {
        if( deleteAppt.length === 0 ) {
            return;
        }
        const api = new API();

        async function postDelete() {
            const deleteJSONString = await api.removeAppointment({apptID: deleteAppt});
            console.log(`delete appt results ${JSON.stringify(deleteJSONString)}`);
            setDeleteAppt("");
        }

        postDelete();
    }, [deleteAppt]);

    useEffect(() => {
        if( apptInfo.length === 0 ) {
            return;
        }
        const api = new API();
        let dateTime = "";
        let month = date.getMonth()+1;
        dateTime = date.getFullYear() + '-' + month + '-' + date.getDate() + " " + apptInfo['time'];
        let notes = apptInfo['notes'];
        if( notes.length === 0 ){
            notes = '/0';
        }
        console.log(`adding appointment: ${JSON.stringify({dateTime: dateTime, user: email, type: apptInfo['type'], notes: notes})}`)
        async function postAppt() {
            const apptJSONString = await api.addAppointment({dateTime: dateTime, user: email, type: apptInfo['type'], notes: notes});
            console.log(`post appt results ${JSON.stringify(apptJSONString)}`);
            for( let pet of apptInfo['pets'] ){
                const petJSONString = await api.addPetToAppt({pet: findPet(pet), appt: apptJSONString.insertID});
                console.log(`pet on appt results ${JSON.stringify(petJSONString)}`);
            }
            setApptInfo("");
        }

        postAppt();
    }, [apptInfo]);

    // useEffect(() => {
    //     if( !addPets ) {
    //         return;
    //     }
    //     if( apptInfo['pets'].length === 0 ){
    //         setAddPets(false);
    //         setApptInfo([]);
    //         return;
    //     }
    //     const api = new API();

    //     async function postApptPets() {
    //         // const numJSONString = await api
    //         const petApptJSONString = await api.addPetToAppt({apptID: deleteAppt});
    //         console.log(`post pets on appt results ${JSON.stringify(petApptJSONString)}`);
    //     }

    //     postApptPets();
    // }, [addPets]);

    useEffect(() => {
        const api = new API();

        async function getEmail() {
            const userJSONString = await api.userWithUsername(username);
            console.log(`user from the DB ${JSON.stringify(userJSONString)}`);
            setEmail(userJSONString.data[0]['email']);
        }

        getEmail();
    }, []);

    useEffect(() => {
        if( email === "" ){
            return;
        }
        const api = new API();

        async function getPets() {
            const petsOwnerJSONString = await api.petsByOwner(email);
            const petsSitterJSONString = await api.petsBySitter(email);
            console.log(`owned pets from the DB ${JSON.stringify(petsOwnerJSONString)}`);
            console.log(`sitting pets from the DB ${JSON.stringify(petsSitterJSONString)}`);
            setPets([...petsOwnerJSONString.data, ...petsSitterJSONString.data]);
        }

        getPets();
    }, [email]);

    useEffect(() => {
        if( email === "" ){
            return;
        }
        let temp = "";
        let month = date.getMonth()+1;
        temp = date.getFullYear() + '-' + month + '-' + date.getDate();
        console.log(`date is ${temp}`);
        const api = new API();

        async function getAppts() {
            const apptsJSONString = await api.appointmentsWithUserAndDate(email, temp);
            console.log(`appts from the DB ${JSON.stringify(apptsJSONString)}`);
            setAppts(apptsJSONString.data);
        }

        getAppts();
    }, [date, email, deleteAppt, apptInfo]);

    useEffect(() => {
        console.log(`in getPets, appts is ${JSON.stringify(appts)}`);
        if( appts.length === 0 ) {
            return;
        }
        const pets = [];
        const api = new API();
        async function getPets() {
            for( let appt of appts ){
                const petsJSONString = await api.petsOnAppt(appt['apptID']);
                console.log(`pets from the DB ${JSON.stringify(petsJSONString)}`);
                pets.push(petsJSONString.data);
            }
            setPetsOnAppts(pets);
        }

        getPets();
    }, [appts, setAppts]);

    console.log(`total pets list is ${JSON.stringify(pets)}`);

    return <Fragment>
        <Box sx={{
            width: '100%',
            maxHeight: 650,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <ReactCalendar href='react-calendar/dist/Calendar.css' calendarType='gregory' value={date} onChange={(value, event) => setDate(value)} />
            <Box sx={{
                width: 250,
                height: 25,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 2,
                marginBottom: 3
            }}>
                <Typography align='center' fontSize={20} >
                    {date.toDateString()}
                </Typography>
                <AddAppt pets={pets} apptInfo={apptInfo} setApptInfo={(info)=>setApptInfo(info)} />
            </Box>
            <ApptTable appts={appts} petsOnAppts={petsOnAppts} setDeleteAppt={(apptID)=>setDeleteAppt(apptID)} />
        </Box>
    </Fragment>
}