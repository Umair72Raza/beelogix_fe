import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, CircularProgress, Card, CardContent, Button } from "@mui/material";

const ApplicationsPage = () => {
  const { jobId } = useParams(); // Get jobId from URL
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const endpoint = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch(`${endpoint}/api/applications/${jobId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Ensure authentication
          },
        });
        const data = await response.json();
        if (response.ok) {
          setApplications(data.applications);
        } else {
          console.error("Error fetching applications:", data.message);
        }
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [jobId]);

  if (loading) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Job Applications
      </Typography>
      {applications.length > 0 ? (
        applications.map((app) => (
          <Card key={app._id} style={{ marginBottom: "15px" }}>
            <CardContent>
              <Typography variant="h6">{app.applicantName}</Typography>
              <Typography variant="body1">{app.applicantEmail}</Typography>
              <Button
                variant="contained"
                color="primary"
                href={app.resumeLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{ marginTop: "10px" }}
              >
                View Resume
              </Button>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography>No applications found for this job.</Typography>
      )}
    </Container>
  );
};

export default ApplicationsPage;
