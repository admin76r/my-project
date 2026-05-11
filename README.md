## Running and creating an admin user

The project includes two helper scripts to create an initial admin user.

1) src/scripts/createAdmin.js
- Usage: `node src/scripts/createAdmin.js <username> <password> "<Full Name>" [email]`
- This script will create or update the given username with the provided password.

2) src/models/seed.js (recommended for automated setups)
- Reads environment variables (optional): ADMIN_USERNAME, ADMIN_PASSWORD, ADMIN_FULLNAME, ADMIN_EMAIL
- If ADMIN_USERNAME is set, the seed script will create or update that user with the provided ADMIN_PASSWORD (or a generated password if not set).
- If ADMIN_USERNAME is not set and there are zero users in the database, the script will create a default admin (`admin`) with a generated password and print it to stdout.

How to run inside Docker container (after docker-compose up and migration):

# find app container name
docker ps

# run the seed script
docker exec -it <app_container_name> node src/models/seed.js

# OR provide env vars when running the container (example using docker-compose override or env file):
# set ADMIN_USERNAME and ADMIN_PASSWORD in .env before container start

Local run (if your Node process can connect to the DB):

npm run migrate
node src/models/seed.js

Security note: If you use the generated password, change it after first login. Prefer providing ADMIN_PASSWORD via secure environment management rather than committing it to files.
