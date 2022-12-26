import nc from "next-connect";
import { registerUser } from "../../../Server/controllers/authentication";
import dotenv from "dotenv";
import connectDatabase from "../../../Server/config/config";

const handler = nc();

dotenv.config();
connectDatabase();

handler.post(registerUser);

export default handler;
