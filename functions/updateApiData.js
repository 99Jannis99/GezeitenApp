import fetchData from "./fetchData";
import { filter } from "lodash";
import moment from "moment";

const UpdateApiData = async function (object, date) {
  let ApiData = {
    LocationsWithChosed: null,
    WeatherIcon: null,
    WeatherNowDescription: null,
    TemperatureArray: null,
    TemperatureArrayGanzzahl: null,
    currentTide: null,
    tidesObject: null,
    BackgroundEventIdentifier:null,
  };
  ApiData.LocationsWithChosed = object;

  let data = await fetchData("tides/location", {
    location: object ? object.id : ApiData.LocationsWithChosed.id,
    date: date,
  });
  if (data.success.tides[0].date.slice(8, 10) == moment().format("DD")) {
    let currentTideIndex;
    for (let index = 0; index < data.success.tides.length; index++) {
      if (
        data.success.tides[index].time.slice(0, 2).toString() +
          data.success.tides[index].time.slice(3, 5).toString() <
        moment().format("HHmm")
      ) {
        currentTideIndex = index;
        ApiData.BackgroundEventIdentifier = data.success.tides[index].event.identifier;
      }
    }

    ApiData.currentTide = currentTideIndex;
  }

  ApiData.tidesObject = data;

  let weatherData = await fetchData("weather/location", {
    lat: object
      ? object.coords.latitude
      : ApiData.LocationsWithChosed.coords.latitude,
    lng: object
      ? object.coords.longitude
      : ApiData.LocationsWithChosed.coords.longitude,
    date: date,
  });
  let IconNow =
    weatherData.success.daily[0].time.slice(0, 10) ==
    new Date().toISOString().slice(0, 10)
      ? filter(weatherData.success.hourly, (o) => {
          return o.time.slice(11, 13) == moment().format("HH");
        })
      : weatherData.success.daily;
  switch (
    weatherData.success.daily[0].time.slice(0, 10) ==
    new Date().toISOString().slice(0, 10)
      ? IconNow[0].icon
      : weatherData.success.daily[0].icon
  ) {
    case "cloudy":
      ApiData.WeatherIcon = require("../assets/pictures/Weather/cloudy.png");
      ApiData.WeatherNowDescription = IconNow[0];
      break;
    case "clear-day":
      ApiData.WeatherIcon = require("../assets/pictures/Weather/clear-day.png");
      ApiData.WeatherNowDescription = IconNow[0];
      break;
    case "clear-night":
      ApiData.WeatherIcon = require("../assets/pictures/Weather/clear-night.png");
      ApiData.WeatherNowDescription = IconNow[0];
      break;
    case "rain":
      ApiData.WeatherIcon = require("../assets/pictures/Weather/rain.png");
      ApiData.WeatherNowDescription = IconNow[0];
      break;
    case "snow":
      ApiData.WeatherIcon = require("../assets/pictures/Weather/snow.png");
      ApiData.WeatherNowDescription = IconNow[0];
      break;
    case "sleet":
      ApiData.WeatherIcon = require("../assets/pictures/Weather/sleet.png");
      ApiData.WeatherNowDescription = IconNow[0];
      break;
    case "wind":
      ApiData.WeatherIcon = require("../assets/pictures/Weather/wind.png");
      ApiData.WeatherNowDescription = IconNow[0];
      break;
    case "fog":
      ApiData.WeatherIcon = require("../assets/pictures/Weather/fog.png");
      ApiData.WeatherNowDescription = IconNow[0];
      break;
    case "partly-cloudy-day":
      ApiData.WeatherIcon = require("../assets/pictures/Weather/partly-cloudy-day.png");
      ApiData.WeatherNowDescription = IconNow[0];
      break;
    case "partly-cloudy-night":
      ApiData.WeatherIcon = require("../assets/pictures/Weather/partly-cloudy-night.png");
      ApiData.WeatherNowDescription = IconNow[0];
      break;

    default:
      break;
  }
  let DataArray = [];
  let DataArrayGanzzahl = [];
  weatherData.success.hourly.map((d, i) => {
    DataArray[i] = d.apparentTemperature;
    DataArrayGanzzahl[i] = parseInt(d.apparentTemperature);
  });

  ApiData.TemperatureArray = DataArray;
  ApiData.TemperatureArrayGanzzahl = DataArrayGanzzahl;
  return ApiData;
};

export default UpdateApiData;
