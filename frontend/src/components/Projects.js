import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects } from '../store/projectSlice';
import ProjectForm from './ProjectForm';
import { Box, Button, Typography, Card, CardContent, Grid, Dialog } from '@mui/material';

const Projects = () => {
  const dispatch = useDispatch();
  const projects = useSelector(state => state.projects.items);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const handleOpenForm = () => {
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Projects
        </Typography>
        <Button variant="contained" color="primary" onClick={handleOpenForm}>
          Create Project
        </Button>
      </Box>

      <Dialog open={isFormOpen} onClose={handleCloseForm} maxWidth="md" fullWidth>
        <ProjectForm onClose={handleCloseForm} />
      </Dialog>

      <Grid container spacing={3}>
        {projects.map(project => (
          <Grid item xs={12} sm={6} md={4} key={project.project_id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {project.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" paragraph>
                  {project.description}
                </Typography>
                <Typography variant="subtitle2" color="primary">
                  Budget: ${project.budget}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Projects;
