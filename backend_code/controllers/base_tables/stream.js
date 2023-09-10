const streamModel = require("../../schema/streams");
const returnMessage = require("../message");
const messages = require("../../lang/messages.json");

module.exports = {
  index: async (req, res) => {
    try {
      const streams = await streamModel.find({}).sort({ name: 1 });
      returnMessage.successMessage(
        res,
        messages.successMessages.getAllStreams,
        streams
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
        const stream = await streamModel.create({ ...req.body });
        returnMessage.successMessage(
          res,
          messages.successMessages.addStream,
          stream
        );
      } else {
        // error handling
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
        const stream = await streamModel.findOne({ _id: req.params["id"] });
        returnMessage.successMessage(
          res,
          messages.successMessages.showStream,
          stream
        );
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
        const stream = await streamModel.findByIdAndUpdate(req.params["id"], {
          ...req.body,
        });
        returnMessage.successMessage(
          res,
          messages.successMessages.updateStream,
          stream
        );
      } else {
        // error handling
      }
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  // delete: async(req,res) => {
  //   try {
  //     const stream = await streamModel.remove({ '_id': req.params['id'] });
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
      const stream = await streamModel.findOne({ _id: req.params["id"] });
      returnMessage.successMessage(
        res,
        messages.successMessages.showStream,
        stream
      );
      // } else {
      //   // error handling
      // }
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
};
