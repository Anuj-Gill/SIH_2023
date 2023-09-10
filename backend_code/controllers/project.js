const projectModel = require("../schema/project");
const returnMessage = require("./message");
const messages = require("../lang/messages.json");

const findUserWithMinTickets = async () => {
  const grieData = await projectModel.aggregate([
    { $group: { _id: "$assignedTo", count: { $sum: 1 } } },
  ]);
  console.log(grieData);
};

module.exports = {
    getProjectForCompetition: async (req, res) => {
    try {
      const {id}=req.params;
      const data = await projectModel.find({competition:id});
      console.log(res);
      console.log(data);
      returnMessage.successMessage(
        res,
        messages.successMessages.getProjectForCompetition,
        data
      );
      
    } catch (error) {
      console.log(error)
      returnMessage.errorMessage(res, error);
    }
  },

  
  addProject: async (req, res) => {
    try {
      const email  = req.body;
      const userData=await userModel.findOne({ email }).populate("role")
      const userRole=userData.role.name;
      if(userRole=="student"){
        await findUserWithMinTickets();
        await projectModel.create(req.body);
        returnMessage.successMessage(
          res,
          messages.successMessages.addproject,
          data
        );
      }else{
        returnMessage.errorMessage(res, error);//Acces deined
      }
      
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  updateProject: async (req, res) => {
    try {
        if(userRole=="student"){
            const { id } = req.params;
            await projectModel.findByIdAndUpdate(id, req.body);
            returnMessage.successMessage(
                res,
                messages.successMessages.updateproject,
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
