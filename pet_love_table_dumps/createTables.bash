#! /bin/bash

# tables="users_dump.sql user_roles_dump.sql appointments_dump.sql pet_on_appt_dump.sql pet_parents_dump.sql pet_sitters_dump.sql friendships_dump.sql vets_of_owners_dump.sql"
tables="data_inserts.sql"

for table in $tables; do
    echo "creating $table table"
    mysql pet_love -u pdo --password=Iheartsql < $table
done