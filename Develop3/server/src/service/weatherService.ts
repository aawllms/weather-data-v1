import dotenv from "dotenv";
import dayjs from "dayjs";
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
}
// TODO: Define a class for the Weather object
class Weather {
  city: string;
  date: string;
  icon: string;
  iconDescription: string;
  tempF: number;
  windSpeed: number;
  humidity: number;

  constructor(
    city: string,
    date: string,
    icon: string,
    iconDescription: string,
    tempF: number,
    windSpeed: number,
    humidity: number
  ) {
    this.city = city;
    this.date = date;
    this.icon = icon;
    this.iconDescription = iconDescription;
    this.tempF = tempF;
    this.windSpeed = windSpeed;
    this.humidity = humidity;
  }
}

class WeatherService {
  private async fetchLocationData(city: string): Promise<any> {
    const targetURL = `${process.env.API_BASE_URL}/geo/1.0/direct?q=${city}&limit=1&appid=${process.env.API_KEY}`;
    const response = await fetch(targetURL);
    const data = await response.json();
    return data;
  }

  private destructureLocationData(locationData: any): Coordinates {
    const { lat, lon } = locationData[0];
    return { lat, lon };
  }

  // // TODO: Create buildGeocodeQuery method
  // private buildGeocodeQuery(city: string): string {
  //   return `${process.env.API_BASE_URL}/geo/1.0/direct?q=${city}&limit=1&appid=${process.env.API_KEY}`;
  // }

  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${process.env.API_BASE_URL}/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&units=imperial&appid=${process.env.API_KEY}`;
  }

  private async fetchWeatherData(coordinates: Coordinates) {
    const weatherQuery = this.buildWeatherQuery(coordinates);
    const response = await fetch(weatherQuery);
    const data = await response.json();
    return data;
  }

  private parseCurrentWeather(response: any, city: string): Weather[] {
    return response.list.map((weather: any) => {
      return new Weather(
        city,
        dayjs(weather.dt * 1000).format("MM/DD/YYYY"),
        weather.weather[0].icon,
        weather.weather[0].description,
        weather.main.temp,
        weather.wind.speed,
        weather.main.humidity
      );
    });
  }

  private buildForecastArray(
    currentWeather: Weather[],
    weatherData: any
  ): Weather[] {
    const weatherArray = [
      weatherData.list[0],
      weatherData.list[8],
      weatherData.list[16],
      weatherData.list[24],
      weatherData.list[32],
    ];

    return weatherArray.map((weather: any) => {
      return new Weather(
        currentWeather[0].city,
        dayjs(weather.dt * 1000).format("MM/DD/YYYY"),
        weather.weather[0].icon,
        weather.weather[0].description,
        weather.main.temp,
        weather.wind.speed,
        weather.main.humidity
      );
    });
  }

  async getWeatherForCity(city: string) {
    const locationData = await this.fetchLocationData(city);
    const coordinates = this.destructureLocationData(locationData);
    const weatherData = await this.fetchWeatherData(coordinates);

    const currentWeather = this.parseCurrentWeather(weatherData, city);

    const forecast = this.buildForecastArray(currentWeather, weatherData);

    return forecast;
  }
}

export default new WeatherService();
