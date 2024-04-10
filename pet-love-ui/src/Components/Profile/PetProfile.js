import React, {Fragment, useEffect, useState} from 'react';
import API from '../../API_Interface/API_Interface'
import Typography from '@mui/material/Typography';
import {Box, Grid} from '@mui/material'

const Mealtimes = props => {
    const {mealtimes} = props;
    return <Fragment>
        <Box sx={{
            width: '100%',
            height: '100%'
        }}>
            <Grid container columns={1}
            sx={{
                width: '100%',
                height: '100%'
            }}>
                {
                    mealtimes.map((meal,idx) => 
                        <Grid item xs={1}
                            key={idx}
                            sx={{margin: 0,
                                padding: 0}}
                        >
                            <Box sx={{
                                width: '100%',
                                height: 50,
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <Box sx={{
                                    width: 50,
                                    height: 50,
                                    alignItems: 'center'
                                }}>
                                    {meal['time']}
                                </Box>
                                <Box sx={{
                                    width: 50,
                                    height: 50,
                                    alignItems: 'center'
                                }}>
                                    {meal['type']}
                                </Box>
                                <Box sx={{
                                    width: 50,
                                    height: 50,
                                    alignItems: 'center'
                                }}>
                                    {meal['amount']}
                                </Box>
                                <Box sx={{
                                    width: '100%',
                                    height: 50,
                                    alignItems: 'center',
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}>
                                    <Typography>
                                        Notes:
                                    </Typography>
                                    <Typography>
                                        {meal['type']}
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                    )
                }
            </Grid>
        </Box>
    </Fragment>
}

const allergiesString = (allergies) => {
    let a = "";
    for( let allergy of allergies ){
        a = a + allergy + ", ";
    }
    return a.slice(0,a.length-2); //slice to remove extra ", "
}

export default function PetProfile(props) {
    const {pet} = props; //pet is a pet object
    console.log(`this is pet: ${JSON.stringify(pet)}`);
    const [mealtimes, setMealtimes] = React.useState([]);
    const [allergies, setAllergies] = React.useState([]);

    useEffect(() => {
        const api = new API();

        async function getAllergies() {
            const allergiesJSONString = await api.allergiesByPetID(pet['petID']);
            console.log(`allergies from the DB ${JSON.stringify(allergiesJSONString)}`);
            setAllergies(allergiesJSONString.data);
        }

        getAllergies();
    }, []);

    useEffect(() => {
        const api = new API();

        async function getMealtimes() {
            const mealsJSONString = await api.mealtimesWithPetID(pet['petID']);
            console.log(`mealtimes from the DB ${JSON.stringify(mealsJSONString)}`);
            setMealtimes(mealsJSONString.data);
        }

        getMealtimes();
    }, []);

    return <Fragment>
        <Box sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <Box sx={{
                width: '100%',
                height: 30,
                alignItems: 'center' 
            }}>
                <Typography align="center">
                    {pet['name']}
                </Typography>
            </Box>
            <Box sx={{
                width: '100%',
                height: 100,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                mb: 1
            }}>
                <Box sx={{
                    width: 100,
                    height: 100,
                    border: 1,
                    borderColor: '#000000',
                    mr: 1
                }}>
                    <Typography>
                        pet profile pic?
                    </Typography>
                </Box>
                <Box sx={{
                    width: '100%',
                    height: 100,
                    display: 'flex',
                    flexDirection: 'column',
                    border: 1,
                    borderColor: '#000000'
                }}>
                    <Typography>
                        Notes:
                    </Typography>
                    <Typography>
                        {pet['notes']}
                    </Typography>
                </Box>
            </Box>
            <Box sx={{
                width: '100%',
                height: 50,
                alignItems: 'center',
                border: 1,
                mb: 1
            }}>
                <Typography>
                    Allergies: {allergiesString(allergies)}
                </Typography>

            </Box>
            <Box sx={{
                width: '100%',
                height: 200,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                border: 1,
                mb: 1
            }}>
                <Typography>
                    Mealtimes:
                </Typography>
                <Mealtimes mealtimes={mealtimes} />
            </Box>
            <Box sx={{
                width: '100%',
                height: 100,
                alignItems: 'center',
                border: 1
            }}>
                <Typography>
                    Parents/sitters list
                </Typography>
            </Box>
        </Box>
    </Fragment>
}