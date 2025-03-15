import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, TextField, Button } from "@mui/material";

const ApplyJobModal = ({ open, onClose, jobId, onSubmit }) => {
  const [formData, setFormData] = useState({ name: "", email: "", resume: null });
  const [loading, setLoading] = useState(false);
  const endpoint = process.env.REACT_APP_API_URL;


  const handleFileChange = (e) => {
    setFormData({ ...formData, resume: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.resume) {
      alert("All fields including resume are required");
      return;
    }
  
    setLoading(true);
    try {
      const token = localStorage.getItem("token"); // Retrieve token from local storage
  
      const formDataToSend = new FormData();
      formDataToSend.append("jobId", jobId);
      formDataToSend.append("applicantName", formData.name);
      formDataToSend.append("applicantEmail", formData.email);
      formDataToSend.append("resume", formData.resume);


      const response = await fetch(`${endpoint}/api/applications`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Attach token here
        },
        body: formDataToSend,
      });
  
      const data = await response.json();
      if (response.ok) {
        alert("Application submitted successfully");
        onClose();
      } else {
        alert(data.message || "Failed to submit application");
      }
    } catch (error) {
      alert("Error submitting application");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Apply for Job</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField label="Name" fullWidth value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
          <TextField label="Email" type="email" fullWidth value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
          <input type="file" accept="application/pdf" onChange={handleFileChange} required />
          <Button type="submit" variant="contained" color="primary">Submit</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ApplyJobModal;