const departmentModel = require("../schema/departments");
const returnMessage = require("./message");
const messages = require("../lang/messages.json");
const orgModel = require("../schema/organisations");

module.exports = {
  getAllDepartments: async (req, res) => {
    try {
      if (
        req.user.role.name == "super-admin" ||
        req.user.role.name == "ugc-admin"
      ) {
        const departments = await departmentModel
          .find({})
          .populate([{ path: "admin" }, { path: "employees" }]);
        returnMessage.successMessage(
          res,
          messages.successMessages.getAllDepartments,
          departments
        );
      } else if (req.user.role.name == "org-admin") {
        const org = await orgModel
          .find({ organisationAdmin: { $eq: req.user._id } })
          .populate([{ path: "admin" }, { path: "employees" }]);
        // const departments = await departmentModel.find({});
        returnMessage.successMessage(
          res,
          messages.successMessages.getAllDepartments,
          org
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
        const department = await departmentModel.create({ ...req.body });
        returnMessage.successMessage(
          res,
          messages.successMessages.addDepartment,
          department
        );
      } else if (req.user.role.name == "org-admin") {
        const department = await departmentModel.create({ ...req.body });
        const org = await orgModel.find({
          organisationAdmin: { $eq: req.user._id },
        });
        org.departments = [...org.departments, department._id];
        await org.save();
        returnMessage.successMessage(
          res,
          messages.successMessages.addDepartment,
          department
        );
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
        const department = await departmentModel.findOne({
          _id: req.params["id"],
        });
        returnMessage.successMessage(
          res,
          messages.successMessages.showDepartment,
          department
        );
      } else if (req.user.role.name == "org-admin") {
        const org = await orgModel.find({ organisationAdmin: req.user._id });
        if (org.departments.includes(req.params["id"])) {
          const department = await departmentModel.findOne({
            _id: req.params["id"],
          });
          returnMessage.successMessage(
            res,
            messages.successMessages.showDepartment,
            department
          );
        } else {
          // error handling
        }
      } else {
        // error handling
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
        const department = await departmentModel.findByIdAndUpdate(
          req.params["id"],
          { ...req.body }
        );
        returnMessage.successMessage(
          res,
          messages.successMessages.updateDepartment,
          department
        );
      } else if (req.user.role.name == "org-admin") {
        const org = await orgModel.find({ organisationAdmin: req.user._id });
        if (org.departments.includes(req.params["id"])) {
          const department = await departmentModel.findByIdAndUpdate(
            req.params["id"],
            { ...req.body }
          );
          returnMessage.successMessage(
            res,
            messages.successMessages.showDepartment,
            department
          );
        } else {
          // error handling
        }
      } else {
        // error handling
      }
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },

  // delete: async (req, res) => {
  //   try {
  //     const department = await departmentModel.remove({
  //       _id: req.params["id"],
  //     });
  //     returnMessage.successMessage(
  //       res,
  //       messages.successMessages.deleteDepartment,
  //       department
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
        const department = await departmentModel.findOne({
          _id: req.params["id"],
        });
        returnMessage.successMessage(
          res,
          messages.successMessages.showDepartment,
          department
        );
      } else if (req.user.role.name == "org-admin") {
        const org = await orgModel.find({ organisationAdmin: req.user._id });
        if (org.departments.includes(req.params["id"])) {
          const department = await departmentModel.findOne({
            _id: req.params["id"],
          });
          returnMessage.successMessage(
            res,
            messages.successMessages.showDepartment,
            department
          );
        } else {
          // error handling
        }
      } else {
        // error handling
      }
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
};
