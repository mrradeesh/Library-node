const express = require("express");
const { users } = require("../data/users.json");
const router = express.Router();

//fetch all the users
router.get("/", (req, res) => {
  if (users.length <= 0) {
    return res.status(200).json({
      seccuss: true,
      message: "No one is registered yet",
    });
  }
  res.status(200).json({
    seccuss: true,
    message: "User Fetched Seccussfully",
    data: users,
  });
});
//fetch user by id
router.get("/:id", (req, res) => {
  const { id } = req.params;
  //console.log(id);
  const user = users.find((each) => each.id == id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "user not found",
    });
  }
  res.status(200).json({
    sucess: true,
    message: "user fetched successfully",
    data: user,
  });
});
//Create New User
router.post("/", (req, res) => {
  const { data } = req.body;
  const user = users.find((each) => each.id == data.id);
  if (user) {
    return res.status(409).json({
      success: false,
      message: "user id already exist",
    });
  }
  console.log(data);
  users.push(data);
  res
    .status(201)
    .json({ success: true, message: "user added successfully", data: users });
});
//update the user
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { data } = req.body;
  const user = users.find((each) => each.id === id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not exits to Update",
    });
  }
  const index = users.map((each) => {
    if (each.id == id) {
      return { ...each, ...data };
    }
    return each;
  });
  res.status(200).json({
    success: true,
    message: "user updated successfully",
    data: index,
  });
});
//delete the user
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((each) => each.id == id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "user not found",
    });
  }
  const index = users.indexOf(user);
  users.splice(index, 1);
  res.status(200).json({
    success: true,
    message: "user deleted successfully",
    data: users,
  });
});

module.exports = router;
