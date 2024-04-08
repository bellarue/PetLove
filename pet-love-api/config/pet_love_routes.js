const Authorize = require('../app/Middleware/Authorize.js');
const VerifyJWT = require('../app/Middleware/VerifyJWT.js');


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
routesRouter.get('/all-routes', Authorize('admin'), RoutesController.allRoutes, err => console.log(`allRoutes ran into an error: ${err}`));
routesRouter.get('/:routeID/', Authorize('admin'), RoutesController.routeWithRouteID);

// Users router configuration.

const UsersController = require('../app/Controllers/UsersController.js');
const usersRouter = require('koa-router')({
    prefix: '/users'
});

usersRouter.use(VerifyJWT);
usersRouter.get('/all-users', Authorize('admin'), UsersController.allUsers, err => console.log(`allUsers ran into an error: ${err}`));
usersRouter.get('/:email/email', Authorize('admin'), UsersController.userWithEmail, err => console.log(`userWithEmail ran into an error: ${err}`));
usersRouter.get('/:email/roles', Authorize('admin'), UsersController.rolesWithEmail, err => console.log(`rolesWithEmail ran into an error: ${err}`));
usersRouter.get('/:username/username', Authorize('admin'), UsersController.usersWithUsername, err => console.log(`usersWithUsername ran into an error: ${err}`));
usersRouter.get('/:pet/pet-parent', Authorize('admin'), UsersController.usersByPet, err => console.log(`usersByPet ran into an error: ${err}`));
usersRouter.get('/:pet/pet-sitter', Authorize('admin'), UsersController.usersByPetSitting, err => console.log(`usersByPetSitting ran into an error: ${err}`));
usersRouter.get('/:user/friends', Authorize('admin'), UsersController.friendsByUser, err => console.log(`friendsByUser ran into an error: ${err}`));

// Pets router configuration.

const PetsController = require('../app/Controllers/PetsController.js');
const petsRouter = require('koa-router')({
    prefix: '/pets'
});

petsRouter.use(VerifyJWT);
petsRouter.get('/all-pets', Authorize('admin'), PetsController.allPets, err => console.log(`allPets ran into an error: ${err}`));
petsRouter.get('/:petID/pet-with-id', Authorize('admin'), PetsController.petWithPetID, err => console.log(`petWithPetID ran into an error: ${err}`));
petsRouter.get('/:user/pets-by-owner', Authorize('admin'), PetsController.petsByOwner, err => console.log(`petsByOwner ran into an error: ${err}`));
petsRouter.get('/:user/pets-by-sitter', Authorize('admin'), PetsController.petsBySitter, err => console.log(`petsBySitter ran into an error: ${err}`));
petsRouter.get('/:pet/allergies', Authorize('admin'), PetsController.allergiesByPetID, err => console.log(`allergiesByPetID ran into an error: ${err}`));

// Pets router configuration.

const VeterinariansController = require('../app/Controllers/VeterinariansController.js');
const veterinariansRouter = require('koa-router')({
    prefix: '/veterinarians'
});

veterinariansRouter.use(VerifyJWT);
veterinariansRouter.get('/all-vets', Authorize('admin'), VeterinariansController.allVets, err => console.log(`allVets ran into an error: ${err}`));
veterinariansRouter.get('/:email/email', Authorize('admin'), VeterinariansController.vetWithEmail, err => console.log(`vetWithEmail ran into an error: ${err}`));
veterinariansRouter.get('/:user/user', Authorize('admin'), VeterinariansController.vetsByUser, err => console.log(`vetsByUser ran into an error: ${err}`));
veterinariansRouter.get('/:petID/pet', Authorize('admin'), VeterinariansController.vetOfPet, err => console.log(`vetOfPet ran into an error: ${err}`));

// Mealtimes router configuration.

const MealtimesController = require('../app/Controllers/MealtimesController.js');
const mealtimesRouter = require('koa-router')({
    prefix: '/mealtimes'
});

mealtimesRouter.use(VerifyJWT);
mealtimesRouter.get('/all-mealtimes', Authorize('admin'), MealtimesController.allMealtimes, err => console.log(`allMealtimes ran into an error: ${err}`));
mealtimesRouter.get('/:petID/pet', Authorize('admin'), MealtimesController.mealtimesWithPetID, err => console.log(`mealtimesWithPetID ran into an error: ${err}`));
mealtimesRouter.get('/:user/owner', Authorize('admin'), MealtimesController.mealtimesWithUser, err => console.log(`mealtimesWithUser ran into an error: ${err}`));
mealtimesRouter.get('/:user/sitter', Authorize('admin'), MealtimesController.mealtimesWithSitter, err => console.log(`mealtimesWithSitter ran into an error: ${err}`));
mealtimesRouter.get('/:pet/num-meals', Authorize('admin'), MealtimesController.numMealsByPet, err => console.log(`numMealsByPet ran into an error: ${err}`));
mealtimesRouter.get('/:time/:pet', Authorize('admin'), MealtimesController.brandsByMealtime, err => console.log(`brandsByMealtime ran into an error: ${err}`));

// Medications router configuration.

const MedicationsController = require('../app/Controllers/MedicationsController.js');
const medicationsRouter = require('koa-router')({
    prefix: '/medications'
});

medicationsRouter.use(VerifyJWT);
medicationsRouter.get('/all-medications', Authorize('admin'), MedicationsController.allMedications, err => console.log(`allMedications ran into an error: ${err}`));
medicationsRouter.get('/:name/name', Authorize('admin'), MedicationsController.medicationWithName, err => console.log(`medicationWithName ran into an error: ${err}`));
medicationsRouter.get('/:pet/pet', Authorize('admin'), MedicationsController.medicationsByPet, err => console.log(`medicationsByPet ran into an error: ${err}`));
medicationsRouter.get('/:name/:startDate', Authorize('admin'), MedicationsController.removeMedication, err => console.log(`removeMedication ran into an error: ${err}`));

// Appointments router configuration.

const AppointmentsController = require('../app/Controllers/AppointmentsController.js');
const appointmentsRouter = require('koa-router')({
    prefix: '/appointments'
});

appointmentsRouter.use(VerifyJWT);
appointmentsRouter.get('/all-appointments', Authorize('admin'), AppointmentsController.allAppointments, err => console.log(`allAppointments ran into an error: ${err}`));
appointmentsRouter.get('/:apptID/apptID', Authorize('admin'), AppointmentsController.appointmentWithApptID, err => console.log(`appointmentWithApptID ran into an error: ${err}`));
appointmentsRouter.get('/:user/user', Authorize('admin'), AppointmentsController.appointmentsWithUser, err => console.log(`appointmentsWithUser ran into an error: ${err}`));
appointmentsRouter.get('/:user/:date/user-by-date', Authorize('admin'), AppointmentsController.appointmentsWithUserAndDate, err => console.log(`appointmentsWithUserAndDate ran into an error: ${err}`));
appointmentsRouter.get('/:pet/pet', Authorize('admin'), AppointmentsController.appointmentsWithPet, err => console.log(`appointmentsWithPet ran into an error: ${err}`));
appointmentsRouter.get('/:pet/:user/pet-by-user', Authorize('admin'), AppointmentsController.appointmentsWithPetAndUser, err => console.log(`appointmentsWithPetAndUser ran into an error: ${err}`));


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
