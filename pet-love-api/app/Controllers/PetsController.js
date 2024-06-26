const dbConnection = require('../../database/mySQLconnect');
const dateFormat = require('dateformat');
const buildStudentViewFromCourses = require('../Schema/buildStudentViewFromCourses');

function now() {
    return dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
}

const addPet = (ctx) => {
    const petDict = ctx.request.body;
    return new Promise((resolve, reject) => {
        const query = `
                   INSERT INTO 

                   pets(name, type, veterinarian)

                   VALUES (?, ?, ?)
                    `;
        dbConnection.query({
            sql: query,

            values: [petDict['name'], petDict['type'], petDict['veterinarian']]

        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in PetsController::addPet", error);
                ctx.body = [];
                ctx.status = 200;
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in addPet.", err);
        // The UI side will have to look for the value of status and
        // if it is not 200, act appropriately.
        ctx.body = [];
        ctx.status = 500;
    });
}

const addParent = (ctx) => {
    const petDict = ctx.request.body;
    return new Promise((resolve, reject) => {
        const query = `
                   INSERT INTO pet_parents
                   VALUE (?, ?)
                    `;
        dbConnection.query({
            sql: query,
            values: [petDict['user'], petDict['pet']]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in PetsController::addParent", error);
                ctx.body = [];
                ctx.status = 200;
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in addParent.", err);
        // The UI side will have to look for the value of status and
        // if it is not 200, act appropriately.
        ctx.body = [];
        ctx.status = 500;
    });
}


const addSitter = (ctx) => {
    const petDict = ctx.request.body;
    return new Promise((resolve, reject) => {
        const query = `
                   INSERT INTO pet_sitters(user, pet)
                   VALUES (?, ?)
                    `;
        dbConnection.query({
            sql: query,
            values: [petDict['user'], petDict['pet']]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in PetsController::addSitter", error);
                ctx.body = [];
                ctx.status = 200;
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in addSitter.", err);
        // The UI side will have to look for the value of status and
        // if it is not 200, act appropriately.
        ctx.body = [];
        ctx.status = 500;
    });
}

const allPets = async (ctx) => {
    console.log('pets all pets called.');
    return new Promise((resolve, reject) => {
        const query = `
                       SELECT *
                        FROM 
                            pets
                        ORDER BY name
                        `;
        dbConnection.query({
            sql: query,
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in PetsController::allPets", error);
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in allPets.", err);
        // The UI side will have to look for the value of status and
        // if it is not 200, act appropriately.
        ctx.body = [];
        ctx.status = 500;
    });
}

const petWithPetID = (ctx) => {
        return new Promise((resolve, reject) => {
            const query = `
                       SELECT *
                        FROM 
                            pets
                        WHERE 
                            petID = ?
                        `;
            dbConnection.query({
                sql: query,
                values: [ctx.params.petID]
            }, (error, tuples) => {
                if (error) {
                    console.log("Connection error in PetsController::petWithPetID", error);
                    ctx.body = [];
                    ctx.status = 200;
                    return reject(error);
                }
                ctx.body = tuples;
                ctx.status = 200;
                return resolve();
            });
        }).catch(err => {
            console.log("Database connection error in petWithPetID.", err);
            // The UI side will have to look for the value of status and
            // if it is not 200, act appropriately.
            ctx.body = [];
            ctx.status = 500;
        });
}

const petsByOwner = (ctx) => {
    return new Promise((resolve, reject) => {
        const query = `
                   SELECT *
                    FROM 
                        pets p, pet_parents o
                    WHERE 
                        p.petID = o.pet
                    AND
                        o.user = ?
                    `;
        dbConnection.query({
            sql: query,
            values: [ctx.params.user]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in PetsController::petsByOwner", error);
                ctx.body = [];
                ctx.status = 200;
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in petsByOwner.", err);
        // The UI side will have to look for the value of status and
        // if it is not 200, act appropriately.
        ctx.body = [];
        ctx.status = 500;
    });
}

const petsBySitter = (ctx) => {
    return new Promise((resolve, reject) => {
        const query = `
                   SELECT *
                    FROM 
                        pets p, pet_sitters s
                    WHERE 
                        p.petID = s.pet
                    AND
                        s.user = ?
                    `;
        dbConnection.query({
            sql: query,
            values: [ctx.params.user]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in PetsController::petsBySitter", error);
                ctx.body = [];
                ctx.status = 200;
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in petsBySitter.", err);
        // The UI side will have to look for the value of status and
        // if it is not 200, act appropriately.
        ctx.body = [];
        ctx.status = 500;
    });
}

const allergiesByPetID = (ctx) => {
    return new Promise((resolve, reject) => {
        const query = `
                   SELECT *
                    FROM 
                        allergies
                    WHERE 
                        pet = ?
                    ORDER BY allergy
                    `;
        dbConnection.query({
            sql: query,
            values: [ctx.params.pet]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in PetsController::allergiesByPetID", error);
                ctx.body = [];
                ctx.status = 200;
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in allergiesByPetID.", err);
        // The UI side will have to look for the value of status and
        // if it is not 200, act appropriately.
        ctx.body = [];
        ctx.status = 500;
    });
}

const removePet = (ctx) => {
    const petDict = ctx.request.body;
    return new Promise((resolve, reject) => {
        const query = `
                   DELETE FROM pets
                    WHERE petID = ?
                    `;
        dbConnection.query({
            sql: query,
            values: [petDict['petID']]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in PetsController::removePet", error);
                ctx.body = [];
                ctx.status = 200;
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in removePet.", err);
        // The UI side will have to look for the value of status and
        // if it is not 200, act appropriately.
        ctx.body = [];
        ctx.status = 500;
    });
}

const removeParent = (ctx) => {
    const petDict = ctx.request.body;
    return new Promise((resolve, reject) => {
        const query = `
                   DELETE FROM pet_parents
                    WHERE
                        user = ?
                    AND
                        pet = ?
                    `;
        dbConnection.query({
            sql: query,
            values: [petDict['user'], petDict['pet']]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in PetsController::removeParent", error);
                ctx.body = [];
                ctx.status = 200;
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in removeParent.", err);
        // The UI side will have to look for the value of status and
        // if it is not 200, act appropriately.
        ctx.body = [];
        ctx.status = 500;
    });
}

const removeSitter = (ctx) => {
    const petDict = ctx.request.body;
    return new Promise((resolve, reject) => {
        const query = `
                   DELETE FROM pet_sitters
                    WHERE
                        user = ?
                    AND
                        pet = ?
                    `;
        dbConnection.query({
            sql: query,
            values: [petDict['user'], petDict['pet']]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in PetsController::removeSitter", error);
                ctx.body = [];
                ctx.status = 200;
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in removeSitter.", err);
        // The UI side will have to look for the value of status and
        // if it is not 200, act appropriately.
        ctx.body = [];
        ctx.status = 500;
    });
}

const changeVet = (ctx) => {
    const petDict = ctx.request.body;
    return new Promise((resolve, reject) => {
        const query = `
                   UPDATE pets
                    SET
                        veterinarian = ?
                    WHERE
                        petID = ?
                    `;
        dbConnection.query({
            sql: query,
            values: [petDict['veterinarian'], petDict['petID']]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in PetsController::changeVet", error);
                ctx.body = [];
                ctx.status = 200;
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in changeVet.", err);
        // The UI side will have to look for the value of status and
        // if it is not 200, act appropriately.
        ctx.body = [];
        ctx.status = 500;
    });
}

const changeNotes = (ctx) => {
    const petDict = ctx.request.body;
    return new Promise((resolve, reject) => {
        const query = `
                   UPDATE pets
                    SET
                        notes = ?
                    WHERE
                        petID = ?
                    `;
        dbConnection.query({
            sql: query,
            values: [petDict['notes'], petDict['petID']]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in PetsController::changeNotes", error);
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

const addAllergy = (ctx) => {
    const petDict = ctx.request.body;
    return new Promise((resolve, reject) => {
        const query = `
                   INSERT INTO 
                   allergies
                   VALUES (?, ?)
                    `;
        dbConnection.query({
            sql: query,
            values: [petDict['pet'], petDict['allergy']]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in PetsController::addAllergy", error);
                ctx.body = [];
                ctx.status = 200;
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in addAllergy.", err);
        // The UI side will have to look for the value of status and
        // if it is not 200, act appropriately.
        ctx.body = [];
        ctx.status = 500;
    });
}

const petsOnAppt = (ctx) => {
    return new Promise((resolve, reject) => {
        const query = `
                   SELECT pet, name, appt
                    FROM 
                        pets p, pet_on_appt a
                    WHERE 
                        appt = ?
                    AND p.petID = a.pet
                    ORDER BY pet
                    `;
        dbConnection.query({
            sql: query,
            values: [ctx.params.appt]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in PetsController::petsOnAppt", error);
                ctx.body = [];
                ctx.status = 200;
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in petsOnAppt.", err);
        // The UI side will have to look for the value of status and
        // if it is not 200, act appropriately.
        ctx.body = [];
        ctx.status = 500;
    });
}

module.exports = {
    addParent,
    addSitter,
    allPets,
    addPet,
    petWithPetID,
    petsByOwner,
    petsBySitter,
    allergiesByPetID,
    removePet,
    removeParent,
    removeSitter,
    changeVet,
    changeNotes,
    addAllergy,
    petsOnAppt
};