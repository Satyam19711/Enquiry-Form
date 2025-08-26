const Enquiry = require("../../model/enquiry.model");

let enquiryInsert = (req, res) => {
  let { name, email, phone, message } = req.body;

  let enquiry = new Enquiry({
    name,
    email,
    phone,
    message,
  });

  enquiry
    .save()
    .then(() => {
      res.send({
        status: true,
        message: "Enquiry Inserted Successfully",
      });
    })
    .catch((err) => {
      res.send({
        status: false,
        message: "Enquiry Insertion Failed",
        error: err,
      });
    });
};

let enquiryList = async (req, res) => {
  let enquiry = await Enquiry.find();
  res.send({ status: true, enquiry });
};

let enquiryDelete = async (req, res) => {
  let enId = req.params.id;
  let enquiry = await Enquiry.deleteOne({ _id: enId });
  res.send({ status: true, message: "Enquiry Deleted Successfully", enquiry });
};

let enquirySingleRowUpdate = async (req, res) => {
  let enId = req.params.id;
  let enquiry = await Enquiry.findOne({ _id: enId });
  res.send({ status: true, message: "Enquiry Updated Successfully", enquiry });
};

let enquiryUpdate = async (req, res) => {
  let enquiryId = req.params.id;
  let { name, email, phone, message } = req.body;
  let updateObj = {
    name,
    email,
    phone,
    message,
  };

  let updateRes = await Enquiry.updateOne({ _id: enquiryId }, updateObj);
  res.send({
    status: true,
    message: "Enquiry Updated Successfully",
    updateRes,
  });
};

module.exports = {
  enquiryInsert,
  enquiryList,
  enquiryDelete,
  enquirySingleRowUpdate,
  enquiryUpdate,
};
