const dbConnection = require('../../database/mySQLconnect');
const dateFormat = require('dateformat');
const buildStudentViewFromCourses = require('../Schema/buildStudentViewFromCourses');

function now() {
    return dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
}

const allUsers = async (ctx) => {
    console.log('users all users called.');
    return new Promise((resolve, reject) => {
        const query = `
                       SELECT *
                        FROM 
                            users
                        ORDER BY username
                        `;
        dbConnection.query({
            sql: query,
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in UsersController::allUsers", error);
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in allUsers.", err);
        // The UI side will have to look for the value of status and
        // if it is not 200, act appropriately.
        ctx.body = [];
        ctx.status = 500;
    });
}

const userWithEmail = (ctx) => {
        return new Promise((resolve, reject) => {
            const query = `
                       SELECT *
                        FROM 
                            users
                        WHERE 
                            email = ?
                        `;
            dbConnection.query({
                sql: query,
                values: [ctx.params.email]
            }, (error, tuples) => {
                if (error) {
                    console.log("Connection error in UsersController::userWithEmail", error);
                    ctx.body = [];
                    ctx.status = 200;
                    return reject(error);
                }
                ctx.body = tuples;
                ctx.status = 200;
                return resolve();
            });
        }).catch(err => {
            console.log("Database connection error in userWithEmail.", err);
            // The UI side will have to look for the value of status and
            // if it is not 200, act appropriately.
            ctx.body = [];
            ctx.status = 500;
        });
}

const usersWithUsername = (ctx) => {
    return new Promise((resolve, reject) => {
        const query = `
                   SELECT *
                    FROM 
                        users
                    WHERE 
                        username LIKE ?
                    `;
        dbConnection.query({
            sql: query,
            values: [`${ctx.params.username}%`]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in UsersController::usersWithUsername", error);
                ctx.body = [];
                ctx.status = 200;
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in usersWithUsername.", err);
        // The UI side will have to look for the value of status and
        // if it is not 200, act appropriately.
        ctx.body = [];
        ctx.status = 500;
    });
}

const usersByPet = (ctx) => {
    return new Promise((resolve, reject) => {
        const query = `
                   SELECT *
                    FROM 
                        users u, pet_parents p
                    WHERE 
                        u.email = p.user
                    AND
                        p.pet = ?
                    `;
        dbConnection.query({
            sql: query,
            values: [ctx.params.pet]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in UsersController::usersByPet", error);
                ctx.body = [];
                ctx.status = 200;
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in usersByPet.", err);
        // The UI side will have to look for the value of status and
        // if it is not 200, act appropriately.
        ctx.body = [];
        ctx.status = 500;
    });
}

const usersByPetSitting = (ctx) => {
    return new Promise((resolve, reject) => {
        const query = `
                   SELECT *
                    FROM 
                        users u, pet_sitters p
                    WHERE 
                        u.email = p.user
                    AND
                        p.pet = ?
                    `;
        dbConnection.query({
            sql: query,
            values: [ctx.params.pet]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in UsersController::usersByPetSitting", error);
                ctx.body = [];
                ctx.status = 200;
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in usersByPetSitting.", err);
        // The UI side will have to look for the value of status and
        // if it is not 200, act appropriately.
        ctx.body = [];
        ctx.status = 500;
    });
}

const rolesWithEmail = (ctx) => {
    return new Promise((resolve, reject) => {
        const query = `
                   SELECT *
                    FROM 
                        roles
                    WHERE 
                        user = ?
                    `;
        dbConnection.query({
            sql: query,
            values: [ctx.params.user]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in UsersController::rolesWithEmail", error);
                ctx.body = [];
                ctx.status = 200;
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in rolesWithEmail.", err);
        // The UI side will have to look for the value of status and
        // if it is not 200, act appropriately.
        ctx.body = [];
        ctx.status = 500;
    });
}

const friendsByUser = (ctx) => { //FIXME: idk how to do this query
    return new Promise((resolve, reject) => {
        const query = `
                   SELECT *
                    FROM 
                        friendships
                    WHERE 
                        user1 = ?
                    OR
                        user2 = ?
                    `;
        dbConnection.query({
            sql: query,
            values: [ctx.params.user, ctx.params.user]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in UsersController::friendsByUser", error);
                ctx.body = [];
                ctx.status = 200;
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in friendsByUser.", err);
        // The UI side will have to look for the value of status and
        // if it is not 200, act appropriately.
        ctx.body = [];
        ctx.status = 500;
    });
}

const addUser = (ctx) => { 
    const userDict = ctx.request.body;
    console.log(`in addUser, dictionary is ${JSON.stringify(userDict)}`);

    return new Promise((resolve, reject) => {
        const query = `
                   INSERT INTO users(email, username, fname, lname)
                   VALUE (?,?,?,?)
                    `;
        dbConnection.query({
            sql: query,
            values: [userDict['email'], userDict['username'], userDict['fname'], userDict['lname']]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in UsersController::addUser", error);
                ctx.body = [];
                ctx.status = 200;
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in addUser.", err);
        // The UI side will have to look for the value of status and
        // if it is not 200, act appropriately.
        ctx.body = [];
        ctx.status = 500;
    });
}

const addFriendship = (ctx) => { 
    const userDict = ctx.request.body;
    return new Promise((resolve, reject) => {
        const query = `
                   INSERT INTO friendships
                   VALUE (?,?)
                    `;
        dbConnection.query({
            sql: query,
            values: [userDict['user1'], userDict['user2']]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in UsersController::addFriendship", error);
                ctx.body = [];
                ctx.status = 200;
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in addFriendship.", err);
        // The UI side will have to look for the value of status and
        // if it is not 200, act appropriately.
        ctx.body = [];
        ctx.status = 500;
    });
}

const removeFriendship = (ctx) => { 
    const userDict = ctx.request.body;
    return new Promise((resolve, reject) => {
        const query = `
                   DELETE FROM friendships
                    WHERE
                        user1 = ?
                    AND
                        user2 = ?
                    `;
        dbConnection.query({
            sql: query,
            values: [userDict['user1'], userDict['user2']]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in UsersController::removeFriendship", error);
                ctx.body = [];
                ctx.status = 200;
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in removeFriendship.", err);
        // The UI side will have to look for the value of status and
        // if it is not 200, act appropriately.
        ctx.body = [];
        ctx.status = 500;
    });
}

const addFriendRequest = (ctx) => { 
    const userDict = ctx.request.body;
    return new Promise((resolve, reject) => {
        const query = `
                   INSERT INTO friend_requests
                   VALUE (?,?)
                    `;
        dbConnection.query({
            sql: query,
            values: [userDict['sender'], userDict['recipient']]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in UsersController::addFriendRequest", error);
                ctx.body = [];
                ctx.status = 200;
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in addFriendRequest.", err);
        // The UI side will have to look for the value of status and
        // if it is not 200, act appropriately.
        ctx.body = [];
        ctx.status = 500;
    });
}

const removeFriendRequest = (ctx) => { 
    const userDict = ctx.request.body;
    return new Promise((resolve, reject) => {
        const query = `
                   DELETE FROM friend_requests
                    WHERE
                        sender = ?
                    AND
                        recipient = ?
                    `;
        dbConnection.query({
            sql: query,
            values: [userDict['sender'], userDict['recipient']]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in UsersController::removeFriendRequest", error);
                ctx.body = [];
                ctx.status = 200;
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in removeFriendRequest.", err);
        // The UI side will have to look for the value of status and
        // if it is not 200, act appropriately.
        ctx.body = [];
        ctx.status = 500;
    });
}

const friendRequestsByRecipient = (ctx) => { 
    return new Promise((resolve, reject) => {
        const query = `
                   SELECT * FROM friend_requests
                    WHERE
                        recipient = ?
                    `;
        dbConnection.query({
            sql: query,
            values: [ctx.params.recipient]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in UsersController::friendRequestsByRecipient", error);
                ctx.body = [];
                ctx.status = 200;
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in friendRequestsByRecipient.", err);
        // The UI side will have to look for the value of status and
        // if it is not 200, act appropriately.
        ctx.body = [];
        ctx.status = 500;
    });
}

module.exports = {
    allUsers,
    userWithEmail,
    usersWithUsername,
    usersByPet,
    usersByPetSitting,
    rolesWithEmail,
    friendsByUser,
    addUser,
    addFriendship,
    removeFriendship,
    addFriendRequest,
    removeFriendRequest,
    friendRequestsByRecipient
};
