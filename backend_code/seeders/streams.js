const mongoose = require("mongoose");
require("dotenv").config();
const dbConnection = require("../utils/DBconnection");

const connectToMongo = async () => {
  await dbConnection(process.env.MONGO_URI);
};
connectToMongo();

const streamModel = require("../schema/streams");

const seedStreams = ["Science","Commerce","Arts"];

const importData = async () => {
  try {
    await streamModel.deleteMany({});
    await streamModel.insertMany(seedStreams);
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
