import nc from "next-connect";
import { submitLinkShortner } from "../../Server/controllers/Links.js";
import isAuth from "../../Server/middlewares/isAuth.js";

const handler = nc();

handler.use(isAuth).post(submitLinkShortner);

export default handler;
