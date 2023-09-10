const role = require("../controllers/role");
const router = require("express").Router();
// const { checkPermission } = require("../middleware/permissionMiddleware");

router.post("/", role.create);
router.get("/", role.index);
module.exports = router;
