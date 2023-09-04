const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// database
const db = require("./app/models");
const Role = db.role;
const User = db.user;

//db.sequelize.sync();
// force: true will drop the table if it already exists
db.sequelize.sync({ force: true }).then(() => {
  console.log('Drop and Resync Database with { force: true }');
  initial();
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

async function initial() {
  roleUser = await Role.create({
    id: 1,
    name: "user"
  });

  roleMod = await Role.create({
    id: 2,
    name: "moderator"
  });

  roleAdmin = await Role.create({
    id: 3,
    name: "admin"
  });

  userAdmin = await User.create({
    username: 'admin',
    email: 'admin@gmail.com',
    password: '$2a$08$w3cYCF.N0UQZO19z8CQSZ.whzxFS5vMoi9k51g3TQx9r5tkwrIXO2'
  });

  userMod = await User.create({
    username: 'mod',
    email: 'mod@gmail.com',
    password: '$2a$08$tTj1l28esAxPSSvl3YqKl./nz35vQF7Y76jGtzcYUhHtGy6d.1/ze'
  });

  userMatheus = await User.create({
    username: 'matheuslim251',
    email: 'matheuslim251@gmail.com',
    password: '$2a$08$U2F07dLyYZjzTxQbFMCAcOd1k8V1o9f6E4TGVJHpy0V6/DC7iS0CS'
  });

  await userAdmin.addRoles(roleAdmin);
  await userMod.addRoles(roleMod);
  await userMatheus.addRoles(roleUser);
  //console.log("USER>>>\n", Object.entries(userAdmin));
}