import sql from "mssql";

const sqlConfig = {
  user: process.env.DB_USER as string,
  password: process.env.DB_PASSWORD as string,
  database: process.env.DB_NAME as string,
  server: process.env.DB_SERVER as string,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: true,
    trustServerCertificate: false,
  },
};

export const connectToDb = async () => {
  try {
    await sql.connect(sqlConfig);

    console.log("Connected to the database!");
    return true;
  } catch (error) {
    console.log("oopsie whoopsie, something went wrong!");
    console.log(error);
    return false;
  }
};
