const dbConnection = require('../../database/mySQLconnect');
const dateFormat = require('dateformat');
const buildStudentViewFromCourses = require('../Schema/buildStudentViewFromCourses');

function now() {
    return dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
}

const allAppointments = async (ctx) => {
    console.log('routes all routes called.');
    return new Promise((resolve, reject) => {
        const query = `
                       SELECT *
                        FROM 
                            appointments
                        ORDER BY dateTime
                        `;
        dbConnection.query({
            sql: query,
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in AppointmentsController::allAppointments", error);
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in allAppointments.", err);
        // The UI side will have to look for the value of status and
        // if it is not 200, act appropriately.
        ctx.body = [];
        ctx.status = 500;
    });
}

const appointmentWithApptID = (ctx) => {
        return new Promise((resolve, reject) => {
            const query = `
                       SELECT *
                        FROM 
                            appointments
                        WHERE 
                            apptID = ?
                        `;
            dbConnection.query({
                sql: query,
                values: [ctx.params.apptID]
            }, (error, tuples) => {
                if (error) {
                    console.log("Connection error in AppointmentsController::appointmentWithApptID", error);
                    ctx.body = [];
                    ctx.status = 200;
                    return reject(error);
                }
                ctx.body = tuples;
                ctx.status = 200;
                return resolve();
            });
        }).catch(err => {
            console.log("Database connection error in appointmentWithApptID.", err);
            // The UI side will have to look for the value of status and
            // if it is not 200, act appropriately.
            ctx.body = [];
            ctx.status = 500;
        });
}

const appointmentsWithUser = (ctx) => {
    return new Promise((resolve, reject) => {
        const query = `
                   SELECT *
                    FROM 
                        appointments
                    WHERE 
                        user = ?
                    ORDER BY
                        dateTime
                    `;
        dbConnection.query({
            sql: query,
            values: [ctx.params.user]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in AppointmentsController::appointmentsWithUser", error);
                ctx.body = [];
                ctx.status = 200;
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in appointmentsWithUser.", err);
        // The UI side will have to look for the value of status and
        // if it is not 200, act appropriately.
        ctx.body = [];
        ctx.status = 500;
    });
}

const appointmentsWithUserAndDate = (ctx) => {
    return new Promise((resolve, reject) => {
        const query = `
                   SELECT *
                    FROM 
                        appointments
                    WHERE 
                        user = ?
                    AND
                        DATE(dateTime) = ?
                    ORDER BY
                        TIME(dateTime)
                    `;
        dbConnection.query({
            sql: query,
            values: [ctx.params.user, ctx.params.date]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in AppointmentsController::appointmentsWithUserAndDate", error);
                ctx.body = [];
                ctx.status = 200;
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in appointmentsWithUserAndDate.", err);
        // The UI side will have to look for the value of status and
        // if it is not 200, act appropriately.
        ctx.body = [];
        ctx.status = 500;
    });
}

const appointmentsWithPet = (ctx) => {
    return new Promise((resolve, reject) => {
        const query = `
                   SELECT *
                    FROM 
                        appointments a, pet_on_appt p
                    WHERE 
                        a.apptID = p.appt
                    AND
                        p.pet = ?
                    `;
        dbConnection.query({
            sql: query,
            values: [ctx.params.pet]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in AppointmentsController::appointmentsWithPet", error);
                ctx.body = [];
                ctx.status = 200;
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in appointmentsWithPet.", err);
        // The UI side will have to look for the value of status and
        // if it is not 200, act appropriately.
        ctx.body = [];
        ctx.status = 500;
    });
}

const appointmentsWithPetAndUser = (ctx) => {
    return new Promise((resolve, reject) => {
        const query = `
                   SELECT *
                    FROM 
                        appointments a, pet_on_appt p
                    WHERE 
                        a.apptID = p.appt
                    AND
                        p.pet = ?
                    AND
                        a.user = ?
                    `;
        dbConnection.query({
            sql: query,
            values: [ctx.params.pet, ctx.params.user]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in AppointmentsController::appointmentsWithPetAndUser", error);
                ctx.body = [];
                ctx.status = 200;
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in appointmentsWithPetAndUser.", err);
        // The UI side will have to look for the value of status and
        // if it is not 200, act appropriately.
        ctx.body = [];
        ctx.status = 500;
    });
}

module.exports = {
    allAppointments,
    appointmentWithApptID,
    appointmentsWithUser,
    appointmentsWithUserAndDate,
    appointmentsWithPet,
    appointmentsWithPetAndUser
};
