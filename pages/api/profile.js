import nc from "next-connect";
import { getUserUrls } from "../../Server/controllers/Links.js";
import isAuth from "../../Server/middlewares/isAuth.js";
import dbConfig from "../../Server/config/config";

const handler = nc();

dbConfig();

handler.use(isAuth).get(getUserUrls);

export default handler;
