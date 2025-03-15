import React, { useState } from "react";
import { Container, TextField, Button, Typography, IconButton } from "@mui/material";
import { Add, Close } from "@mui/icons-material";
import { useAuth } from "../context/AuthContext";

const PostJob = () => {
  const { user } = useAuth();
  const [jobData, setJobData] = useState({ title: "", company: "", description: "", skills: [""] });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const endpoint = process.env.REACT_APP_API_URL;

  const handleSkillChange = (index, value) => {
    const updatedSkills = [...jobData.skills];
    updatedSkills[index] = value;
    setJobData({ ...jobData, skills: updatedSkills });
  };

  const addSkillField = () => {
    setJobData({ ...jobData, skills: [...jobData.skills, ""] });
  };

  const removeSkillField = (index) => {
    const updatedSkills = jobData.skills.filter((_, i) => i !== index);
    setJobData({ ...jobData, skills: updatedSkills });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await fetch(`${endpoint}/api/jobs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          title: jobData.title,
          company: jobData.company,
          requiredSkills: jobData.skills.filter(skill => skill.trim() !== ""), // Remove empty skills
          description: jobData.description,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to post job");

      setSuccess("Job posted successfully!");
      setJobData({ title: "", company: "", description: "", skills: [""] }); // Reset form

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Post a Job</Typography>
      {error && <Typography color="error">{error}</Typography>}
      {success && <Typography color="primary">{success}</Typography>}

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <TextField label="Job Title" value={jobData.title} onChange={(e) => setJobData({ ...jobData, title: e.target.value })} fullWidth required />
        <TextField label="Company" value={jobData.company} onChange={(e) => setJobData({ ...jobData, company: e.target.value })} fullWidth required />
        <TextField label="Job Description" multiline rows={4} value={jobData.description} onChange={(e) => setJobData({ ...jobData, description: e.target.value })} fullWidth required />

        <Typography variant="h6">Required Skills</Typography>
        {jobData.skills.map((skill, index) => (
          <div key={index} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <TextField
              value={skill}
              onChange={(e) => handleSkillChange(index, e.target.value)}
              placeholder="Enter a skill"
              fullWidth
            />
            <IconButton onClick={() => removeSkillField(index)} disabled={jobData.skills.length === 1}>
              <Close />
            </IconButton>
          </div>
        ))}

        <Button variant="outlined" startIcon={<Add />} onClick={addSkillField}>
          Add Skill
        </Button>

        <Button type="submit" variant="contained" color="primary">Submit</Button>
      </form>
    </Container>
  );
};

export default PostJob;
