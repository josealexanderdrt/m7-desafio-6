import { createUser, byEmail } from "../models/userModel.js";
import { findError } from "../utils/utils.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log("login data: ", email, password)
      const userLogin = await byEmail(email);
      console.log("userlogin", userLogin)
    
      if(!userLogin){
        return await sendErrorResponse(res, "auth_01");
      }

      const isPasswordValid = bcrypt.compareSync(
        password,
        userLogin.password
      );
      if (isPasswordValid) {
        const tokenGenerado = await createToken(userLogin.email)
        console.log("token: ", tokenGenerado)
        res.status(201).json({ token: tokenGenerado });
      }
      else{
        return await sendErrorResponse(res, "auth_02");
      }

     
    } catch (error) {
      res.status(400).json(error.message);
    }
  };

  
const createToken = async (email) => {
  const token = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
};

const sendErrorResponse = async (res, errorCode) => {
  const errorFound = findError(errorCode);
  res.status(errorFound[0].status).json({ message: errorFound[0].message });
};

export { loginUser };