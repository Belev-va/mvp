import React from 'react';
import { styled } from '@mui/material/styles';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Avatar,
  Button,
  Card,
  CardContent,
  CardMedia
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const ProjectContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  maxWidth: 1200,
  margin: '0 auto',
}));

const StatBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  marginBottom: theme.spacing(2),
}));

const ProjectPage = () => {
  return (
    <ProjectContainer>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h5" gutterBottom>HowLight TV</Typography>
            <Typography variant="body1" color="textSecondary" gutterBottom>
              Internet TV from Tbilisi. We show you creative and interesting people,
              amazing events and upgrade hip hop culture!
            </Typography>

            <StatBox>
              <AccessTimeIcon color="action" />
              <Typography variant="body2">Start Up - June 1 2023</Typography>
            </StatBox>

            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" gutterBottom>Team</Typography>
              <Typography variant="body2">
                Producer, Co-Producer, 8 Reporters, 4 ambassadors, light engineer,
                sound engineer, smm, director, 8 operators, 4 screenwriters, 8 editors
              </Typography>
            </Box>
          </Paper>

          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Development Plan</Typography>
              <Typography variant="subtitle1" gutterBottom>First Step</Typography>
              <Box component="ol" sx={{ pl: 2 }}>
                <li>Make pilot good episode</li>
                <li>Boost the episode on instagram</li>
                <li>Find partners for 1-th Episode</li>
                <li>We conclude contract</li>
                <li>Make good 1-th episode</li>
                <li>Boost again</li>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>Manager</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar src="/path-to-manager-image.jpg" sx={{ mr: 2 }} />
              <Box>
                <Typography variant="subtitle1">Silvia Guerro</Typography>
                <Typography variant="body2" color="textSecondary">
                  (415)-888-2332
                </Typography>
              </Box>
            </Box>
            <Button variant="contained" fullWidth>
              Contact Manager
            </Button>
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Statistics</Typography>
            <StatBox>
              <Typography variant="subtitle1">500+ Likes on Reels</Typography>
            </StatBox>
            <StatBox>
              <Typography variant="subtitle1">38 Followers on Instagram</Typography>
            </StatBox>
          </Paper>
        </Grid>
      </Grid>
    </ProjectContainer>
  );
};

export default ProjectPage;
