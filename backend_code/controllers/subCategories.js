const subCategoryModel = require("../schema/subCategories");
const returnMessage = require("./message");
const messages = require("../lang/messages.json");

module.exports = {
  getAllsubCategories: async (req, res) => {
    try {
      // if (
      //   req.user.role.name == "super-admin" ||
      //   req.user.role.name == "ugc-admin"
      // ) {
      const subCategories = await subCategoryModel
        .find({})
        .populate("mainCategoryId")
        .populate("department");
      returnMessage.successMessage(
        res,
        messages.successMessages.getAllSubCategories,
        subCategories
      );
      // } else {
      //   // Error Handling
      // }
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
        const subCategory = await subCategoryModel.create({ ...req.body });
        returnMessage.successMessage(
          res,
          messages.successMessages.addSubCategory,
          subCategory
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
        const subCategory = await subCategoryModel.findOne({
          _id: req.params["id"],
        });
        returnMessage.successMessage(
          res,
          messages.successMessages.showSubCategory,
          subCategory
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
        const subCategory = await subCategoryModel.findByIdAndUpdate(
          req.params["id"],
          { ...req.body }
        );
        returnMessage.successMessage(
          res,
          messages.successMessages.updateSubCategory,
          subCategory
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
  //     const subCategory = await subCategoryModel.remove({
  //       _id: req.params["id"],
  //     });
  //     returnMessage.successMessage(
  //       res,
  //       messages.successMessages.deleteSubCategory,
  //       subCategory
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
        const subCategory = await subCategoryModel.findOne({
          _id: req.params["id"],
        });
        returnMessage.successMessage(
          res,
          messages.successMessages.showSubCategory,
          subCategory
        );
      } else {
        // Error Handling
      }
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
};
