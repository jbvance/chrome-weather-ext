import React from 'react';
import ReactDOM from 'react-dom';
import 'fontsource-roboto';
import WeatherCard from './WeatherCard';
import { fetchOpenWeatherData, OpenWeatherData } from '../utils/api';
import './popup.css';

const App: React.FC<{}> = () => {
  return (
    <>
      <WeatherCard city="Toronto" />
      <WeatherCard city="New York" />
      <WeatherCard city="Error" />
    </>
  );
};

const root = document.createElement('div');
document.body.appendChild(root);
ReactDOM.render(<App />, root);
