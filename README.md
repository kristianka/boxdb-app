# BoxDB app

Full Stack application that let's you store box dimensions. Database hosted with Microsoft SQL inside Docker, which is run on a Raspberry Pi 4. [See here for images!](#images)

> [!NOTE]
This is still very work in progress, and many things will change like backend structure and adding proper tests. This project will be finished by mid-June and the readme will be updating again then with more instructions and information.


## Info
- Frontend made with React, Vite, TailwindCSS!
- Uses Microsoft SQL Server 2019 Express so Siemens 1200 PLC can connect to it.
- Project uses prettier and eslint for code guidelines.
- Backend will be made with Fastify, Prisma!
- Headless testing done with Vitest and E2E tests will be done with Playwright!
- Will be Dockerized

### Frontend features
- Form validation 
- The application is fully responsive to all screen types.
  - Note how the table removes some rows when the screen gets smaller, buttons don't overflow but go to a new line, text doesn't overflow, box information goes below the table and not side-by-side, and other small changes happen.
- Custom made components that follow guidelines
- Undo changes when modifying box info
- Pagination for the boxes list
  - You can change how many boxes per page
- Search
- Sorting
  - Sort by last modified, when created (asc or desc) or by id (asc or desc)


## Instructions

### Running the frontend

- Change to frontend folder with `cd frontend`
- Install dependencies `npm install`
- Run with `npm run dev`

### Running the backend

- Change to backend folder with `cd backend`
- Install dependencies `npm install`
- Run with `npm run dev`

### Running the database
 Replace `<PASSWORD>` with a secure password. `docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=<PASSWORD>" -e "MSSQL_PID=Express" -p 1433:1433 -v box-db:/var/opt/mssql -d mcr.microsoft.com/mssql/server:2019-latest`. This command opens the database to port `1433`.

# Images

![image](https://github.com/kristianka/boxdb-app/assets/49764796/c0e14723-8d8f-4657-9b0e-e7e19a3413df)

On small screens, the right one is after scrolling down

<p float="left">
  <img src="https://github.com/kristianka/boxdb-app/assets/49764796/6aa6e802-1d04-4182-b1f3-a73c23a59b47" width="400" />
  <img src="https://github.com/kristianka/boxdb-app/assets/49764796/0747a8d8-3466-47b2-875f-063ddbff93b7" width="400" /> 
</p>

