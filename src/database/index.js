import Sequelize from "sequelize";
import dbConfig from "../config/config.js";

import User from "../models/User.js";
import Address from "../models/Address.js";
import Tech from "../models/Tech.js";

const connection = new Sequelize(dbConfig.development);

User.init(connection);
Address.init(connection);
Tech.init(connection);

User.associate(connection.models);
Address.associate(connection.models);
Tech.associate(connection.models);

export default connection;
