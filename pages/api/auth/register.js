import nc from "next-connect";
import { registerUser } from "../../../Server/controllers/authentication";
import connectDatabase from "../../../Server/config/config";

const handler = nc();

connectDatabase();

handler.post(registerUser);

export default handler;
