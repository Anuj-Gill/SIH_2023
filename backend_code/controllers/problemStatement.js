const problemStatementModel = require("../schema/problemStatement");
const returnMessage = require("./message");
const messages = require("../lang/messages.json");
const userRole=require("../middleware/roleMiddleware");

const findUserWithMinTickets = async () => {
  const grieData = await problemStatementModel.aggregate([
    { $group: { _id: "$assignedTo", count: { $sum: 1 } } },
  ]);
  console.log(grieData);
};

module.exports = {
    getProjectForCompetition: async (req, res) => {
    try {
      const {id}=req.params;
      const data = await problemStatementModel.find({competition:id});
      returnMessage.successMessage(
        res,
        messages.successMessages.getproblemStatementForCompetition,
        data
      );
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },

  
  addProblemStatement: async (req, res) => {
    try {
    console.log(req.user.email)
    //   const role=userRole.role.name;
      if(req.user.role=="fundingAgencyAdmin"){
        await findUserWithMinTickets();
        await problemStatementModel.create(req.body);
        returnMessage.successMessage(
          res,
          messages.successMessages.addproblemStatement,
          data
        );
      }else{
        returnMessage.errorMessage(res, error);//Acces deined
      }
      
    } catch (error) {
        console.log(error)
      returnMessage.errorMessage(res, error);
    }
  },
  updateProblemStatement: async (req, res) => {
    try {
        const userRole="";
        if(userRole=="fundingAgencyAdmin"){
            const { id } = req.params;
            await problemStatementModel.findByIdAndUpdate(id, req.body);
            returnMessage.successMessage(
                res,
                messages.successMessages.updateproblemStatement,
                data
            );
        }else{
            returnMessage.errorMessage(res, error);//Acces deined
        }

    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
};
