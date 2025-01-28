import fs from "node:fs/promises";
import { v4 as uuidv4 } from "uuid";
// import path from "node:path";


// TODO: Complete the HistoryService class
class HistoryService {
  // TODO: Define a read method that reads from the searchHistory.json file
  private async read() {
    const data: string = await fs.readFile("./db/db.json", "utf-8");
    return data;
  }
  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  private async write(cities: any[]) {
    const stringifiedCities = JSON.stringify(cities, null, 4);
    await fs.writeFile("./db/db.json", stringifiedCities);
  }
  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities() {
    // await fs.readFile(path.join(__dirname, "../../db/db.json"))
    const data = await this.read();

    const cities = JSON.parse(data);

    return cities;
  }
  // TODO Define an addCity method that adds a city to the searchHistory.json file
  async addCity(city: string) {
    const cities = await this.getCities();

    const cityData = {
      name: city,
      id: uuidv4(),
    };

    cities.push(cityData);
    await this.write(cities);
    console.log("db.json has been updated");
  }
  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  async removeCity(id: string) {

    const cities = await this.getCities();

    const filteredCities = cities.filter((city: any) => {
      return city.id !== id
    })

    await this.write(filteredCities)
    console.log("db.json has been updated");

  }
}

export default new HistoryService();
