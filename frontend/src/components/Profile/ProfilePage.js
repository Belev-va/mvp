import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography, Avatar, Button, Paper, Grid, IconButton } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const ProfileContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  maxWidth: 1200,
  margin: '0 auto',
}));

const StatsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const StatItem = styled(Box)({
  textAlign: 'center',
});

const ProfileTabs = styled(Box)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  marginBottom: theme.spacing(3),
}));

const TabButton = styled(Button)(({ active }) => ({
  marginRight: '16px',
  paddingBottom: '16px',
  borderBottom: active ? '2px solid #1976d2' : 'none',
  borderRadius: 0,
}));

const ProfilePage = () => {
  const [activeTab, setActiveTab] = React.useState('profile');

  return (
    <ProfileContainer>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Avatar
              src="/path-to-profile-image.jpg"
              sx={{ width: 120, height: 120, margin: '0 auto 16px' }}
            />
            <Typography variant="h5" gutterBottom>Felix Kissinger</Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
              <LocationOnIcon sx={{ verticalAlign: 'middle', mr: 0.5 }} />
              Tbilisi, Georgia
            </Typography>
          </Box>
          
          <StatsContainer>
            <StatItem>
              <Typography variant="h6">8</Typography>
              <Typography variant="body2" color="textSecondary">Projects</Typography>
            </StatItem>
            <StatItem>
              <Typography variant="h6">37</Typography>
              <Typography variant="body2" color="textSecondary">Partners</Typography>
            </StatItem>
          </StatsContainer>

          <Button
            variant="contained"
            fullWidth
            sx={{ mb: 2 }}
          >
            Edit Profile
          </Button>
        </Grid>

        <Grid item xs={12} md={9}>
          <ProfileTabs>
            <TabButton
              active={activeTab === 'profile'}
              onClick={() => setActiveTab('profile')}
            >
              Profile
            </TabButton>
            <TabButton
              active={activeTab === 'projects'}
              onClick={() => setActiveTab('projects')}
            >
              Projects
            </TabButton>
            <TabButton
              active={activeTab === 'news'}
              onClick={() => setActiveTab('news')}
            >
              News
            </TabButton>
          </ProfileTabs>

          {activeTab === 'profile' && (
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>Role</Typography>
              <Typography variant="body1" gutterBottom>Producer</Typography>
              
              <Typography variant="h6" sx={{ mt: 3 }} gutterBottom>
                What sphere of creativity are you interested in:
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {['Party', 'Theatre', 'Cinema', 'Internet TV Show'].map((interest) => (
                  <Chip key={interest} label={interest} />
                ))}
              </Box>
            </Paper>
          )}
        </Grid>
      </Grid>
    </ProfileContainer>
  );
};

export default ProfilePage;
