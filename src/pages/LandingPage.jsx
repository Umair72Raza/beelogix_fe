import React, { useEffect, useState } from "react";
import { Container, Typography, Button, Grid, Card, CardContent } from "@mui/material";
import Navbar from "../components/Navbar";
import AuthModal from "../components/AuthModal";
import { useAuth } from "../context/AuthContext";

const LandingPage = () => {
  const { setAuthModalOpen, setAuthType, authModalOpen } = useAuth();
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/jobs");
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchJobs();
  }, []);

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
                      Required Skills: {job.skills.join(", ")}
                    </Typography>
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
      <AuthModal /> {/* Modal is included in the component tree */}
    </>
  );
};

export default LandingPage;
