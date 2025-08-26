import React from "react";
import "./EnquiryList.css";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

const EnquiryList = ({ data, getAllEnquiry, Swal, setFormData }) => {
  let deleteRow = (deleteId) => {
    Swal.fire({
      title: "Do you really want to delete?",
      showDenyButton: true,
      // showCancelButton: true,
      confirmButtonText: "🗑️ Yes, delete it",
      denyButtonText: "❌ No, keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(
            `http://localhost:9000/api/website/enquiry/delete/${deleteId}`
          )
          .then((res) => {
            toast.success("Enquiry deleted successfully");
            getAllEnquiry();
          })
          .catch((err) => {
            toast.error("Something went wrong");
            console.error(err);
          });
      } else if (result.isDenied) {
        Swal.fire("Nothing get deleted", "", "info");
      }
    });
  };

  let editRow = (editId) => {
    axios
      .get(`http://localhost:9000/api/website/enquiry/single/${editId}`)

      .then((res) => {
        let data = res.data.enquiry;
        setFormData(data);
      });
  };

  return (
    <div className="table-container">
      <h2>Enquiry List</h2>
      <table>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Message</th>
            <th colSpan="2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.length >= 1 ? (
            data.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>{item.message}</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => editRow(item._id)}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => deleteRow(item._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No enquiries found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EnquiryList;
