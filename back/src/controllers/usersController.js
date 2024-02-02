import { createUser ,byEmail} from "../models/userModel.js";

const createNewUser = async (req, res) => {
  try {
    const { email,lenguage, password, rol } = req.body;
    const user = {email,lenguage,password,rol};
    console.log("create user : ", user)
    const newUser = await createUser(user);
    res.status(201).json({ user: newUser });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const getUsuarios = async (req, res) => {
    try {
      const { user } = req;
      console.log("userController: ", user);
      const usuario = await byEmail(user.email)

      //const newUser = await createUser(user);
      res.status(201).json({ user: usuario});
    } catch (error) {
      res.status(400).json(error.message);
    }
  };

export { createNewUser , getUsuarios};