# BoxDB app

Full Stack application that let's you store box dimensions. Database hosted with Microsoft SQL inside Docker, which is run on a Raspberry Pi 4. [See here for images!](#images)

## Info
- Frontend made with TypeScript, React, Vite, TailwindCSS!
- Backend made with TypeScript, Fastify, Prisma!
- Uses Microsoft SQL Server 2019 Express so Siemens 1200 PLC can connect to it.
- Project uses prettier and eslint for code guidelines.
- Headless testing done with Vitest and E2E tests done with Playwright!
- Fully dockerized, needs only two `.env` files for setup!

### Frontend features
- Get boxes from backend
- Create a new box, upload to backend
- Update a box, upload to backend
- Delete box from backend
- Proper form validation with feedback (will also be in backend of course)
- The application is fully responsive to all screen types.
  - Note how the table removes some rows when the screen gets smaller, buttons don't overflow but go to a new line, text doesn't overflow, box information goes below the table and not side-by-side, and other small changes happen.
- Custom made components that are consistent
- Undo changes when modifying box info
- Pagination for the boxes list
  - You can change how many boxes per page
- Search
- Sorting
  - Sort by last modified, when created (asc or desc) or by id (asc or desc)
- Language selection
  - Languages are Finnish and English
- Toast notifications and proper error handling

### Backend features
- Get boxes
- Upload boxes
- Update boxes
- Delete boxes
- Validation for every route

## Instructions

### Production (Docker)

- Create two `.docker.env` files in both frontend and backend.

- Frontend needs just one key, `VITE_BACKEND_URL`. It can be just localhost like `VITE_BACKEND_URL=http://localhost/api/`, but if you need to connect from other devices in the network, change the `localhost` to your machine's IP. For example `VITE_BACKEND_URL=http://192.168.0.115/api/`.

- Backend has multiple values, set your desired password to the `<PASSWORD>` field. You may need to change the username from `sa` if you have a non-SA user.
  ```
  ACCEPT_EULA=Y
  MSSQL_PORT=1433
  MSSQL_SA_PASSWORD=<PASSWORD>
  PORT=3000
  FRONTEND_URL=http://localhost
  DATABASE_URL=sqlserver://database;database=database;user=sa;password=<PASSWORD>;TrustServerCertificate=true
  ```

- Change the `server_name` in `nginx.conf` to your machine's IP to allow connections from other devices in the network.

- Run `docker-compose up` in the project root. Note that it may take a while on slower machines. If you are having issues, try restarting it or rebuilding it with `docker-compose up --build`. Database can take a while start on slow machines like Raspberry Pi. Usually it takes 30 seconds.

### Development

- Create two `.env` files in both frontend and backend.
- Put the same values as in production but to `.env`, not `.docker.env`. You need to add ports to the `FRONTEND_URL` and `VITE_BACKEND_URL`. If you are using the default ports, they are `VITE_BACKEND_URL=http://localhost:3000` and `FRONTEND_URL=http://localhost:5173`. Database url might need "-marks around the url on Windows!

#### Running the frontend

- Change to frontend folder with `cd frontend`
- Install dependencies `npm install`
- Run with `npm run dev`

#### Running the backend

- Change to backend folder with `cd backend`
- Install dependencies `npm install`
- Run with `npm run dev`

#### Running the database
 Replace `<PASSWORD>` with a secure password. `docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=<PASSWORD>" -e "MSSQL_PID=Express" -p 1433:1433 -v box-db:/var/opt/mssql -d mcr.microsoft.com/mssql/server:2019-latest`. This command opens the database to port `1433`. Make sure the password is the same as in `.env` files!

# Images

### Frontpage

![frontpage](https://github.com/kristianka/boxdb-app/assets/49764796/1fdd7d53-e67e-4022-b272-d1833465ec14)


### Adding a box

![adding a box](https://github.com/kristianka/boxdb-app/assets/49764796/0d857f62-9947-4736-8fd8-f4ffa0bc7f63)


### Box details

![box details](https://github.com/kristianka/boxdb-app/assets/49764796/96951216-e9fd-468c-9501-dab988c24b45)


### Sorting options

![sorting](https://github.com/kristianka/boxdb-app/assets/49764796/197ac775-b4ca-4f6e-a793-69ce18927da9)


### Pagination options

![pagination](https://github.com/kristianka/boxdb-app/assets/49764796/47b5bde3-20df-46b5-b1d5-65f2b759d8dd)


### Search and change language

![search and language change](https://github.com/kristianka/boxdb-app/assets/49764796/1153994c-fd50-4041-9c08-4fd159c0750e)


### On mobile, the right one is after scrolling down

<p float="left">
  <img src="https://github.com/kristianka/boxdb-app/assets/49764796/11fc8194-8951-435f-b25d-6c8ba8f9d6bf" width="400" />
  <img src="https://github.com/kristianka/boxdb-app/assets/49764796/2127197d-799d-4296-9d7f-b541cb59625b" width="400" /> 
</p>


