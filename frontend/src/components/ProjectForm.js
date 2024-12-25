import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createProject } from '../store/projectSlice';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';

const ProjectForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    budget: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(createProject({
        ...formData,
        budget: parseFloat(formData.budget)
      })).unwrap();
      onClose();
    } catch (error) {
      console.error('Failed to create project:', error);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 500, mx: 'auto' }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Create New Project
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          fullWidth
          label="Project Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          margin="normal"
          multiline
          rows={4}
        />
        <TextField
          fullWidth
          label="Budget"
          name="budget"
          type="number"
          value={formData.budget}
          onChange={handleChange}
          required
          margin="normal"
        />
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button onClick={onClose} color="inherit">
            CANCEL
          </Button>
          <Button type="submit" variant="contained" color="primary">
            CREATE
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default ProjectForm;
