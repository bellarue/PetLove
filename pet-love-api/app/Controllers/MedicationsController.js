const dbConnection = require('../../database/mySQLconnect');
const dateFormat = require('dateformat');
const buildStudentViewFromCourses = require('../Schema/buildStudentViewFromCourses');

function now() {
    return dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
}

const allMedications = async (ctx) => {
    console.log('medications all medications called.');
    return new Promise((resolve, reject) => {
        const query = `
                       SELECT *
                        FROM 
                            medications
                        ORDER BY name, startDate
                        `;
        dbConnection.query({
            sql: query,
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in MedicationsController::allMedications", error);
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in allMedications.", err);
        // The UI side will have to look for the value of status and
        // if it is not 200, act appropriately.
        ctx.body = [];
        ctx.status = 500;
    });
}

const medicationWithName = (ctx) => {
        return new Promise((resolve, reject) => {
            const query = `
                       SELECT *
                        FROM 
                            medications
                        WHERE 
                            name = ?
                        ORDER BY startDate
                        `;
            dbConnection.query({
                sql: query,
                values: [ctx.params.name]
            }, (error, tuples) => {
                if (error) {
                    console.log("Connection error in MedicationsController::medicationWithName", error);
                    ctx.body = [];
                    ctx.status = 200;
                    return reject(error);
                }
                ctx.body = tuples;
                ctx.status = 200;
                return resolve();
            });
        }).catch(err => {
            console.log("Database connection error in medicationWithName.", err);
            // The UI side will have to look for the value of status and
            // if it is not 200, act appropriately.
            ctx.body = [];
            ctx.status = 500;
        });
}

const medicationsByPet = (ctx) => {
    return new Promise((resolve, reject) => {
        const query = `
                   SELECT *
                    FROM 
                        medications
                    WHERE 
                        pet = ?
                    ORDER BY name, startDate
                    `;
        dbConnection.query({
            sql: query,
            values: [ctx.params.pet]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in MedicationsController::medicationsByPet", error);
                ctx.body = [];
                ctx.status = 200;
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in medicationsByPet.", err);
        // The UI side will have to look for the value of status and
        // if it is not 200, act appropriately.
        ctx.body = [];
        ctx.status = 500;
    });
}

const removeMedication = (ctx) => {
    return new Promise((resolve, reject) => {
        const query = `
                   DELETE FROM 
                        medications
                    WHERE 
                        name = ?
                    AND
                        startDate = ?
                    `;
        dbConnection.query({
            sql: query,
            values: [ctx.params.name, ctx.params.startDate]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in MedicationsController::removeMedication", error);
                ctx.body = [];
                ctx.status = 200;
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in removeMedication.", err);
        // The UI side will have to look for the value of status and
        // if it is not 200, act appropriately.
        ctx.body = [];
        ctx.status = 500;
    });
}

const addMedication = (ctx) => {
    return new Promise((resolve, reject) => {
        const query = `
                   INSERT INTO
                        medications
                    VALUE
                        (?, ?, ?, ?, ?, ?, ?, ?)
                    `;
        dbConnection.query({
            sql: query,
            values: [ctx.params.name, ctx.params.startDate, ctx.params.pet, ctx.params.veterinarian, ctx.params.type, ctx.params.dosage, ctx.params.admin_method, ctx.params.notes]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in MedicationsController::addMedication", error);
                ctx.body = [];
                ctx.status = 200;
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in addMedication.", err);
        // The UI side will have to look for the value of status and
        // if it is not 200, act appropriately.
        ctx.body = [];
        ctx.status = 500;
    });
}

module.exports = {
    allMedications,
    medicationWithName,
    medicationsByPet,
    removeMedication,
    addMedication
};
