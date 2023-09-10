const mongoose = require("mongoose");
require("dotenv").config();
const dbConnection = require("../utils/DBconnection");

const connectToMongo = async () => {
  await dbConnection(process.env.MONGO_URI);
};
connectToMongo();

const roleModel = require("../schema/role");

const seedRole = [
  {
    name: "super-admin",
    permissions: [
      "update-city",
      "delete-city",
      "edit-city",
      "create-city",
      "update-state",
      "delete-state",
      "edit-state",
      "create-state",
      "view-analytics",
      "view-profile",
      "update-country",
      "delete-country",
      "edit-country",
      "create-country",
    //   "update-roles-permissions",
    //   "delete-roles-permissions",
    //   "edit-roles-permissions",
    //   "create-roles-permissions",
    //   "suspend-user",
    //   "view-grievances",
    //   "aprrove-grievances",
    //   "revert-grievances",
    //   "view-projects",
    //   "approve-projects",
    //   "view-transactions",
    //   "view-funding-agencies",
    //   "create-funding-agencies",
    //   "edit-funding-agencies",
    //   "delete-funding-agencies",
    //   "view-hei",
    //   "create-hei",
    //   "edit-hei",
    //   "delete-hei",
    //   "view-hei-rankings",
    //   "view-mentors",
    ],
  },
  {
    name: "ugc-admin",
    permissions: [
    //   "suspend-user",
    //   "view-profile",
    //   "view-analytics",
    //   "view-funding-agencies",
    //   "view-hei",
    //   "view-hei-rankings",
    //   "view-mentors",
    //   "view-projects",
    //   "approve-projects",
    //   "view-transactions",
    //   "view-grievances",
    //   "approve-grievances",
    //   "revert-grievances",
    ],
  },
  {
    name: "hei-admin",
    permissions: [
    //   "view-profile",
    //   "view-analytics",
    //   "view-projects",
    //   "view-project-members",
    //   "view-project-proposal",
    //   "review-project-proposal",
    //   "view-funding-agencies",
    //   "add-project-coordinator",
    ],
  },
  {
    name: "hei-spoc",
    permissions: [
    //   "view-profile",
    //   "view-analytics",
    //   "view-project-members",
    //   "add-project-members",
    //   "edit-project-members",
    //   "delete-project-members",
    //   "assign-project-leader",
    //   "view-project-proposal",
    //   "review-project-proposal",
    //   "view-reviews",
    //   "view-funding-agencies",
    //   "view-transactions",
    ],
  },
  {
    name: "student",
    permissions: [
    //   "view-profile",
    //   "view-analytics",
    //   "add-projects",
    //   "view-project-members",
    //   "view-transactions",
    ],
  },
];

const importData = async () => {
  try {
    await roleModel.deleteMany({});
    await roleModel.insertMany(seedRole);
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
