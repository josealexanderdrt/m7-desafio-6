import pool from "../../db/connectionDb.js";
import bcrypt from "bcryptjs";

const createUser = async ({ email, password, rol, lenguage }) => {
    const hashedPassword = bcrypt.hashSync(password)
    console.log("hashedPassword: ",hashedPassword);
    const SQLquery = {
      text: "INSERT INTO usuarios (email, password, rol, lenguage) VALUES ($1, $2, $3, $4) RETURNING *",
      values: [email, hashedPassword, rol,lenguage ],
    };
    const response = await pool.query(SQLquery);
    return response.rows[0];
  };

  const login = async (email, password) =>{
    const hashedPassword = bcrypt.hashSync(password);
    console.log("hashedPassword: ",hashedPassword)
    const SQLquery = {
        text: "SELECT * FROM usuarios WHERE email = $1 and password= $2",
        values: [email, hashedPassword],
      };
      const response = await pool.query(SQLquery);
      console.log("response: ",response)
      return response.rows[0];

  }
  
  
  const byEmail = async (email) => {
    const SQLquery = {
      text: "SELECT * FROM usuarios WHERE email = $1",
      values: [email],
    };
    const response = await pool.query(SQLquery);
    return response.rows[0];
  }
  export { createUser,login, byEmail };