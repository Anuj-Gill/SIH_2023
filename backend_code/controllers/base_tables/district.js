const districtModel = require("../../schema/districts");
const returnMessage = require("../message");
const messages = require("../../lang/messages.json");

module.exports = {
  index: async (req, res) => {
    try {
      const districts = await districtModel
        .find({})
        .populate({
          path: "state",
          select: ["name"],
        })
        .sort({ name: 1 });
      returnMessage.successMessage(
        res,
        messages.successMessages.getAlldistricts,
        districts
      );
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  create: async (req, res) => {
    try {
      if (req.user.role.name == "super-admin") {
        const district = await districtModel.create({
          ...req.body,
        });

        returnMessage.successMessage(
          res,
          messages.successMessages.adddistrict,
          district
        );
      } else {
        // Error Handling
      }
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },

  edit: async (req, res) => {
    try {
      if (req.user.role.name == "super-admin") {
        const district = await districtModel.findOne({ _id: req.params["id"] });
        await district.populate({
          path: "state",
          select: ["name"],
        });
        returnMessage.successMessage(
          res,
          messages.successMessages.showdistrict,
          district
        );
      } else {
        // Error Handling
      }
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },

  update: async (req, res) => {
    try {
      if (req.user.role.name == "super-admin") {
        const district = await districtModel.findByIdAndUpdate(
          req.params["id"],
          { ...req.body },
          { new: true }
        );
        await district.populate({
          path: "state",
          select: ["name"],
        });
        returnMessage.successMessage(
          res,
          messages.successMessages.updatedistrict,
          district
        );
      } else {
        // Error Handling
      }
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },

  // delete: async(req,res) => {
  //   try {
  //     const district = await districtModel.remove({ '_id': req.params['id'] });
  //     returnMessage.successMessage(res,messages.successMessages.deletedistrict, district);
  //   } catch (error) {
  //     returnMessage.errorMessage(res,error);
  //   }
  // },

  show: async (req, res) => {
    try {
      // if (req.user.role.name == "super-admin") {
      const district = await districtModel.findOne({ _id: req.params["id"] });
      await district.populate({
        path: "state",
        select: ["name"],
      });
      returnMessage.successMessage(
        res,
        messages.successMessages.showdistrict,
        district
      );
      // } else {
      // Error Handling
      // }
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
};
