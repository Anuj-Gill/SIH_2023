const countryModel = require("../../schema/countries");
const returnMessage = require("../message");
const messages = require("../../lang/messages.json");

module.exports = {
  index: async (req, res) => {
    try {
      const countries = await countryModel.find().sort({ name: 1 });
      returnMessage.successMessage(
        res,
        messages.successMessages.getAllCountries,
        countries
      );
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  create: async (req, res) => {
    try {
      if (req.user.role.name == "super-admin") {
        const country = countryModel.create({ ...req.body });
        returnMessage.successMessage(
          res,
          messages.successMessages.addCountry,
          country
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
        const country = await countryModel.findOne({ _id: req.params["id"] });
        returnMessage.successMessage(
          res,
          messages.successMessages.showCountry,
          country
        );
      } else {
        // Error handling
      }
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  update: async (req, res) => {
    try {
      if (req.user.role.name == "super-admin") {
        const country = await countryModel.findByIdAndUpdate(req.params["id"], {
          ...req.body,
        });
        returnMessage.successMessage(
          res,
          messages.successMessages.updateCountry,
          country
        );
      } else {
        // Error handling
      }
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  // delete: async(req,res) => {
  //   try {
  //     const country = await countryModel.remove({ '_id': req.params['id'] });
  //     returnMessage.successMessage(res,messages.successMessages.deleteCountry);
  //   } catch (error) {
  //     returnMessage.errorMessage(res,error);
  //   }
  // },
  show: async (req, res) => {
    try {
      // if(req.user.role.name == 'super-admin') {
      const country = await countryModel.findOne({ _id: req.params["id"] });
      returnMessage.successMessage(
        res,
        messages.successMessages.showCountry,
        country
      );
      // } else {
      // Error handling
      // }
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
};
