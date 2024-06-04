import React, { useState, useEffect, useCallback } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import debounce from 'lodash.debounce';
import { ListItem, ListItemAvatar, Avatar, ListItemText, Box, Typography, Paper } from '@mui/material';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

// Custom styles
const CustomTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: theme.palette.primary.main,
    },
    '&:hover fieldset': {
      borderColor: theme.palette.secondary.main,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.secondary.main,
    },
  },
}));

const CustomListItem = styled(ListItem)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const theme = createTheme({
  palette: {
    primary: {
      main: '#6200ea',
    },
    secondary: {
      main: '#03dac5',
    },
    background: {
      paper: '#ffffff',
      default: '#e6ccb2',
    },
    action: {
      hover: '#f1f1f1',
    },
  },
});

const CollegeSelector = ({ onSelectCollege }) => {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [logoError, setLogoError] = useState(false);

  const fetchColleges = async (query) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://universities.hipolabs.com/search?name=${query}`);
      const data = response.data.map(college => ({
        label: college.name,
        img: `https://logo.clearbit.com/${college.domains[0]}`,
        domain: college.domains[0]
      }));
      setColleges(data);
    } catch (error) {
      console.error('Error fetching colleges:', error);
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetchColleges = useCallback(debounce(fetchColleges, 300), []);

  useEffect(() => {
    if (inputValue) {
      debouncedFetchColleges(inputValue);
    } else {
      setColleges([]);
    }
  }, [inputValue, debouncedFetchColleges]);

  const handleSelectCollege = (event, value) => {
    setLogoError(false); // Reset error state when a new college is selected
    onSelectCollege(value);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ p: 2, backgroundColor: theme.palette.background.default, borderRadius: 2, boxShadow: 3, width: '80%', margin: 'auto' }}>
        <Paper elevation={3} sx={{ p: 2 }}>
          <Autocomplete
            options={colleges}
            getOptionLabel={(option) => option.label}
            loading={loading}
            renderOption={(props, option) => (
              <CustomListItem {...props} key={option.domain}>
                <ListItemAvatar>
                  <Avatar src={option.img} alt={option.label} onError={() => setLogoError(true)} />
                </ListItemAvatar>
                <ListItemText primary={option.label} />
              </CustomListItem>
            )}
            renderInput={(params) => (
              <CustomTextField
                {...params}
                label="Select a College"
                variant="outlined"
                onChange={(e) => setInputValue(e.target.value)}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {loading ? <CircularProgress color="inherit" size={20} /> : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                  style: { backgroundColor: theme.palette.background.paper }
                }}
                InputLabelProps={{ shrink: true }}
              />
            )}
            onChange={handleSelectCollege}
          />
        </Paper>
        {loading && <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>Loading...</Typography>}
      </Box>
    </ThemeProvider>
  );
};

export default CollegeSelector;

