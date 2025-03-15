import React from "react";
import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = ({ onAuthAction }) => {
    const { setAuthModalOpen, setAuthType, user, logout } = useAuth();
    const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Job Board
        </Typography>
        {!user ? (
          <>
            <Button
              color="inherit"
              onClick={() => {
                setAuthType("login");
                setAuthModalOpen(true);
              }}
            >
              Login
            </Button>
            <Button
              color="inherit"
              onClick={() => {
                setAuthType("register");
                setAuthModalOpen(true);
              }}
            >
              Sign Up
            </Button>
          </>
        ) : (
            <>
            <Button color="inherit" onClick={() => navigate("/post-job")}>
              Post a Job
            </Button>
            <Button color="inherit" onClick={logout}>Logout</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;