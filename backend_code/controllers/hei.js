const heiModel = require("../schema/hei");
const returnMessage = require("./message");
const messages = require("../lang/messages.json");
const countryModel = require("../schema/countries");
const stateModel = require("../schema/states");
const streamModel = require("../schema/streams");
const universityModel = require("../schema/universities");
const userModel = require("../schema/users");
const districtModel = require("../schema/districts");
const roleModel = require("../schema/role");

// To populate the HEI object retrieved from Data Model
const heiPopulate = [
  {
    path: "country",
    select: ["name"],
  },
  {
    path: "state",
    select: ["name"],
  },
  {
    path: "district",
    select: ["name"],
  },
  {
    path: "spoc",
    select: ["firstName", "lastName", "email", "mobile", "gender"],
  },
  {
    path: "heiAdmin",
    select: ["firstName", "lastName", "email", "mobile", "gender"],
  },
  {
    path: "university",
    select: ["name", "admin"],
    populate: {
      path: "admin",
      select: ["firstName", "lastName", "email", "mobile", "gender"],
    },
  },
  {
    path: "streams",
    select: ["name"],
  },
];

module.exports = {
  index: async (req, res) => {
    try {
      const heis = await heiModel
        .find({})
        .populate("country")
        .populate("district")
        .populate("state")
        .populate("spoc")
        .populate("heiAdmin")
        .populate("university")
        .populate("streams");
      returnMessage.successMessage(
        res,
        messages.successMessages.getAllheis,
        heis
      );
    } catch (error) {
      console.log(error);
      returnMessage.errorMessage(res, error);
    }
  },
  create: async (req, res) => {
    try {
      // const { name } = req.body;
      // const isNameTaken = await heiModel.findOne({ name });
      // if (isNameTaken)
      //   returnMessage.errorMessage(res, messages.errorMessages.alreadyExists);

      const hei = await heiModel.create({ ...req.body });
      await hei.populate(heiPopulate);
      returnMessage.successMessage(res, messages.successMessages.addHei, hei);
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  edit: async (req, res) => {
    try {
      const hei = await heiModel.findOne({ _id: req.params["id"] });
      await hei.populate(heiPopulate);
      returnMessage.successMessage(res, messages.successMessages.showHei, hei);
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  update: async (req, res) => {
    try {
      const hei = await heiModel.findByIdAndUpdate(
        req.params["id"],
        { ...req.body },
        { new: true }
      );
      await hei.populate(heiPopulate);
      returnMessage.successMessage(
        res,
        messages.successMessages.updateHei,
        hei
      );
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  delete: async (req, res) => {
    try {
      const hei = await heiModel.remove({ _id: req.params["id"] });
      returnMessage.successMessage(res, messages.successMessages.deleteHei);
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  show: async (req, res) => {
    try {
      const hei = await heiModel.findOne({ _id: req.params["id"] });
      await hei.populate(heiPopulate);
      returnMessage.successMessage(res, messages.successMessages.showHei, hei);
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  getAllData: async (req, res) => {
    try {
      const roleSpoc = await roleModel.find({ name: "hei-spoc" });
      const roleAdmin = await roleModel.find({ name: "hei-admin" });

      const allRequData = [
        countryModel.find(),
        stateModel.find(),
        universityModel.find(),
        streamModel.find(),
        userModel.find({ role: roleSpoc[0]._id }, "_id firstName lastName"),
        districtModel.find(),
        userModel.find({ role: roleAdmin[0]._id }, "_id firstName lastName"),
      ];
      const reqdData = await Promise.all(allRequData);
      returnMessage.successMessage(res, messages.successMessages.addHei, {
        country: reqdData[0],
        state: reqdData[1],
        university: reqdData[2],
        stream: reqdData[3],
        spoc: reqdData[4],
        district: reqdData[5],
        heiAdmin: reqdData[6],
      });
    } catch (error) {
      console.log(error);
      returnMessage.errorMessage(res, error);
    }
  },
};
