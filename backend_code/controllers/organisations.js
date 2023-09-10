const organisationModel = require("../schema/organisations");
const returnMessage = require("./message");
const messages = require("../lang/messages.json");

module.exports = {
  getAllOrganisations: async (req, res) => {
    try {
      if (
        req.user.role.name == "super-admin" ||
        req.user.role.name == "ugc-admin"
      ) {
        const organisations = await organisationModel
          .find({})
          .populate("admin")
          .populate("departments");
        returnMessage.successMessage(
          res,
          messages.successMessages.getAllOrganisations,
          organisations
        );
      } else {
        // Error Handling
      }
    } catch (error) {
      console.log(error);
      returnMessage.errorMessage(res, error);
    }
  },

  create: async (req, res) => {
    try {
      if (
        req.user.role.name == "super-admin" ||
        req.user.role.name == "ugc-admin"
      ) {
        const organisation = await await organisationModel.create({
          ...req.body,
        });
        returnMessage.successMessage(
          res,
          messages.successMessages.addOrganisation,
          organisation
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
        const organisation = await organisationModel.findOne({
          _id: req.params["id"],
        });
        returnMessage.successMessage(
          res,
          messages.successMessages.showOrganisation,
          organisation
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
        const organisation = await organisationModel.findByIdAndUpdate(
          req.params["id"],
          { ...req.body }
        );
        returnMessage.successMessage(
          res,
          messages.successMessages.updateOrganisation,
          organisation
        );
      } else {
        // Error Handling
      }
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  // delete: async (req, res) => {
  //   try {
  //     const organisation = await organisationModel.remove({
  //       _id: req.params["id"],
  //     });
  //     returnMessage.successMessage(
  //       res,
  //       messages.successMessages.deleteOrganisation,
  //       organisation
  //     );
  //   } catch (error) {
  //     returnMessage.errorMessage(res, error);
  //   }
  // },
  show: async (req, res) => {
    try {
      if (
        req.user.role.name == "super-admin" ||
        req.user.role.name == "ugc-admin"
      ) {
        const organisation = await organisationModel.findOne({
          _id: req.params["id"],
        });
        returnMessage.successMessage(
          res,
          messages.successMessages.showOrganisation,
          organisation
        );
      } else {
        // Error Handling
      }
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
};
