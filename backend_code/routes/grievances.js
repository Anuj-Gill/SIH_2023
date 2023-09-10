const router = require("express").Router();
const grievanceController = require("../controllers/grievances");

router.get("/", grievanceController.getAllGrievances);
router.get("/user/:id", grievanceController.getGrievanceForUser);
router.get("/status/:status", grievanceController.getGrievanceUsingStatus);
router.get("/category/:category", grievanceController.getGrievanceForCategory);
router.get(
  "/department/:deptId",
  grievanceController.getAllGrievancesForDepartment
);
router.post("/", grievanceController.addGrievance);
router.put("/:id", grievanceController.updateGrievance);
router.patch("/:id", grievanceController.acceptRejectGrievance);

module.exports = router;
