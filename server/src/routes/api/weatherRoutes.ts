import { Router } from "express";
const router = Router();

import HistoryService from "../../service/historyService.js";
import WeatherService from "../../service/weatherService.js";

// TODO: POST Request with city name to retrieve weather data
router.post("/", async (req, res) => {
  // TODO: GET weather data from city name
  const cityName = req.body.cityName;

  // get the weather data from the WeatherService (getWeatherForCity)
  const weatherData = await WeatherService.getWeatherForCity(cityName);
  console.log(weatherData);

  // TODO: save city to search history
  await HistoryService.addCity(cityName);

  // res.send("Testing");
  res.json(weatherData);
});

// TODO: GET search history
router.get("/history", async (_req, res) => {
  const cities = await HistoryService.getCities();

  res.json(cities);
});

// // * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req, res) => {

  const cityId = req.params.id;

  await HistoryService.removeCity(cityId);

  res.send("City has been deleted")

});

export default router;
