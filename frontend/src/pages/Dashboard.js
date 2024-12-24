import React from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
} from '@mui/material';
import {
  Assessment,
  Group,
  Notifications,
  Assignment,
} from '@mui/icons-material';

function Dashboard() {
  const stats = [
    {
      title: 'Active Projects',
      value: '12',
      icon: <Assignment />,
      color: '#1976d2',
    },
    {
      title: 'Team Members',
      value: '24',
      icon: <Group />,
      color: '#2e7d32',
    },
    {
      title: 'Tasks Completed',
      value: '156',
      icon: <Assessment />,
      color: '#ed6c02',
    },
    {
      title: 'Notifications',
      value: '3',
      icon: <Notifications />,
      color: '#9c27b0',
    },
  ];

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        {stats.map((stat) => (
          <Grid item xs={12} sm={6} md={3} key={stat.title}>
            <Paper elevation={3}>
              <Box p={3}>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Box>
                    <Typography color="textSecondary" variant="h6">
                      {stat.title}
                    </Typography>
                    <Typography variant="h4">{stat.value}</Typography>
                  </Box>
                  <Box
                    sx={{
                      backgroundColor: `${stat.color}20`,
                      borderRadius: '50%',
                      p: 1,
                    }}
                  >
                    {React.cloneElement(stat.icon, {
                      sx: { fontSize: 40, color: stat.color },
                    })}
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Grid>
        ))}

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Activity
              </Typography>
              <Typography variant="body2" color="textSecondary">
                No recent activity to display.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard;
