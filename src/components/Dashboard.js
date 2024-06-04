import React from 'react';
import { Card, CardContent, Typography, CardMedia, Container, Box } from '@mui/material';

const Dashboard = ({ selectedCollege }) => {
  return (
    <Container maxWidth="sm">
      {selectedCollege && (
        <Card sx={{ mt: 4, backgroundColor: '#f0f4f8' }}>
          <CardContent>
            <Typography variant="h5" component="div" gutterBottom>
              {selectedCollege.label}
            </Typography>
            <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
              {selectedCollege.img ? (
                <CardMedia
                  component="img"
                  image={selectedCollege.img}
                  alt={`${selectedCollege.label} logo`}
                  sx={{ width: 100, height: 100 }}
                  onError={(e) => (e.target.style.display = 'none')}
                />
              ) : (
                <Typography variant="body2" color="textSecondary">
                  Logo not available
                </Typography>
              )}
            </Box>
            <Typography variant="body1" sx={{ mt: 2 }}>
              Here you can view the selected college's details. This interface allows users to easily select and view
              information about various colleges. The goal is to provide a user-friendly experience with an attractive UI.
            </Typography>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default Dashboard;
