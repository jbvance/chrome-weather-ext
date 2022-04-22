import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Box, Grid, InputBase, IconButton, Paper } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import 'fontsource-roboto';

import WeatherCard from './WeatherCard';
import { fetchOpenWeatherData, OpenWeatherData } from '../utils/api';
import { getStoredCities, setStoredCities } from '../utils/storage';
import './popup.css';

const App: React.FC<{}> = () => {
  const [cities, setCities] = useState<string[]>([]);

  const [cityInput, setCityInput] = useState<string>('');

  useEffect(() => {
    const getCities = async () => {
      const storedCities = await getStoredCities();
      setCities(storedCities);
    };

    getCities();
  }, []);

  const handleCityButtonClick = () => {
    if (cityInput.trim() === '') {
      return;
    }
    const updatedCities = [...cities, cityInput];
    setStoredCities(updatedCities).then(() => {
      setCities(updatedCities);
      setCityInput('');
    });
  };

  const handleCityDeleteButtonClick = (index: number) => {
    let updatedCities = [...cities];
    updatedCities.splice(index, 1);
    setStoredCities(updatedCities).then(() => {
      setCities(updatedCities);
    });
  };

  return (
    <Box mx="8px" my="16px">
      <Grid container>
        <Grid item>
          <Paper>
            <Box px="15px" py="5px">
              <InputBase
                placeholder="Add a city name"
                value={cityInput}
                onChange={(event) => setCityInput(event.target.value)}
              />
              <IconButton onClick={handleCityButtonClick}>
                <AddIcon />
              </IconButton>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {cities.map((city, index) => (
        <WeatherCard
          city={city}
          key={index}
          onDelete={() => handleCityDeleteButtonClick(index)}
        />
      ))}
      <Box height="16px" />
    </Box>
  );
};

const root = document.createElement('div');
document.body.appendChild(root);
ReactDOM.render(<App />, root);
