import axios from 'axios';

const AxiosConfigured = () => {
    // Indicate to the API that all requests for this app are AJAX
    axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

    // Set the baseURL for all requests to the API domain instead of the current domain
    // axios.defaults.baseURL = `http://localhost:8443/api/v1`;
    axios.defaults.baseURL = `http://localhost:8443/api/v1`;


    // Allow the browser to send cookies to the API domain (which include auth_token)
    axios.defaults.withCredentials = true;


//    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrf_token;

    return axios;
};


const axiosAgent = AxiosConfigured();

export default class APIInterface {

    async getUserInfo(user_id) {
        return axiosAgent.get(`login/${user_id}`)
            .then(userInfo => userInfo.data)
            .catch(error => (
                {
                    error,
                    user: undefined
                 }));
    }

    async allRoutes() {
        return axiosAgent.get(`routes/all-routes`);
    }

    async routesWithID(routeID) {
        return axiosAgent.get(`routes/${routeID}`);
    }

    //Users Routes

    async allUsers() {
        return axiosAgent.get(`users/all-users`);
    }

    async userWithEmail(email) {
        return axiosAgent.get(`users/${email}/email`);
    }

    async rolesWithEmail(email) {
        return axiosAgent.get(`users/${email}/roles`);
    }

    async userWithUsername(username) {
        return axiosAgent.get(`users/${username}/username`);
    }

    async usersByPet(pet) {
        return axiosAgent.get(`users/${pet}/pet-parent`);
    }

    async sittersByPet(pet) {
        return axiosAgent.get(`users/${pet}/pet-sitter`);
    }

    async friendsByUser(user) {
        return axiosAgent.get(`users/${user}/friends`);
    }

    async friendRequestsByRecipient(recipient) {
        return axiosAgent.get(`users/${recipient}/get-friend-requests`);
    }

    async addUser(paramsDict) {
        return axiosAgent.post(`/users/add-user`, paramsDict)
    }

    async addFriendship(paramsDict) {
        return axiosAgent.post(`users/add-friend`, paramsDict)
    }

    async removeFriendship(paramsDict) {
        return axiosAgent.post(`users/remove-friend`, paramsDict)
    }

    async addFriendRequest(paramsDict) {
        return axiosAgent.post(`users/send-friend-request`, paramsDict)
    }

    async removeFriendRequest(paramsDict) {
        return axiosAgent.post(`users/remove-friend-request`, paramsDict)
    }

    //Pets Routes

    async allPets() {
        return axiosAgent.get(`pets/all-pets`);
    }

    async petWithPetID(petID) {
        return axiosAgent.get(`pets/${petID}/pet-with-id`);
    }

    async petsByOwner(user) {
        return axiosAgent.get(`pets/${user}/pets-by-owner`);
    }

    async petsBySitter(user) {
        return axiosAgent.get(`pets/${user}/pets-by-sitter`);
    }

    async allergiesByPetID(pet) {
        return axiosAgent.get(`pets/${pet}/allergies`);
    }

    async petsOnAppt(appt) {
        return axiosAgent.get(`pets/${appt}/pets-on-appt`);
    }

    async addPet(paramsDict) {
        return axiosAgent.post(`pets/add-pet`, paramsDict);
    }

    async addParent(paramsDict) {
        return axiosAgent.post(`pets/add-parent`, paramsDict);
    }

    async addSitter(paramsDict) {
        return axiosAgent.post(`pets/add-sitter`, paramsDict);
    }

    async changeVet(paramsDict) {
        return axiosAgent.post(`pets/change-vet`, paramsDict);
    }

    async changePetNotes(paramsDict) {
        return axiosAgent.post(`pets/change-pet-notes`, paramsDict)
    }

    async addAllergy(paramsDict) {
        return axiosAgent.post(`pets/add-allergy`, paramsDict);
    }

    //Veterinarians routes

    async allVets() {
        return axiosAgent.get(`veterinarians/all-vets`);
    }

    async vetWithEmail(email) {
        return axiosAgent.get(`veterinarians/${email}/email`);
    }

    async vetsByUser(user) {
        return axiosAgent.get(`veterinarians/${user}/user`);
    }

    async vetOfPet(petID) {
        return axiosAgent.get(`veterinarians/${petID}/pet`);
    }

    async addVet(paramsDict) {
        return axiosAgent.post(`veterinarians/add-vet`, paramsDict)
    }

    async removeVetFromUser(paramsDict) {
        return axiosAgent.post(`veterinarians/remove-vet-from-user`, paramsDict);
    }

    //Mealtimes routes

    async allMealtimes() {
        return axiosAgent.get(`mealtimes/all-mealtimes`);
    }

    async mealtimesWithPetID(petID) {
        return axiosAgent.get(`mealtimes/${petID}/pet`);
    }

    async mealtimesWithUser(user) {
        return axiosAgent.get(`mealtimes/${user}/owner`);
    }

    async mealtimesWithSitter(user) {
        return axiosAgent.get(`mealtimes/${user}/sitter`);
    }

    async numMealsByPet(pet) {
        return axiosAgent.get(`mealtimes/${pet}/num-meals`);
    }

    async addMealtime(paramsDict) {
        return axiosAgent.post(`mealtimes/add-mealtime`, paramsDict);
    }

    async removeMealtime(paramsDict) {
        return axiosAgent.post(`mealtimes/remove-mealtime`, paramsDict);
    }

    async changeMealNotes(paramsDict) {
        return axiosAgent.post(`mealtimes/change-meal-notes`, paramsDict);
    }

    //Medications routes

    async allMedications() {
        return axiosAgent.get(`medications/all-medications`);
    }

    async medicationWithName(name) {
        return axiosAgent.get(`medications/${name}/name`);
    }

    async medicationsByPet(pet) {
        return axiosAgent.get(`medications/${pet}/pet`);
    }

    async removeMedication(paramsDict) {
        return axiosAgent.post(`medications/remove-med`, paramsDict);
    }

    async addMedication(paramsDict) {
        return axiosAgent.post(`medications/add-med`, paramsDict);
    }

    //Appointments routes

    async allAppointments() {
        return axiosAgent.get(`appointments/all-appointments`);
    }

    async appointmentWithApptID(apptID) {
        return axiosAgent.get(`appointments/${apptID}/apptID`);
    }

    async appointmentsWithUser(user) {
        return axiosAgent.get(`appointments/${user}/user`);
    }

    async appointmentsWithUserAndDate(user, date) {
        return axiosAgent.get(`appointments/${user}/${date}/user-by-date`);
    }

    async appointmentsWithPet(pet) {
        return axiosAgent.get(`appointments/${pet}/pet`);
    }

    async appointmentsWithPetAndUser(pet, user) {
        return axiosAgent.get(`appointments/${pet}/${user}/pet-by-user`);
    }

    async addAppointment(paramsDict) {
        return axiosAgent.post(`appointments/add-appt`, paramsDict);
    }

    async removeAppointment(paramsDict) {
        return axiosAgent.post(`appointments/remove-appt`, paramsDict);
    }

    async addPetToAppt(paramsDict) {
        return axiosAgent.post(`appointments/add-pet-appt`, paramsDict);
    }

}