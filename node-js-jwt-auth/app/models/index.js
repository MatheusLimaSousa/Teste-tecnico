const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize({
    dialect: config.dialect,
    storage: config.storage,
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "User_Roles",
//  as: "users",
//  foreignKey: "role_id",
});
db.user.belongsToMany(db.role, {
  through: "User_Roles",
//  as: "roles",
//  foreignKey: "user_id",
});

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
