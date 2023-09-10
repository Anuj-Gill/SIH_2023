const router = require("express").Router();
const competitionController = require("../controllers/competition");

router.get("/", competitionController.getAllCompetition);
router.get("/:id", competitionController.getCompetitionForUser);
router.post("/", competitionController.addCompetition);
router.put("/:id", competitionController.updateCompetition);

module.exports = router;
