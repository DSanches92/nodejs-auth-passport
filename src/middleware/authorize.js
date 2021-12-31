import jwt from "express-jwt";
import pass from "../config/config.js";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const secret = pass.secret;
function authorize() {
  return [
    jwt({ secret , algorithms: ["HS256"] }),

    async (req, res, next) => {
      const { email, senha } = req.body;

      const user = await User.findOne({ where: { email : email }});
      if (!user) {
        return res.status(401).json({
          msg: "Usuário ou Senha inválidos!"
        });
      }

      if (bcrypt.compareSync(senha, user.senha)) {
        req.user = user.get();
        next();
      } else {
        return res.status(401).json({
          msg: "Usuário ou Senha inválidos!"
        });
      }
    }
  ];
}

export default authorize;
