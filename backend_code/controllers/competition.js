const competitionModel = require("../schema/competition");
const returnMessage = require("./message");
const messages = require("../lang/messages.json");

const findUserWithMinTickets = async () => {
  const grieData = await competitionModel.aggregate([
    { $group: { _id: "$assignedTo", count: { $sum: 1 } } },
  ]);
  console.log(grieData);
};

module.exports = {
  getAllCompetition: async (_, res) => {
    try {
      const data = await competitionModel.find({});
      returnMessage.successMessage(
        res,
        messages.successMessages.getAllCompetition,
        data
      );
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  getCompetitionForUser: async (req, res) => {
    try {
      const { id } = req.params;
      const data = await competitionModel.find({ createdBy: id });//Check
      returnMessage.successMessage(
        res,
        messages.successMessages.getAllCompetition,
        data
      );
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  
  addCompetition: async (req, res) => {
    try {
      // const email  = req.body;
      // const email="chinmaynaphade29@gmail.com"
      // const userData=await userModel.findOne({ email }).populate("role")
      // const fundingAgencyAdmin=userData.role.name;
      // if(fundingAgencyAdmin=="fundingAgencyAdmin"){
        await findUserWithMinTickets();
        await competitionModel.create(req.body);
        returnMessage.successMessage(
          res,
          messages.successMessages.addCompetition,
        );
      // }else{
      //   console.log("Acces Deined")
      //   returnMessage.errorMessage(res, error);//Acces deined
      // }
      
    } catch (error) {
      console.log(error)
      returnMessage.errorMessage(res, error);
    }
  },
  updateCompetition: async (req, res) => {
    try {
      const { id } = req.params;
      await competitionModel.findByIdAndUpdate(id, req.body);
      returnMessage.successMessage(
        res,
        messages.successMessages.updateCompetition,
        data
      );
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
};
