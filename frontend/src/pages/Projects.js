import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects, createProject } from '../store/projectSlice';

function Projects() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects.items);
  const [open, setOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    budget: '',
  });

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewProject({ title: '', description: '', budget: '' });
  };

  const handleCreate = async () => {
    try {
      await dispatch(createProject(newProject)).unwrap();
      handleClose();
    } catch (error) {
      console.error('Failed to create project:', error);
    }
  };

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4" component="h1">
            Projects
          </Typography>
          <Fab color="primary" aria-label="add" onClick={handleClickOpen}>
            <AddIcon />
          </Fab>
        </Grid>
        {projects.map((project) => (
          <Grid item xs={12} sm={6} md={4} key={project.project_id}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="h2">
                  {project.title}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  Budget: ${project.budget}
                </Typography>
                <Typography variant="body2" component="p">
                  {project.description}
                </Typography>
                <Typography color="textSecondary">
                  Status: {project.status}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => navigate(`/projects/${project.project_id}`)}
                >
                  View Details
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create New Project</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Project Title"
            type="text"
            fullWidth
            value={newProject.title}
            onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={newProject.description}
            onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Budget"
            type="number"
            fullWidth
            value={newProject.budget}
            onChange={(e) => setNewProject({ ...newProject, budget: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCreate} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Projects;
