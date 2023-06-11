const router = require("express").Router();
const userController = require("../controllers/userController");
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middleware/verifyToken");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.put("/:id", verifyTokenAndAuthorization, userController.updateUser);
router.delete("/:id", verifyTokenAndAuthorization, userController.deleteUser);
router.get("/find/:id", verifyTokenAndAdmin, userController.getUser);

module.exports = router;
