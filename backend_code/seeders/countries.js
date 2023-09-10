const mongoose = require("mongoose");
require("dotenv").config();
const dbConnection = require("../utils/DBconnection");
const countryModel = require("../schema/countries");

const connectToMongo = async () => {
  await dbConnection(process.env.MONGO_URI);
};
connectToMongo();



const seedCountry = [
  {
    name: "India",
  },

];

const importData = async () => {
  try {
    await countryModel.deleteMany({});
    await countryModel.insertMany(seedCountry);
    console.log("Data imported successfully");
    process.exit();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

importData().then(() => {
  mongoose.connection.close();
});
