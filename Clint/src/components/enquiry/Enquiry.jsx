import React, { useState } from "react";
import "./Enquiry.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Enquiry = ({ getAllEnquiry, setFormData, formData }) => {
  getAllEnquiry();

  let saveEnquiry = (e) => {
    e.preventDefault();

    if (formData._id) {
      // update

      axios
        .put(
          `http://localhost:9000/api/website/enquiry/update/${formData._id}`,
          formData
        )
        .then((res) => {
          toast.success("Enquiry updated successfully");
          setFormData({
            name: "",
            email: "",
            phone: "",
            message: "",
            _id: "",
          });
          getAllEnquiry();
        });
    } else {
      axios
        .post("http://localhost:9000/api/website/enquiry/insert", formData)
        .then((res) => {
          toast.success("Enquiry submitted successfully");
        });

      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    }
  };

  let getValue = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value;

    let oldData = { ...formData };

    oldData[inputName] = inputValue;
    setFormData(oldData);
  };

  return (
    <div>
      <ToastContainer />
      <h1>Enquiry</h1>

      <form onSubmit={saveEnquiry}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            onChange={getValue}
            value={formData.name}
            required
          />
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            onChange={getValue}
            value={formData.email}
            required
          />
        </div>

        <div>
          <label>Phone:</label>
          <input
            type="number"
            name="phone"
            placeholder="Enter your phone number"
            required
            onChange={getValue}
            value={formData.phone}
          />
        </div>

        <div>
          <label>Message:</label>
          <textarea
            name="message"
            onChange={getValue}
            required
            value={formData.message}
            placeholder="Enter your message"
          ></textarea>
        </div>

        <div>
          <button type="submit">{formData._id ? "Update" : "Submit"}</button>
        </div>
      </form>
    </div>
  );
};

export default Enquiry;
