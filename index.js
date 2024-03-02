const express = require("express");
const app = express();
const PORT = 8080;
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    seccuss: true,
    message: "Server started",
  });
});

app.listen(PORT, () => {
  console.log("server started running on port ", PORT);
});
