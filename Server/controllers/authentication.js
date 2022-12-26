import Users from "../models/User";
import bcrypt from "bcrypt";

const registerUser = async (req, res, next) => {
  try {
    const { password, email, username } = req.body;

    const userExist = await Users.findOne({ email });

    if (userExist) {
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new Users({
      username,
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    await user.save();

    res.json(user);
  } catch (error) {
    throw new Error(error.message);
  }
};

const selectUser = async (req, res) => {
  try {
    const user = await Users.findOne(req.user._id);

    res.json(user);
  } catch (error) {
    throw new Error(error.message);
  }
};

export { registerUser, selectUser };
