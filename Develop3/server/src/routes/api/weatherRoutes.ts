import { Router } from "express";
const router = Router();

// import HistoryService from '../../service/historyService.js';
import WeatherService from "../../service/weatherService.js";

// TODO: POST Request with city name to retrieve weather data
router.post("/", async (req, res) => {
  // TODO: GET weather data from city name
  const cityName = req.body.cityName;

  // get the weather data from the WeatherService (getWeatherForCity)
  const weatherData = await WeatherService.getWeatherForCity(cityName);
  console.log(weatherData);

  // TODO: save city to search history

  // res.send("Testing");
  res.json(weatherData);
});

// TODO: GET search history
// router.get('/history', async (req, res) => {});

// // * BONUS TODO: DELETE city from search history
// router.delete('/history/:id', async (req, res) => {});

export default router;
