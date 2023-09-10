const universityModel = require("../../schema/universities");
const returnMessage = require("../message");
const messages = require("../../lang/messages.json");

module.exports = {
  index: async (req, res) => {
    try {
      const universities = await universityModel.find({}).populate("admin");
      returnMessage.successMessage(
        res,
        messages.successMessages.getAllUniversity,
        universities
      );
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  create: async (req, res) => {
    try {
      if (
        req.user.role.name == "super-admin" ||
        req.user.role.name == "ugc-admin"
      ) {
        const university = await universityModel.create({ ...req.body });
        returnMessage.successMessage(
          res,
          messages.successMessages.createUniversity,
          university
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
      if (
        req.user.role.name == "super-admin" ||
        req.user.role.name == "ugc-admin"
      ) {
        const university = await universityModel.findOne({
          _id: req.params["id"],
        });
        returnMessage.successMessage(
          res,
          messages.successMessages.editUniversity,
          university
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
      if (
        req.user.role.name == "super-admin" ||
        req.user.role.name == "ugc-admin"
      ) {
        const university = await universityModel.findByIdAndUpdate(
          req.params["id"],
          { ...req.body }
        );
        returnMessage.successMessage(
          res,
          messages.successMessages.updateUniversity,
          university
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
  //     const university = await universityModel.remove({ '_id': req.params['id'] });
  //     returnMessage.successMessage(res,messages.successMessages.deleteCountry);
  //   } catch (error) {
  //     returnMessage.errorMessage(res,error);
  //   }
  // },
  show: async (req, res) => {
    try {
      // if (
      //   req.user.role.name == "super-admin" ||
      //   req.user.role.name == "ugc-admin"
      // ) {
      const university = await universityModel.findOne({
        _id: req.params["id"],
      });
      returnMessage.successMessage(
        res,
        messages.successMessages.showCountry,
        university
      );
      // } else {
      //   // Error Handling
      // }
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
};
