const router = require("express").Router();
const problemStatementController = require("../controllers/problemStatement");
const roleMiddleware = require("../middleware/roleMiddleware");

router.get("/:id", problemStatementController.getProjectForCompetition);
router.post("/", roleMiddleware,problemStatementController.addProblemStatement);
// router.put("/:id", projectController.updaterPoblemStatement);

module.exports = router;

