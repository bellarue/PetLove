#! /bin/bash

tables="users_dump.sql veterinarians_dump.sql user_roles_dump.sql appointments_dump.sql pets_dump.sql allergies_dump.sql medications_dump.sql mealtimes_dump.sql preferred_brands_dump.sql pet_on_appt_dump.sql pet_parents_dump.sql pet_sitters_dump.sql friendships_dump.sql vets_of_owners_dump.sql"
for table in $tables; do
    echo "creating $table table"
    mysql pet_love -u kcocciante --password=password < $table
done