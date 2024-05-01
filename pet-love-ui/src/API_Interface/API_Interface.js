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

    async addUser(paramsDict) {
        return axiosAgent.post(`/users/add-user`, paramsDict)
    }

    async addFriendship(user1, user2) {
        return axiosAgent.post(`users/${user1}/${user2}/add-friend`)
    }

    async removeFriendship(user1, user2) {
        return axiosAgent.post(`users/${user1}/${user2}/remove-friend`)
    }

    async addFriendRequest(sender, recipient) {
        return axiosAgent.post(`users/${sender}/${recipient}/send-friend-request`)
    }

    async removeFriendRequest(sender, recipient) {
        return axiosAgent.post(`users/${sender}/${recipient}/remove-friend-request`)
    }

    async friendRequestsByRecipient(recipient) {
        return axiosAgent.get(`users/${recipient}/get-friend-requests`);
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

    async addPet(name,type,veterinarian) {
        return axiosAgent.post(`pets/${name}/${type}/${veterinarian}`);
    }

    async addParent(user,pet) {
        return axiosAgent.post(`pets/${user}/${pet}/add-parent`);
    }

    async addSitter(user,pet) {
        return axiosAgent.post(`pets/${user}/${pet}/add-sitter`);
    }

    async changeVet(veterinarian, petID) {
        return axiosAgent.post(`pets/${veterinarian}/${petID}/change-vet`);
    }

    async changePetNotes(notes, petID) {
        return axiosAgent.post(`pets/${notes}/${petID}/change-pet-notes`)
    }

    async addAllergy(pet, allergy) {
        return axiosAgent.post(`pets/${pet}/${allergy}/add-allergy`);
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

    async addVet(email, name, phone_num) {
        return axiosAgent.post(`veterinarians/${email}/${name}/${phone_num}`)
    }

    async removeVetFromUser(user,vet) {
        return axiosAgent.post(`veterinarians/${user}/${vet}`);
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

    async addMealtime(time, pet, type, amount, notes) {
        return axiosAgent.post(`mealtimes/${time}/${pet}/${type}/${amount}/${notes}`);
    }

    async removeMealtime(time, pet) {
        return axiosAgent.post(`mealtimes/${time}/${pet}/remove-mealtime`);
    }

    async changeMealNotes(notes, time, pet) {
        return axiosAgent.post(`mealtimes/${notes}/${time}/${pet}/change-meal-notes`);
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

    async removeMedication(name, startDate) {
        return axiosAgent.post(`medications/${name}/${startDate}`);
    }

    async addMedication(name, startDate, pet, veterinarian, type, dosage, admin_method) {
        return axiosAgent.post(`medications/${name}/${startDate}/${pet}/${veterinarian}/${type}/${dosage}/${admin_method}`)
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

    async addAppointment(dateTime, user, type, notes) {
        return axiosAgent.post(`appointments/${dateTime}/${user}/${type}/${notes}`)
    }

    async removeAppointment(apptID) {
        return axiosAgent.post(`appointments/${apptID}/remove-appt`);
    }

    async addPetToAppt(pet, appt) {
        return axiosAgent.post(`appointments/${pet}/${appt}/add-pet`)
    }

}