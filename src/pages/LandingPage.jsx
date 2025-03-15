import React, { useEffect, useState } from "react";
import { Container, Typography, Button, Grid, Card, CardContent } from "@mui/material";
import Navbar from "../components/Navbar";
import AuthModal from "../components/AuthModal";
import { useAuth } from "../context/AuthContext";
import ApplyJobModal from "../components/ApplyJobModal";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs } from "../redux/jobsSlice";

const LandingPage = () => {
  const { setAuthModalOpen, setAuthType, authModalOpen, user } = useAuth();
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const navigate = useNavigate();

  // Redux hooks
  const dispatch = useDispatch();
  const { jobs, status, error } = useSelector((state) => state.jobs);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchJobs());
    }
  }, [status, dispatch]);


  const handleApplyClick = (job) => {
    setSelectedJob(job);
    console.log(job);
    
    setApplyModalOpen(true);
  };

  return (
    <>
      <Navbar />
      <Container>
        <Typography variant="h3" align="center" gutterBottom>
          Welcome to Mini Job Board
        </Typography>
        <Typography variant="h6" align="center" gutterBottom>
          Find your dream job or post a job for the best talent.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setAuthType("register");
            setAuthModalOpen(true);
          }}
          style={{ display: "block", margin: "20px auto" }}
        >
          Get Started
        </Button>

        <Typography variant="h5" align="center" gutterBottom>
          Featured Jobs
        </Typography>
        <Grid container spacing={3}>
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <Grid item xs={12} sm={6} md={4} key={job.id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{job.title}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {job.company}
                    </Typography>
                    <Typography variant="body2">
                      Required Skills: {job.requiredSkills.map((skill) => (
                        <Typography variant="body2">{skill}</Typography>
                      ))}
                    </Typography>
                    {user && user.email === job.createdBy.email ? (
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => navigate(`/applications/${job._id}`)}
                        style={{ marginTop: "10px" }}
                      >
                        Check Applications
                      </Button>
                    ) : (
                      // If not the job creator, show "Apply for Job" button
                      user && (
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleApplyClick(job)} // Open Apply Modal here
                          style={{ marginTop: "10px" }}
                        >
                          Apply for Job
                        </Button>
                      )
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography variant="body2" align="center">
              No Jobs Posted yet
            </Typography>
          )}
        </Grid>
      </Container>
      <ApplyJobModal open={applyModalOpen} onClose={() => setApplyModalOpen(false)} jobId={selectedJob?._id} />

      <AuthModal /> {/* Modal is included in the component tree */}
    </>
  );
};

export default LandingPage;
