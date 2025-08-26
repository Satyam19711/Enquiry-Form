import React, { useState } from "react";

import "./App.css";
import Enquiry from "./components/Enquiry/Enquiry";
import EnquiryList from "./components/enquiryList/EnquiryList";
import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";

const App = () => {
  const [enquiryList, setEnquiryList] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    _id: "",
  });

  let getAllEnquiry = () => {
    axios
      .get("http://localhost:9000/api/website/enquiry/view")
      .then((res) => {
        return res.data;
      })
      .then((finalData) => {
        if (finalData.status) {
          setEnquiryList(finalData.enquiry);
        }
      });
  };

  React.useEffect(() => {
    getAllEnquiry();
  }, []);

  return (
    <div className="appContainer">
      <div className="enquiry">
        <Enquiry
          getAllEnquiry={getAllEnquiry}
          formData={formData}
          setFormData={setFormData}
        />
      </div>
      <div className="enquiryList">
        <EnquiryList
          data={enquiryList}
          getAllEnquiry={getAllEnquiry}
          Swal={Swal}
          setFormData={setFormData}
        />
      </div>
    </div>
  );
};

export default App;
