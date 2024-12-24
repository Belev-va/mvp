import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Avatar,
  Grid,
  Chip,
} from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    fullName: 'John Doe',
    email: 'john@example.com',
    bio: 'Full-stack developer with 5 years of experience',
    skills: ['React', 'Node.js', 'Python', 'Docker'],
  });

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically make an API call to save the profile
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <Typography variant="h4" component="h1">
            Profile
          </Typography>
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </Button>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
            <Avatar
              sx={{
                width: 150,
                height: 150,
                margin: '0 auto',
                mb: 2,
                bgcolor: 'primary.main',
              }}
            >
              {profile.fullName[0]}
            </Avatar>
          </Grid>

          <Grid item xs={12} md={8}>
            <Box component="form">
              <TextField
                fullWidth
                label="Full Name"
                margin="normal"
                value={profile.fullName}
                disabled={!isEditing}
                onChange={(e) =>
                  setProfile({ ...profile, fullName: e.target.value })
                }
              />
              <TextField
                fullWidth
                label="Email"
                margin="normal"
                value={profile.email}
                disabled={!isEditing}
                onChange={(e) =>
                  setProfile({ ...profile, email: e.target.value })
                }
              />
              <TextField
                fullWidth
                label="Bio"
                margin="normal"
                multiline
                rows={4}
                value={profile.bio}
                disabled={!isEditing}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              />

              <Box sx={{ mt: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Skills
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {profile.skills.map((skill) => (
                    <Chip
                      key={skill}
                      label={skill}
                      onDelete={isEditing ? () => {} : undefined}
                    />
                  ))}
                </Box>
              </Box>

              {isEditing && (
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 3 }}
                  onClick={handleSave}
                >
                  Save Changes
                </Button>
              )}
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default Profile;
