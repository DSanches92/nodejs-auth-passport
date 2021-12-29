import Tech from "../models/Tech.js";
import User from "../models/User.js";

export default {
  async index(req, res) {
    const { user_id } = req.params;

    const user = await User.findByPk(user_id, {
      include: { association: "techs", through: { attributes: [] } }
    });

    return res.json(user);
  },

  async store(req, res) {
    const { user_id } = req.params;
    const { nome } = req.body;

    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(400).json({ error: "Usuário não encontrado!" });
    }

    const [ tech ] = await Tech.findOrCreate({
      where: { nome }
    });

    await user.addTech(tech);

    return res.json(tech);

  },

  async delete(req, res) {
    const { user_id } = req.params;
    const { nome } = req.body;

    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(400).json({ error: "Usuário não encontrado!" });
    }

    const tech = await Tech.findOne({
      where: { nome }
    });

    await user.removeTech(tech);

    return res.json();
  },
};
