# BoxDB app

Full Stack application that let's you store box dimensions. Database hosted with Microsoft SQL inside Docker, which is run on a Raspberry Pi 4. [See here for images!](#images)

> [!NOTE]
This is still work in progress, and many things will change like adding proper tests. This project will be finished by mid-June and the readme will be updating again then with more instructions and information.


## Info
- Frontend made with TypeScript, React, Vite, TailwindCSS!
- Backend made with TypeScript, Fastify, Prisma!
- Uses Microsoft SQL Server 2019 Express so Siemens 1200 PLC can connect to it.
- Project uses prettier and eslint for code guidelines.
- Headless testing done with Vitest and E2E tests will be done with Playwright!
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

### Production

TBD

### Development

#### Running the frontend

- Change to frontend folder with `cd frontend`
- Install dependencies `npm install`
- Run with `npm run dev`

#### Running the backend

- Change to backend folder with `cd backend`
- Install dependencies `npm install`
- Run with `npm run dev`

#### Running the database
 Replace `<PASSWORD>` with a secure password. `docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=<PASSWORD>" -e "MSSQL_PID=Express" -p 1433:1433 -v box-db:/var/opt/mssql -d mcr.microsoft.com/mssql/server:2019-latest`. This command opens the database to port `1433`.

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




On small screens, the right one is after scrolling down

<p float="left">
  <img src="https://github.com/kristianka/boxdb-app/assets/49764796/6aa6e802-1d04-4182-b1f3-a73c23a59b47" width="400" />
  <img src="https://github.com/kristianka/boxdb-app/assets/49764796/0747a8d8-3466-47b2-875f-063ddbff93b7" width="400" /> 
</p>

