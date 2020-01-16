const express = require("express"),
  bodyParser = require("body-parser"),
  cors = require("cors"),
  app = express();

const ev = require("dotenv").config();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const accountRoutes = require("./routes/accounts"),
  schoolRoutes = require("./routes/schools"),
  webhooks = require("./routes/webhooks"),
  health = require("./routes/health");

app.use("/api/accounts", accountRoutes);
app.use("/api/schools", schoolRoutes);
app.use("/api/webhooks", webhooks);
app.use("/api/health", health);

app.use((request, response, next) => {
  let error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`App running ${process.env.PORT || 5000}`);
});
