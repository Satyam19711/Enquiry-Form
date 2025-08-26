let express = require("express");
let mongoose = require("mongoose");
const enquiryRouter = require("./App/routes/web/enquiryRoutes");
let cors = require("cors");
require("dotenv").config({ quiet: true });
let app = express();
app.use(cors());

app.use(express.json());

// routes

app.use("/api/website/enquiry", enquiryRouter);

mongoose
  .connect(process.env.DBURL)
  .then(() => {
    console.log("Connected to DB");
    app.listen(process.env.PORT, () => {
      console.log("Server is running on port " + process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
