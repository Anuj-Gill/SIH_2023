const mainCategoryModel = require("../schema/maincategories");
const returnMessage = require("./message");
const messages = require("../lang/messages.json");

module.exports = {
  getAllMainCategories: async (req, res) => {
    try {
      // if (
      //   req.user.role.name == "super-admin" ||
      //   req.user.role.name == "ugc-admin"
      // ) {
      const mainCategories = await mainCategoryModel.find({});
      returnMessage.successMessage(
        res,
        messages.successMessages.getAllMainCategories,
        mainCategories
      );
      // } else {
      //   // Error Handling
      // }
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
        const mainCategory = await mainCategoryModel.create({ ...req.body });
        // console.log(mainCategory);
        returnMessage.successMessage(
          res,
          messages.successMessages.addMainCategory,
          mainCategory
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
        const mainCategory = await mainCategoryModel.findOne({
          _id: req.params["id"],
        });
        returnMessage.successMessage(
          res,
          messages.successMessages.showMainCategory,
          mainCategory
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
        const mainCategory = await mainCategoryModel.findByIdAndUpdate(
          req.params["id"],
          { ...req.body }
        );
        returnMessage.successMessage(
          res,
          messages.successMessages.updateMainCategory,
          mainCategory
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
  //     const mainCategory = await mainCategoryModel.remove({
  //       _id: req.params["id"],
  //     });
  //     returnMessage.successMessage(
  //       res,
  //       messages.successMessages.deleteMainCategory,
  //       mainCategory
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
        const mainCategory = await mainCategoryModel.findOne({
          _id: req.params["id"],
        });
        returnMessage.successMessage(
          res,
          messages.successMessages.showMainCategory,
          mainCategory
        );
      } else {
        // Error Handling
      }
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
};
