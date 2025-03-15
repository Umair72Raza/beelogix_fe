import React, { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent, TextField, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { clearApplicationStatus, submitApplication } from "../redux/applicationSlice";

const ApplyJobModal = ({ open, onClose, jobId, onSubmit }) => {
    useEffect(()=>{
        console.log(jobId)
    },[])
    const [formData, setFormData] = useState({ name: "", email: "", resume: null });
    const dispatch = useDispatch();
    const { loading, success, error } = useSelector((state) => state.applications);
  
    useEffect(() => {
      if (success || error) {
        setTimeout(() => dispatch(clearApplicationStatus()), 3000);
      }
    }, [success, error, dispatch]);
  
    const handleFileChange = (e) => {
      setFormData({ ...formData, resume: e.target.files[0] });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (!formData.name || !formData.email || !formData.resume) {
        alert("All fields including resume are required");
        return;
      }
      dispatch(submitApplication({ jobId, name: formData.name, email: formData.email, resume: formData.resume }));
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