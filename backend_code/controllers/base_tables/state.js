const stateModel = require("../../schema/states");
const returnMessage = require("../message");
const messages = require("../../lang/messages.json");

module.exports = {
  index: async (req, res) => {
    try {
      const states = await stateModel
        .find()
        .populate({
          path: "country",
          select: ["name"],
        })
        .sort({ name: 1 });

      returnMessage.successMessage(
        res,
        messages.successMessages.getAllStates,
        states
      );
    } catch (error) {
      console.log(error);
      returnMessage.errorMessage(res, error);
    }
  },
  create: async (req, res) => {
    try {
      if (req.user.role.name == "super-admin") {
        const state = await stateModel.create({ ...req.body });
        await state.populate({
          path: "country",
          select: ["name"],
        });
        returnMessage.successMessage(
          res,
          messages.successMessages.addState,
          state
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
        const state = await stateModel.findOne({ _id: req.params["id"] });
        await state.populate({
          path: "country",
          select: ["name"],
        });
        returnMessage.successMessage(
          res,
          messages.successMessages.showState,
          state
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
        const state = await stateModel.findByIdAndUpdate(
          req.params["id"],
          { ...req.body },
          { new: true }
        );
        await state.populate({
          path: "country",
          select: ["name"],
        });
        returnMessage.successMessage(
          res,
          messages.successMessages.updateState,
          state
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
  //     const state = await stateModel.remove({ '_id': req.params['id'] });
  //     returnMessage.successMessage(res,messages.successMessages.deletestate, state);
  //   } catch (error) {
  //     returnMessage.errorMessage(res,error);
  //   }
  // },
  show: async (req, res) => {
    try {
      // if (req.user.role.name == "super-admin") {
      const state = await stateModel.findOne({ _id: req.params["id"] });
      await state.populate({
        path: "country",
        select: ["name"],
      });
      returnMessage.successMessage(
        res,
        messages.successMessages.showstate,
        state
      );
      // } else {
      // Error Handling
      // }
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
};
