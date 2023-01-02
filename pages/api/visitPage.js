import nc from "next-connect";
import { visitLink } from "../../Server/controllers/Links";

const handler = nc();

handler.get(visitLink);

export default handler;
