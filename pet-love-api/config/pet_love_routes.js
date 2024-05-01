const Authorize = require('../app/Middleware/Authorize.js');
const VerifyJWT = require('../app/Middleware/VerifyJWT.js');
//update later

/*
|--------------------------------------------------------------------------
| Default router
|--------------------------------------------------------------------------
|
| Default router is used to define any routes that don't belong to a
| controller. Also used as a parent container for the other routers.
|
*/
const router = require('koa-router')({
    prefix: '/api/v1'
});

router.get('/', function (ctx) {
    console.log('router.get(/)');
    return ctx.body = 'What is up?';
});

/*
|--------------------------------------------------------------------------
| login router
|--------------------------------------------------------------------------
|
| Description
|
*/

// Login router configuration.

const LoginController = require('../app/Controllers/LoginController.js');
const loginRouter = require('koa-router')({
    prefix: '/login'
});
loginRouter.get('/:email', LoginController.authorizeUser, (err) => console.log("pet_love_routes.js: login-route error:", err));

// Users router configuration.

const UsersController = require('../app/Controllers/UsersController.js');
const usersRouter = require('koa-router')({
    prefix: '/users'
});

// usersRouter.use(VerifyJWT);
usersRouter.get('/all-users', UsersController.allUsers, err => console.log(`allUsers ran into an error: ${err}`));
usersRouter.get('/:email/email', UsersController.userWithEmail, err => console.log(`userWithEmail ran into an error: ${err}`));
usersRouter.get('/:email/roles', UsersController.rolesWithEmail, err => console.log(`rolesWithEmail ran into an error: ${err}`));
usersRouter.get('/:username/username', UsersController.usersWithUsername, err => console.log(`usersWithUsername ran into an error: ${err}`));
usersRouter.get('/:pet/pet-parent', UsersController.usersByPet, err => console.log(`usersByPet ran into an error: ${err}`));
usersRouter.get('/:pet/pet-sitter', UsersController.usersByPetSitting, err => console.log(`usersByPetSitting ran into an error: ${err}`));
usersRouter.get('/:user/friends', UsersController.friendsByUser, err => console.log(`friendsByUser ran into an error: ${err}`));
usersRouter.get('/:recipient/get-friend-requests', UsersController.friendRequestsByRecipient, err => console.log(`friendRequestByRecipient ran into an error: ${err}`));
usersRouter.post('/add-user', UsersController.addUser, err => console.log(`addUser ran into an error: ${err}`));
usersRouter.post('/add-friend', UsersController.addFriendship, err => console.log(`addFriendship ran into an error: ${err}`));
usersRouter.post('/remove-friend', UsersController.removeFriendship, err => console.log(`removeFriendship ran into an error: ${err}`));
usersRouter.post('/send-friend-request', UsersController.addFriendRequest, err => console.log(`addFriendRequest ran into an error: ${err}`));
usersRouter.post('/remove-friend-request', UsersController.removeFriendRequest, err => console.log(`removeFriendRequest ran into an error: ${err}`));

// Pets router configuration.

const PetsController = require('../app/Controllers/PetsController.js');
const petsRouter = require('koa-router')({
    prefix: '/pets'
});

// petsRouter.use(VerifyJWT);
petsRouter.get('/all-pets', PetsController.allPets, err => console.log(`allPets ran into an error: ${err}`));
petsRouter.get('/:petID/pet-with-id', PetsController.petWithPetID, err => console.log(`petWithPetID ran into an error: ${err}`));
petsRouter.get('/:user/pets-by-owner', PetsController.petsByOwner, err => console.log(`petsByOwner ran into an error: ${err}`));
petsRouter.get('/:user/pets-by-sitter', PetsController.petsBySitter, err => console.log(`petsBySitter ran into an error: ${err}`));
petsRouter.get('/:pet/allergies', PetsController.allergiesByPetID, err => console.log(`allergiesByPetID ran into an error: ${err}`));
petsRouter.post('/add-pet', PetsController.addPet, err=>console.log(`addPet ran into an error: ${err}`));
petsRouter.post('/add-parent', PetsController.addParent, err=> console.log(`addParent ran into an error: ${err}`));
petsRouter.post('/add-sitter', PetsController.addSitter, err=> console.log(`addSitter ran into an errr: ${err}`));
petsRouter.post('/change-vet', PetsController.changeVet, err=> console.log(`changeVet ran into an errr: ${err}`));
petsRouter.post('/change-pet-notes', PetsController.changeVet, err=> console.log(`changeNotes ran into an errr: ${err}`));
petsRouter.post('/add-allergy', PetsController.changeVet, err=> console.log(`addAllergy ran into an errr: ${err}`));

// Pets router configuration.

const VeterinariansController = require('../app/Controllers/VeterinariansController.js');
const veterinariansRouter = require('koa-router')({
    prefix: '/veterinarians'
});

// veterinariansRouter.use(VerifyJWT);
veterinariansRouter.get('/all-vets', VeterinariansController.allVets, err => console.log(`allVets ran into an error: ${err}`));
veterinariansRouter.get('/:email/email', VeterinariansController.vetWithEmail, err => console.log(`vetWithEmail ran into an error: ${err}`));
veterinariansRouter.get('/:user/user', VeterinariansController.vetsByUser, err => console.log(`vetsByUser ran into an error: ${err}`));
veterinariansRouter.get('/:petID/pet', VeterinariansController.vetOfPet, err => console.log(`vetOfPet ran into an error: ${err}`));
veterinariansRouter.post('/add-vet', VeterinariansController.addVet, err => console.log(`addVet ran into an error: ${err}`));
veterinariansRouter.post('/remove-vet-from-user', VeterinariansController.removeVetFromUser, err => console.log(`removeVetFromUser ran into an error: ${err}`));

// Mealtimes router configuration.

const MealtimesController = require('../app/Controllers/MealtimesController.js');
const mealtimesRouter = require('koa-router')({
    prefix: '/mealtimes'
});

// mealtimesRouter.use(VerifyJWT);
mealtimesRouter.get('/all-mealtimes', MealtimesController.allMealtimes, err => console.log(`allMealtimes ran into an error: ${err}`));
mealtimesRouter.get('/:petID/pet', MealtimesController.mealtimesWithPetID, err => console.log(`mealtimesWithPetID ran into an error: ${err}`));
mealtimesRouter.get('/:user/owner', MealtimesController.mealtimesWithUser, err => console.log(`mealtimesWithUser ran into an error: ${err}`));
mealtimesRouter.get('/:user/sitter', MealtimesController.mealtimesWithSitter, err => console.log(`mealtimesWithSitter ran into an error: ${err}`));
mealtimesRouter.get('/:pet/num-meals', MealtimesController.numMealsByPet, err => console.log(`numMealsByPet ran into an error: ${err}`));
mealtimesRouter.post('/add-mealtime', MealtimesController.addMealtime, err => console.log(`addMealtime ran into an error: ${err}`));
mealtimesRouter.post('/remove-mealtime', MealtimesController.removeMealtime, err => console.log(`removeMealtime ran into an error: ${err}`));
mealtimesRouter.post('/change-meal-notes', MealtimesController.changeNotes, err => console.log(`removeMealtime ran into an error: ${err}`));

// Medications router configuration.

const MedicationsController = require('../app/Controllers/MedicationsController.js');
const medicationsRouter = require('koa-router')({
    prefix: '/medications'
});

// medicationsRouter.use(VerifyJWT);
medicationsRouter.get('/all-medications', MedicationsController.allMedications, err => console.log(`allMedications ran into an error: ${err}`));
medicationsRouter.get('/:name/name', MedicationsController.medicationWithName, err => console.log(`medicationWithName ran into an error: ${err}`));
medicationsRouter.get('/:pet/pet', MedicationsController.medicationsByPet, err => console.log(`medicationsByPet ran into an error: ${err}`));
medicationsRouter.post('/remove-med', MedicationsController.removeMedication, err => console.log(`removeMedication ran into an error: ${err}`));
medicationsRouter.post('/add-med', MedicationsController.addMedication, err => console.log(`addMedication ran into an error: ${err}`));

// Appointments router configuration.

const AppointmentsController = require('../app/Controllers/AppointmentsController.js');
const appointmentsRouter = require('koa-router')({
    prefix: '/appointments'
});

// appointmentsRouter.use(VerifyJWT);
appointmentsRouter.get('/all-appointments', AppointmentsController.allAppointments, err => console.log(`allAppointments ran into an error: ${err}`));
appointmentsRouter.get('/:apptID/apptID', AppointmentsController.appointmentWithApptID, err => console.log(`appointmentWithApptID ran into an error: ${err}`));
appointmentsRouter.get('/:user/user', AppointmentsController.appointmentsWithUser, err => console.log(`appointmentsWithUser ran into an error: ${err}`));
appointmentsRouter.get('/:user/:date/user-by-date', AppointmentsController.appointmentsWithUserAndDate, err => console.log(`appointmentsWithUserAndDate ran into an error: ${err}`));
appointmentsRouter.get('/:pet/pet', AppointmentsController.appointmentsWithPet, err => console.log(`appointmentsWithPet ran into an error: ${err}`));
appointmentsRouter.get('/:pet/:user/pet-by-user', AppointmentsController.appointmentsWithPetAndUser, err => console.log(`appointmentsWithPetAndUser ran into an error: ${err}`));
appointmentsRouter.post('/add-appt', AppointmentsController.addAppointment, err => console.log(`addAppointment ran into an error: ${err}`));
appointmentsRouter.post('/remove-appt', AppointmentsController.removeAppointment, err => console.log(`removeAppointment ran into an error: ${err}`));
appointmentsRouter.post('/add-pet-appt', AppointmentsController.addPetToAppt, err => console.log(`addPetToAppt ran into an error: ${err}`));


/**
 * Register all of the controllers into the default controller.
 */
router.use(
    '',
    loginRouter.routes(),
    usersRouter.routes(),
    petsRouter.routes(),
    veterinariansRouter.routes(),
    mealtimesRouter.routes(),
    medicationsRouter.routes(),
    appointmentsRouter.routes()
);

module.exports = function (app) {
    app.use(router.routes());
    app.use(router.allowedMethods());
};
