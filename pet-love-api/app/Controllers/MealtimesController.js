const dbConnection = require('../../database/mySQLconnect');
const dateFormat = require('dateformat');
const buildStudentViewFromCourses = require('../Schema/buildStudentViewFromCourses');

function now() {
    return dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
}

const allMealtimes = async (ctx) => {
    console.log('mealtimes all mealtimes called.');
    return new Promise((resolve, reject) => {
        const query = `
                       SELECT *
                        FROM 
                            mealtimes
                        GROUP BY pet, time
                        `;
        dbConnection.query({
            sql: query,
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in MealtimesController::allMealtimes", error);
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in allMealtimes.", err);
        // The UI side will have to look for the value of status and
        // if it is not 200, act appropriately.
        ctx.body = [];
        ctx.status = 500;
    });
}

const mealtimesWithPetID = (ctx) => {
    return new Promise((resolve, reject) => {
        const query = `
                   SELECT *
                    FROM
                        mealtimes
                    WHERE
                        pet = ?
                    ORDER BY
                        time
                    `;
        dbConnection.query({
            sql: query,
            values: [ctx.params.pet]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in MealtimesController::mealtimesWithPetID", error);
                ctx.body = [];
                ctx.status = 200;
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in mealtimesWithPetID.", err);
        // The UI side will have to look for the value of status and
        // if it is not 200, act appropriately.
        ctx.body = [];
        ctx.status = 500;
    });
}

const mealtimesWithUser = (ctx) => {
    return new Promise((resolve, reject) => {
        const query = `
                   SELECT time, petID, name, m.type, amount, m.notes, user
                    FROM 
                        mealtimes m, pet_parents o, pets p
                    WHERE 
                        m.pet = o.pet
                    AND
                        m.pet = p.petID
                    AND
                        o.user = ?
                    GROUP BY m.pet, m.time
                    `;
        dbConnection.query({
            sql: query,
            values: [ctx.params.user]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in MealtimesController::mealtimesWithUser", error);
                ctx.body = [];
                ctx.status = 200;
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in mealtimesWithUser.", err);
        // The UI side will have to look for the value of status and
        // if it is not 200, act appropriately.
        ctx.body = [];
        ctx.status = 500;
    });
}

const mealtimesWithSitter = (ctx) => {
    return new Promise((resolve, reject) => {
        const query = `
                   SELECT *
                    FROM 
                        mealtimes m, pet_sitters p
                    WHERE 
                        m.pet = p.pet
                    AND
                        p.user = ?
                    GROUP BY m.pet, m.time
                    `;
        dbConnection.query({
            sql: query,
            values: [ctx.params.user]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in MealtimesController::mealtimesWithSitter", error);
                ctx.body = [];
                ctx.status = 200;
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in mealtimesWithSitter.", err);
        // The UI side will have to look for the value of status and
        // if it is not 200, act appropriately.
        ctx.body = [];
        ctx.status = 500;
    });
}

const numMealsByPet = (ctx) => {
    return new Promise((resolve, reject) => {
        const query = `
                   SELECT COUNT(*) as numMeals
                    FROM 
                        mealtimes
                    WHERE 
                        pet = ?
                    `;
        dbConnection.query({
            sql: query,
            values: [ctx.params.pet]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in MealtimesController::mealtimesWithPetID", error);
                ctx.body = [];
                ctx.status = 200;
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in mealtimesWithPetID.", err);
        // The UI side will have to look for the value of status and
        // if it is not 200, act appropriately.
        ctx.body = [];
        ctx.status = 500;
    });
}

const removeMealtime = (ctx) => {
    return new Promise((resolve, reject) => {
        const query = `
                    DELETE FROM 
                        mealtimes
                    WHERE 
                        time = ?
                    AND
                        pet = ?
                    `;
        dbConnection.query({
            sql: query,
            values: [ctx.params.time, ctx.params.pet]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in MealtimesController::removeMealtime", error);
                ctx.body = [];
                ctx.status = 200;
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in removeMealtime.", err);
        // The UI side will have to look for the value of status and
        // if it is not 200, act appropriately.
        ctx.body = [];
        ctx.status = 500;
    });
}

const addMealtime = (ctx) => {
    const mealDict = ctx.request.body;
    return new Promise((resolve, reject) => {
        const query = `
                   INSERT INTO mealtimes
                    VALUE (?, ?, ?, ?, ?)
                    `;
        dbConnection.query({
            sql: query,
            values: [mealDict['time'], mealDict['pet'], mealDict['type'], mealDict['amount'], mealDict['notes']]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in MealtimesController::addMealtime", error);
                ctx.body = [];
                ctx.status = 200;
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in addMealtime.", err);
        // The UI side will have to look for the value of status and
        // if it is not 200, act appropriately.
        ctx.body = [];
        ctx.status = 500;
    });
}

const changeNotes = (ctx) => {
    return new Promise((resolve, reject) => {
        const query = `
                   UPDATE mealtimes
                    SET
                        notes = ?
                    WHERE
                        time = ?
                    AND
                        pet = ?
                    `;
        dbConnection.query({
            sql: query,
            values: [ctx.params.notes, ctx.params.time, ctx.params.pet]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in MealtimesController::changeNotes", error);
                ctx.body = [];
                ctx.status = 200;
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in changeNotes.", err);
        // The UI side will have to look for the value of status and
        // if it is not 200, act appropriately.
        ctx.body = [];
        ctx.status = 500;
    });
}

module.exports = {
    allMealtimes,
    mealtimesWithPetID,
    mealtimesWithUser,
    mealtimesWithSitter,
    numMealsByPet,
    addMealtime,
    removeMealtime,
    changeNotes
};
