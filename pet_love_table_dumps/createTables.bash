#! /bin/bash

tables="users_dump.sql veterinarians_dump.sql pets_dump.sql mealtimes_dump.sql friendships_dump.sql friend_requests_dump.sql appointments_dump.sql pet_on_appt_dump.sql allergies_dump.sql medications_dump.sql pet_sitters_dump.sql pet_parents_dump.sql vet_owners_dump.sql data_inserts.sql SQL_login_creation.sql"
for table in $tables; do
    echo "running $table script"
    mysql pet_love -u kcocciante --password=password < $table
done