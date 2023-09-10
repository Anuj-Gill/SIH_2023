const userModel = require("../schema/users");
const { hashPassword, signToken, verifyToken } = require("../utils");
const returnMessage = require("./message");
const messages = require("../lang/messages.json");
const roleModel = require("../schema/role");
module.exports = {
  register: async (req, res) => {
    try {
      const { password, email } = req.body;
      console.log(password,email)
      const isEmailTaken = await userModel.findOne({ email });
      if (isEmailTaken)
        return res.status(400).json({ message: "Email already exists" });
      const { salt, hash } = hashPassword(password);
      delete req.body.password;
      userModel.create({ ...req.body, salt, hash });
      res.status(201).json({
        message: "User registered",
        token: signToken({ email: req.body.email }),
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  },

  login: async (req, res) => {
    try {
      const { password, email } = req.body;
      const userData = await userModel.findOne({ email })
      if (!userData)
        return res.status(400).json({ message: "User is not registered" });
      const hashedPass = hashPassword(password, userData.salt);
      if (hashedPass.hash === userData.hash) {
        const {role} = userData
        if(role=='student'){
          const userProfile = await userModel.findOne({ email });
          if(!userProfile.college|| !userProfile.country|| !userProfile.state ||!userProfile.district ||!userProfile.streams){
            return res.status(200).json({
              message: "User logged in",
              token: signToken({ email: req.body.email }),
              role: userData.role,
              profileFilled:false,
            });
          }else{
            return res.status(200).json({
              message: "User logged in",
              token: signToken({ email: req.body.email }),
              role: userData.role,
              profileFilled:true,
            });
          }
        }else{
          return res.status(200).json({
            message: "User logged in",
            token: signToken({ email: req.body.email }),
            // role: userData.role.name,
          });
        }
        
      }
      return res.status(400).json({ message: "Incorrect password" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  },
  addUser: async (req, res) => {
    try {
      await userModel.create(req.body);
      returnMessage.successMessage(res, messages.successMessages.addUser);
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  updateUser: async (req, res) => {
    try {
      await userModel.findByIdAndUpdate(req.user._id, req.body);
      returnMessage.successMessage(res, messages.successMessages.updatedUser);
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  deleteUser: async (req, res) => {
    try {
      await userModel.findByIdAndRemove(req.user._id);
      returnMessage.successMessage(res, messages.successMessages.deleteUser);
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  fetchAllUser: async (req, res) => {
    try {
      const data = await userModel.find().populate("role");
      returnMessage.successMessage(
        res,
        messages.successMessages.getAllUser,
        data
      );
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
  fetchAccToRole: async (req, res) => {
    try {
      const role = await roleModel.find({ name: req.body.role });
      const data = await userModel.find({ role: role[0]._id });
      // console.log(data);
      returnMessage.successMessage(
        res,
        messages.successMessages.getAllUser,
        data
      );
    } catch (error) {
      returnMessage.errorMessage(res, error);
    }
  },
};
