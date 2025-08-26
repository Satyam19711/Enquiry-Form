let express = require("express");
const {
  enquiryInsert,
  enquiryList,
  enquiryDelete,
  enquirySingleRowUpdate,
  enquiryUpdate,
} = require("../../controller/web/enquiryController");
let enquiryRouter = express.Router();

enquiryRouter.post("/insert", enquiryInsert);

enquiryRouter.get("/view", enquiryList);

enquiryRouter.delete("/delete/:id", enquiryDelete);

enquiryRouter.get("/single/:id", enquirySingleRowUpdate);

enquiryRouter.put("/update/:id", enquiryUpdate);

module.exports = enquiryRouter;
