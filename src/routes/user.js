const router = require("express").Router();

router.get("/getUser", (req, res) => {
  res.send("User test success");
});

router.post("/addUser", (req, res) => {
  const { username } = req.body;
  res.json({
    message: "user created " + username,
  });
});

module.exports = router;
