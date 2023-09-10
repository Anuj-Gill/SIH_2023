const grievanceModel = require("../schema/grievances");
const returnMessage = require("./message");
const messages = require("../lang/messages.json");
const departmentModel = require("../schema/departments");
const subCategoriesModel = require("../schema/subCategories");

const findUserWithMinTickets = async (deptId) => {
  const grieData = await grievanceModel.aggregate([
    { $group: { _id: "$assignedTo", count: { $sum: 1 } } },
  ]);
  const allDeptEmp = await departmentModel.findById(deptId, "employees");
  allDeptEmp.employees.forEach((d) => {
    if (!grieData.some((data) => data.assignedTo === d.toString())) {
      grieData.push({ _id: d, count: 0 });
    }
  });
  return grieData[grieData.length - 1]._id;
};

module.exports = {
  getAllGrievances: async (_, res) => {
    try {
      const data = await grievanceModel.find({});
      returnMessage.successMessage(
        res,
        messages.successMessages.getAllGrievances,
        data
      );
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  getGrievanceForUser: async (req, res) => {
    try {
      const { _id } = req.user;
      const data = await grievanceModel.find({ assignedTo: _id });
      returnMessage.successMessage(
        res,
        messages.successMessages.getAllGrievances,
        data
      );
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  getGrievanceUsingStatus: async (req, res) => {
    try {
      const { status } = req.params;
      const query = { status };
      if (req.user.role.name !== "superAdmin") {
        query = {
          assignedTo: req.user._id,
        };
      }
      const data = await grievanceModel.find(query);
      returnMessage.successMessage(
        res,
        messages.successMessages.getAllGrievances,
        data
      );
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  getGrievanceForCategory: async (req, res) => {
    try {
      const { category } = req.params;
      const query = { category };
      if (req?.user?.role !== "superAdmin") {
        query = {
          assignedTo: req.user._id,
        };
      }
      const data = await grievanceModel.find(query);
      returnMessage.successMessage(
        res,
        messages.successMessages.getAllGrievances,
        data
      );
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  getRejectedGrievance: async (req, res) => {
    try {
      const { _id } = req.user;
      const data = await grievanceModel.find({
        assignedTo: _id,
        status: "rejected",
      });
      returnMessage.successMessage(
        res,
        messages.successMessages.getAllGrievances,
        data
      );
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  getAllGrievancesForDepartment: async (req, res) => {
    try {
      const { deptId } = req.params;
      const data = await grievanceModel.find({
        department: deptId,
        status: "review",
      });
      returnMessage.successMessage(
        res,
        messages.successMessages.getAllGrievances,
        data
      );
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  addGrievance: async (req, res) => {
    try {
      // const assignedTo = await findUserWithMinTickets();
      await grievanceModel.create({
        ...req.body,
        createdBy: req.user._id.toString(),
      });
      returnMessage.successMessage(res, messages.successMessages.addGrievance);
    } catch (error) {
      console.log(error);
      returnMessage.errorMessage(res, error);
    }
  },
  updateGrievance: async (req, res) => {
    try {
      const { id } = req.params;
      await grievanceModel.findByIdAndUpdate(id, req.body);
      returnMessage.successMessage(
        res,
        messages.successMessages.updateGrievance
      );
    } catch (error) {
      console.log(error);
      returnMessage.errorMessage(res, error);
    }
  },
  acceptRejectGrievance: async (req, res) => {
    try {
      const { status, _id, subCategory } = req.body;
      const updateQuery = { status };
      if (status === "pending") {
        const subCategoryData = await subCategoriesModel
          .findById(subCategory)
          .lean();
        console.log(subCategoryData);
        const empId = await findUserWithMinTickets(subCategoryData.department);
        updateQuery.assignedTo = empId;

        let deadline = new Date();
        deadline = deadline.setDate(
          deadline.getDate() + subCategoryData.deadline
        );

        updateQuery.assignedAt = deadline;
      }
      await grievanceModel.findByIdAndUpdate(_id, updateQuery);
      res.status(200).json({ msg: "ok" });
    } catch (error) {
      console.log(error);
      returnMessage.errorMessage(res, error);
    }
  },
};
