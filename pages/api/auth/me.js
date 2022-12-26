import nc from "next-connect";
import { selectUser } from "../../../Server/controllers/authentication.js";
import isAuth from "../../../Server/middlewares/isAuth";

const handler = nc();

handler.use(isAuth).get(selectUser);

export default handler;
