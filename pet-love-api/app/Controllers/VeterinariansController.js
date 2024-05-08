const dbConnection = require('../../database/mySQLconnect');
const dateFormat = require('dateformat');
const buildStudentViewFromCourses = require('../Schema/buildStudentViewFromCourses');

function now() {
    return dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
}

const allVets = async (ctx) => {
    console.log('vets all vets called.');
    return new Promise((resolve, reject) => {
        const query = `
                       SELECT *
                        FROM 
                            veterinarians
                        ORDER BY name
                        `;
        dbConnection.query({
            sql: query,
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in VeterinariansController::allVets", error);
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in allVets.", err);
        // The UI side will have to look for the value of status and
        // if it is not 200, act appropriately.
        ctx.body = [];
        ctx.status = 500;
    });
}

const vetWithEmail = (ctx) => {
        return new Promise((resolve, reject) => {
            const query = `
                       SELECT *
                        FROM 
                            veterinarians
                        WHERE 
                            email = ?
                        `;
            dbConnection.query({
                sql: query,
                values: [ctx.params.email]
            }, (error, tuples) => {
                if (error) {
                    console.log("Connection error in VeterinariansController::vetWithEmail", error);
                    ctx.body = [];
                    ctx.status = 200;
                    return reject(error);
                }
                ctx.body = tuples;
                ctx.status = 200;
                return resolve();
            });
        }).catch(err => {
            console.log("Database connection error in vetWithEmail.", err);
            // The UI side will have to look for the value of status and
            // if it is not 200, act appropriately.
            ctx.body = [];
            ctx.status = 500;
        });
}

const vetsByUser = (ctx) => { //gets all vets associated with a user
    return new Promise((resolve, reject) => {
        const query = `
                   SELECT *
                    FROM 
                        veterinarians v, vets_of_owners o
                    WHERE 
                        v.email = o.vet
                    AND
                        o.user = ?
                    ORDER BY
                        v.name
                    `;
        dbConnection.query({
            sql: query,
            values: [ctx.params.user]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in VeterinariansController::vetsByUser", error);
                ctx.body = [];
                ctx.status = 200;
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in vetsByUser.", err);
        // The UI side will have to look for the value of status and
        // if it is not 200, act appropriately.
        ctx.body = [];
        ctx.status = 500;
    });
}

const vetOfPet = (ctx) => {
    return new Promise((resolve, reject) => {
        const query = `
                   SELECT *
                    FROM 
                        veterinarians v, pets p
                    WHERE 
                        v.email = p.veterinarian
                    AND
                        p.petID = ?
                    `;
        dbConnection.query({
            sql: query,
            values: [ctx.params.petID]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in VeterinariansController::vetOfPet", error);
                ctx.body = [];
                ctx.status = 200;
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in vetOfPet.", err);
        // The UI side will have to look for the value of status and
        // if it is not 200, act appropriately.
        ctx.body = [];
        ctx.status = 500;
    });
}

const addVet = (ctx) => {
    const vetDict = ctx.request.body;
    return new Promise((resolve, reject) => {
        const query = `
                   INSERT INTO veterinarians
                    VALUE (?, ?, ?)
                    `;
        dbConnection.query({
            sql: query,
            values: [vetDict['email'], vetDict['name'], vetDict['phone_num']]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in VeterinariansController::addVet", error);
                ctx.body = [];
                ctx.status = 200;
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in addVet.", err);
        // The UI side will have to look for the value of status and
        // if it is not 200, act appropriately.
        ctx.body = [];
        ctx.status = 500;
    });
}

const removeVetFromUser = (ctx) => {
    const vetDict = ctx.request.body;
    return new Promise((resolve, reject) => {
        const query = `
                   DELETE FROM vets_of_owners
                    WHERE
                        user = ?
                    AND
                        vet = ?
                    `;
        dbConnection.query({
            sql: query,
            values: [vetDict['user'], vetDict['vet']]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in VeterinariansController::removeVetFromUser", error);
                ctx.body = [];
                ctx.status = 200;
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in removeVetFromUser.", err);
        // The UI side will have to look for the value of status and
        // if it is not 200, act appropriately.
        ctx.body = [];
        ctx.status = 500;
    });
}

const addVetToUser = (ctx) => {
    const vetDict = ctx.request.body;
    return new Promise((resolve, reject) => {
        const query = `
                   INSERT INTO vets_of_owners
                    VALUE (?, ?)
                    `;
        dbConnection.query({
            sql: query,
            values: [vetDict['user'], vetDict['vet']]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in VeterinariansController::addVetToUser", error);
                ctx.body = [];
                ctx.status = 200;
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in addVetToUser.", err);
        // The UI side will have to look for the value of status and
        // if it is not 200, act appropriately.
        ctx.body = [];
        ctx.status = 500;
    });
}

module.exports = {
    allVets,
    vetWithEmail,
    vetsByUser,
    vetOfPet,
    addVet,
    removeVetFromUser,
    addVetToUser
};
