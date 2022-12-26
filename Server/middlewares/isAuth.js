import { getSession } from "next-auth/react";

const isAuth = async (req, res, next) => {
  try {
    const session = await getSession({ req });
    if (!session) {
      return next();
    }

    req.user = session.user;
    next();
  } catch (err) {
    next();
  }
};

export default isAuth;
