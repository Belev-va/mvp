import React from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Grid,
  Box,
  Chip,
  LinearProgress,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from '@mui/material';
import {
  Schedule,
  AttachMoney,
  Person,
  Assignment,
} from '@mui/icons-material';

function ProjectDetail() {
  const { id } = useParams();
  // In a real app, you would fetch project details using the id
  const project = {
    title: 'Sample Project',
    description: 'This is a sample project description.',
    status: 'In Progress',
    progress: 60,
    budget: '50,000',
    startDate: '2024-01-01',
    endDate: '2024-06-30',
    team: [
      { name: 'John Doe', role: 'Project Manager' },
      { name: 'Jane Smith', role: 'Developer' },
      { name: 'Mike Johnson', role: 'Designer' },
    ],
    tasks: [
      { title: 'Design UI/UX', status: 'Completed' },
      { title: 'Implement Backend', status: 'In Progress' },
      { title: 'Testing', status: 'Pending' },
    ],
  };

  return (
    <Container>
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          {project.title}
        </Typography>
        <Chip
          label={project.status}
          color="primary"
          sx={{ mb: 2 }}
        />
        <Typography variant="body1" paragraph>
          {project.description}
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" gutterBottom>
                Progress
              </Typography>
              <LinearProgress
                variant="determinate"
                value={project.progress}
                sx={{ height: 10, borderRadius: 5 }}
              />
              <Typography variant="body2" sx={{ mt: 1 }}>
                {project.progress}% Complete
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Schedule sx={{ mr: 1 }} />
                <Box>
                  <Typography variant="caption">Timeline</Typography>
                  <Typography variant="body2">
                    {project.startDate} - {project.endDate}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AttachMoney sx={{ mr: 1 }} />
                <Box>
                  <Typography variant="caption">Budget</Typography>
                  <Typography variant="body2">${project.budget}</Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Team Members
              </Typography>
              <List>
                {project.team.map((member, index) => (
                  <ListItem key={index}>
                    <ListItemAvatar>
                      <Avatar>
                        <Person />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={member.name}
                      secondary={member.role}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Tasks
              </Typography>
              <List>
                {project.tasks.map((task, index) => (
                  <ListItem key={index}>
                    <ListItemAvatar>
                      <Avatar>
                        <Assignment />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={task.title}
                      secondary={task.status}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ProjectDetail;
