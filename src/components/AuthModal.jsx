import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, TextField, Button } from "@mui/material";
import { useAuth } from "../context/AuthContext";

const AuthModal = () => {
  const { authModalOpen, setAuthModalOpen, authType, login, register } = useAuth();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    if (authType === "register" && !formData.name) tempErrors.name = "Name is required";
    if (!formData.email) tempErrors.email = "Email is required";
    if (!/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = "Email is invalid";
    if (!formData.password) tempErrors.password = "Password is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (authType === "login") {
      login(formData.email, formData.password);
    } else {
      register(formData.name, formData.email, formData.password);
    }
  };

  return (
    <Dialog open={authModalOpen} onClose={() => setAuthModalOpen(false)}>
      <DialogTitle>{authType === "login" ? "Login" : "Sign Up"}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px", padding: "20px" }}>
          {authType === "register" && (
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              error={!!errors.name}
              helperText={errors.name}
            />
          )}
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            error={!!errors.password}
            helperText={errors.password}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            {authType === "login" ? "Login" : "Sign Up"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
