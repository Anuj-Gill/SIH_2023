const userController = require("../controllers/user");

const router = require("express").Router();

router.get("/fetchAllUser", userController.fetchAllUser);
router.post("/addUser", userController.addUser);
router.put("/updateUser", userController.updateUser);
router.post("/fetchAccToRole", userController.fetchAccToRole);
// router.delete("/", userController.deleteUser);

module.exports = router;
