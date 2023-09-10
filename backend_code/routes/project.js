const router = require("express").Router();
const projectController = require("../controllers/project");

router.get("/:id", projectController.getProjectForCompetition);
router.post("/", projectController.addProject);
router.put("/:id", projectController.updateProject);

module.exports = router;

