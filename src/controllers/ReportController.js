import { Op } from "sequelize";
import User from "../models/User.js";

export default {
  async show(req, res) {

    const users = await User.findAll({
      attributes: [ "nome", "email" ],
      where: {
        email: {
          [Op.like]: "%@gmail.com"
        }
      },
      include: [
        {
          association: "addresses",
          where: {
            street: "Rua Delegado"
          }
        },
        {
          association: "techs",
          required: false,
          where: {
            nome: {
              [Op.like]: "%JS"
            }
          }
        }
      ]
    });

    return res.json(users);
  }
};
