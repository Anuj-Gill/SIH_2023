const crypto = require("crypto");
const mongoose = require("mongoose");
require("dotenv").config();
const dbConnection = require("../utils/DBconnection");
const roleModel = require("../schema/role");

const connectToMongo = async () => {
  await dbConnection(process.env.MONGO_URI);
};
connectToMongo();

const userModel = require("../schema/users");

const seeders = [
  {
    role: "super-admin",
    email: "super-admin@gmail.com",
  },
  {
    role: "ugc-admin",
    email: "ugc-admin@gmail.com",
  },
  {
    role: "org-admin",
    email: "org-admin@gmail.com",
  },
  {
    role: "dept-admin",
    email: "dept-admin@gmail.com",
  },
  {
    role: "hei-admin",
    email: "hei-admin@gmail.com",
  },
  {
    role: "hei-spoc",
    email: "hei-spoc@gmail.com",
  },
  {
    role: "dept-employee",
    email: "dept-employee@gmail.com",
  },
  {
    role: "university-admin",
    email: "uni-admin@gmail.com",
  },
];

const seedUser = [];

const seedData = async () => {
  for (let seeder of seeders) {
    const role = await roleModel.findOne({ name: seeder.role });
    seedUser.push({
      email: seeder.email,
      hash: "",
      firstName: "Genric Name",
      lastName: "Generic Last Name",
      mobile: "5869437212",
      dob: "2018-12-10T13:45:00.000Z",
      salt: "",
      gender: "male",
      role: role._id,
    });
  }

  const importData = async () => {
    try {
      // await userModel.deleteMany();
      await userModel.insertMany(seedUser);
      let users = await userModel.find();
      for (let i in users) {
        let userId = users[i]._id;
        const salt = crypto.randomBytes(16).toString("hex");
        let hash = crypto
          .pbkdf2Sync("password", salt, 1000, 64, `sha512`)
          .toString(`hex`);
        await userModel.findOneAndUpdate(
          { _id: userId },
          { hash: hash, salt: salt }
        );
      }
      console.log("Data imported successfully");
      process.exit();
    } catch (error) {
      console.error(error);
    }
  };

  importData().then(() => {
    mongoose.connection.close();
  });
};
seedData();
