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

// Routes router configuration.

const RoutesController = require('../app/Controllers/RoutesController.js');
const routesRouter = require('koa-router')({
    prefix: '/routes'
});

routesRouter.use(VerifyJWT);
routesRouter.get('/all-routes', RoutesController.allRoutes, err => console.log(`allRoutes ran into an error: ${err}`));
routesRouter.get('/:routeID/', RoutesController.routeWithRouteID);

// Users router configuration.

const UsersController = require('../app/Controllers/UsersController.js');
const usersRouter = require('koa-router')({
    prefix: '/users'
});

usersRouter.use(VerifyJWT);
usersRouter.get('/all-users', UsersController.allUsers, err => console.log(`allUsers ran into an error: ${err}`));
usersRouter.get('/:email/email', UsersController.userWithEmail, err => console.log(`userWithEmail ran into an error: ${err}`));
usersRouter.get('/:email/roles', UsersController.rolesWithEmail, err => console.log(`rolesWithEmail ran into an error: ${err}`));
usersRouter.get('/:username/username', UsersController.usersWithUsername, err => console.log(`usersWithUsername ran into an error: ${err}`));
usersRouter.get('/:pet/pet-parent', UsersController.usersByPet, err => console.log(`usersByPet ran into an error: ${err}`));
usersRouter.get('/:pet/pet-sitter', UsersController.usersByPetSitting, err => console.log(`usersByPetSitting ran into an error: ${err}`));
usersRouter.get('/:user/friends', UsersController.friendsByUser, err => console.log(`friendsByUser ran into an error: ${err}`));

// Pets router configuration.

const PetsController = require('../app/Controllers/PetsController.js');
const petsRouter = require('koa-router')({
    prefix: '/pets'
});

petsRouter.use(VerifyJWT);
petsRouter.get('/all-pets', PetsController.allPets, err => console.log(`allPets ran into an error: ${err}`));
petsRouter.get('/:petID/pet-with-id', PetsController.petWithPetID, err => console.log(`petWithPetID ran into an error: ${err}`));
petsRouter.get('/:user/pets-by-owner', PetsController.petsByOwner, err => console.log(`petsByOwner ran into an error: ${err}`));
petsRouter.get('/:user/pets-by-sitter', PetsController.petsBySitter, err => console.log(`petsBySitter ran into an error: ${err}`));
petsRouter.get('/:pet/allergies', PetsController.allergiesByPetID, err => console.log(`allergiesByPetID ran into an error: ${err}`));
petsRouter.post('/:petID/:name/:type/:veterinarian', PetsController.addPet, err=>console.log(`addPet ran into an error: ${err}`));
petsRouter.post('/:user/pet', PetsController.addParent, err=> console.log(`addParent ran into an errpr: ${err}`));
// Pets router configuration.

const VeterinariansController = require('../app/Controllers/VeterinariansController.js');
const veterinariansRouter = require('koa-router')({
    prefix: '/veterinarians'
});

veterinariansRouter.use(VerifyJWT);
veterinariansRouter.get('/all-vets', VeterinariansController.allVets, err => console.log(`allVets ran into an error: ${err}`));
veterinariansRouter.get('/:email/email', VeterinariansController.vetWithEmail, err => console.log(`vetWithEmail ran into an error: ${err}`));
veterinariansRouter.get('/:user/user', VeterinariansController.vetsByUser, err => console.log(`vetsByUser ran into an error: ${err}`));
veterinariansRouter.get('/:petID/pet', VeterinariansController.vetOfPet, err => console.log(`vetOfPet ran into an error: ${err}`));

// Mealtimes router configuration.

const MealtimesController = require('../app/Controllers/MealtimesController.js');
const mealtimesRouter = require('koa-router')({
    prefix: '/mealtimes'
});

mealtimesRouter.use(VerifyJWT);
mealtimesRouter.get('/all-mealtimes', MealtimesController.allMealtimes, err => console.log(`allMealtimes ran into an error: ${err}`));
mealtimesRouter.get('/:petID/pet', MealtimesController.mealtimesWithPetID, err => console.log(`mealtimesWithPetID ran into an error: ${err}`));
mealtimesRouter.get('/:user/owner', MealtimesController.mealtimesWithUser, err => console.log(`mealtimesWithUser ran into an error: ${err}`));
mealtimesRouter.get('/:user/sitter', MealtimesController.mealtimesWithSitter, err => console.log(`mealtimesWithSitter ran into an error: ${err}`));
mealtimesRouter.get('/:pet/num-meals', MealtimesController.numMealsByPet, err => console.log(`numMealsByPet ran into an error: ${err}`));
mealtimesRouter.get('/:time/:pet/brands', MealtimesController.brandsByMealtime, err => console.log(`brandsByMealtime ran into an error: ${err}`));
mealtimesRouter.get('/:time/:pet/:type/:amount/:notes', MealtimesController.addMealtime, err => console.log(`addMealtime ran into an error: ${err}`));
mealtimesRouter.get('/:time/:pet/remove-mealtime', MealtimesController.removeMealtime, err => console.log(`removeMealtime ran into an error: ${err}`));

// Medications router configuration.

const MedicationsController = require('../app/Controllers/MedicationsController.js');
const medicationsRouter = require('koa-router')({
    prefix: '/medications'
});

medicationsRouter.use(VerifyJWT);
medicationsRouter.get('/all-medications', MedicationsController.allMedications, err => console.log(`allMedications ran into an error: ${err}`));
medicationsRouter.get('/:name/name', MedicationsController.medicationWithName, err => console.log(`medicationWithName ran into an error: ${err}`));
medicationsRouter.get('/:pet/pet', MedicationsController.medicationsByPet, err => console.log(`medicationsByPet ran into an error: ${err}`));
medicationsRouter.get('/:name/:startDate', MedicationsController.removeMedication, err => console.log(`removeMedication ran into an error: ${err}`));
medicationsRouter.get('/:name/:startDate/:pet/:veterinarian/:type/:dosage/:admin_method/:notes', MedicationsController.addMedication, err => console.log(`addMedication ran into an error: ${err}`));

// Appointments router configuration.

const AppointmentsController = require('../app/Controllers/AppointmentsController.js');
const appointmentsRouter = require('koa-router')({
    prefix: '/appointments'
});

appointmentsRouter.use(VerifyJWT);
appointmentsRouter.get('/all-appointments', AppointmentsController.allAppointments, err => console.log(`allAppointments ran into an error: ${err}`));
appointmentsRouter.get('/:apptID/apptID', AppointmentsController.appointmentWithApptID, err => console.log(`appointmentWithApptID ran into an error: ${err}`));
appointmentsRouter.get('/:user/user', AppointmentsController.appointmentsWithUser, err => console.log(`appointmentsWithUser ran into an error: ${err}`));
appointmentsRouter.get('/:user/:date/user-by-date', AppointmentsController.appointmentsWithUserAndDate, err => console.log(`appointmentsWithUserAndDate ran into an error: ${err}`));
appointmentsRouter.get('/:pet/pet', AppointmentsController.appointmentsWithPet, err => console.log(`appointmentsWithPet ran into an error: ${err}`));
appointmentsRouter.get('/:pet/:user/pet-by-user', AppointmentsController.appointmentsWithPetAndUser, err => console.log(`appointmentsWithPetAndUser ran into an error: ${err}`));
appointmentsRouter.get('/:dateTime/:user/:type/:notes', AppointmentsController.addAppointment, err => console.log(`addAppointment ran into an error: ${err}`));
appointmentsRouter.get('/:apptID/remove-appt', AppointmentsController.removeAppointment, err => console.log(`removeAppointment ran into an error: ${err}`));
appointmentsRouter.get('/:pet/:appt/add-pet', AppointmentsController.addPetToAppt, err => console.log(`addPetToAppt ran into an error: ${err}`));


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
