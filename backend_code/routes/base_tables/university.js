const university = require("../../controllers/base_tables/university");
const router = require("express").Router();

router.get("/index", university.index);
router.post("/create", university.create);
router.get("/:id/edit", university.edit);
router.put("/:id", university.update);
// router.delete("/:id",university.delete);
router.get("/:id", university.show);

module.exports = router;
