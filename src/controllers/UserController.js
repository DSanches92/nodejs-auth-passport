const bcrypt = require("bcryptjs");
const User = require("../models/User.js");

module.exports = {
  async index(req, res) {
    const users = await User.findAll();

    return res.json(users);
  },

  async store(req, res) {
    const { nome, email, senha_hash } = req.body;
    const senha = await bcrypt.hash(senha_hash, 10);

    const user = await User.create({ nome, email, senha });

    return res.json(user);
  }
};
